import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  phase: number;
}

interface StitchNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export const ShoeCraftBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Color definitions based on theme
    const isDark = theme === 'dark';

    // Stitch Nodes for cobbler thread lines
    let nodes: StitchNode[] = [];
    const nodeCount = Math.min(10, Math.max(6, Math.floor(width / 220)));

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const x = (width / (nodeCount - 1)) * i;
        const y = height * (0.2 + 0.6 * Math.sin(i * 1.2));
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.35,
          targetX: x,
          targetY: y,
        });
      }
    };

    initNodes();

    // Floating leather craft particles
    const particleCount = Math.min(42, Math.max(20, Math.floor(width / 40)));
    const particles: Particle[] = [];

    const darkColors = [
      'rgba(198, 156, 109, ', // Gold leather
      'rgba(228, 199, 165, ', // Light cream leather
      'rgba(212, 175, 55, ',  // Brass tack
      'rgba(140, 96, 50, ',   // Burnished calf
    ];

    const lightColors = [
      'rgba(154, 85, 34, ',   // Saddle brown
      'rgba(186, 117, 56, ',  // Cognac
      'rgba(120, 60, 20, ',   // Rich mahogany
      'rgba(198, 156, 109, ', // Golden welt
    ];

    const colorPalette = isDark ? darkColors : lightColors;

    for (let i = 0; i < particleCount; i++) {
      const colorBase = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.45, // gentle upward drift like workshop dust
        size: 1 + Math.random() * 2.2,
        baseAlpha: 0.15 + Math.random() * 0.4,
        alpha: 0.2,
        color: colorBase,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let stitchDashOffset = 0;
    let time = 0;

    const render = () => {
      time += 0.01;
      stitchDashOffset -= 0.6; // Stitches continuously advancing

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Shoe Last Blueprint Silhouette (curved reference arcs)
      ctx.save();
      const arcColor = isDark ? 'rgba(198, 156, 109, 0.04)' : 'rgba(168, 93, 40, 0.05)';
      ctx.strokeStyle = arcColor;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);

      // Lasting profile curve 1: Arch to toe spring
      ctx.beginPath();
      const waveY1 = height * 0.35 + Math.sin(time * 0.5) * 20;
      const waveY2 = height * 0.55 + Math.cos(time * 0.4) * 25;
      ctx.moveTo(0, waveY1);
      ctx.bezierCurveTo(width * 0.3, waveY1 - 80, width * 0.7, waveY2 + 90, width, waveY2);
      ctx.stroke();

      // Lasting profile curve 2: Heel cup to welt waist
      ctx.beginPath();
      const waveY3 = height * 0.7 + Math.cos(time * 0.3) * 15;
      ctx.moveTo(0, waveY3);
      ctx.bezierCurveTo(width * 0.4, waveY3 + 60, width * 0.6, waveY3 - 70, width, waveY3 - 30);
      ctx.stroke();
      ctx.restore();

      // 2. Cobbler Stitching Trail (Animated Goodyear/Blake Welt stitch)
      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Soft elastic pull back to home coordinate
        const dx = n.targetX - n.x;
        const dy = n.targetY - n.y;
        n.vx += dx * 0.001;
        n.vy += dy * 0.001;
        n.vx *= 0.98;
        n.vy *= 0.98;

        // Subtle mouse interaction
        const mdx = n.x - mouseRef.current.x;
        const mdy = n.y - mouseRef.current.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          n.vx += (mdx / dist) * force * 0.8;
          n.vy += (mdy / dist) * force * 0.8;
        }
      }

      // Draw primary cobbler thread line
      ctx.save();
      const stitchColor = isDark
        ? 'rgba(198, 156, 109, 0.22)'
        : 'rgba(168, 93, 40, 0.22)';
      ctx.strokeStyle = stitchColor;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = stitchDashOffset;

      ctx.beginPath();
      if (nodes.length > 1) {
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 0; i < nodes.length - 1; i++) {
          const xc = (nodes[i].x + nodes[i + 1].x) / 2;
          const yc = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
        }
        ctx.lineTo(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);
      }
      ctx.stroke();

      // Draw stitch tack points (needle penetrations)
      ctx.setLineDash([]);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Needle tack crosshair
        ctx.fillStyle = isDark ? 'rgba(198, 156, 109, 0.4)' : 'rgba(168, 93, 40, 0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Delicate ring around key tack points
        if (i % 2 === 0) {
          ctx.strokeStyle = isDark ? 'rgba(198, 156, 109, 0.2)' : 'rgba(168, 93, 40, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7 + Math.sin(time * 2 + i) * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Floating Leather Dust & Brass Shavings
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + p.phase) * 0.25;
        p.y += p.vy;

        // Wrap around viewport
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse proximity gentle shimmer
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        let hoverBoost = 0;
        if (dist < 120) {
          hoverBoost = (1 - dist / 120) * 0.4;
        }

        const alpha = Math.min(1, Math.max(0.05, p.baseAlpha + Math.sin(time * 3 + p.phase) * 0.15 + hoverBoost));
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 select-none"
    >
      {/* Dynamic Base Gradient for Dark / Light Backgrounds */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(1200px circle at 15% 15%, rgba(198, 156, 109, 0.07), transparent 60%),
            radial-gradient(900px circle at 85% 30%, rgba(99, 91, 255, 0.05), transparent 50%),
            radial-gradient(1100px circle at 50% 80%, rgba(198, 156, 109, 0.05), transparent 65%),
            linear-gradient(180deg, #07080a 0%, #0c0d12 40%, #090a0d 100%)
          `,
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(1200px circle at 15% 15%, rgba(198, 156, 109, 0.14), transparent 60%),
            radial-gradient(900px circle at 85% 30%, rgba(212, 175, 55, 0.1), transparent 50%),
            radial-gradient(1100px circle at 50% 85%, rgba(186, 117, 56, 0.08), transparent 60%),
            linear-gradient(180deg, #faf7f2 0%, #f4eee4 45%, #ede4d4 100%)
          `,
        }}
      />

      {/* Shoemaker Workshop Architectural Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          theme === 'dark' ? 'opacity-30' : 'opacity-20'
        }`}
        style={{
          backgroundImage:
            theme === 'dark'
              ? 'radial-gradient(rgba(198, 156, 109, 0.15) 1px, transparent 1px)'
              : 'radial-gradient(rgba(140, 80, 30, 0.2) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Animated Glowing Ambient Orbs for Warmth & Depth */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#c69c6d]/10 blur-[130px] animate-pulse duration-10000" />
      <div className="absolute bottom-1/3 right-1/10 w-[480px] h-[480px] rounded-full bg-[#9747ff]/5 blur-[150px] animate-pulse duration-7000" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-[#0d99ff]/5 blur-[120px] animate-pulse duration-12000" />

      {/* Interactive HTML5 Canvas: Live Thread Stitches & Leather Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Corner Shoemaker Caliper Crosshairs (Subtle technical aesthetic) */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#c69c6d]/30" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#c69c6d]/30" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#c69c6d]/30" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#c69c6d]/30" />

      {/* Subtle Technical Lasting Marks watermark */}
      <div className="absolute bottom-4 left-8 text-[9px] font-mono tracking-widest uppercase opacity-25 text-[#c69c6d] pointer-events-none hidden md:block">
        ATELIER DRAFT // LAST MODEL: LAGOS-01 // PITCH 12MM // 360° WELT
      </div>
      <div className="absolute top-24 right-8 text-[9px] font-mono tracking-widest uppercase opacity-20 text-[#c69c6d] pointer-events-none hidden lg:block">
        HAND-STITCH TENSION // TOLERANCE ±0.2MM
      </div>
    </div>
  );
};
