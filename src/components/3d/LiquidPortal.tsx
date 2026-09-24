import React, { useEffect, useRef } from 'react';

interface LiquidPortalProps {
  isExpanding?: boolean;
}

export const LiquidPortal: React.FC<LiquidPortalProps> = ({ isExpanding = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for flowing viscous blood-red fluid
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * 320,
      y: height * 0.45 + (Math.random() - 0.5) * 320,
      baseRadius: Math.random() * 4 + 2,
      angle: Math.random() * Math.PI * 2,
      orbitDist: Math.random() * 180 + 30,
      speed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      alpha: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.01
    }));

    let t = 0;
    let expansionRadius = 10;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Pitch black background
      ctx.fillStyle = '#030306';
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.45;

      if (isExpanding) {
        expansionRadius += 28;
      }

      // Background ambient red pulse
      const ambGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.max(width, height) * 0.65
      );
      ambGrad.addColorStop(0, 'rgba(185, 28, 28, 0.22)');
      ambGrad.addColorStop(0.4, 'rgba(127, 29, 29, 0.08)');
      ambGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, width, height);

      // Liquid organic outer contours (blobs)
      ctx.save();
      ctx.translate(centerX, centerY);

      // Concentric glowing crimson ripple rings
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        const r = 110 + i * 35 + Math.sin(t * 1.5 + i) * 6;
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.15 / i})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Animated viscous droplet body
      ctx.beginPath();
      const points = 12;
      const baseR = isExpanding ? expansionRadius : 95 + Math.sin(t * 2) * 4;
      for (let p = 0; p <= points; p++) {
        const theta = (p / points) * Math.PI * 2;
        const wave = Math.sin(theta * 4 + t * 2) * 7 + Math.cos(theta * 2 - t) * 4;
        const currentR = baseR + wave;
        const px = Math.cos(theta) * currentR;
        const py = Math.sin(theta) * currentR;
        if (p === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();

      const dropGrad = ctx.createRadialGradient(-20, -30, 10, 0, 0, baseR);
      dropGrad.addColorStop(0, '#f87171');
      dropGrad.addColorStop(0.25, '#ef4444');
      dropGrad.addColorStop(0.65, '#991b1b');
      dropGrad.addColorStop(0.92, '#450a0a');
      dropGrad.addColorStop(1, 'rgba(30, 5, 5, 0.9)');

      ctx.fillStyle = dropGrad;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = isExpanding ? 80 : 35;
      ctx.fill();

      // Specular liquid reflection highlight
      if (!isExpanding) {
        ctx.beginPath();
        ctx.ellipse(-28, -32, 24, 12, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 202, 202, 0.45)';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(32, 30, 16, 8, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 202, 202, 0.15)';
        ctx.fill();
      }

      ctx.restore();

      // Floating liquid particle tendrils
      for (const p of particles) {
        p.angle += p.speed;
        const currentDist = p.orbitDist + Math.sin(t + p.orbitDist) * 12;
        const px = centerX + Math.cos(p.angle) * currentDist;
        const py = centerY + Math.sin(p.angle) * currentDist;

        ctx.beginPath();
        ctx.arc(px, py, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 12;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isExpanding]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
