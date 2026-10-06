"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import RealisticBottleMockup from "@/components/visual/RealisticBottleMockup";

const SAMPLE_PREVIEWS = [
  {
    name: "APNA SIP WATER",
    tagline: "Simple. Pure. Yours.",
    logoUrl: "/logo-white.png",
    size: "500ml" as const,
    labelColor: "#0B1B36",
    labelTextColor: "#FFFFFF",
    accentColor: "#00A3FF",
  },
  {
    name: "The Glasshouse",
    tagline: "Boutique Resort • Rishikesh",
    logoUrl: null,
    size: "500ml" as const,
    labelColor: "#0B1220",
    labelTextColor: "#FFFFFF",
    accentColor: "#22D3EE",
  },
  {
    name: "The Olive Table",
    tagline: "Artisan Bistro & Cafe",
    logoUrl: null,
    size: "500ml" as const,
    labelColor: "#1E293B",
    labelTextColor: "#F8FAFC",
    accentColor: "#38BDF8",
  },
];

export default function Hero() {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const currentSample = SAMPLE_PREVIEWS[activeSampleIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-[#F8FAFC]/60 via-white/40 to-[#F8FAFC]/60 backdrop-blur-[0.5px]">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/30 via-cyan-50/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: B2B Copy & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & Authority Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A3FF]" />
              </span>
              <span>Apna Sip Water • Himalayan Purity & Custom Bottling Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1220] tracking-tight font-heading leading-[1.08]">
              Your Brand.
              <br />
              <span className="bg-gradient-to-r from-[#0B1220] via-slate-800 to-sky-700 bg-clip-text text-transparent">
                On Every Bottle.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Custom-branded drinking water designed for hotels, restaurants, weddings, events, and businesses. Turn a 30-minute guest hydration moment into an unforgettable signature brand touchpoint.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B1220] text-white text-sm sm:text-base font-bold shadow-md hover:bg-slate-800 hover:shadow-lg transition-all active:scale-98"
              >
                <span>Get a Custom Quote</span>
                <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
              </Link>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 border border-slate-300 text-sm sm:text-base font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
              >
                <span>Explore Our Bottles</span>
              </Link>
            </div>

            {/* Fast Proof / Interactive Pill Switcher */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                  Live Label Demos:
                </span>
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  {SAMPLE_PREVIEWS.map((sample, idx) => (
                    <button
                      key={sample.name}
                      onClick={() => setActiveSampleIndex(idx)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        activeSampleIndex === idx
                          ? "bg-[#0B1220] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero plate setup fee
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                Free digital 3D proof before printing
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0B1220]" />
                Direct venue delivery across Uttarakhand
              </span>
            </div>
          </div>

          {/* Right Column: Realistic 3D Floating Bottle Visual (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Background circular highlight card */}
            <div className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-white to-slate-100/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center relative overflow-hidden">
              
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#22D3EE]/15 text-[#0284c7] text-[11px] font-bold uppercase tracking-wider">
                  Interactive Preview
                </span>
              </div>

              {/* Dynamic Bottle Mockup Component */}
              <div className="my-2">
                <RealisticBottleMockup
                  size={currentSample.size}
                  brandName={currentSample.name}
                  tagline={currentSample.tagline}
                  logoUrl={currentSample.logoUrl}
                  labelColor={currentSample.labelColor}
                  labelTextColor={currentSample.labelTextColor}
                  accentColor={currentSample.accentColor}
                  floating={true}
                />
              </div>

              {/* Sub-card quick customizer teaser */}
              <div className="w-full mt-4 pt-4 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500">
                  Want to see your company logo on this bottle?
                </p>
                <Link
                  href="#bottle-customizer"
                  className="mt-1 text-xs font-bold text-[#0284c7] hover:underline inline-flex items-center gap-1"
                >
                  <span>Launch Live Bottle Customizer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Under Hero: 250ml, 500ml, 1L + Value Pillars */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "250ml", desc: "Welcome Trays & Hampers" },
            { label: "500ml", desc: "Most Popular Dining & Tables" },
            { label: "1 Litre", desc: "Suites & Long Banquets" },
            { label: "Custom Labels", desc: "Matte, Gloss & Foil Finishes" },
            { label: "Bulk Orders", desc: "Tiers starting from 500 bottles" },
            { label: "Local Delivery", desc: "Rishikesh, Haridwar, D'dun" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-xl p-3 text-center shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="text-sm sm:text-base font-extrabold text-[#0B1220] font-heading">
                {item.label}
              </div>
              <div className="text-[10.5px] text-slate-500 mt-0.5 leading-snug">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
