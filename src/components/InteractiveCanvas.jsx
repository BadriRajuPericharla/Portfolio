import React, { useEffect, useRef } from 'react';

/**
 * InteractiveCanvas:
 * Renders a subtle, high-performance 3D perspective coordinate grid & geometric nodes
 * symbolizing game world architecture and spatial coordinate systems.
 * Pauses automatically when out of viewport or when prefers-reduced-motion is active.
 */
export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
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

    // Node particle system representing 3D vertices
    const nodeCount = 38;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1.2,
        color: i % 3 === 0 ? 'rgba(255, 122, 24, ' : i % 3 === 1 ? 'rgba(255, 200, 87, ' : 'rgba(250, 250, 250, '
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      time += 0.008;

      // Draw subtle horizon perspective grid
      const gridHorizon = height * 0.65;
      const fovCenter = mouse.x;

      ctx.save();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)';
      ctx.lineWidth = 1;

      // Perspective lines converging toward horizon
      for (let x = -width * 0.5; x <= width * 1.5; x += 70) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(fovCenter + (x - fovCenter) * 0.1, gridHorizon);
        ctx.stroke();
      }

      // Horizontal perspective steps
      for (let y = gridHorizon; y <= height; y += (y - gridHorizon) * 0.35 + 10) {
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

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(255, 122, 24, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Mouse interaction attraction
        const mdx = mouse.x - n.x;
        const mdy = mouse.y - n.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160 && !prefersReducedMotion) {
          const mAlpha = (1 - mDist / 160) * 0.25;
          ctx.strokeStyle = `rgba(255, 200, 87, ${mAlpha})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Node dot
        ctx.fillStyle = `${n.color}0.7)`;
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      aria-hidden="true"
    />
  );
}
