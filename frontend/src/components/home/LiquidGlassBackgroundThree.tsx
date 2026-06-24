'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  MAX_DROPLETS, FIXED_DT_MS, MAX_FRAME_DT_MS, MAX_CATCHUP, MAX_ENTRIES,
  DAMP, MOUSE_R, MOUSE_F, TENSION_RANGE, TENSION_F, MERGE_RATIO,
  SPLIT_SPEED, SPLIT_MIN_R, MAX_SPEED, BOUNCE, WANDER_F, CENTER_PULL,
  SOFT_STIFFNESS, SOFT_DAMPING,
  type Droplet, vertexShader, fragmentShader, drawBackgroundTexture
} from './LiquidGlassShaders';

interface LiquidGlassBackgroundThreeProps {
  showTitle?: boolean;
}

export default function LiquidGlassBackgroundThree({
  showTitle = true,
}: LiquidGlassBackgroundThreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<Droplet[]>([]);
  const uidRef = useRef(0);
  const mouseRef = useRef({ x: 999, y: 999, active: false, down: false });
  const aspectRef = useRef(1);
  const radiusScaleRef = useRef(1);
  const spawnCDRef = useRef(0);
  const autoTimerRef = useRef(0);
  const simTimeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const initialWidth = Math.max(1, container.clientWidth);
    const initialHeight = Math.max(1, container.clientHeight);
    const getRadiusScale = (width: number) => {
      if (width < 480) return 0.48;
      if (width < 768) return 0.64;
      return 1;
    };
    radiusScaleRef.current = getRadiusScale(initialWidth);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(initialWidth, initialHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Background texture
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d')!;
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;

    const updateBackground = () => {
      const w = renderer.domElement.width;
      const h = renderer.domElement.height;
      bgCanvas.width = w;
      bgCanvas.height = h;
      drawBackgroundTexture(bgCtx, w, h, { showTitle });
      bgTexture.needsUpdate = true;
    };
    updateBackground();
    const backgroundRefreshTimers = [
      window.setTimeout(updateBackground, 350),
      window.setTimeout(updateBackground, 1200),
    ];

    // Droplet data texture
    const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
    const dropletTex = new THREE.DataTexture(
      dropletBuf, MAX_ENTRIES, 1,
      THREE.RGBAFormat, THREE.FloatType
    );
    dropletTex.minFilter = THREE.NearestFilter;
    dropletTex.magFilter = THREE.NearestFilter;
    dropletTex.needsUpdate = true;

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uRes: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uData: { value: dropletTex },
        uBg: { value: bgTexture },
        uCount: { value: 0 },
        uTime: { value: 0 },
      },
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    aspectRef.current = initialWidth / initialHeight;

    // Spawn droplet
    const spawn = (x: number, y: number, r: number, vx = 0, vy = 0) => {
      if (dropsRef.current.length >= MAX_DROPLETS) return null;
      const scaledRadius = Math.max(0.012, r * radiusScaleRef.current);
      const area = Math.PI * scaledRadius * scaledRadius;
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.0003 + Math.random() * 0.0008;
      const d: Droplet = {
        id: uidRef.current++, x, y, r: scaledRadius, area,
        vx: vx || Math.cos(angle) * spd,
        vy: vy || Math.sin(angle) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: x, softPrevY: y,
        softOffX: 0, softOffY: 0,
        softVelX: 0, softVelY: 0,
      };
      dropsRef.current.push(d);
      return d;
    };

    // Initialize droplets
    for (let i = 0; i < 12; i++) {
      spawn(
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.5,
        0.03 + Math.random() * 0.05
      );
    }

    // Physics functions
    const applyForces = () => {
      const mouse = mouseRef.current;
      for (const d of dropsRef.current) {
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F;
        d.vx -= d.x * CENTER_PULL;
        d.vy -= d.y * CENTER_PULL;

        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          const rr = MOUSE_R + d.r;
          if (dSq < rr * rr && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rr;
            const f = s * s * MOUSE_F;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
      }

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dSq = dx * dx + dy * dy;
          const rng = TENSION_RANGE + a.r + b.r;
          if (dSq < rng * rng && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rng;
            const f = s * TENSION_F;
            const fx = (dx / dist) * f;
            const fy = (dy / dist) * f;
            a.vx += fx; a.vy += fy;
            b.vx -= fx; b.vy -= fy;
          }
        }
      }
    };

    const integrate = () => {
      const aspect = aspectRef.current;
      for (const d of dropsRef.current) {
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp > MAX_SPEED) {
          const s = MAX_SPEED / sp;
          d.vx *= s; d.vy *= s;
        }
        d.x += d.vx; d.y += d.vy;
        d.vx *= DAMP; d.vy *= DAMP;

        const wx = aspect * 0.5, wy = 0.5;
        if (d.x - d.r < -wx) { d.x = -wx + d.r; d.vx = Math.abs(d.vx) * BOUNCE; }
        if (d.x + d.r > wx) { d.x = wx - d.r; d.vx = -Math.abs(d.vx) * BOUNCE; }
        if (d.y - d.r < -wy) { d.y = -wy + d.r; d.vy = Math.abs(d.vy) * BOUNCE; }
        if (d.y + d.r > wy) { d.y = wy - d.r; d.vy = -Math.abs(d.vy) * BOUNCE; }
      }
    };

    const mergeDroplets = () => {
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        if (!a.alive) continue;
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          if (!b.alive) continue;
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (a.r + b.r) * MERGE_RATIO) {
            const na = a.area + b.area;
            a.x = (a.x * a.area + b.x * b.area) / na;
            a.y = (a.y * a.area + b.y * b.area) / na;
            a.vx = (a.vx * a.area + b.vx * b.area) / na;
            a.vy = (a.vy * a.area + b.vy * b.area) / na;
            a.r = Math.sqrt(na / Math.PI);
            a.area = na;
            b.alive = false;
          }
        }
      }
      dropsRef.current = drops.filter(d => d.alive);
    };

    const splitDroplets = () => {
      const add: Droplet[] = [];
      for (const d of dropsRef.current) {
        if (d.r < SPLIT_MIN_R) continue;
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp < SPLIT_SPEED) continue;

        const ha = d.area * 0.5;
        const nr = Math.sqrt(ha / Math.PI);
        const nx = -d.vy / sp, ny = d.vx / sp;
        const off = nr * 0.7;

        d.r = nr; d.area = ha;
        d.x -= nx * off; d.y -= ny * off;

        add.push({
          id: uidRef.current++,
          x: d.x + nx * off * 2, y: d.y + ny * off * 2,
          r: nr, area: ha,
          vx: d.vx + nx * sp * 0.35, vy: d.vy + ny * sp * 0.35,
          alive: true,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: 0.3 + Math.random() * 0.5,
          softPrevX: d.x + nx * off * 2, softPrevY: d.y + ny * off * 2,
          softOffX: 0, softOffY: 0, softVelX: 0, softVelY: 0,
        });
      }
      for (const a of add) if (dropsRef.current.length < MAX_DROPLETS) dropsRef.current.push(a);
    };

    const updateSoftBodies = () => {
      for (const d of dropsRef.current) {
        const dx = d.x - d.softPrevX, dy = d.y - d.softPrevY;
        d.softVelX += (dx - d.softOffX) * SOFT_STIFFNESS;
        d.softVelY += (dy - d.softOffY) * SOFT_STIFFNESS;
        d.softVelX *= SOFT_DAMPING; d.softVelY *= SOFT_DAMPING;
        d.softOffX += d.softVelX; d.softOffY += d.softVelY;
        d.softPrevX = d.x; d.softPrevY = d.y;
      }
    };

    const autoSpawn = () => {
      autoTimerRef.current += FIXED_DT_MS;
      if (autoTimerRef.current > 2000 && dropsRef.current.length < 10) {
        autoTimerRef.current = 0;
        spawn(
          (Math.random() - 0.5) * aspectRef.current * 0.6,
          (Math.random() - 0.5) * 0.6,
          0.025 + Math.random() * 0.03
        );
      }
    };

    const mouseSpawn = () => {
      const mouse = mouseRef.current;
      if (!mouse.down || !mouse.active) return;
      spawnCDRef.current -= FIXED_DT_MS;
      if (spawnCDRef.current <= 0 && dropsRef.current.length < MAX_DROPLETS) {
        spawnCDRef.current = 120;
        spawn(
          mouse.x + (Math.random() - 0.5) * 0.02,
          mouse.y + (Math.random() - 0.5) * 0.02,
          0.02 + Math.random() * 0.015
        );
      }
    };

    const fixedUpdate = () => {
      simTimeRef.current += FIXED_DT_MS;
      applyForces();
      integrate();
      mergeDroplets();
      splitDroplets();
      updateSoftBodies();
      autoSpawn();
      mouseSpawn();
    };

    const sync = () => {
      dropletBuf.fill(0);
      const n = Math.min(dropsRef.current.length, MAX_DROPLETS);
      for (let i = 0; i < n; i++) {
        const d = dropsRef.current[i];
        dropletBuf[i * 4] = d.x;
        dropletBuf[i * 4 + 1] = d.y;
        dropletBuf[i * 4 + 2] = d.r;
        dropletBuf[i * 4 + 3] = 1;

        const gi = (n + i) * 4;
        dropletBuf[gi] = d.x - d.softOffX * 3.5;
        dropletBuf[gi + 1] = d.y - d.softOffY * 3.5;
        dropletBuf[gi + 2] = d.r * 0.7;
        dropletBuf[gi + 3] = 1;
      }
      dropletTex.needsUpdate = true;
      material.uniforms.uCount.value = n * 2;
    };

    // Event handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspectRef.current;
      mouseRef.current.y = 0.5 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };

    const handleResize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const nextRadiusScale = getRadiusScale(width);

      if (nextRadiusScale !== radiusScaleRef.current) {
        const ratio = nextRadiusScale / radiusScaleRef.current;
        for (const d of dropsRef.current) {
          d.r = Math.max(0.012, d.r * ratio);
          d.area = Math.PI * d.r * d.r;
        }
        radiusScaleRef.current = nextRadiusScale;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      aspectRef.current = width / height;
      material.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
      updateBackground();
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', () => { mouseRef.current.down = true; });
    renderer.domElement.addEventListener('pointerup', () => { mouseRef.current.down = false; });
    renderer.domElement.addEventListener('pointerleave', () => {
      mouseRef.current.active = false;
      mouseRef.current.down = false;
    });
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let last = performance.now();
    let acc = 0;
    let paused = false;
    let animationId: number;

    const handleVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) last = performance.now();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const loop = () => {
      if (paused) {
        animationId = requestAnimationFrame(loop);
        return;
      }
      const now = performance.now();
      const dt = Math.min(now - last, MAX_FRAME_DT_MS);
      last = now;
      acc += dt;

      let g = 0;
      while (acc >= FIXED_DT_MS && g < MAX_CATCHUP) {
        fixedUpdate();
        acc -= FIXED_DT_MS;
        g++;
      }
      if (g >= MAX_CATCHUP) acc = 0;

      material.uniforms.uTime.value = now * 0.001;
      sync();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(loop);
    };
    loop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      backgroundRefreshTimers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      bgTexture.dispose();
      dropletTex.dispose();
    };
  }, [showTitle]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }} />;
}
