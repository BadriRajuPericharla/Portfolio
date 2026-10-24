import React, { useState, useEffect, useRef, useCallback } from 'react';
import CartoonBoy from './CartoonBoy';

/**
 * HeroPullingScene
 *
 * COORDINATE SYSTEM
 * -----------------
 * Everything is measured in real pixels from the container's left edge.
 * We use a ResizeObserver to get the actual container width at runtime.
 *
 * Character X  →  pixel distance from left edge of container to char center
 * Name offset  →  pixel translation applied to the name div (starts negative = offscreen left)
 *
 * The rope SVG fills the container absolutely and draws a bezier from
 * the character's left hand pixel position to the name block's right-side anchor.
 *
 * STAGES
 * ------
 * 0 IDLE      – everything off-screen, before animation begins
 * 1 RUNNING   – character slides in from left edge
 * 2 GRABBING  – character pauses, grabs rope, expression changes
 * 3 PULLING   – character leans, name slides in from left
 * 4 LANDING   – name bounces to final position
 * 5 WAVING    – character waves, speech bubble appears
 */

const S = { IDLE: 0, RUNNING: 1, GRABBING: 2, PULLING: 3, LANDING: 4, WAVING: 5 };

/* Easing */
function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/* Timing */
const T = {
  START:   400,   // ms before stage 1
  RUN:     850,   // stage 1 – run in
  GRAB:    550,   // stage 2 – pause and grab
  PULL:   1300,   // stage 3 – pull name in
  LAND:    700,   // stage 4 – bounce
  WAVE:    350,   // delay before bubble
};

/* Character proportions (in px, matches CartoonBoy viewBox 120×220 scaled to rendered size) */
const CHAR_NATURAL_W = 120;
const CHAR_NATURAL_H = 220;
// Where the left hand is in the viewBox (the rope-holding hand)
const HAND_VB_X = 24; // cx of left fist in viewBox
const HAND_VB_Y = 143;

