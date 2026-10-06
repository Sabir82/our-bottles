"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface DropletParticle {
  id: number;
  x: number;
  y: number;
  r: number; // radius
  vy: number; // vertical velocity
  vx: number; // horizontal drift
  seed: number;
  trail: { x: number; y: number; r: number; alpha: number }[];
  isResting: boolean;
  opacity: number;
  depth: number; // 0.4 to 1.0
}

interface SplashRipple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
  lineWidth: number;
  color: string;
}

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

/**
 * Global helper to trigger a realistic water splash anywhere on the screen
 */
export function triggerWaterSplash(x: number, y: number, intensity = 1) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("aquvana-water-splash", {
        detail: { x, y, intensity },
      })
    );
  }
}

export default function WaterScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // References for animation loop
  const dropletsRef = useRef<DropletParticle[]>([]);
  const ripplesRef = useRef<SplashRipple[]>([]);
  const splashParticlesRef = useRef<SplashParticle[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize particles with medium-sized balanced droplets
  const initDroplets = useCallback((width: number, height: number) => {
    const count = 46;
    const droplets: DropletParticle[] = [];

    for (let i = 0; i < count; i++) {
      const isResting = Math.random() > 0.4;
      const depth = Math.random() * 0.5 + 0.5;
      const baseOpacity = Math.random() * 0.2 + 0.45;

      droplets.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 2.2 + 1.8) * depth,
        vy: isResting ? 0 : Math.random() * 0.7 + 0.35,
        vx: 0,
        seed: Math.random() * 100,
        trail: [],
        isResting,
        opacity: baseOpacity,
        depth,
      });
    }

    dropletsRef.current = droplets;
  }, []);

  // Multi-tier physics-based water splash creation
  const createSplash = useCallback((x: number, y: number, intensity = 1) => {
    // 1. Primary fast sharp ripple
    ripplesRef.current.push({
      x,
      y,
      r: 3,
      maxR: (55 + Math.random() * 20) * intensity,
      alpha: 0.85,
      speed: 130 * intensity,
      lineWidth: 2,
      color: "rgba(56, 189, 248,",
    });

    // 2. Delayed secondary rebound wave
    setTimeout(() => {
      ripplesRef.current.push({
        x,
        y,
        r: 2,
        maxR: (40 + Math.random() * 15) * intensity,
        alpha: 0.65,
        speed: 90 * intensity,
        lineWidth: 1.5,
        color: "rgba(14, 165, 233,",
      });
    }, 70);

    // 3. Inner shimmering caustic ring
    ripplesRef.current.push({
      x,
      y,
      r: 1,
      maxR: 24 * intensity,
      alpha: 0.7,
      speed: 65 * intensity,
      lineWidth: 2.2,
      color: "rgba(255, 255, 255,",
    });

    // 4. Burst of arc-trajectory water droplets (fountain/crown effect)
    const particleCount = Math.floor((18 + Math.random() * 10) * Math.min(intensity, 1.8));
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High initial burst speed with upward bias
      const speed = (Math.random() * 140 + 70) * intensity;
      const upwardBias = (Math.random() * 110 + 60) * intensity;

      splashParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - upwardBias, // Arcs upwards first
        r: (Math.random() * 2.2 + 1.2) * Math.min(intensity, 1.5),
        alpha: 0.95,
        life: 0,
        maxLife: Math.random() * 0.45 + 0.55, // 0.55 - 1.0s lifespan
        color: Math.random() > 0.35 ? "#38BDF8" : "#E0F2FE",
      });
    }

    // 5. Also wake up nearby resting droplets
    dropletsRef.current.forEach((drop) => {
      const dx = drop.x - x;
      const dy = drop.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 * intensity && drop.isResting) {
        drop.isResting = false;
        drop.vy = Math.random() * 1.6 + 0.8;
      }
    });
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    initDroplets(width, height);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
      initDroplets(width, height);
    };

    // Auto-splash after 1.8s welcome
    const autoStartTimer = setTimeout(() => {
      createSplash(window.innerWidth * 0.5, window.innerHeight * 0.28, 1.3);

      for (let s = 0; s < 12; s++) {
        setTimeout(() => {
          const depth = Math.random() * 0.5 + 0.5;
          dropletsRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: -10 - Math.random() * 20,
            r: (Math.random() * 2.2 + 1.8) * depth,
            vy: (Math.random() * 1.5 + 1.8) * depth,
            vx: (Math.random() - 0.5) * 0.4,
            seed: Math.random() * 100,
            trail: [],
            isResting: false,
            opacity: Math.random() * 0.18 + 0.5,
            depth,
          });
        }, s * 55);
      }
    }, 1800);

    // Scroll impulse
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (deltaY > 0) {
        scrollVelocityRef.current = Math.min(scrollVelocityRef.current + deltaY * 0.12, 22);

        if (deltaY > 5 && Math.random() < 0.4) {
          const depth = Math.random() * 0.5 + 0.5;
          dropletsRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: -8 - Math.random() * 15,
            r: (Math.random() * 2.2 + 1.8) * depth,
            vy: (Math.random() * 1.5 + 1.6) * depth,
            vx: (Math.random() - 0.5) * 0.35,
            seed: Math.random() * 100,
            trail: [],
            isResting: false,
            opacity: Math.random() * 0.18 + 0.48,
            depth,
          });
        }
      } else if (deltaY < 0) {
        scrollVelocityRef.current = Math.max(scrollVelocityRef.current - 1.2, 0);
      }
    };

    // Click splash interaction everywhere on screen
    const handleClick = (e: MouseEvent) => {
      createSplash(e.clientX, e.clientY, 1.15);
    };

    // Custom event listener for components
    const handleCustomSplash = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.x === "number" && typeof detail.y === "number") {
        createSplash(detail.x, detail.y, detail.intensity || 1.2);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("aquvana-water-splash", handleCustomSplash);

    // Animation loop
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      scrollVelocityRef.current *= 0.92;
      if (scrollVelocityRef.current < 0.04) {
        scrollVelocityRef.current = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Render Expanding Water Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.r += ripple.speed * dt;
        ripple.alpha -= (1 / (ripple.maxR / ripple.speed)) * dt * 0.9;

        if (ripple.alpha <= 0.01 || ripple.r >= ripple.maxR) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Draw outer refraction wave
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${ripple.color} ${Math.max(0, ripple.alpha)})`;
        ctx.lineWidth = ripple.lineWidth;
        ctx.stroke();

        // Shimmering highlight edge on upper-left quadrant
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(1, ripple.r - 2), Math.PI * 0.8, Math.PI * 1.6);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, ripple.alpha * 0.75)})`;
        ctx.lineWidth = ripple.lineWidth * 0.8;
        ctx.stroke();
      }

      // 2. Render Physics-based Splash Droplet Particles
      const GRAVITY = 520; // downward acceleration in px/s^2
      for (let i = splashParticlesRef.current.length - 1; i >= 0; i--) {
        const p = splashParticlesRef.current[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          splashParticlesRef.current.splice(i, 1);
          continue;
        }

        // Update physics
        p.vy += GRAVITY * dt;
        p.vx *= 0.985;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const progress = p.life / p.maxLife;
        const currentAlpha = Math.max(0, (1 - progress) * p.alpha);
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(1 + speed * 0.006, 2.4);
        const angle = Math.atan2(p.vy, p.vx);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.scale(stretch, 1 / Math.sqrt(stretch));

        // Droplet body
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha * 0.85})`;
        ctx.fill();

        // Bright white specular glint on droplet
        ctx.beginPath();
        ctx.arc(-p.r * 0.35, -p.r * 0.35, Math.max(0.6, p.r * 0.38), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
        ctx.fill();

        ctx.restore();
      }

      // 3. Update & render ambient background glass droplets
      if (dropletsRef.current.length > 95) {
        dropletsRef.current.splice(0, dropletsRef.current.length - 95);
      }

      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const drop = dropletsRef.current[i];

        if (!drop.isResting) {
          const scrollBoost = scrollVelocityRef.current * 0.22 * drop.depth;
          drop.vy = Math.min(drop.vy + 0.1 * dt * 60 + scrollBoost * 0.07, 8.5);
          drop.x += Math.sin(drop.y * 0.038 + drop.seed) * 0.38;
          drop.y += drop.vy * (dt * 60);

          if (drop.vy > 0.9 && Math.random() < 0.55) {
            drop.trail.push({
              x: drop.x,
              y: drop.y,
              r: drop.r * 0.62,
              alpha: 0.3 * drop.opacity,
            });
            if (drop.trail.length > 12) {
              drop.trail.shift();
            }
          }

          if (drop.y > height + 22) {
            drop.y = -10;
            drop.x = Math.random() * width;
            drop.trail = [];
            drop.vy = Math.random() * 0.45 + 0.25;
            drop.isResting = Math.random() > 0.42;
          }
        }

        // Draw soft wet trails
        if (drop.trail.length > 1) {
          for (let t = 0; t < drop.trail.length; t++) {
            const tr = drop.trail[t];
            tr.alpha *= 0.94;
            if (tr.alpha > 0.02) {
              ctx.beginPath();
              ctx.arc(tr.x, tr.y, tr.r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(186, 230, 253, ${tr.alpha * 0.8})`;
              ctx.fill();
            }
          }
        }

        // Draw realistic water droplet
        const { x, y, r, opacity } = drop;
        const stretch = drop.isResting ? 1 : Math.min(1 + drop.vy * 0.11, 1.55);

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, stretch);

        // Refraction shadow
        ctx.beginPath();
        ctx.arc(0.6, 0.9, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.12})`;
        ctx.fill();

        // Droplet body
        const radGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.08, 0, 0, r);
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
        radGrad.addColorStop(0.25, `rgba(224, 242, 254, ${opacity * 0.6})`);
        radGrad.addColorStop(0.7, `rgba(186, 230, 253, ${opacity * 0.36})`);
        radGrad.addColorStop(1, `rgba(56, 189, 248, ${opacity * 0.46})`);

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Rim stroke
        ctx.strokeStyle = `rgba(2, 132, 199, ${opacity * 0.28})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();

        // Specular glint
        ctx.beginPath();
        ctx.arc(-r * 0.35, -r * 0.35, Math.max(0.6, r * 0.38), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 1.15)})`;
        ctx.fill();

        // Secondary micro reflection
        ctx.beginPath();
        ctx.arc(r * 0.26, r * 0.3, Math.max(0.45, r * 0.18), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${opacity * 0.6})`;
        ctx.fill();

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(autoStartTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("aquvana-water-splash", handleCustomSplash);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [initDroplets, createSplash]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
    />
  );
}
