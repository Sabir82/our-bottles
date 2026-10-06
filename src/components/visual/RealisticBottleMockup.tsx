"use client";

import React from "react";
import Image from "next/image";

interface RealisticBottleMockupProps {
  size?: "500ml" | "1000ml" | "250ml";
  brandName?: string;
  tagline?: string;
  logoUrl?: string | null;
  labelColor?: string;
  labelTextColor?: string;
  labelFinish?: "matte" | "gloss" | "metallic";
  capColor?: string;
  accentColor?: string;
  className?: string;
  floating?: boolean;
}

export default function RealisticBottleMockup({
  size = "500ml",
  brandName = "APNA SIP WATER",
  tagline = "Simple. Pure. Yours.",
  logoUrl = "/logo-white.png",
  labelColor = "#0B1B36",
  labelTextColor = "#FFFFFF",
  labelFinish = "matte",
  capColor = "#0B1B36",
  accentColor = "#00A3FF",
  className = "",
  floating = true,
}: RealisticBottleMockupProps) {
  const is1L = size === "1000ml";
  const is250ml = size === "250ml";

  // Automatically select white logo on dark labels and color logo on light labels
  const isDarkLabel =
    labelTextColor.toLowerCase() === "#ffffff" ||
    labelTextColor.toLowerCase() === "#fff" ||
    labelTextColor.toLowerCase() === "#f8fafc" ||
    labelTextColor.toLowerCase().includes("fff");

  const effectiveLogo =
    logoUrl === "/logo.png" || logoUrl === "/logo-white.png"
      ? isDarkLabel
        ? "/logo-white.png"
        : "/logo.png"
      : logoUrl;

  const isWhiteLogo = effectiveLogo === "/logo-white.png";

  // Dimensions configuration
  const bottleHeight = is1L ? 540 : is250ml ? 380 : 470;
  const bottleWidth = is1L ? 180 : is250ml ? 140 : 155;
  const labelHeight = is1L ? 220 : is250ml ? 130 : 175;
  const labelTop = is1L ? 175 : is250ml ? 145 : 160;

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Floating container */}
      <div
        className={`relative flex flex-col items-center ${
          floating ? "animate-bottle-float" : ""
        }`}
        style={{
          width: `${bottleWidth + 40}px`,
          height: `${bottleHeight + 40}px`,
        }}
      >
        {/* Soft Ambient Light Glow Behind Bottle */}
        <div
          className="absolute -inset-4 rounded-full blur-2xl opacity-35 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(224, 242, 254, 0.4) 60%, transparent 80%)`,
          }}
        />

        {/* Realistic SVG Rendering */}
        <svg
          width={bottleWidth}
          height={bottleHeight}
          viewBox={`0 0 ${bottleWidth} ${bottleHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-xl"
        >
          <defs>
            {/* Glass body gradient */}
            <linearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.85" />
              <stop offset="12%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#eff6ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#eff6ff" stopOpacity="0.4" />
              <stop offset="88%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.8" />
            </linearGradient>

            {/* Cylindrical Shadow for Label */}
            <linearGradient id="labelCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
              <stop offset="10%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </linearGradient>

            {/* Specular sheen */}
            <linearGradient id="specularSheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="18%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="26%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Water liquid tint */}
            <linearGradient id="waterLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* 1. BOTTLE CAP */}
          <g id="cap">
            {/* Cap Safety Ring */}
            <rect
              x={bottleWidth / 2 - 20}
              y={30}
              width={40}
              height={7}
              rx={2}
              fill={capColor}
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
            {/* Main Cap */}
            <rect
              x={bottleWidth / 2 - 22}
              y={6}
              width={44}
              height={24}
              rx={4}
              fill={capColor}
            />
            {/* Cap Vertical Ridges */}
            {[-16, -11, -6, -1, 4, 9, 14].map((offset) => (
              <line
                key={offset}
                x1={bottleWidth / 2 + offset}
                y1={9}
                x2={bottleWidth / 2 + offset}
                y2={26}
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
            ))}
            {/* Cap highlight */}
            <rect
              x={bottleWidth / 2 - 16}
              y={7}
              width={8}
              height={22}
              fill="#ffffff"
              fillOpacity="0.25"
              rx={1}
            />
          </g>

          {/* 2. BOTTLE NECK */}
          <rect
            x={bottleWidth / 2 - 16}
            y={37}
            width={32}
            height={22}
            fill="url(#glassBodyGrad)"
            stroke="#94a3b8"
            strokeWidth="0.6"
            strokeOpacity="0.5"
          />

          {/* 3. BOTTLE SHOULDER (Curved Glass Transition) */}
          <path
            d={`M ${bottleWidth / 2 - 16} 59
               C ${bottleWidth / 2 - 20} 85, 12 110, 12 145
               L 12 ${bottleHeight - 25}
               C 12 ${bottleHeight - 5}, ${bottleWidth / 2 - 30} ${bottleHeight - 4}, ${bottleWidth / 2} ${bottleHeight - 4}
               C ${bottleWidth / 2 + 30} ${bottleHeight - 4}, ${bottleWidth - 12} ${bottleHeight - 5}, ${bottleWidth - 12} ${bottleHeight - 25}
               L ${bottleWidth - 12} 145
               C ${bottleWidth - 12} 110, ${bottleWidth / 2 + 20} 85, ${bottleWidth / 2 + 16} 59
               Z`}
            fill="url(#glassBodyGrad)"
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Liquid Tint Inside Lower & Middle Portion */}
          <path
            d={`M 15 145
               L 15 ${bottleHeight - 26}
               C 15 ${bottleHeight - 7}, ${bottleWidth - 15} ${bottleHeight - 7}, ${bottleWidth - 15} ${bottleHeight - 26}
               L ${bottleWidth - 15} 145
               Z`}
            fill="url(#waterLiquid)"
          />

          {/* Bottom Grip Grooves (Ergonomic Ridge Lines) */}
          {[bottleHeight - 65, bottleHeight - 50, bottleHeight - 35].map((yPos, i) => (
            <path
              key={i}
              d={`M 18 ${yPos} Q ${bottleWidth / 2} ${yPos + 4} ${bottleWidth - 18} ${yPos}`}
              stroke="#64748b"
              strokeWidth="1"
              strokeOpacity="0.35"
              fill="none"
            />
          ))}

          {/* 4. CUSTOMIZABLE BRAND LABEL WRAP */}
          <g id="brand-label">
            {/* Label Background Rect */}
            <rect
              x={12}
              y={labelTop}
              width={bottleWidth - 24}
              height={labelHeight}
              rx={3}
              fill={labelColor}
            />

            {/* Label Finish Texture Overlay */}
            {labelFinish === "metallic" && (
              <rect
                x={12}
                y={labelTop}
                width={bottleWidth - 24}
                height={labelHeight}
                fill="url(#specularSheen)"
                opacity="0.4"
                style={{ mixBlendMode: "overlay" }}
              />
            )}

            {/* Cylindrical wrap shadow overlay */}
            <rect
              x={12}
              y={labelTop}
              width={bottleWidth - 24}
              height={labelHeight}
              rx={3}
              fill="url(#labelCylinder)"
            />

            {/* Top and Bottom Label Border Accents */}
            <line
              x1={12}
              y1={labelTop + 1}
              x2={bottleWidth - 12}
              y2={labelTop + 1}
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.9"
            />
            <line
              x1={12}
              y1={labelTop + labelHeight - 1}
              x2={bottleWidth - 12}
              y2={labelTop + labelHeight - 1}
              stroke={accentColor}
              strokeWidth="2"
              strokeOpacity="0.9"
            />
          </g>

          {/* 5. SPECULAR GLASS HIGHLIGHTS (Front Layer) */}
          <rect
            x={12}
            y={120}
            width={bottleWidth - 24}
            height={bottleHeight - 150}
            fill="url(#specularSheen)"
            style={{ mixBlendMode: "screen", pointerEvents: "none" }}
          />
        </svg>

        {/* 6. DYNAMIC HTML OVERLAY CONTENT (Curved Label Content) */}
        <div
          className="absolute z-20 flex flex-col items-center justify-between text-center px-4 pointer-events-none"
          style={{
            top: `${labelTop + 24}px`,
            left: `${20}px`,
            width: `${bottleWidth - 40}px`,
            height: `${labelHeight - 48}px`,
          }}
        >
          {/* Top Emblem / Logo */}
          <div className="flex flex-col items-center justify-center shrink-0">
            {effectiveLogo ? (
              <div
                className={`relative w-16 h-11 max-h-12 overflow-hidden flex items-center justify-center ${
                  isWhiteLogo ? "" : "bg-white/95 rounded-lg p-1 shadow-2xs"
                }`}
              >
                <Image
                  src={effectiveLogo}
                  alt={brandName}
                  width={64}
                  height={44}
                  className="max-h-full max-w-full object-contain drop-shadow-xs"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border shadow-xs transition-colors duration-300"
                style={{
                  borderColor: accentColor,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                    stroke={accentColor}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Brand Name & Tagline */}
          <div className="flex flex-col items-center my-auto w-full px-1">
            <span
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest leading-tight truncate w-full"
              style={{
                color: labelTextColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {brandName || "YOUR BRAND"}
            </span>
            <span
              className="text-[8px] sm:text-[9px] tracking-wider uppercase font-medium mt-1 opacity-80 truncate w-full"
              style={{ color: labelTextColor }}
            >
              {tagline || "Bespoke Hospitality"}
            </span>
          </div>

          {/* Bottom Specifications */}
          <div className="flex flex-col items-center border-t border-white/20 pt-1 w-full">
            <span
              className="text-[7.5px] uppercase font-bold tracking-widest"
              style={{ color: accentColor }}
            >
              Packaged Drinking Water
            </span>
            <span
              className="text-[8px] font-semibold opacity-75 mt-0.5"
              style={{ color: labelTextColor }}
            >
              Net Quantity: {size}
            </span>
          </div>
        </div>

        {/* 7. REALISTIC BOTTLE BASE SHADOW ON GROUND */}
        <div
          className="absolute -bottom-3 rounded-full blur-md opacity-40 transition-all duration-300"
          style={{
            width: `${bottleWidth - 30}px`,
            height: "16px",
            backgroundColor: "#0B1220",
          }}
        />
      </div>

      {/* Capacity & Size Badge */}
      <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
        <span>{size} Model Silhouette</span>
      </div>
    </div>
  );
}
