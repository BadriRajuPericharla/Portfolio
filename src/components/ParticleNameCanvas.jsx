import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * ParticleNameCanvas:
 * Interactive Vertex & Particle Assembly Effect for Game Developers.
 * Particles disperse and gather into the name "BADRI RAJU" using spring physics.
 * Reacts to mouse movement by dispersing nearby particles and snapping back.
 */
export default function ParticleNameCanvas({ text = 'BADRI RAJU' }) {
  const { themeSettings } = usePortfolio();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsAssembled(true);
      return;
    }

    let animationId;
    let particles = [];
    let width = 0;
    let height = 0;
    let mouse = { x: -1000, y: -1000, radius: 95 };

    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = canvas.width = Math.max(rect.width, 320);
      height = canvas.height = Math.max(rect.height, 120);
      initParticles();
    };

    const initParticles = () => {
      particles = [];

      // Create an offscreen canvas to sample text pixels
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      offCanvas.width = width;
      offCanvas.height = height;

      // Responsive font size & dynamic heading font from active theme
      const fontSize = Math.min(width / 7.5, 68);
      const computedHeadingFont = getComputedStyle(document.body).getPropertyValue('--font-heading') || "'Space Grotesk', system-ui, sans-serif";
      offCtx.font = `800 ${fontSize}px ${computedHeadingFont}`;
      offCtx.fillStyle = '#FFFFFF';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;

      // Sample density
      const step = width < 600 ? 5 : 4;

      // Colors from active CSS theme variables
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#6366F1';
      const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#A855F7';
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#06B6D4';

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 128) {
            // Target coordinates
            const targetX = x;
            const targetY = y;

            // Start coordinates: scattered in space around center
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * width * 0.8 + 150;
            const startX = width / 2 + Math.cos(angle) * dist;
            const startY = height / 2 + Math.sin(angle) * dist;

            // Color palette from active theme
            const rand = Math.random();
            let color = primary;
            if (rand < 0.35) color = accent;
            else if (rand < 0.65) color = secondary;
            else if (rand < 0.85) color = '#FFFFFF'; // White vertex spark

            particles.push({
              x: startX,
              y: startY,
              targetX,
              targetY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: Math.random() * 2 + 1.2,
              color,
              density: Math.random() * 20 + 10,
              gathered: false
            });
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', updateDimensions);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    updateDimensions();

    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      let closeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Vector from particle to target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const distToTarget = Math.sqrt(dx * dx + dy * dy);

        if (distToTarget < 3) {
          closeCount++;
        }

        // Mouse avoidance physics
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);

        let fx = 0;
        let fy = 0;

        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          fx = -Math.cos(angle) * force * p.density;
          fy = -Math.sin(angle) * force * p.density;
        }

        // Spring acceleration toward target
        const springFactor = 0.07;
        const friction = 0.84;

        const ax = dx * springFactor + fx;
        const ay = dy * springFactor + fy;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.x += p.vx;
        p.y += p.vy;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles for a digital vertex mesh effect
        if (i % 6 === 0 && distToTarget < 15) {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p2 = particles[j];
            const dxx = p.x - p2.x;
            const dyy = p.y - p2.y;
            const d = Math.sqrt(dxx * dxx + dyy * dyy);
            if (d < 16) {
              ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      if (closeCount > particles.length * 0.85 && !isAssembled) {
        setIsAssembled(true);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [text, themeSettings]);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl h-24 sm:h-32 flex items-center justify-center select-none">
      {/* Interactive Particle Assembly Canvas */}
      <canvas
        ref={canvasRef}
        className="cursor-crosshair w-full h-full block"
        title="Interactive Game Physics Particles: Hover to disperse vertices!"
      />

      {/* Screen-reader accessible hidden heading */}
      <h1 className="sr-only">{text}</h1>

      {/* Subtle indicator beneath canvas */}
      <div className="absolute -bottom-2 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          [Interactive Vertex System // Hover to Disperse]
        </span>
      </div>
    </div>
  );
}
