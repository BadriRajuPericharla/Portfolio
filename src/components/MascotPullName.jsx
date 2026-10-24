import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RotateCcw, Sparkles } from 'lucide-react';

/**
 * MascotPullName:
 * A funny, charming game-dev mascot ("Pixel") pulls Badri Raju's name onto the screen with a rope,
 * snaps it into the center, jumps in an arc to land and sit right on top of the name, and pops up a speech bubble saying "Hi! 👋".
 * 
 * Interactive: Clicking or hovering on the mascot triggers fun jumps and dialogues!
 */
export default function MascotPullName() {
  const { profile, themeSettings } = usePortfolio();
  const fullName = profile.name || 'Pericharla Badri Raju';

  // Animation states: 'pulling' -> 'jumping' -> 'sitting'
  const [animStage, setAnimStage] = useState('pulling');
  const [speechIndex, setSpeechIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [mascotBounce, setMascotBounce] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const funMessages = [
    "Hi! 👋 Welcome to Badri's Portfolio!",
    "(Puff!) That name was heavy! 😅",
    "Badri built 4+ Unity games on itch.io! 🎮",
    "C# Systems & Gameplay Programmer! ⚔️",
    "Click me to watch me jump! 🚀"
  ];

  // Sequence controller
  useEffect(() => {
    setAnimStage('pulling');
    setShowSpeech(false);

    // Phase 1: Pulling for 2.2 seconds
    const jumpTimer = setTimeout(() => {
      setAnimStage('jumping');
    }, 2200);

    // Phase 2: Lands and sits at 2.9 seconds
    const sitTimer = setTimeout(() => {
      setAnimStage('sitting');
      setShowSpeech(true);
    }, 2900);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(sitTimer);
    };
  }, [runKey]);

  // Mascot click interaction
  const handleMascotClick = () => {
    setMascotBounce(true);
    setSpeechIndex((prev) => (prev + 1) % funMessages.length);
    setShowSpeech(true);
    setTimeout(() => setMascotBounce(false), 600);
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    setRunKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none py-6 overflow-visible">
      
      {/* Replay Pill Button (Top Right Subtle) */}
      <button
        onClick={handleReplay}
        className="absolute -top-3 right-2 sm:right-6 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shadow-sm"
        title="Replay pulling animation"
        aria-label="Replay animation"
      >
        <RotateCcw className="w-3 h-3 text-indigo-400" />
        <span className="hidden sm:inline">Replay Intro</span>
      </button>

      {/* STAGE CONTAINER */}
      <div className="relative w-full min-h-[170px] sm:min-h-[190px] flex items-center justify-center overflow-visible">

        {/* 1. THE NAME BLOCK BEING PULLED */}
        <div
          className={`relative z-10 transition-all duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            animStage === 'pulling'
              ? 'translate-x-28 sm:translate-x-44 opacity-95 scale-[0.98]'
              : 'translate-x-0 opacity-100 scale-100'
          }`}
        >
          {/* Subtle tech border container with glowing gamer aura */}
          <div className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-3xl bg-gradient-to-b from-[#111628]/80 to-[#0A0D18]/90 border border-indigo-500/30 backdrop-blur-md shadow-[0_0_35px_rgba(99,102,241,0.18)]">
            
            {/* Corner Decorative Game HUD Brackets */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-indigo-400/80 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400/80 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-pink-400/80 rounded-br-sm pointer-events-none" />

            {/* Left Hitch Ring (where the rope is tied) */}
            <div
              className={`absolute -left-3 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                animStage === 'pulling' ? 'opacity-100' : 'opacity-0 scale-50'
              }`}
            >
              <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-500/30 shadow-md shadow-amber-500/40" />
            </div>

            {/* First Name Prefix */}
            <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-indigo-400 font-bold text-center mb-0.5 sm:mb-1">
              PERICHARLA
            </div>

            {/* Main Stage Name: BADRI RAJU */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-display text-center leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200 drop-shadow-[0_4px_16px_rgba(99,102,241,0.35)]">
                BADRI RAJU
              </span>
            </h1>

            {/* Subtle Sub-Badge in Name Plaque */}
            <div className="mt-1 sm:mt-1.5 flex items-center justify-center gap-2">
              <span className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Unity Developer &amp; Gameplay Programmer
              </span>
              <span className="h-px w-6 sm:w-12 bg-gradient-to-l from-transparent to-purple-500/60" />
            </div>
          </div>
        </div>

        {/* 2. THE TAUT ROPE (Visible during pulling phase) */}
        {animStage === 'pulling' && (
          <div className="absolute z-20 pointer-events-none left-1/2 -translate-x-[170px] sm:-translate-x-[240px] top-1/2 -translate-y-1/2 w-32 sm:w-44 h-8 flex items-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 160 30">
              {/* Animated tension rope with energetic pulses */}
              <defs>
                <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
              <path
                d="M 5 15 Q 80 18 155 15"
                stroke="url(#ropeGrad)"
                strokeWidth="4"
                strokeDasharray="6,3"
                fill="none"
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Little energy spark on the rope */}
              <circle cx="80" cy="17" r="3" fill="#FFFFFF" className="animate-ping" />
            </svg>
          </div>
        )}

        {/* 3. THE CUTE GAME-DEV MASCOT ("PIXEL") */}
        <div
          onClick={handleMascotClick}
          className={`absolute z-30 cursor-pointer group transition-all duration-700 ease-out ${
            animStage === 'pulling'
              ? 'left-1/2 -translate-x-[220px] sm:-translate-x-[310px] top-1/2 -translate-y-1/2'
              : animStage === 'jumping'
              ? 'left-1/2 -translate-x-1/2 -top-12 scale-110 -rotate-12'
              : 'left-1/2 -translate-x-1/2 -top-10 sm:-top-12'
          }`}
          style={{
            transform:
              animStage === 'jumping'
                ? 'translate(-50%, -90px) scale(1.15) rotate(12deg)'
                : animStage === 'sitting'
                ? `translate(-50%, -46px) ${mascotBounce ? 'scale(1.25) translateY(-14px)' : 'scale(1)'}`
                : undefined
          }}
        >
          {/* SPEECH BUBBLE ("HI! 👋") */}
          {showSpeech && (
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap animate-in fade-in zoom-in-75 duration-200">
              <div className="relative px-3.5 py-1.5 rounded-2xl bg-white text-zinc-900 shadow-xl shadow-indigo-500/25 border-2 border-indigo-400 flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold font-display">
                  {funMessages[speechIndex]}
                </span>
                {/* Speech Bubble Arrow Pointer */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
              </div>
            </div>
          )}

          {/* MASCOT SVG AVATAR (Lively Unity-bot / Creature) */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
            
            {/* Effort Sweat Drops / Steam (only when pulling) */}
            {animStage === 'pulling' && (
              <div className="absolute -top-3 -right-2 text-cyan-300 animate-bounce text-xs font-bold font-mono">
                💦
              </div>
            )}

            {/* Mascot Vector Drawing */}
            <svg
              className={`w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-200 ${
                animStage === 'pulling'
                  ? 'scale-x-[-1] rotate-12 animate-pulse'
                  : animStage === 'sitting'
                  ? 'hover:scale-110'
                  : ''
              }`}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Antenna / Game Controller Signal */}
              <line x1="50" y1="20" x2="50" y2="8" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="8" r="5" fill="#38BDF8" className="animate-ping" />
              <circle cx="50" cy="8" r="4" fill="#FFFFFF" />

              {/* Head / Body Cube (Unity Companion) */}
              <rect
                x="18"
                y="20"
                width="64"
                height="56"
                rx="18"
                fill="url(#botBodyGrad)"
                stroke="#818CF8"
                strokeWidth="3.5"
              />

              {/* Visor / Face Screen */}
              <rect
                x="26"
                y="30"
                width="48"
                height="28"
                rx="10"
                fill="#0A0E1A"
                stroke="#06B6D4"
                strokeWidth="2"
              />

              {/* Eyes Expression */}
              {animStage === 'pulling' ? (
                // Effort / Strain eyes (>_<)
                <g stroke="#38BDF8" strokeWidth="3" strokeLinecap="round">
                  <path d="M 32 40 L 40 45 L 32 50" />
                  <path d="M 68 40 L 60 45 L 68 50" />
                </g>
              ) : animStage === 'jumping' ? (
                // Excited open eyes (O_O)
                <g fill="#38BDF8">
                  <circle cx="38" cy="44" r="5" />
                  <circle cx="62" cy="44" r="5" />
                  <ellipse cx="50" cy="50" rx="4" ry="2" fill="#EC4899" />
                </g>
              ) : (
                // Happy blinking / smiling eyes (^o^)
                <g>
                  <circle cx="38" cy="43" r="4.5" fill="#38BDF8" />
                  <circle cx="62" cy="43" r="4.5" fill="#38BDF8" />
                  <circle cx="39.5" cy="41.5" r="1.5" fill="#FFFFFF" />
                  <circle cx="63.5" cy="41.5" r="1.5" fill="#FFFFFF" />
                  {/* Cute blush cheeks */}
                  <circle cx="32" cy="50" r="3" fill="#F43F5E" opacity="0.6" />
                  <circle cx="68" cy="50" r="3" fill="#F43F5E" opacity="0.6" />
                  {/* Happy Smile curve */}
                  <path
                    d="M 44 49 Q 50 54 56 49"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              )}

              {/* Hands & Arms */}
              {animStage === 'pulling' ? (
                // Pulling hands stretched forward
                <g stroke="#818CF8" strokeWidth="5" strokeLinecap="round">
                  <path d="M 22 55 L 8 50" />
                  <path d="M 22 62 L 10 58" />
                  <circle cx="7" cy="50" r="4" fill="#F59E0B" />
                </g>
              ) : (
                // Cheerful waving hand
                <g stroke="#818CF8" strokeWidth="4" strokeLinecap="round">
                  {/* Left hand relaxed */}
                  <path d="M 20 54 L 14 62" />
                  {/* Right hand waving hello! 👋 */}
                  <path d="M 80 50 Q 88 38 84 30" stroke="#38BDF8" />
                  <circle cx="84" cy="28" r="4" fill="#38BDF8" />
                </g>
              )}

              {/* Feet (Swinging when sitting!) */}
              {animStage === 'sitting' ? (
                <g className="animate-bounce" style={{ animationDuration: '1.4s' }}>
                  <rect x="32" y="76" width="10" height="12" rx="5" fill="#6366F1" />
                  <rect x="58" y="76" width="10" height="12" rx="5" fill="#6366F1" />
                </g>
              ) : (
                <g>
                  <rect x="32" y="76" width="10" height="8" rx="4" fill="#6366F1" />
                  <rect x="58" y="76" width="10" height="8" rx="4" fill="#6366F1" />
                </g>
              )}

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="botBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="60%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Little tap-me hint for visitors */}
            {animStage === 'sitting' && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                [tap me!]
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Narrative caption beneath */}
      <div className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Pixel brought the name in! Click Pixel anytime to say hi.</span>
      </div>

    </div>
  );
}
