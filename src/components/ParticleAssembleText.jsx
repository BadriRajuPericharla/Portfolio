import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RotateCcw } from 'lucide-react';

/**
 * ParticleAssembleText:
 * 1. Small sparkling particles fly in from surrounding space and converge together to form the text.
 * 2. As soon as they combine, a soft luminous flash occurs.
 * 3. The canvas fades out and the name transforms into 100% NORMAL, crisp, bold typography.
 */
export default function ParticleAssembleText({ text = 'Pericharla Badri Raju' }) {
  const { themeSettings } = usePortfolio();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // 'assembling' -> 'combined'
  const [isCombined, setIsCombined] = useState(false);
  const [flash, setFlash] = useState(false);
  const [syncedFontSize, setSyncedFontSize] = useState(48);
  const [replayKey, setReplayKey] = useState(0);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const handleReplay = useCallback(() => {
    setIsCombined(false);
    setFlash(false);
    setReplayKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (prefersReduced.current) {
      setIsCombined(true);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.offsetWidth || 800);
    let height = (canvas.height = Math.max(container.offsetHeight || 120, 100));

    // Sample coordinates of the text using an offscreen canvas
    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d');
    sampleCanvas.width = width;
    sampleCanvas.height = height;

    // Dynamically calculate font size so text fits cleanly within the container width
    let fontSize = Math.min(Math.max(width / 15, 24), 56);
    const headingFont = getComputedStyle(document.body).getPropertyValue('--font-heading') || "'Space Grotesk', system-ui, sans-serif";
    sampleCtx.font = `900 ${fontSize}px ${headingFont}`;
    
    // Auto scale down font size if measured width exceeds available width with margin
    const maxWidth = width - 40;
    while (sampleCtx.measureText(text).width > maxWidth && fontSize > 16) {
      fontSize -= 2;
      sampleCtx.font = `900 ${fontSize}px ${headingFont}`;
    }

    setSyncedFontSize(fontSize);

    sampleCtx.fillStyle = '#FFFFFF';
    sampleCtx.textAlign = 'center';
    sampleCtx.textBaseline = 'middle';
    sampleCtx.fillText(text, width / 2, height / 2);

    const imgData = sampleCtx.getImageData(0, 0, width, height).data;

    // Pick colors based on active theme, defaulting to Charcoal & Radiant Orange
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#FF7A18';
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#FFC857';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#FFA043';

    const particles = [];
    // Sampling step (smaller = denser particles)
    const step = width < 640 ? 4 : 3;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        if (imgData[idx + 3] > 140) {
          // Target position (on the text)
          const targetX = x;
          const targetY = y;

          // Start position: scattered all around in the surrounding space
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * Math.max(width, height) * 0.75 + 100;
          const startX = width / 2 + Math.cos(angle) * distance;
          const startY = height / 2 + Math.sin(angle) * distance;

          // Color palette
          const rand = Math.random();
          let color = primary;
          if (rand < 0.3) color = accent;
          else if (rand < 0.6) color = secondary;
          else if (rand < 0.85) color = '#FFFFFF';

          particles.push({
            x: startX,
            y: startY,
            targetX,
            targetY,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1.2,
            color,
            speed: Math.random() * 0.04 + 0.055, // spring easing speed
            arrived: false
          });
        }
      }
    }

    let startTime = performance.now();
    let hasTriggeredCombine = false;

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = now - startTime;
      let arrivedCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spring physics toward target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.5) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.arrived = true;
          arrivedCount++;
        } else {
          // Accelerate toward target with dampening
          p.vx = p.vx * 0.86 + dx * p.speed;
          p.vy = p.vy * 0.86 + dy * p.speed;
          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Check if particles have combined (either >88% arrived or 1.8 seconds passed)
      const ratio = particles.length > 0 ? arrivedCount / particles.length : 1;
      if (!hasTriggeredCombine && (ratio > 0.88 || elapsed > 1800)) {
        hasTriggeredCombine = true;
        setFlash(true);
        setTimeout(() => setFlash(false), 400);

        // Transition from particles to normal text
        setTimeout(() => {
          setIsCombined(true);
        }, 250);
      }

      // Keep rendering briefly until transition to normal text completes
      if (!hasTriggeredCombine || elapsed < 2400) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [replayKey, text, themeSettings]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center select-none py-2 overflow-visible"
    >
      {/* Replay intro animation button */}
      {isCombined && (
        <button
          onClick={handleReplay}
          className="absolute -top-7 right-2 sm:right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#A3A3A3] hover:text-[#FAFAFA] bg-[#1C1C1C]/90 hover:bg-[#252525] border border-[#FF7A18]/30 transition-all shadow-md hover:border-[#FF7A18]/60"
          title="Replay particle assembly animation"
          aria-label="Replay particle animation"
        >
          <RotateCcw className="w-3 h-3 text-[#FF7A18]" />
          <span>Replay Particles</span>
        </button>
      )}

      {/* Assembly Area */}
      <div className="relative w-full min-h-[90px] sm:min-h-[110px] md:min-h-[120px] flex items-center justify-center">

        {/* 1. PARTICLES CANVAS (Active while assembling, then smoothly fades out) */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
            isCombined ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ zIndex: 10 }}
        />

        {/* Flash effect when particles meet */}
        <div
          className={`absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 ${
            flash ? 'opacity-100 bg-[#FF7A18]/25 blur-xl' : 'opacity-0'
          }`}
          style={{ zIndex: 15 }}
        />

        {/* 2. NORMAL TEXT (Fades in crystal-clear after particles combine) */}
        <div
          className={`transition-all duration-700 ease-out flex items-center justify-center ${
            isCombined
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-1'
          }`}
          style={{ zIndex: 5 }}
        >
          <h1
            style={{ fontSize: `${syncedFontSize}px` }}
            className="font-black tracking-tight font-display text-center whitespace-nowrap leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA] to-[#FF7A18] drop-shadow-[0_4px_24px_rgba(255,122,24,0.35)]">
              {text}
            </span>
          </h1>
        </div>

      </div>

      {/* Accessibility screen-reader text */}
      <h1 className="sr-only">{text}</h1>
    </div>
  );
}
