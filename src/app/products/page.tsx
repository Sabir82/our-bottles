import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Droplets, Sparkles, Layers, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import RealisticBottleMockup from "@/components/visual/RealisticBottleMockup";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Bottle Silhouettes & Label Finishes | Apna Sip Water",
  description:
    "Explore our 500ml, 1L, and 250ml bottle silhouettes. Engineered with crystal-clear BPA-free PET, waterproof luxury label finishes, and multi-barrier purification.",
};

export default function ProductsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Packaging Architecture"
          title="Engineered For Distinction"
          subtitle="Every silhouette is crafted from optically pristine, food-grade virgin PET with tamper-evident safety closures and high-definition waterproof label stock."
          align="center"
        />

        {/* Product Deep-Dive Cards */}
        <div className="space-y-12">
          {PRODUCTS.map((product, idx) => {
            const isReversed = idx % 2 === 1;
            const is500 = product.id === "500ml";
            const sizeParam = is500 ? "500ml" : product.id === "1000ml" ? "1000ml" : "250ml";

            return (
              <div
                key={product.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Column */}
                <div
                  className={`lg:col-span-5 flex justify-center bg-gradient-to-b from-slate-50 to-[#F8FAFC] border border-slate-100 rounded-2xl p-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <RealisticBottleMockup
                    size={sizeParam}
                    brandName={
                      is500
                        ? "GRAND HERITAGE"
                        : sizeParam === "1000ml"
                        ? "SUMMIT CONCLAVE"
                        : "TASTING SALON"
                    }
                    tagline="Bespoke Packaged Water"
                    labelColor="#0B1220"
                    labelTextColor="#FFFFFF"
                    accentColor="#22D3EE"
                    floating={false}
                  />
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    {product.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                        {product.badge}
                      </span>
                    )}
                    <h2 className="text-3xl font-extrabold text-[#0B1220] font-heading">
                      {product.name}
                    </h2>
                    <p className="text-sm font-semibold text-[#0284c7] mt-1">
                      {product.tagline}
                    </p>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Height</span>
                      <strong className="text-slate-800">{product.specs.height}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Diameter</span>
                      <strong className="text-slate-800">{product.specs.diameter}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Label Canvas</span>
                      <strong className="text-slate-800">{product.specs.labelDimensions}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Material</span>
                      <strong className="text-slate-800">Virgin BPA-Free PET</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Min Order</span>
                      <strong className="text-slate-800">{product.recommendedMinOrder} Bottles</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Shelf Life</span>
                      <strong className="text-slate-800">6 Months</strong>
                    </div>
                  </div>

                  {/* Ideal Applications */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Designed Specifically For:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.idealFor.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-700"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/quote?size=${sizeParam}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B1220] text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-xs"
                    >
                      <span>Request Quote for {product.capacity}</span>
                      <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
                    </Link>

                    <Link
                      href="/#bottle-customizer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>Preview in Customizer</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Label Finishes & Material Specifications */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          <SectionHeading
            eyebrow="Finishing Craft"
            title="Premium Label Stocks & Finishes"
            subtitle="Labels that resist ice-bucket condensation, handling, and prolonged table service without peeling or smearing."
            align="left"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Finishing 01
              </div>
              <h3 className="text-lg font-bold text-[#0B1220] mt-1">
                Ultra-Matte Velvet
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Anti-glare, non-reflective matte lamination with a silky soft-touch feel. Ideal for subdued luxury resort branding and editorial wedding palettes.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Finishing 02
              </div>
              <h3 className="text-lg font-bold text-[#0B1220] mt-1">
                Gloss Waterproof BOPP
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                High-sheen optical clarity that accentuates vibrant brand colors and photography. 100% waterproof and submerged-ice resistant.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Finishing 03
              </div>
              <h3 className="text-lg font-bold text-[#0B1220] mt-1">
                Metallic Foil Accent
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Hot-stamp gold, silver, or rose-copper foil highlights on key crests, borders, and monograms. Creates dazzling specular glimmer under banquet chandeliers.
              </p>
            </div>
          </div>
        </div>

        {/* Water Quality & Purification Process */}
        <div className="bg-[#0B1220] text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE] inline-flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4" />
              Multi-Barrier Purity
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Pristine Water Quality Inside Every Bottle
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Your brand is backed by rigorous water purification standards. Every batch undergoes multi-barrier RO filtration, micron sediment polishing, UV disinfection, and essential electrolyte replenishment.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <Droplets className="w-5 h-5 text-[#22D3EE] mb-2" />
              <div className="font-bold text-white">Reverse Osmosis</div>
              <div className="text-slate-400 mt-0.5">Sub-micron molecular filtration</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <Sparkles className="w-5 h-5 text-[#22D3EE] mb-2" />
              <div className="font-bold text-white">UV Sterilization</div>
              <div className="text-slate-400 mt-0.5">Microbiological protection</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <Layers className="w-5 h-5 text-[#22D3EE] mb-2" />
              <div className="font-bold text-white">Ozone Polishing</div>
              <div className="text-slate-400 mt-0.5">Preserves crisp mineral balance</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#22D3EE] mb-2" />
              <div className="font-bold text-white">Tamper Evident</div>
              <div className="text-slate-400 mt-0.5">Hermetically sealed neck closure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
