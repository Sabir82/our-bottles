"use client";

import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Sparkles } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { PRICING_TIERS, PRICING_VARIABLES } from "@/data/pricing-tiers";

export default function PricingSummary() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F8FAFC]/65 backdrop-blur-[0.5px] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Transparent Tiered Structure"
          title="Predictable, Volume-Tiered Pricing"
          subtitle="Because custom packaging involves batch printing, die-cutting, and freight logistics, we operate on clear minimum quantity tiers rather than arbitrary one-price formulas."
          align="center"
        />

        {/* 3 Pricing Tiers Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                tier.isPopular
                  ? "border-[#0284c7] shadow-lg ring-1 ring-sky-300 md:-translate-y-2"
                  : "border-slate-200/90 shadow-2xs hover:border-slate-300"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#0B1220] text-[#22D3EE] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                    Most Popular Choice
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="border-b border-slate-100 pb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {tier.name}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-heading mt-1">
                    {tier.quantityRange}
                  </div>
                  <div className="text-xs font-semibold text-[#0284c7] mt-1">
                    {tier.pricingLabel}
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-700">
                    What&apos;s Included:
                  </div>
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href={`/quote?tier=${tier.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    tier.isPopular
                      ? "bg-[#0B1220] text-white hover:bg-slate-800 shadow-sm"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Variables Explanation Accordion/Grid */}
        <div className="mt-14 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[#0B1220] font-bold text-sm sm:text-base font-heading mb-4">
            <HelpCircle className="w-5 h-5 text-[#0284c7]" />
            <h3>What Factors Determine Your Final Quote?</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-3xl">
            We provide custom formal quotations rather than flat prices because every order is tailored to your brand specifics. Here are the 5 core elements that influence cost:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Need immediate pricing for an upcoming event in Rishikesh or Dehradun?
            </span>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1220] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <span>Get My Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
