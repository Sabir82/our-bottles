"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface BackgroundBottleProps {
  opacity?: number; // default low opacity
  className?: string;
}

export default function BackgroundBottle({
  opacity = 0.22,
  className = "",
}: BackgroundBottleProps) {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth parallax calculations
  const translateY = scrollY * 0.12;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden select-none ${className}`}
    >
      {/* Ambient Cyan / Sky Glow Aura behind the bottle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[920px] rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out animate-gentle-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(14, 165, 233, 0.08) 45%, transparent 70%)",
          transform: `translate(-50%, calc(-50% + ${translateY * 0.4}px))`,
        }}
      />

      {/* ONE Single Luxury Bottle Floating & Moving Here and There */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out will-change-transform flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(-50%, calc(-50% + ${translateY}px))`,
        }}
      >
        {/* Continuous organic wandering motion: moving here and there */}
        <div className="animate-bottle-wander flex items-center justify-center">
          <div
            className="relative w-[340px] sm:w-[460px] lg:w-[560px] h-[680px] sm:h-[900px] lg:h-[1050px]"
            style={{
              opacity,
              mixBlendMode: "multiply",
              filter: "contrast(2.14) brightness(2.02)",
              maskImage:
                "radial-gradient(ellipse 70% 84% at 50% 50%, black 55%, rgba(0,0,0,0.65) 78%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 84% at 50% 50%, black 55%, rgba(0,0,0,0.65) 78%, transparent 100%)",
            }}
          >
            <Image
              src="/images/luxury-bottle-bg.jpg"
              alt="Aquvana Water Luxury Bottle Ambient Background"
              fill
              sizes="(max-width: 768px) 340px, (max-width: 1200px) 460px, 560px"
              priority
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Subtle Vector Refraction Lines & Water Ring Accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgWaterFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d={`M ${100} ${300 + (translateY % 200)} Q ${windowWidth / 2} ${
            450 + (translateY % 150)
          } ${windowWidth - 100} ${350 + (translateY % 200)}`}
          stroke="url(#bgWaterFlow)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 12"
          className="transition-all duration-700"
        />
      </svg>
    </div>
  );
}
