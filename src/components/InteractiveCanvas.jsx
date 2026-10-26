import React, { useEffect, useRef } from 'react';

/**
 * InteractiveCanvas:
 * Renders a subtle, calm 3D perspective coordinate grid & geometric nodes
 * symbolizing game world architecture and spatial coordinate systems.
 * Calibrated with soft, non-intrusive intensity so it never overpowers text.
 */
export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Helper to extract RGB from CSS hex color
    const hexToRgb = (hex, fallback) => {
      if (!hex) return fallback;
      const clean = hex.trim().replace('#', '');
      if (clean.length === 3) {
        const r = parseInt(clean[0] + clean[0], 16);
        const g = parseInt(clean[1] + clean[1], 16);
        const b = parseInt(clean[2] + clean[2], 16);
        return `${r}, ${g}, ${b}`;
      }
      if (clean.length >= 6) {
        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
      }
      return fallback;
    };

    // Node particle system representing 3D vertices (calibrated for calm, subtle ambience)
    const nodeCount = 20;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 0.6 + 0.6,
        type: i % 3
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dynamically resolve palette colors
      const computed = getComputedStyle(document.documentElement);
      const primaryHex = computed.getPropertyValue('--color-primary').trim() || '#FF7A18';
      const secondaryHex = computed.getPropertyValue('--color-secondary').trim() || '#FFC857';
      const primaryRgb = hexToRgb(primaryHex, '255, 122, 24');
      const secondaryRgb = hexToRgb(secondaryHex, '255, 200, 87');

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      time += 0.005;

      // Draw subtle horizon perspective grid (very low intensity)
      const gridHorizon = height * 0.68;
      const fovCenter = mouse.x;

      ctx.save();
      ctx.strokeStyle = `rgba(${primaryRgb}, 0.025)`;
      ctx.lineWidth = 0.8;

      // Perspective lines converging toward horizon
      for (let x = -width * 0.3; x <= width * 1.3; x += 90) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(fovCenter + (x - fovCenter) * 0.1, gridHorizon);
        ctx.stroke();
      }

      // Horizontal perspective steps
      for (let y = gridHorizon; y <= height; y += (y - gridHorizon) * 0.4 + 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Update and draw floating coordinate vertices
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;
        }

        // Draw connections between nearby nodes (subtle)
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = `rgba(${primaryRgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Mouse interaction attraction (subtle)
        const mdx = mouse.x - n.x;
        const mdy = mouse.y - n.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 130 && !prefersReducedMotion) {
          const mAlpha = (1 - mDist / 130) * 0.15;
          ctx.strokeStyle = `rgba(${secondaryRgb}, ${mAlpha})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Node dot
        const nodeRgb = n.type === 0 ? primaryRgb : n.type === 1 ? secondaryRgb : '250, 250, 250';
        ctx.fillStyle = `rgba(${nodeRgb}, 0.16)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}
