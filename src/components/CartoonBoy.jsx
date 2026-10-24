import React from 'react';

/**
 * CartoonBoy – self-contained SVG character, 120×220 viewBox.
 *
 * stage: 'running' | 'grabbing' | 'pulling' | 'waving'
 *
 * The character always faces RIGHT (toward the name).
 * The caller can scaleX(-1) the wrapper when running leftward.
 */
export default function CartoonBoy({ stage = 'waving', style = {}, className = '' }) {
  const isPulling  = stage === 'pulling'  || stage === 'grabbing';
  const isWaving   = stage === 'waving';
  const isRunning  = stage === 'running';

  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      {/* ── GROUND SHADOW ──────────────────── */}
      <ellipse cx="60" cy="215" rx="30" ry="5" fill="rgba(0,0,0,0.28)" />

      {/* ── LEGS ───────────────────────────── */}
      {/* Left leg */}
      <rect
        x="38" y="150" width="18" height="52" rx="9"
        fill="#1E293B"
        style={{
          transformOrigin: '47px 150px',
          transform: isPulling ? 'rotate(18deg)' : isRunning ? 'rotate(-25deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
        }}
      />
      {/* Left sneaker */}
      <ellipse cx="45" cy="204" rx="16" ry="7"
        fill="#334155"
        style={{
          transformOrigin: '47px 150px',
          transform: isPulling ? 'rotate(18deg)' : isRunning ? 'rotate(-25deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
        }}
      />
      <ellipse cx="48" cy="202" rx="9" ry="4" fill="#F97316" style={{
        transformOrigin: '47px 150px',
        transform: isPulling ? 'rotate(18deg)' : isRunning ? 'rotate(-25deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s ease',
      }} />

      {/* Right leg */}
      <rect
        x="64" y="150" width="18" height="52" rx="9"
        fill="#1E293B"
        style={{
          transformOrigin: '73px 150px',
          transform: isPulling ? 'rotate(-16deg)' : isRunning ? 'rotate(22deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
        }}
      />
      {/* Right sneaker */}
      <ellipse cx="75" cy="204" rx="16" ry="7"
        fill="#334155"
        style={{
          transformOrigin: '73px 150px',
          transform: isPulling ? 'rotate(-16deg)' : isRunning ? 'rotate(22deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
        }}
      />
      <ellipse cx="78" cy="202" rx="9" ry="4" fill="#F97316" style={{
        transformOrigin: '73px 150px',
        transform: isPulling ? 'rotate(-16deg)' : isRunning ? 'rotate(22deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s ease',
      }} />

      {/* ── HOODIE BODY ────────────────────── */}
      <rect x="28" y="95" width="64" height="65" rx="14" fill="#111827" />
      {/* Orange zip stripe */}
      <rect x="57" y="95" width="6" height="65" rx="3" fill="#F97316" opacity="0.75" />
      {/* Kangaroo pocket */}
      <rect x="38" y="132" width="44" height="22" rx="8" fill="#0F172A" opacity="0.8" />

      {/* ── LEFT ARM (toward name / rope side) ─ */}
      <g style={{
        transformOrigin: '30px 105px',
        transform: isPulling
          ? 'rotate(-50deg)'
          : isRunning
          ? 'rotate(35deg)'
          : 'rotate(-5deg)',
        transition: 'transform 0.4s ease',
      }}>
        <rect x="16" y="100" width="16" height="40" rx="8" fill="#111827" />
        {/* Left fist */}
        <ellipse cx="24" cy="143" rx="10" ry="9" fill="#FBBF24" />
        {/* Grip highlight */}
        {isPulling && <ellipse cx="24" cy="140" rx="6" ry="4" fill="#F59E0B" opacity="0.7" />}
      </g>

      {/* ── RIGHT ARM (waving side) ──────────── */}
      <g style={{
        transformOrigin: '90px 105px',
        transform: isWaving
          ? 'rotate(-120deg)'
          : isPulling
          ? 'rotate(-45deg)'
          : isRunning
          ? 'rotate(-30deg)'
          : 'rotate(-5deg)',
        transition: 'transform 0.4s ease',
      }}>
        <rect x="90" y="100" width="16" height="40" rx="8" fill="#111827" />
        {/* Right hand */}
        <ellipse cx="98" cy="143" rx="10" ry="9" fill="#FBBF24" />
        {/* Wave fingers */}
        {isWaving && <>
          <rect x="91" y="131" width="5" height="11" rx="2.5" fill="#FDE68A"
            style={{ animation: 'waveFingers 0.55s ease-in-out infinite alternate' }} />
          <rect x="98" y="128" width="5" height="14" rx="2.5" fill="#FDE68A"
            style={{ animation: 'waveFingers 0.55s ease-in-out infinite alternate', animationDelay: '0.1s' }} />
          <rect x="105" y="131" width="5" height="11" rx="2.5" fill="#FDE68A"
            style={{ animation: 'waveFingers 0.55s ease-in-out infinite alternate', animationDelay: '0.2s' }} />
        </>}
        {/* Gripping fist detail */}
        {isPulling && <ellipse cx="98" cy="140" rx="6" ry="4" fill="#F59E0B" opacity="0.7" />}
      </g>

      {/* ── NECK ────────────────────────────── */}
      <rect x="54" y="84" width="12" height="14" rx="5" fill="#FBBF24" />

      {/* ── HEAD ────────────────────────────── */}
      <ellipse cx="60" cy="64" rx="30" ry="32" fill="#FBBF24" />

      {/* ── EARS ────────────────────────────── */}
      <ellipse cx="30" cy="66" rx="7" ry="9" fill="#F59E0B" />
      <ellipse cx="30" cy="66" rx="4.5" ry="6" fill="#FCD34D" />
      <ellipse cx="90" cy="66" rx="7" ry="9" fill="#F59E0B" />
      <ellipse cx="90" cy="66" rx="4.5" ry="6" fill="#FCD34D" />

      {/* ── MESSY DARK HAIR ─────────────────── */}
      <ellipse cx="60" cy="38" rx="30" ry="20" fill="#1C1C2E" />
      <ellipse cx="35" cy="46" rx="10" ry="16" fill="#1C1C2E" transform="rotate(-18 35 46)" />
      <ellipse cx="85" cy="46" rx="10" ry="16" fill="#1C1C2E" transform="rotate(18 85 46)" />
      <ellipse cx="48" cy="28" rx="8" ry="16" fill="#1C1C2E" transform="rotate(-8 48 28)" />
      <ellipse cx="72" cy="30" rx="8" ry="14" fill="#1C1C2E" transform="rotate(10 72 30)" />
      <ellipse cx="60" cy="24" rx="9" ry="16" fill="#1C1C2E" />
      {/* Hair shine */}
      <ellipse cx="49" cy="37" rx="5" ry="8" fill="#2D2D45" opacity="0.7" transform="rotate(-12 49 37)" />

      {/* ── EYES ────────────────────────────── */}
      {isPulling ? (
        /* Determined strain eyes */
        <>
          <ellipse cx="48" cy="63" rx="8" ry="6" fill="white" />
          <circle cx="49" cy="63" r="4" fill="#111827" />
          <circle cx="50" cy="61.5" r="1.5" fill="white" />
          <path d="M41 55 Q48 51 55 54" stroke="#111827" strokeWidth="3" strokeLinecap="round" fill="none" />

          <ellipse cx="72" cy="63" rx="8" ry="6" fill="white" />
          <circle cx="71" cy="63" r="4" fill="#111827" />
          <circle cx="72" cy="61.5" r="1.5" fill="white" />
          <path d="M65 54 Q72 51 79 55" stroke="#111827" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : isWaving ? (
        /* Happy squint — U-shaped eyes */
        <>
          <path d="M40 65 Q48 58 56 65" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M41 55 Q48 50 55 54" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M64 65 Q72 58 80 65" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M65 54 Q72 50 79 54" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Blush cheeks */}
          <ellipse cx="40" cy="73" rx="7" ry="4" fill="#FB7185" opacity="0.4" />
          <ellipse cx="80" cy="73" rx="7" ry="4" fill="#FB7185" opacity="0.4" />
        </>
      ) : (
        /* Normal wide eyes while running */
        <>
          <ellipse cx="48" cy="63" rx="8" ry="8" fill="white" />
          <circle cx="49" cy="63" r="5" fill="#111827" />
          <circle cx="50.5" cy="61" r="1.8" fill="white" />
          <path d="M41 55 Q48 51 55 54" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          <ellipse cx="72" cy="63" rx="8" ry="8" fill="white" />
          <circle cx="71" cy="63" r="5" fill="#111827" />
          <circle cx="72.5" cy="61" r="1.8" fill="white" />
          <path d="M65 54 Q72 51 79 54" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* ── NOSE ────────────────────────────── */}
      <ellipse cx="60" cy="74" rx="3.5" ry="2" fill="#F59E0B" />

      {/* ── MOUTH ───────────────────────────── */}
      {isPulling ? (
        /* Gritting teeth / effort */
        <>
          <path d="M50 82 Q60 88 70 82" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <rect x="52" y="81" width="6" height="4" rx="1" fill="white" />
          <rect x="62" y="81" width="6" height="4" rx="1" fill="white" />
        </>
      ) : (
        /* Big happy smile */
        <>
          <path d="M48 79 Q60 92 72 79" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 81 Q60 93 70 81 Q60 100 50 81Z" fill="#DC2626" opacity="0.88" />
          <path d="M53 84 Q60 91 67 84" fill="white" />
        </>
      )}

      {/* ── SWEAT DROPS when pulling ─────────── */}
      {isPulling && <>
        <ellipse cx="94" cy="46" rx="3.5" ry="5" fill="#38BDF8" opacity="0.85"
          style={{ animation: 'sweatDrop 1.1s ease-in infinite' }} />
        <ellipse cx="102" cy="55" rx="2.5" ry="4" fill="#38BDF8" opacity="0.6"
          style={{ animation: 'sweatDrop 1.1s ease-in infinite', animationDelay: '0.45s' }} />
      </>}

      {/* ── SPEED LINES when running (left side of char) ── */}
      {isRunning && <>
        <line x1="2" y1="78" x2="18" y2="78" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"
          style={{ animation: 'motionLine 0.45s linear infinite' }} />
        <line x1="5" y1="90" x2="16" y2="90" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"
          style={{ animation: 'motionLine 0.45s linear infinite', animationDelay: '0.12s' }} />
        <line x1="4" y1="102" x2="15" y2="102" stroke="#F97316" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"
          style={{ animation: 'motionLine 0.45s linear infinite', animationDelay: '0.24s' }} />
      </>}
    </svg>
  );
}
