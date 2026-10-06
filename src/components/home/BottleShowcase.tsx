"use client";

import Link from "next/link";
import { ArrowRight, Check, Droplets, Sparkles, Layers } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import RealisticBottleMockup from "@/components/visual/RealisticBottleMockup";
import { PRODUCTS } from "@/data/products";

interface BottleShowcaseProps {
  onSelectCustomize?: (size: "500ml" | "1000ml" | "250ml") => void;
}

export default function BottleShowcase({ onSelectCustomize }: BottleShowcaseProps) {
  // Sort in natural order: 250ml, 500ml, 1000ml
  const sortedProducts = [
    PRODUCTS.find((p) => p.id === "250ml")!,
    PRODUCTS.find((p) => p.id === "500ml")!,
    PRODUCTS.find((p) => p.id === "1000ml")!,
  ].filter(Boolean);

  return (
    <section id="bottles" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Curated Silhouettes"
          title="250ml, 500ml & 1 Litre Silhouettes"
          subtitle="Explore our three precision-molded bottle silhouettes. Engineered with crystal optical clarity, airtight seals, and generous 360-degree wrap canvas for your brand."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sortedProducts.map((product) => {
            const is250 = product.id === "250ml";
            const is500 = product.id === "500ml";
            const sizeParam = is250 ? "250ml" : is500 ? "500ml" : "1000ml";

            return (
              <div
                key={product.id}
                className={`bg-white border rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  product.isPopular
                    ? "border-sky-400 shadow-lg ring-1 ring-sky-300 md:-translate-y-2"
                    : "border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-5 right-5 z-10">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        product.isPopular
                          ? "bg-slate-900 text-[#22D3EE] shadow-xs"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                      {product.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Visual Preview Box */}
                  <div className="w-full bg-gradient-to-b from-slate-50 to-[#F8FAFC] border border-slate-100 rounded-2xl p-4 flex items-center justify-center min-h-[340px] relative overflow-hidden">
                    <RealisticBottleMockup
                      size={sizeParam}
                      brandName={
                        is250
                          ? "AURA WELCOME"
                          : is500
                          ? "THE GRAND RESORT"
                          : "TASTING TABLE"
                      }
                      tagline={
                        is250
                          ? "Welcome Trays & Hampers"
                          : is500
                          ? "Fine Dining Table Service"
                          : "Presidential Suites & Summits"
                      }
                      labelColor="#0B1220"
                      labelTextColor="#FFFFFF"
                      accentColor="#22D3EE"
                      floating={false}
                    />
                  </div>

                  {/* Product Title & Tagline */}
                  <div className="mt-5">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
                        {product.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {product.capacity}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                      {product.tagline}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Ideal For Section */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h4 className="text-[11px] font-bold text-[#0B1220] uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <Droplets className="w-3.5 h-3.5 text-[#0284c7]" />
                      Ideal Applications:
                    </h4>
                    <div className="space-y-1.5">
                      {product.idealFor.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs Summary */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10.5px] text-slate-500 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-700">Dimensions:</span> {product.specs.height} × {product.specs.diameter}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Label:</span> {product.specs.labelDimensions}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Closure:</span> Tamper-evident
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Min Order:</span> {product.recommendedMinOrder} Units
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    href={`/quote?size=${sizeParam}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1220] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
                  >
                    <span>Customize {product.capacity}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </Link>

                  <a
                    href="#bottle-customizer"
                    onClick={() => {
                      if (onSelectCustomize) {
                        onSelectCustomize(sizeParam);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>Live Studio Preview</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on all 3 formats */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">
            All 3 silhouettes (250ml, 500ml, 1 Litre) can be ordered individually or combined in tiered hospitality batches.{" "}
            <Link
              href="/contact"
              className="text-[#0284c7] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Speak to our packaging team</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
