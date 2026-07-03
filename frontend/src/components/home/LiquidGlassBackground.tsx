'use client';

import { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  wanderAngle: number;
}

export default function LiquidGlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropletsRef = useRef<Droplet[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize droplets
    const initDroplets = () => {
      const drops: Droplet[] = [];
      for (let i = 0; i < 15; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 30 + Math.random() * 60,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          wanderAngle: Math.random() * Math.PI * 2,
        });
      }
      dropletsRef.current = drops;
    };
    initDroplets();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      const drops = dropletsRef.current;
      const { width, height } = canvas;

      // Draw gradient background
      const grd = ctx.createLinearGradient(0, 0, width * 0.6, height);
      grd.addColorStop(0, '#e8dbc8');
      grd.addColorStop(0.35, '#5b8cdb');
      grd.addColorStop(0.6, '#2d6fd4');
      grd.addColorStop(1, '#1a3fa0');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Update droplet physics
      drops.forEach(drop => {
        // Wander behavior
        drop.wanderAngle += (Math.random() - 0.5) * 0.1;
        drop.vx += Math.cos(drop.wanderAngle) * 0.02;
        drop.vy += Math.sin(drop.wanderAngle) * 0.02;

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = drop.x - mouseRef.current.x;
          const dy = drop.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200;
            drop.vx += (dx / dist) * force * 0.5;
            drop.vy += (dy / dist) * force * 0.5;
          }
        }

        // Velocity damping
        drop.vx *= 0.98;
        drop.vy *= 0.98;

        // Max speed
        const speed = Math.sqrt(drop.vx * drop.vx + drop.vy * drop.vy);
        if (speed > 3) {
          drop.vx = (drop.vx / speed) * 3;
          drop.vy = (drop.vy / speed) * 3;
        }

        // Update position
        drop.x += drop.vx;
        drop.y += drop.vy;

        // Bounce off walls
        if (drop.x < drop.r) {
          drop.x = drop.r;
          drop.vx = Math.abs(drop.vx) * 0.8;
        }
        if (drop.x > width - drop.r) {
          drop.x = width - drop.r;
          drop.vx = -Math.abs(drop.vx) * 0.8;
        }
        if (drop.y < drop.r) {
          drop.y = drop.r;
          drop.vy = Math.abs(drop.vy) * 0.8;
        }
        if (drop.y > height - drop.r) {
          drop.y = height - drop.r;
          drop.vy = -Math.abs(drop.vy) * 0.8;
        }
      });

      // Render metaball effect
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          let sum = 0;

          // Calculate metaball field
          for (const drop of drops) {
            const dx = x - drop.x;
            const dy = y - drop.y;
            const distSq = dx * dx + dy * dy + 0.1;
            sum += (drop.r * drop.r) / distSq;
          }

          // Threshold and color
          if (sum > 0.8) {
            const idx = (y * width + x) * 4;
            const idx2 = ((y + 1) * width + x) * 4;
            const idx3 = (y * width + (x + 1)) * 4;
            const idx4 = ((y + 1) * width + (x + 1)) * 4;

            // Glass color with slight blue tint
            const alpha = Math.min(sum * 80, 255);
            const r = 220 + Math.sin(sum) * 20;
            const g = 230 + Math.cos(sum * 0.5) * 15;
            const b = 255;

            // Fill 2x2 block for performance
            [idx, idx2, idx3, idx4].forEach(i => {
              if (i < data.length) {
                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
                data[i + 3] = alpha;
              }
            });
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add highlights
      ctx.globalCompositeOperation = 'lighter';
      drops.forEach(drop => {
        const gradient = ctx.createRadialGradient(
          drop.x, drop.y, 0,
          drop.x, drop.y, drop.r * 1.5
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(
          drop.x - drop.r * 1.5,
          drop.y - drop.r * 1.5,
          drop.r * 3,
          drop.r * 3
        );
      });
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
