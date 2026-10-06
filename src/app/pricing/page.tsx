"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Check,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { PRICING_TIERS, PRICING_VARIABLES } from "@/data/pricing-tiers";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function PricingPage() {
  // Quote Calculator State
  const [calcBottleSize, setCalcBottleSize] = useState("500ml");
  const [calcQuantity, setCalcQuantity] = useState("1000");
  const [calcCustomization, setCalcCustomization] = useState("Standard Matte BOPP");
  const [calcDeliveryCity, setCalcDeliveryCity] = useState("Rishikesh");

  const waCalculatorUrl = buildWhatsAppLink({
    bottleSize: calcBottleSize,
    quantity: calcQuantity,
    labelStyle: calcCustomization,
    location: calcDeliveryCity,
    notes: `Calculated quote estimate for ${calcQuantity} bottles (${calcBottleSize}) delivered to ${calcDeliveryCity}.`,
  });

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Volume & Order Architecture"
          title="Transparent Tiered Packaging Estimates"
          subtitle="Because custom-branded water involves bespoke label print plates, food-grade bottling runs, and regional freight logistics, we quote based on verified volume tiers."
          align="center"
        />

        {/* INTERACTIVE QUOTE CALCULATOR */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#22D3EE] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0B1220] font-heading">
                Interactive Order Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Configure your required volume, size, and destination to request a formal quotation.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Bottle Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Bottle Silhouette
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "250ml", name: "250 ML", desc: "Welcome" },
                  { id: "500ml", name: "500 ML", desc: "Dining" },
                  { id: "1000ml", name: "1 Litre", desc: "Suites" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCalcBottleSize(s.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      calcBottleSize === s.id
                        ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-xs"
                        : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-[#0B1220]">{s.name}</div>
                    <div className="text-[10px] text-slate-500">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Order Quantity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Order Volume Tier
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "500", label: "500 Units", note: "Starter Batch" },
                  { id: "1000", label: "1,000 Units", note: "Hospitality Standard" },
                  { id: "5000", label: "5,000 Units", note: "High Volume" },
                  { id: "10000+", label: "10,000+ Units", note: "Enterprise Contract" },
                ].map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCalcQuantity(q.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      calcQuantity === q.id
                        ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-xs"
                        : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0B1220]">{q.label}</div>
                    <div className="text-[10px] text-slate-500">{q.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Customization Finish */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Customization & Label Finish
              </label>
              <select
                value={calcCustomization}
                onChange={(e) => setCalcCustomization(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-3 text-sm text-[#0B1220] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              >
                <option value="Standard Matte BOPP">Standard Matte BOPP (Waterproof)</option>
                <option value="High-Gloss BOPP">High-Gloss BOPP (Vibrant Saturation)</option>
                <option value="Metallic Gold/Silver Foil">Metallic Foil Accent (Specular Luxury)</option>
                <option value="Velvet Touch Soft-Matte">Velvet Touch Soft-Matte (Five-Star Resort)</option>
              </select>
            </div>

            {/* 4. Delivery Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Delivery Destination
              </label>
              <input
                type="text"
                value={calcDeliveryCity}
                onChange={(e) => setCalcDeliveryCity(e.target.value)}
                placeholder="e.g. Tapovan, Rishikesh / Dehradun"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Direct venue delivery across Uttarakhand; freight routes pan-India.
              </span>
            </div>
          </div>

          {/* Calculator Output Summary Box */}
          <div className="mt-8 bg-[#0B1220] text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#22D3EE]">
                Configured Summary
              </span>
              <div className="text-xl sm:text-2xl font-extrabold font-heading">
                {calcQuantity} × {calcBottleSize} Bottles
              </div>
              <p className="text-xs text-slate-300">
                Finish: {calcCustomization} • Destination: {calcDeliveryCity}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/quote?size=${calcBottleSize}&qty=${calcQuantity}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0B1220] text-xs sm:text-sm font-extrabold hover:bg-slate-100 transition-all shadow-sm active:scale-98"
              >
                <span>Request Final Quote</span>
                <ArrowRight className="w-4 h-4 text-[#0284c7]" />
              </Link>

              <a
                href={waCalculatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${
                tier.isPopular
                  ? "border-[#0284c7] shadow-lg ring-1 ring-sky-300"
                  : "border-slate-200/90 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {tier.name}
                  </span>
                  {tier.isPopular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-[#22D3EE]">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="text-2xl font-extrabold text-[#0B1220] font-heading">
                    {tier.quantityRange}
                  </div>
                  <div className="text-xs font-semibold text-[#0284c7] mt-1">
                    {tier.pricingLabel}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                <div className="mt-6 space-y-2.5">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <Link
                  href={`/quote?tier=${tier.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0B1220] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Factors Explanation */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 text-[#0B1220] font-bold text-lg font-heading mb-4">
            <HelpCircle className="w-5 h-5 text-[#0284c7]" />
            <h3>Why We Don&apos;t Publish Deceptive Fixed Prices</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Generic commodity water companies quote flat prices by using cheap thin plastic, generic paper labels that peel off in ice buckets, and unverified filtration. At AquaCraft, we operate as a bespoke packaging studio:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICING_VARIABLES.map((v, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] border border-slate-200/70 p-4 rounded-xl text-xs"
              >
                <div className="font-bold text-[#0B1220]">{v.title}</div>
                <div className="text-slate-500 mt-1 leading-relaxed">{v.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics & Delivery Standards */}
        <div className="bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-bold uppercase tracking-wider text-sky-800">
              <Truck className="w-4 h-4 text-[#0284c7]" />
              Direct-to-Venue Logistics
            </div>
            <h4 className="text-lg font-bold text-[#0B1220] font-heading">
              Dedicated Delivery in Rishikesh, Haridwar, & Dehradun
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Local studio fleet ensures punctual arrival directly to resort reception, hotel stores, or event banquet lawns. Scheduled freight routes service Delhi NCR and pan-India.
            </p>
          </div>

          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1220] text-white text-xs font-bold hover:bg-slate-800 shrink-0"
          >
            <span>Request Formal Quotation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
