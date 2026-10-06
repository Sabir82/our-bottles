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

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

export default function WaterScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // References for animation loop
  const dropletsRef = useRef<DropletParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize particles with medium-sized balanced droplets
  const initDroplets = useCallback((width: number, height: number) => {
    // Balanced medium density: 48 droplets
    const count = 48;
    const droplets: DropletParticle[] = [];

    for (let i = 0; i < count; i++) {
      const isResting = Math.random() > 0.38;
      const depth = Math.random() * 0.5 + 0.5;
      const baseOpacity = Math.random() * 0.2 + 0.48; // Medium opacity 0.48 - 0.68

      droplets.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 2.2 + 1.8) * depth, // Medium droplet radius: 1.8px to 3.8px
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

  // Handle water splash ripple at coordinate
  const createSplash = useCallback((x: number, y: number) => {
    ripplesRef.current.push({
      x,
      y,
      r: 3.5,
      maxR: 42 + Math.random() * 15,
      alpha: 0.48,
    });

    // Scatter 3-4 medium micro beads
    const burstCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 18 + 8;
      const depth = Math.random() * 0.4 + 0.6;
      dropletsRef.current.push({
        id: Date.now() + Math.random(),
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        r: Math.random() * 1.8 + 1.4,
        vy: Math.random() * 1.3 + 0.7,
        vx: (Math.random() - 0.5) * 0.6,
        seed: Math.random() * 100,
        trail: [],
        isResting: false,
        opacity: 0.55,
        depth,
      });
    }
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    initDroplets(width, height);

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
      initDroplets(width, height);
    };

    // AUTOMATIC ACTIVATION: Exactly 2 seconds after page is loaded, trigger medium water cascade
    const autoStartTimer = setTimeout(() => {
      // 1. Ripple in upper center
      createSplash(window.innerWidth * 0.5, window.innerHeight * 0.32);

      // 2. Cascade down 15 medium-sized droplets
      for (let s = 0; s < 15; s++) {
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
        }, s * 50);
      }

      // 3. Wake up resting drops to trickle down
      dropletsRef.current.forEach((drop) => {
        if (drop.isResting && Math.random() < 0.35) {
          drop.isResting = false;
          drop.vy = Math.random() * 1.2 + 0.8;
        }
      });
    }, 2000);

    // Scroll listener: balanced medium velocity reaction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Downward scroll imparts medium downward cascade impulse
      if (deltaY > 0) {
        scrollVelocityRef.current = Math.min(scrollVelocityRef.current + deltaY * 0.12, 22);

        // Spawn a medium droplet while scrolling down
        if (deltaY > 4 && Math.random() < 0.45) {
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

        // Cause resting drops to break free and slide down
        dropletsRef.current.forEach((drop) => {
          if (drop.isResting && Math.random() < 0.06) {
            drop.isResting = false;
            drop.vy = Math.random() * 1.1 + 0.7;
          }
        });
      } else if (deltaY < 0) {
        // Scrolling up gives gentle deceleration
        scrollVelocityRef.current = Math.max(scrollVelocityRef.current - 1.2, 0);
      }
    };

    // Click / touch splash interaction
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea")
      ) {
        return;
      }
      createSplash(e.clientX, e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick);

    // Animation loop
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Dampen scroll velocity smoothly
      scrollVelocityRef.current *= 0.92;
      if (scrollVelocityRef.current < 0.04) {
        scrollVelocityRef.current = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.r += 52 * dt;
        ripple.alpha -= 0.58 * dt;

        if (ripple.alpha <= 0 || ripple.r >= ripple.maxR) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Outer water ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${ripple.alpha * 0.45})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Inner refraction ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.r - 5), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.55})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 2. Ambient occasional trickle
      if (Math.random() < 0.016) {
        const candidate = dropletsRef.current.find((d) => d.isResting);
        if (candidate) {
          candidate.isResting = false;
          candidate.vy = 0.6 + Math.random() * 0.6;
        }
      }

      // Limit particle array size
      if (dropletsRef.current.length > 95) {
        dropletsRef.current.splice(0, dropletsRef.current.length - 95);
      }

      // 3. Update & render droplets
      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const drop = dropletsRef.current[i];

        if (!drop.isResting) {
          // Physics: gravity + medium scroll impulse + balanced terminal velocity
          const scrollBoost = scrollVelocityRef.current * 0.22 * drop.depth;
          drop.vy = Math.min(drop.vy + 0.1 * dt * 60 + scrollBoost * 0.07, 8.5);

          // Organic gentle meander on glass surface
          drop.x += Math.sin(drop.y * 0.038 + drop.seed) * 0.38;
          drop.y += drop.vy * (dt * 60);

          // Medium wet trail tracking
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

          // Off-screen recycle
          if (drop.y > height + 22) {
            drop.y = -10;
            drop.x = Math.random() * width;
            drop.trail = [];
            drop.vy = Math.random() * 0.45 + 0.25;
            drop.isResting = Math.random() > 0.42;
          }
        }

        // Draw soft, translucent wet trails
        if (drop.trail.length > 1) {
          for (let t = 0; t < drop.trail.length; t++) {
            const tr = drop.trail[t];
            tr.alpha *= 0.94; // gracefully evaporates
            if (tr.alpha > 0.02) {
              ctx.beginPath();
              ctx.arc(tr.x, tr.y, tr.r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(186, 230, 253, ${tr.alpha * 0.8})`;
              ctx.fill();
            }
          }
        }

        // Draw medium, realistic water droplet
        const { x, y, r, opacity } = drop;
        const stretch = drop.isResting ? 1 : Math.min(1 + drop.vy * 0.11, 1.55);

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, stretch);

        // A. Medium refraction shadow (bottom-right)
        ctx.beginPath();
        ctx.arc(0.6, 0.9, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.12})`;
        ctx.fill();

        // B. Main water droplet body (radial gradient)
        const radGrad = ctx.createRadialGradient(
          -r * 0.35,
          -r * 0.35,
          r * 0.08,
          0,
          0,
          r
        );
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
        radGrad.addColorStop(0.25, `rgba(224, 242, 254, ${opacity * 0.6})`);
        radGrad.addColorStop(0.7, `rgba(186, 230, 253, ${opacity * 0.36})`);
        radGrad.addColorStop(1, `rgba(56, 189, 248, ${opacity * 0.46})`);

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // C. Clean rim stroke
        ctx.strokeStyle = `rgba(2, 132, 199, ${opacity * 0.28})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();

        // D. Specular gloss glint
        ctx.beginPath();
        ctx.arc(-r * 0.35, -r * 0.35, Math.max(0.7, r * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 1.15)})`;
        ctx.fill();

        // E. Secondary micro reflection
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
