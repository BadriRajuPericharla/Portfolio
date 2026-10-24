import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * HeroCharcoalPullScene
 *
 * Implements the complete Charcoal & Orange hero animation:
 * - Cartoon boy with black clothing & orange accents enters from LEFT
 * - Grabs rope attached to the front of "Pericharla Badri Raju"
 * - Pulls rope to the RIGHT, smoothly dragging the name from left into center
 * - Name settles with a satisfying elastic bounce + orange impact burst
 * - Character releases rope, turns forward, smiles, waves arm
 * - White speech bubble pops up saying "Hi!"
 * - Character remains beside the name in a friendly idle pose
 * - Full name remains on ONE continuous horizontal line in bold white with orange depth
 *
 * Uses a fully vector-scaled SVG stage (viewBox 0 0 1000 230) so coordinates are 100%
 * mathematically exact and responsive on mobile, tablet, and desktop without layout breaks.
 */

// Timing constants (ms)
const T_RUN_DUR = 1000;    // Run in from left
const T_GRAB_DUR = 450;    // Plant feet & grab rope
const T_PULL_DUR = 1400;   // Pull name into center
const T_BOUNCE_DUR = 500;  // Elastic settle
const T_WAVE_DUR = 400;    // Release and wave

export default function HeroCharcoalPullScene({ name = 'Pericharla Badri Raju' }) {
  // Animation stages: 0=idle, 1=running, 2=grab, 3=pulling, 4=settling, 5=waving (final)
  const [stage, setStage] = useState(0);

  // Animated values
  const [charX, setCharX] = useState(-100);
  const [nameX, setNameX] = useState(-650);
  const [bounceOffset, setBounceOffset] = useState(0);
  const [showRope, setShowRope] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [armAngle, setArmAngle] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  const animRef = useRef(null);
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const handleReplay = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    setStage(0);
    setCharX(-100);
    setNameX(-650);
    setBounceOffset(0);
    setShowRope(false);
    setShowBubble(false);
    setShowImpact(false);
    setReplayKey((k) => k + 1);
  }, []);

  useEffect(() => {
    // Accessibility reduced motion: jump straight to settled state
    if (prefersReduced.current) {
      setStage(5);
      setCharX(770);
      setNameX(110);
      setBounceOffset(0);
      setShowRope(false);
      setShowBubble(true);
      setShowImpact(false);
      return;
    }

    let cancelled = false;
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    // Linear/easing helpers
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const runTimeline = async () => {
      // 0. Initial brief pause
      await wait(250);
      if (cancelled) return;

      // 1. RUN IN from LEFT to x = 680
      setStage(1);
      const runStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - runStart) / T_RUN_DUR, 1);
          const ease = easeOutCubic(t);
          setCharX(-100 + (680 - -100) * ease);
          if (t < 1) animRef.current = requestAnimationFrame(tick);
          else res();
        };
        animRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // 2. GRAB THE ROPE
      setStage(2);
      setShowRope(true);
      await wait(T_GRAB_DUR);
      if (cancelled) return;

      // 3. PULL NAME TO THE RIGHT
      // Character steps forward from 680 to 770, pulling name from -650 to 110
      setStage(3);
      const pullStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - pullStart) / T_PULL_DUR, 1);
          const ease = easeInOutQuad(t);
          setCharX(680 + (770 - 680) * ease);
          setNameX(-650 + (110 - -650) * ease);
          if (t < 1) animRef.current = requestAnimationFrame(tick);
          else res();
        };
        animRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // 4. SETTLE & IMPACT BOUNCE
      setStage(4);
      setShowImpact(true);
      const bounceStart = performance.now();
      await new Promise((res) => {
        const tick = (now) => {
          if (cancelled) return res();
          const t = Math.min((now - bounceStart) / T_BOUNCE_DUR, 1);
          // Decaying oscillation bounce
          const decay = Math.sin(t * Math.PI * 2.5) * 12 * (1 - t);
          setBounceOffset(decay);
          if (t < 1) animRef.current = requestAnimationFrame(tick);
          else {
            setBounceOffset(0);
            res();
          }
        };
        animRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      // 5. RELEASE ROPE & WAVE (SAY HI)
      setShowRope(false);
      setShowImpact(false);
      setStage(5);
      await wait(150);
      if (cancelled) return;
      setShowBubble(true);
    };

    runTimeline();

    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [replayKey]);

  // Derived positions for rope attachment
  const plaqueWidth = 590;
  const plaqueHeight = 70;
  const currentNameRight = nameX + bounceOffset + plaqueWidth;
  const currentNameHitchY = 115;
  const charHandX = charX + 12;
  const charHandY = 125;

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center select-none py-1 overflow-visible">
      {/* Replay Intro Button (discreet top-right) */}
      {stage === 5 && (
        <button
          onClick={handleReplay}
          className="absolute -top-6 right-2 sm:right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#A3A3A3] hover:text-[#FF7A18] bg-[#1C1C1C] hover:bg-[#262626] border border-white/10 hover:border-[#FF7A18]/40 transition-all shadow-sm z-30"
          title="Replay intro animation"
          aria-label="Replay intro animation"
        >
          <RotateCcw className="w-3 h-3 text-[#FF7A18]" />
          <span className="hidden sm:inline">Replay Intro</span>
        </button>
      )}

      {/* SVG Canvas Stage */}
      <div className="relative w-full overflow-visible flex items-center justify-center">
        <svg
          viewBox="0 0 1000 230"
          className="w-full h-auto max-h-[250px] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Charcoal & Orange Gradients */}
            <linearGradient id="charcoalCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="100%" stopColor="#181818" />
            </linearGradient>

            <linearGradient id="orangeRopeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A18" />
              <stop offset="50%" stopColor="#FFC857" />
              <stop offset="100%" stopColor="#FF7A18" />
            </linearGradient>

            <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#FFF2E8" />
            </linearGradient>

            <linearGradient id="orangeAura" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A18" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFC857" stopOpacity="0.1" />
            </linearGradient>

            {/* Depth filter for typography */}
            <filter id="orangeDepth" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#FF7A18" floodOpacity="0.35" />
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.9" />
            </filter>

            {/* Soft ground line gradient */}
            <linearGradient id="groundLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#FF7A18" stopOpacity="0.3" />
              <stop offset="75%" stopColor="#FFC857" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Ground shadow guide line */}
          <line x1="80" y1="210" x2="920" y2="210" stroke="url(#groundLineGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* 1. THE INCOMING NAME PLAQUE (ONE CONTINUOUS HORIZONTAL LINE) */}
          <g transform={`translate(${nameX + bounceOffset}, 80)`}>
            {/* Plaque Background Container */}
            <rect
              x="0"
              y="0"
              width={plaqueWidth}
              height={plaqueHeight}
              rx="18"
              fill="url(#charcoalCardGrad)"
              stroke="#FF7A18"
              strokeWidth="2"
              strokeOpacity="0.5"
              filter="drop-shadow(0 8px 24px rgba(0,0,0,0.65))"
            />

            {/* Subtle inner top glow */}
            <rect
              x="4"
              y="4"
              width={plaqueWidth - 8}
              height={plaqueHeight - 8}
              rx="14"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.04"
            />

            {/* HUD Corner Accents (Subtle Gaming Visuals) */}
            <path d="M 10 18 L 10 10 L 18 10" stroke="#FF7A18" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 580 18 L 580 10 L 572 10" stroke="#FFC857" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 10 52 L 10 60 L 18 60" stroke="#FF7A18" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 580 52 L 580 60 L 572 60" stroke="#FFC857" strokeWidth="2.5" strokeLinecap="round" />

            {/* Front Hitch Ring (Right edge where rope is attached) */}
            {showRope && (
              <g transform={`translate(${plaqueWidth - 2}, 35)`}>
                <circle cx="0" cy="0" r="8" fill="#FFC857" stroke="#FF7A18" strokeWidth="3" />
                <circle cx="0" cy="0" r="3" fill="#1C1C1C" />
              </g>
            )}

            {/* EXACT NAME: Pericharla Badri Raju in ONE continuous horizontal line */}
            <text
              x={plaqueWidth / 2}
              y={38}
              fill="url(#textGrad)"
              fontFamily="var(--font-heading, 'Space Grotesk', system-ui, sans-serif)"
              fontWeight="900"
              fontSize="34"
              letterSpacing="-0.01em"
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#orangeDepth)"
            >
              Pericharla Badri Raju
            </text>

            {/* Subtle Sub-caption inside plaque */}
            <text
              x={plaqueWidth / 2}
              y={56}
              fill="#A3A3A3"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              fontSize="10"
              letterSpacing="0.22em"
              textAnchor="middle"
            >
              UNITY DEVELOPER • GAMEPLAY PROGRAMMER
            </text>
          </g>

          {/* 2. THE TAUT ORANGE ROPE */}
          {showRope && (
            <g>
              {/* Main rope line */}
              <path
                d={`M ${currentNameRight} ${currentNameHitchY} Q ${(currentNameRight + charHandX) / 2} ${
                  stage === 3 ? 122 : 132
                } ${charHandX} ${charHandY}`}
                stroke="url(#orangeRopeGrad)"
                strokeWidth={stage === 3 ? '5' : '4'}
                strokeLinecap="round"
                fill="none"
              />
              {/* Animated tension spark */}
              {stage === 3 && (
                <circle
                  cx={(currentNameRight + charHandX) / 2}
                  cy="124"
                  r="3.5"
                  fill="#FFF"
                  className="animate-ping"
                />
              )}
            </g>
          )}

          {/* 3. IMPACT PARTICLES (Triggered when name lands) */}
          {showImpact && (
            <g transform="translate(400, 155)">
              <circle cx="-50" cy="0" r="6" fill="#FF7A18" opacity="0.8" />
              <circle cx="0" cy="-8" r="8" fill="#FFC857" opacity="0.9" />
              <circle cx="60" cy="2" r="5" fill="#FF7A18" opacity="0.8" />
              <circle cx="-120" cy="4" r="4" fill="#FFA043" opacity="0.7" />
              <circle cx="130" cy="-2" r="4.5" fill="#FFA043" opacity="0.7" />
            </g>
          )}

          {/* 4. THE CARTOON BOY CHARACTER */}
          <g transform={`translate(${charX}, 35)`}>
            {/* Ground shadow beneath character */}
            <ellipse cx="40" cy="175" rx="26" ry="6" fill="rgba(0,0,0,0.4)" />

            {/* Subtle motion trails when running */}
            {stage === 1 && (
              <g stroke="#FF7A18" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
                <line x1="-25" y1="95" x2="-8" y2="95" />
                <line x1="-30" y1="110" x2="-10" y2="110" strokeWidth="2" />
                <line x1="-22" y1="125" x2="-6" y2="125" strokeWidth="1.5" />
              </g>
            )}

            {/* Feet dust puffs when pulling */}
            {stage === 3 && (
              <g fill="#FF7A18" opacity="0.6">
                <circle cx="20" cy="172" r="4" />
                <circle cx="28" cy="168" r="3" />
                <circle cx="65" cy="172" r="4.5" />
              </g>
            )}

            {/* CHARACTER BODY PARTS */}

            {/* Legs (Dark trousers #1E1E1E with subtle seam) */}
            {stage === 3 ? (
              // Strained pulling legs (bent knees, heels dug in)
              <g>
                {/* Back leg */}
                <rect x="18" y="125" width="16" height="42" rx="8" fill="#1C1C1C" transform="rotate(22 26 125)" />
                {/* Sneaker with orange sole */}
                <ellipse cx="14" cy="168" rx="13" ry="6" fill="#111111" />
                <rect x="4" y="167" width="22" height="4" rx="2" fill="#FF7A18" />

                {/* Front leg */}
                <rect x="45" y="122" width="16" height="44" rx="8" fill="#1C1C1C" transform="rotate(-18 53 122)" />
                {/* Sneaker with orange sole */}
                <ellipse cx="66" cy="166" rx="14" ry="6" fill="#111111" />
                <rect x="54" y="165" width="24" height="4" rx="2" fill="#FF7A18" />
              </g>
            ) : stage === 1 ? (
              // Running legs
              <g>
                <rect x="24" y="125" width="15" height="40" rx="7" fill="#1C1C1C" transform="rotate(-26 31 125)" />
                <ellipse cx="16" cy="164" rx="13" ry="6" fill="#111111" />
                <rect x="6" y="163" width="20" height="4" rx="2" fill="#FF7A18" />

                <rect x="44" y="125" width="15" height="40" rx="7" fill="#1C1C1C" transform="rotate(24 51 125)" />
                <ellipse cx="58" cy="164" rx="13" ry="6" fill="#111111" />
                <rect x="48" y="163" width="20" height="4" rx="2" fill="#FF7A18" />
              </g>
            ) : (
              // Relaxed standing legs
              <g>
                <rect x="26" y="125" width="14" height="42" rx="7" fill="#1C1C1C" />
                <ellipse cx="32" cy="168" rx="12" ry="6" fill="#111111" />
                <rect x="22" y="167" width="20" height="4" rx="2" fill="#FF7A18" />

                <rect x="44" y="125" width="14" height="42" rx="7" fill="#1C1C1C" />
                <ellipse cx="50" cy="168" rx="12" ry="6" fill="#111111" />
                <rect x="40" y="167" width="20" height="4" rx="2" fill="#FF7A18" />
              </g>
            )}

            {/* Torso: Black Hoodie with Radiant Orange Accents */}
            <g>
              {/* Hoodie Main Body (#111111) */}
              <rect x="18" y="78" width="48" height="52" rx="12" fill="#111111" stroke="#262626" strokeWidth="1.5" />
              {/* Orange Center Zipper Accent (#FF7A18) */}
              <rect x="40" y="78" width="4" height="52" rx="2" fill="#FF7A18" />
              {/* Orange Drawstring / Collar Accent (#FFC857) */}
              <circle cx="36" cy="85" r="2.5" fill="#FFC857" />
              <circle cx="48" cy="85" r="2.5" fill="#FFC857" />
              {/* Kangaroo Pocket */}
              <rect x="25" y="105" width="34" height="18" rx="6" fill="#1A1A1A" />
            </g>

            {/* Left Arm (Holding rope or at side) */}
            {stage === 3 || stage === 2 ? (
              // Straining pulling arm (stretched back toward rope)
              <g>
                <path d="M 22 86 L 8 98 L 12 110" stroke="#111111" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                {/* Hand gripping the rope */}
                <circle cx="12" cy="110" r="7" fill="#FBBF24" />
                <rect x="8" y="106" width="4" height="4" rx="1" fill="#FF7A18" />
              </g>
            ) : (
              // Relaxed arm
              <g>
                <rect x="12" y="82" width="12" height="34" rx="6" fill="#111111" />
                <circle cx="18" cy="118" r="6" fill="#FBBF24" />
              </g>
            )}

            {/* Right Arm (Holding rope OR Waving Hello!) */}
            {stage === 5 ? (
              // Cheerful waving arm! 👋
              <g>
                <path d="M 60 84 Q 74 65 70 48" stroke="#111111" strokeWidth="12" strokeLinecap="round" />
                {/* Waving hand */}
                <circle cx="70" cy="46" r="7" fill="#FBBF24" />
                {/* Waving fingers */}
                <rect x="64" y="36" width="3" height="8" rx="1.5" fill="#FDE68A" />
                <rect x="69" y="34" width="3" height="9" rx="1.5" fill="#FDE68A" />
                <rect x="74" y="36" width="3" height="8" rx="1.5" fill="#FDE68A" />
              </g>
            ) : stage === 3 || stage === 2 ? (
              // Both arms pulling
              <g>
                <path d="M 54 86 L 24 102" stroke="#111111" strokeWidth="12" strokeLinecap="round" />
                <circle cx="20" cy="104" r="7" fill="#FBBF24" />
              </g>
            ) : (
              // Running / normal arm
              <g>
                <rect x="60" y="82" width="12" height="34" rx="6" fill="#111111" />
                <circle cx="66" cy="118" r="6" fill="#FBBF24" />
              </g>
            )}

            {/* Head & Neck */}
            <rect x="36" y="68" width="12" height="12" rx="4" fill="#FBBF24" />
            <circle cx="42" cy="52" r="24" fill="#FBBF24" />

            {/* Ears */}
            <circle cx="18" cy="54" r="5" fill="#F59E0B" />
            <circle cx="66" cy="54" r="5" fill="#F59E0B" />

            {/* Messy Dark Hair with subtle highlight */}
            <g>
              <ellipse cx="42" cy="34" rx="24" ry="16" fill="#14141E" />
              {/* Hair tufts / spikes */}
              <polygon points="20,38 14,24 28,30" fill="#14141E" />
              <polygon points="32,24 38,12 44,22" fill="#14141E" />
              <polygon points="46,22 54,12 58,26" fill="#14141E" />
              <polygon points="58,28 68,22 62,38" fill="#14141E" />
              {/* Subtle hair sheen */}
              <ellipse cx="36" cy="28" rx="6" ry="3" fill="#2E2E42" transform="rotate(-15 36 28)" />
            </g>

            {/* Face Features: Eyes & Expression */}
            {stage === 3 ? (
              // Strained effort expression (>_<)
              <g stroke="#111111" strokeWidth="3" strokeLinecap="round">
                <path d="M 30 48 L 36 52 L 30 56" />
                <path d="M 54 48 L 48 52 L 54 56" />
                {/* Effort brows */}
                <line x1="28" y1="44" x2="38" y2="47" strokeWidth="2.5" />
                <line x1="56" y1="44" x2="46" y2="47" strokeWidth="2.5" />
                {/* Gritted smile */}
                <path d="M 34 62 Q 42 66 50 62" fill="none" strokeWidth="2.5" />
                <rect x="38" y="60" width="8" height="3" fill="#FFF" />
              </g>
            ) : stage === 5 ? (
              // Happy smiling face with rosy cheeks (^o^)
              <g>
                {/* Happy curved eyes */}
                <path d="M 28 50 Q 34 44 40 50" stroke="#111111" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 46 50 Q 52 44 58 50" stroke="#111111" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Cheerful blush cheeks */}
                <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#FF7A18" opacity="0.6" />
                <ellipse cx="58" cy="56" rx="4" ry="2.5" fill="#FF7A18" opacity="0.6" />
                {/* Big happy smile */}
                <path d="M 32 58 Q 42 70 52 58 Z" fill="#DC2626" stroke="#111111" strokeWidth="2" />
                <path d="M 36 60 Q 42 66 48 60" fill="#FFF" />
              </g>
            ) : (
              // Normal friendly running eyes
              <g>
                <circle cx="34" cy="50" r="4.5" fill="#111111" />
                <circle cx="36" cy="48" r="1.5" fill="#FFF" />
                <circle cx="50" cy="50" r="4.5" fill="#111111" />
                <circle cx="52" cy="48" r="1.5" fill="#FFF" />
                {/* Cute smile */}
                <path d="M 36 60 Q 42 66 48 60" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Sweat drops when pulling hard */}
            {stage === 3 && (
              <g fill="#38BDF8">
                <circle cx="68" cy="38" r="3" />
                <circle cx="72" cy="46" r="2.5" />
              </g>
            )}

            {/* 5. WHITE SPEECH BUBBLE ("Hi!") */}
            {showBubble && (
              <g transform="translate(62, -26)">
                {/* Speech Bubble Body */}
                <rect
                  x="0"
                  y="0"
                  width="54"
                  height="34"
                  rx="12"
                  fill="#FFFFFF"
                  stroke="#FF7A18"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 4px 12px rgba(255,122,24,0.35))"
                />
                {/* Tail pointing toward character */}
                <polygon points="10,32 4,44 18,32" fill="#FFFFFF" />
                <path d="M 10 32 L 4 44 L 18 32" stroke="#FF7A18" strokeWidth="2.5" fill="#FFFFFF" strokeLinejoin="round" />
                {/* Text: Hi! */}
                <text
                  x="27"
                  y="19"
                  fill="#111111"
                  fontFamily="var(--font-heading, system-ui, sans-serif)"
                  fontWeight="900"
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  Hi! 👋
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Screen-reader H1 tag for SEO and accessibility */}
      <h1 className="sr-only">{name}</h1>
    </div>
  );
}
