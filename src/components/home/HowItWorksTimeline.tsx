import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export default function HowItWorksTimeline() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Bottle",
      desc: "Select the ideal bottle silhouette for your hospitality setting—our popular 500ml dining format or commanding 1L banquet silhouette.",
      tag: "Step 1: Selection",
    },
    {
      num: "02",
      title: "Share Your Brand",
      desc: "Submit your high-resolution logo, desired color palette, and label finish preference (Ultra-Matte Velvet, Gloss BOPP, or Metallic Foil).",
      tag: "Step 2: Artwork",
    },
    {
      num: "03",
      title: "Approve Your Design",
      desc: "Our design desk prepares a complimentary digital 3D cylindrical wrap proof for your exact review and verification before any printing begins.",
      tag: "Step 3: Proofing",
    },
    {
      num: "04",
      title: "We Produce & Deliver",
      desc: "We process, bottle, seal, and dispatch your custom batch directly to your hotel, restaurant, or event venue across Uttarakhand or pan-India.",
      tag: "Step 4: Fulfillment",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white/70 backdrop-blur-[0.5px] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frictionless Process"
          title="Simple, Transparent Bottling"
          subtitle="From your initial logo submission to venue delivery, our four-step onboarding process ensures pristine print quality and punctual arrival."
          align="center"
        />

        {/* 4-Step Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-slate-300 hover:shadow-xs transition-all duration-200"
            >
              <div>
                {/* Step Number & Eyebrow */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <span className="font-extrabold text-3xl font-heading text-[#0B1220] tracking-tight">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-[#0B1220] font-heading mt-4">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Status footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero guesswork</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B1220] text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-xs"
          >
            <span>Start Your Order Now</span>
            <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