export default function HeroPullingScene({ name = 'Pericharla Badri Raju' }) {
  const containerRef = useRef(null);
  const namePlateRef = useRef(null);
  const rafRef       = useRef(null);
  const [cw, setCw]  = useState(0);   // container width in px (measured)
  const [ch, setCh]  = useState(200); // container height

  // Animation state (all in raw pixels or simple values)
  const [stage,       setStage]       = useState(S.IDLE);
  const [charPx,      setCharPx]      = useState(-200);  // character center X from container left
  const [nameOffPx,   setNameOffPx]   = useState(0);     // translateX applied to name (starts at -largeNum)
  const [nameInitOff, setNameInitOff] = useState(-2000); // set once we know container width
  const [nameBounce,  setNameBounce]  = useState(0);
  const [showBubble,  setShowBubble]  = useState(false);
  const [replayKey,   setReplayKey]   = useState(0);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  /* ── Measure container ──────────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setCw(Math.round(width));
      setCh(Math.max(Math.round(height), 180));
    });
    ro.observe(el);
    // Trigger initial read
    const r = el.getBoundingClientRect();
    setCw(Math.round(r.width));
    setCh(Math.max(Math.round(r.height), 180));
    return () => ro.disconnect();
  }, []);

  /* ── Compute rendered character size ───────────────────────── */
  // Character height = 48% of container height, capped
  const charH = Math.min(Math.max(ch * 0.72, 100), 200);
  const charW = (charH / CHAR_NATURAL_H) * CHAR_NATURAL_W;

  /* ── Where the character's left hand is (in container px) ─── */
  // Hand in viewBox coords → scaled to rendered size → offset by char position
  const handVbFrX = HAND_VB_X / CHAR_NATURAL_W; // fraction along char width
  const handVbFrY = HAND_VB_Y / CHAR_NATURAL_H;
  // charPx = center X of char; char left = charPx - charW/2
  const handAbsX = charPx - charW / 2 + handVbFrX * charW;
  const handAbsY = ch - 8 - (1 - handVbFrY) * charH; // from top

  /* ── Name block anchor (left edge of name, from container left) */
  // When fully in, nameOffPx = 0 and name is centered.
  // Name left edge = container center - half name width
  // We approximate half name width; real measurement comes from ref.
  const [namePlateW, setNamePlateW] = useState(400);
  useEffect(() => {
    if (namePlateRef.current) {
      setNamePlateW(namePlateRef.current.offsetWidth);
    }
  });

  const nameCenterX   = cw / 2;
  const nameLeftEdgeX = nameCenterX - namePlateW / 2; // when offset=0 (settled)
  // During pull, name offset translates from -big → 0; anchor moves with it
  const nameAnchorX   = nameLeftEdgeX + nameOffPx;
  const nameAnchorY   = ch / 2;  // vertically centered

  /* ── Rope control point (sag) ───────────────────────────────── */
  // When pulling hard (nameOffPx very negative) rope sags more
  const pullProgress  = cw > 0 ? Math.min(1, (nameOffPx - nameInitOff) / (-nameInitOff || 1)) : 0;
  const sagAmount     = (1 - pullProgress) * 35 + 5; // 40px sag when slack → 5px when taut
  const ropeCtrlX     = (handAbsX + nameAnchorX) / 2;
  const ropeCtrlY     = Math.max(handAbsY, nameAnchorY) + sagAmount;

  /* ── Rope visible ────────────────────────────────────────────── */
  const ropeVisible = stage === S.GRABBING || stage === S.PULLING || stage === S.LANDING;

  /* ── Character stage name ──────────────────────────────────── */
  const charStage = {
    [S.IDLE]:     'running',
    [S.RUNNING]:  'running',
    [S.GRABBING]: 'grabbing',
    [S.PULLING]:  'pulling',
    [S.LANDING]:  'pulling',
    [S.WAVING]:   'waving',
  }[stage] || 'waving';

  /* ── Replay ──────────────────────────────────────────────────── */
  const replay = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setStage(S.IDLE);
    setCharPx(-200);
    setShowBubble(false);
    setNameBounce(0);
    setReplayKey(k => k + 1);
  }, []);

  /* ── Main timeline ────────────────────────────────────────── */
  useEffect(() => {
    // Don't start until we have a real container width
    if (cw < 50) return;

    // Name starts completely off the left edge
    const initOff = -(cw * 0.55 + namePlateW * 0.5 + 60);
    setNameInitOff(initOff);
    setNameOffPx(initOff);
    setCharPx(-charW - 10); // start just off-screen left

    if (prefersReduced.current) {
      // Instant final state for accessibility
      const finalCharX = cw * 0.18;
      setStage(S.WAVING);
      setCharPx(finalCharX);
      setNameOffPx(0);
      setShowBubble(true);
      return;
    }

    let cancelled = false;

    const wait = ms => new Promise(r => setTimeout(r, ms));

    const animate = (from, to, duration, setter, easeFn = easeOutExpo) =>
      new Promise(res => {
        const start = performance.now();
        const tick = now => {
          if (cancelled) return res();
          const raw = Math.min((now - start) / duration, 1);
          setter(from + (to - from) * easeFn(raw));
          if (raw < 1) rafRef.current = requestAnimationFrame(tick);
          else res();
        };
        rafRef.current = requestAnimationFrame(tick);
      });

    const run = async () => {
      await wait(T.START);
      if (cancelled) return;

      // STAGE 1 — run in: char goes from -charW to ~18% of container
      const runTarget = cw * 0.18;
      setStage(S.RUNNING);
      await animate(-charW - 10, runTarget, T.RUN, setCharPx);
      if (cancelled) return;

      // STAGE 2 — grab: pause, expression changes
      setStage(S.GRABBING);
      await wait(T.GRAB);
      if (cancelled) return;

      // STAGE 3 — pull: char nudges right a little, name slides in
      setStage(S.PULLING);
      const pullCharTarget = runTarget + cw * 0.04; // nudge forward as heels dig in
      const pullStart = performance.now();
      await new Promise(res => {
        const tick = now => {
          if (cancelled) return res();
          const t = Math.min((now - pullStart) / T.PULL, 1);
          const e = easeOutExpo(t);
          setCharPx(runTarget + (pullCharTarget - runTarget) * e);
          setNameOffPx(initOff + (0 - initOff) * e);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
          else res();
        };
        rafRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // STAGE 4 — land bounce
      setStage(S.LANDING);
      const landStart = performance.now();
      await new Promise(res => {
        const tick = now => {
          if (cancelled) return res();
          const t = Math.min((now - landStart) / T.LAND, 1);
          // Decaying sine bounce
          const bounce = Math.sin(t * Math.PI * 2.5) * 14 * (1 - t);
          setNameBounce(-bounce);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
          else { setNameBounce(0); res(); }
        };
        rafRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // STAGE 5 — wave
      setStage(S.WAVING);
      await wait(T.WAVE);
      if (cancelled) return;
      setShowBubble(true);
    };

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey, cw]);

  /* ─────────────────────────────────────────────────────────── */
  /* RENDER                                                       */
  /* ─────────────────────────────────────────────────────────── */

  // Speech bubble position = above char, slightly right
  const bubbleLeft = charPx + charW * 0.3;
  const bubbleBottom = ch - (ch - charH) - charH + 20; // above char's head

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: 220, overflow: 'visible' }}
    >
      {/* ── GROUND LINE ──────────────────────────────────── */}
      <div
        className="absolute bottom-3 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(249,115,22,.25) 30%,rgba(99,102,241,.2) 70%,transparent)' }}
      />

      {/* ── NAME BLOCK ──────────────────────────────────── */}
      {/* Clip wrapper — prevents name overflowing left during animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: 'hidden', zIndex: 2 }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateX(${nameOffPx}px) translateY(${nameBounce}px)`,
            // No CSS transition — fully JS-driven
          }}
        >
          <div
            ref={namePlateRef}
            className="relative inline-block px-5 sm:px-8 py-3 sm:py-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg,rgba(15,19,44,.95) 0%,rgba(8,10,22,.97) 100%)',
              border: '2px solid rgba(249,115,22,.4)',
              boxShadow: stage === S.WAVING
                ? '0 0 45px rgba(249,115,22,.18),0 0 90px rgba(99,102,241,.1),0 8px 32px rgba(0,0,0,.6)'
                : '0 4px 18px rgba(0,0,0,.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* HUD corner brackets */}
            <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-orange-400/60 rounded-tl" />
            <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-300/50 rounded-tr" />
            <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-orange-400/40 rounded-bl" />
            <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-orange-300/40 rounded-br" />

            {/* Rope hitch ring on LEFT edge of name */}
            {ropeVisible && (
              <span
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                style={{
                  background: 'radial-gradient(circle,#FCD34D,#F97316)',
                  border: '2px solid #FB923C',
                  boxShadow: '0 0 8px rgba(249,115,22,.7)',
                  zIndex: 6,
                }}
              />
            )}

            {/* THE NAME */}
            <span
              className="block font-black font-display"
              style={{
                fontSize: 'clamp(1rem, 3.8vw, 2.5rem)',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
                background: 'linear-gradient(130deg,#FFFFFF 0%,#FED7AA 45%,#FDBA74 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
          </div>
        </div>
      </div>

      {/* ── ROPE SVG ────────────────────────────────────── */}
      {ropeVisible && cw > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={cw}
          height={ch}
          viewBox={`0 0 ${cw} ${ch}`}
          style={{ zIndex: 4, overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>

          {/* Main rope — quadratic bezier with sag */}
          <path
            d={`M ${handAbsX.toFixed(1)} ${handAbsY.toFixed(1)} Q ${ropeCtrlX.toFixed(1)} ${ropeCtrlY.toFixed(1)} ${nameAnchorX.toFixed(1)} ${nameAnchorY.toFixed(1)}`}
            stroke="url(#rg)"
            strokeWidth={stage === S.PULLING ? "5" : "4"}
            strokeLinecap="round"
            fill="none"
            opacity="0.92"
          />

          {/* Tension sparkle at midpoint when pulling */}
          {stage === S.PULLING && (
            <circle
              cx={ropeCtrlX}
              cy={ropeCtrlY}
              r="4"
              fill="white"
              opacity="0.75"
              style={{ animation: 'ropeSpark 0.45s ease-in-out infinite alternate' }}
            />
          )}
        </svg>
      )}

      {/* ── CHARACTER ───────────────────────────────────── */}
      {cw > 0 && (
        <div
          className="absolute bottom-2 pointer-events-none"
          style={{
            left:      charPx - charW / 2,
            width:     charW,
            height:    charH,
            zIndex:    5,
          }}
        >
          {/* Body animations */}
          <div
            style={{
              width: '100%',
              height: '100%',
              animation:
                stage === S.RUNNING  ? 'characterBob 0.32s ease-in-out infinite alternate' :
                stage === S.PULLING  ? 'pullLean 0.75s ease-in-out infinite alternate' :
                stage === S.WAVING   ? 'idleFloat 2.4s ease-in-out infinite' :
                'none',
            }}
          >
            <CartoonBoy
              stage={charStage}
              style={{
                width:  '100%',
                height: '100%',
                display: 'block',
                filter: 'drop-shadow(0 8px 18px rgba(0,0,0,.65))',
                // Running: face right (no flip needed — character faces right by default)
                // Pulling: also faces right — pulling TO the right = faces left in scene?
                // Actually character is LEFT of name and pulls right — he faces RIGHT (toward name).
                // For running FROM left, he also runs toward the right, so no flip.
              }}
            />
          </div>

          {/* Foot stomp when pulling */}
          {stage === S.PULLING && (
            <div className="absolute -bottom-1 left-0 right-0 flex justify-around pointer-events-none">
              <div className="w-9 h-2 bg-orange-400/25 rounded-full blur-sm"
                style={{ animation: 'footStompL 0.5s ease-in-out infinite' }} />
              <div className="w-9 h-2 bg-orange-400/25 rounded-full blur-sm"
                style={{ animation: 'footStompR 0.5s ease-in-out infinite', animationDelay: '0.25s' }} />
            </div>
          )}

          {/* Dust puffs when running */}
          {stage === S.RUNNING && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
              {[0, 1, 2].map(i => (
                <div key={i} className="rounded-full bg-orange-300/15"
                  style={{
                    width: `${9 + i * 4}px`, height: `${9 + i * 4}px`,
                    animation: `dustPuff 0.55s ease-out infinite`,
                    animationDelay: `${i * 0.13}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── SPEECH BUBBLE ───────────────────────────────── */}
      {showBubble && cw > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left:      bubbleLeft,
            bottom:    charH + 10,
            zIndex:    10,
            animation: 'bubblePop 0.38s cubic-bezier(.34,1.56,.64,1) both',
          }}
        >
          <div
            className="relative px-4 py-2 rounded-2xl font-black"
            style={{
              background: 'white',
              border: '2.5px solid #F97316',
              boxShadow: '0 4px 22px rgba(249,115,22,.45), 0 2px 8px rgba(0,0,0,.3)',
              fontFamily: 'var(--font-heading, system-ui)',
              fontSize:   'clamp(.95rem, 2.2vw, 1.35rem)',
              color:      '#111827',
              whiteSpace: 'nowrap',
            }}
          >
            Hi! 👋
            {/* Tail */}
            <svg
              className="absolute -bottom-3 left-6"
              width="18" height="12" viewBox="0 0 18 12"
            >
              <path d="M0 0 L9 12 L18 0Z" fill="white" />
              <path d="M0 0 L9 12" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 0 L9 12" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* ── REPLAY BUTTON ───────────────────────────────── */}
      {stage === S.WAVING && (
        <div className="absolute bottom-0 right-2" style={{ zIndex: 10 }}>
          <button
            onClick={replay}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-500 hover:text-orange-400 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-orange-500/30 transition-colors"
            aria-label="Replay intro animation"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.33" />
            </svg>
            Replay
          </button>
        </div>
      )}
    </div>
  );
}
