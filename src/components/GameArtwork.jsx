import React, { useState, useEffect } from 'react';

/**
 * GameArtwork component:
 * Displays actual game screenshot if present in /projects/<id>.png or from a direct customImage URL,
 * with an automatic fallback to an authentic, beautifully styled vector game scene.
 * Also provides a clear tooltip indicating how to replace with personal screenshots.
 */
export default function GameArtwork({ projectId, title, accentColor = '#6366F1', customSvgKey, customImage, className = '' }) {
  const localSrc = `/projects/${projectId}.png`;
  const [currentSrc, setCurrentSrc] = useState(customImage || localSrc);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setCurrentSrc(customImage || localSrc);
    setImageError(false);
  }, [customImage, projectId]);

  const handleImageError = () => {
    // If the customImage (external URL) failed, fall back to local project image
    if (currentSrc !== localSrc) {
      setCurrentSrc(localSrc);
    } else {
      setImageError(true);
    }
  };

  // Render stylized game-specific scene artwork
  const renderFallbackScene = () => {
    switch (customSvgKey) {
      case 'bossfight':
        return (
          <svg viewBox="0 0 600 340" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bf-bg" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0F111A"/>
                <stop offset="0.5" stopColor="#1A1528"/>
                <stop offset="1" stopColor="#0B0D13"/>
              </linearGradient>
              <linearGradient id="bf-sword" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#4F46E5"/>
              </linearGradient>
              <linearGradient id="bf-boss" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F43F5E"/>
                <stop offset="1" stopColor="#881337"/>
              </linearGradient>
            </defs>
            <rect width="600" height="340" fill="url(#bf-bg)" />
            
            {/* Arena Grid Floor */}
            <path d="M0 240 L600 240 M50 240 L0 340 M150 240 L100 340 M250 240 L220 340 M350 240 L380 340 M450 240 L500 340 M550 240 L600 340" stroke="#312E81" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="0" y1="280" x2="600" y2="280" stroke="#312E81" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="0" y1="320" x2="600" y2="320" stroke="#312E81" strokeWidth="1" strokeOpacity="0.2" />

            {/* Boss HP Bar */}
            <rect x="180" y="24" width="240" height="12" rx="6" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            <rect x="182" y="26" width="170" height="8" rx="4" fill="#F43F5E" />
            <text x="300" y="52" fill="#E4E4E7" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="1">ANCIENT GOLEM [PHASE 2]</text>

            {/* Boss Entity */}
            <g transform="translate(380, 110)">
              {/* Boss aura */}
              <circle cx="60" cy="70" r="75" fill="#E11D48" fillOpacity="0.12" filter="blur(20px)" />
              {/* Boss body */}
              <rect x="15" y="30" width="90" height="90" rx="16" fill="url(#bf-boss)" stroke="#FDA4AF" strokeWidth="2" />
              {/* Boss core eyes */}
              <rect x="35" y="50" width="16" height="6" rx="2" fill="#FFF" />
              <rect x="70" y="50" width="16" height="6" rx="2" fill="#FFF" />
              {/* Attack Telegraph Arc */}
              <path d="M-20 60 A 90 90 0 0 0 10 140" stroke="#FB7185" strokeWidth="3" strokeDasharray="6 4" />
            </g>

            {/* Player Character */}
            <g transform="translate(130, 160)">
              {/* Player Aura */}
              <circle cx="30" cy="40" r="35" fill="#6366F1" fillOpacity="0.2" filter="blur(10px)" />
              {/* Player Body */}
              <rect x="18" y="20" width="24" height="48" rx="8" fill="#6366F1" stroke="#A5B4FC" strokeWidth="2" />
              {/* Sword Slash Trail */}
              <path d="M45 10 Q 75 35 60 70" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 8px #38BDF8)" />
              {/* Hit Sparks */}
              <circle cx="75" cy="40" r="3" fill="#FFF" />
              <circle cx="85" cy="30" r="2" fill="#38BDF8" />
            </g>

            {/* HUD Overlay */}
            <rect x="24" y="20" width="90" height="8" rx="4" fill="#10B981" />
            <text x="24" y="42" fill="#9CA3AF" fontSize="10" fontFamily="JetBrains Mono, monospace">HP: 100/100</text>
            <text x="24" y="56" fill="#6366F1" fontSize="10" fontFamily="JetBrains Mono, monospace">SPECIAL: READY</text>
          </svg>
        );

      case 'shadowsneak':
        return (
          <svg viewBox="0 0 600 340" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ss-bg" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#080D14"/>
                <stop offset="0.6" stopColor="#0B1320"/>
                <stop offset="1" stopColor="#04070B"/>
              </linearGradient>
              <radialGradient id="guard-cone" cx="50%" cy="0%" r="90%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4"/>
                <stop offset="70%" stopColor="#D97706" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#B45309" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="600" height="340" fill="url(#ss-bg)" />

            {/* Top-Down / Isometric Floor Tiles */}
            <g opacity="0.15" stroke="#38BDF8" strokeWidth="1">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 30} x2="600" y2={i * 30} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="340" />
              ))}
            </g>

            {/* Obstacle Walls / Crates */}
            <rect x="240" y="80" width="30" height="180" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <rect x="360" y="160" width="80" height="40" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="2" />

            {/* Guard Entity */}
            <g transform="translate(380, 70)">
              {/* Vision Cone */}
              <path d="M0 0 L-140 180 L80 180 Z" fill="url(#guard-cone)" />
              {/* Guard Body */}
              <circle cx="0" cy="0" r="14" fill="#DC2626" stroke="#FECACA" strokeWidth="2" />
              {/* Direction Indicator */}
              <line x1="0" y1="0" x2="-20" y2="25" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
              <text x="20" y="5" fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono, monospace">GUARD [PATROL]</text>
            </g>

            {/* Keycard Item Pedestal */}
            <g transform="translate(480, 240)">
              <circle cx="0" cy="0" r="18" fill="#0284C7" fillOpacity="0.2" filter="blur(6px)" />
              <rect x="-8" y="-12" width="16" height="24" rx="3" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.5" />
              <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#0369A1" strokeWidth="2" />
              <text x="0" y="24" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">KEYCARD B</text>
            </g>

            {/* Player Sneaking in Cover */}
            <g transform="translate(190, 160)">
              <circle cx="0" cy="0" r="16" fill="#0EA5E9" fillOpacity="0.15" filter="blur(8px)" />
              <circle cx="0" cy="0" r="12" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2" />
              <circle cx="0" cy="-2" r="4" fill="#FFF" />
              <text x="-35" y="-18" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace">PLAYER [STEALTH]</text>
            </g>

            {/* HUD Alert Bar */}
            <rect x="24" y="24" width="160" height="20" rx="4" fill="#0F172A" stroke="#1E293B" />
            <text x="34" y="38" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono, monospace">DETECTION: 0% [HIDDEN]</text>
          </svg>
        );

      case 'arrowescape':
        return (
          <svg viewBox="0 0 600 340" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ae-bg" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14110A"/>
                <stop offset="0.6" stopColor="#1A1508"/>
                <stop offset="1" stopColor="#0B0905"/>
              </linearGradient>
            </defs>
            <rect width="600" height="340" fill="url(#ae-bg)" />

            {/* Puzzle Grid */}
            <rect x="160" y="50" width="280" height="240" rx="16" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
            
            {/* Grid Cells */}
            {[0, 1, 2, 3].map(row => (
              [0, 1, 2, 3].map(col => (
                <rect 
                  key={`cell-${row}-${col}`}
                  x={180 + col * 60} 
                  y={70 + row * 50} 
                  width="48" 
                  height="40" 
                  rx="6" 
                  fill="#292524" 
                  stroke="#57534E" 
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              ))
            ))}

            {/* Active Arrow Blocks */}
            {/* Up arrow */}
            <g transform="translate(180, 70)">
              <rect width="48" height="40" rx="6" fill="#D97706" />
              <path d="M24 10 L14 24 H20 V30 H28 V24 H34 Z" fill="#FFF" />
            </g>
            {/* Right arrow - Ready to escape */}
            <g transform="translate(360, 120)">
              <rect width="48" height="40" rx="6" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1.5" />
              <path d="M38 20 L24 10 V16 H14 V24 H24 V30 Z" fill="#FFF" />
              <path d="M54 20 L480 20" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" />
            </g>
            {/* Down arrow */}
            <g transform="translate(240, 170)">
              <rect width="48" height="40" rx="6" fill="#B45309" />
              <path d="M24 30 L34 16 H28 V10 H20 V16 H14 Z" fill="#FFF" />
            </g>
            {/* Left arrow */}
            <g transform="translate(300, 220)">
              <rect width="48" height="40" rx="6" fill="#D97706" />
              <path d="M10 20 L24 30 V24 H34 V16 H24 V10 Z" fill="#FFF" />
            </g>

            {/* Status / Level Indicator */}
            <text x="300" y="32" fill="#FDE68A" fontSize="12" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="1">STAGE 07: CLEAR PATHWAYS</text>
            <text x="300" y="315" fill="#A8A29E" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SEQUENCE ARROWS TO PREVENT INTERSECTION COLLISION</text>
          </svg>
        );

      case 'platformer':
        return (
          <svg viewBox="0 0 600 340" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pf-bg" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#061A14"/>
                <stop offset="0.6" stopColor="#0B261D"/>
                <stop offset="1" stopColor="#030E0A"/>
              </linearGradient>
            </defs>
            <rect width="600" height="340" fill="url(#pf-bg)" />

            {/* Background Mountains / Foliage */}
            <path d="M0 240 L100 160 L220 240 L340 140 L460 250 L600 170 L600 340 L0 340 Z" fill="#062F22" fillOpacity="0.4" />

            {/* Platformer Ground Tiles */}
            <rect x="0" y="270" width="220" height="70" fill="#047857" stroke="#10B981" strokeWidth="2" />
            <rect x="340" y="270" width="260" height="70" fill="#047857" stroke="#10B981" strokeWidth="2" />

            {/* Floating Platforms */}
            <rect x="180" y="200" width="90" height="18" rx="4" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
            <rect x="300" y="140" width="90" height="18" rx="4" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />

            {/* Hazard Spikes in Gap */}
            <path d="M230 320 L240 285 L250 320 L260 285 L270 320 L280 285 L290 320 L300 285 L310 320 L320 285 L330 320 Z" fill="#EF4444" stroke="#FCA5A5" strokeWidth="1" />

            {/* Collectible Gems */}
            <g transform="translate(340, 105)">
              <polygon points="10,0 20,8 10,24 0,8" fill="#FBBF24" stroke="#FFF" strokeWidth="1" />
              <circle cx="10" cy="10" r="14" fill="#FBBF24" fillOpacity="0.2" filter="blur(4px)" />
            </g>

            {/* Player Character Mid-Air Jump */}
            <g transform="translate(130, 160)">
              <circle cx="15" cy="15" r="16" fill="#10B981" fillOpacity="0.25" filter="blur(6px)" />
              <rect x="5" y="5" width="20" height="26" rx="6" fill="#10B981" stroke="#A7F3D0" strokeWidth="2" />
              {/* Jump Trajectory Arc */}
              <path d="M-40 80 Q 0 0 15 15" stroke="#34D399" strokeWidth="2" strokeDasharray="3 3" />
            </g>

            {/* Level Goal Flag */}
            <g transform="translate(520, 210)">
              <line x1="10" y1="0" x2="10" y2="60" stroke="#D1D5DB" strokeWidth="3" />
              <polygon points="10,5 45,20 10,35" fill="#10B981" />
            </g>

            {/* Score & Coin HUD */}
            <rect x="24" y="24" width="130" height="24" rx="4" fill="#064E3B" stroke="#059669" />
            <text x="34" y="40" fill="#A7F3D0" fontSize="11" fontFamily="JetBrains Mono, monospace">GEMS: 03/05</text>
          </svg>
        );

      case 'obstacle':
      default:
        return (
          <svg viewBox="0 0 600 340" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ob-bg" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#170A1C"/>
                <stop offset="0.6" stopColor="#220B29"/>
                <stop offset="1" stopColor="#0E0512"/>
              </linearGradient>
            </defs>
            <rect width="600" height="340" fill="url(#ob-bg)" />

            {/* 3D Track Perspective Lines */}
            <polygon points="260,80 340,80 540,340 60,340" fill="#1C0F24" stroke="#F43F5E" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="300" y1="80" x2="300" y2="340" stroke="#EC4899" strokeWidth="1" strokeDasharray="8 8" strokeOpacity="0.6" />

            {/* Dynamic Obstacles along track */}
            <rect x="270" y="130" width="60" height="15" rx="3" fill="#BE185D" stroke="#FDA4AF" strokeWidth="1" />
            <rect x="180" y="220" width="110" height="25" rx="4" fill="#E11D48" stroke="#FECDD3" strokeWidth="1.5" />
            <rect x="330" y="200" width="100" height="25" rx="4" fill="#E11D48" stroke="#FECDD3" strokeWidth="1.5" />

            {/* Player Cube Dodging */}
            <g transform="translate(280, 275)">
              <rect x="0" y="0" width="36" height="36" rx="6" fill="#EC4899" stroke="#FFF" strokeWidth="2" filter="drop-shadow(0 0 12px #EC4899)" />
              {/* Motion speed blur lines */}
              <line x1="-15" y1="18" x2="-4" y2="18" stroke="#F472B6" strokeWidth="2" />
              <line x1="40" y1="18" x2="55" y2="18" stroke="#F472B6" strokeWidth="2" />
            </g>

            {/* Score Overlay */}
            <text x="300" y="45" fill="#F472B6" fontSize="16" fontFamily="Space Grotesk, sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="2">DISTANCE: 480m</text>
            <text x="300" y="65" fill="#9CA3AF" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">REACTION SPEED: OPTIMAL</text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden w-full aspect-[16/9] bg-zinc-950 rounded-t-xl group ${className}`}>
      {/* If an image exists and hasn't errored, display the image */}
      {!imageError ? (
        <img
          src={currentSrc}
          alt={`${title} gameplay preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
      ) : null}

      {/* Fallback to styled vector gameplay graphics */}
      {imageError && renderFallbackScene()}

      {/* Subtle gaming scanline / vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20" />

      {/* Decorative accent corner pip */}
      <div 
        className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide border backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(11, 14, 20, 0.75)',
          color: accentColor,
          borderColor: `${accentColor}40`
        }}
      >
        UNITY // ENGINE
      </div>
    </div>
  );
}
