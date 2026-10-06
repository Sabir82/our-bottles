import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Factory,
  ShieldCheck,
  Truck,
  Droplets,
  Heart,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "About Our Studio & Bottling Craft | Apna Sip Water",
  description:
    "We help brands become part of the experience. Learn about Apna Sip Water — Simple. Pure. Yours. Located in Uttarakhand.",
};

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      icon: Palette,
      name: "Design & Proofing",
      desc: "We adapt your logo, brand guidelines, and color values into an engineered 360° cylindrical wrap layout, followed by free 3D digital proofing.",
    },
    {
      num: "02",
      icon: Factory,
      name: "Bespoke Production",
      desc: "Waterproof label stocks are printed with fade-resistant inks, precision-applied onto optically clear food-grade virgin PET bottles.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      name: "Quality & Purification",
      desc: "Water is processed through multi-stage RO, UV microbial treatment, and essential mineral balancing, hermetically sealed under hygienic protocols.",
    },
    {
      num: "04",
      icon: Truck,
      name: "Venue Delivery",
      desc: "Batches are boxed in heavy-duty corrugated cartons and delivered directly to your venue, resort cellar, or banquet staging area.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
            Our Purpose & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] font-heading tracking-tight leading-tight">
            We Help Brands Become Part Of The Experience.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            In modern hospitality and luxury events, true distinction lies in the intentionality of micro-moments. A bottle of water shouldn&apos;t be an afterthought from an external commercial brand—it should be a refined extension of your own identity.
          </p>
        </div>

        {/* The Core Concept */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
              The Hospitality Thesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-heading">
              Why We Founded Apna Sip Water
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When guests arrive at a resort in Rishikesh after a long journey, sit down at a fine-dining table in Dehradun, or attend a destination wedding ceremony along the Ganga in Haridwar, one of the first objects handed to them is a water bottle.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional commercial packaged water promotes someone else’s brand on your tables. We built Apna Sip Water to give hotels, restaurants, planners, and corporate leaders an accessible, reliable, and premium pathway to own that critical touchpoint.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <Droplets className="w-4 h-4 text-[#0284c7]" />
                Purified & Balanced
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <Heart className="w-4 h-4 text-rose-500" />
                Crafted in Uttarakhand
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-500" />
                3D Digital Proofing
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-[#0B1220] text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold font-heading text-white">
              Our Guiding Principles
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
                <span>
                  <strong className="text-white">Design Integrity:</strong> We treat water bottles like high-end fragrance or cosmetic packaging, not industrial commodity bulk.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
                <span>
                  <strong className="text-white">Zero Pretense & Complete Honesty:</strong> Transparent turnaround times, realistic minimums, and upfront quotes without hidden fees.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
                <span>
                  <strong className="text-white">Local Reliability:</strong> Operating directly out of the Rishikesh-Haridwar-Dehradun corridor allows us to respond swiftly to banquet schedules.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div>
          <SectionHeading
            eyebrow="Workflow Integrity"
            title="Design → Production → Quality → Delivery"
            subtitle="A clean linear manufacturing process designed to eliminate errors and ensure consistent quality on every single bottle."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="font-extrabold text-2xl font-heading text-[#0B1220]">
                        {st.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0284c7]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#0B1220] font-heading mt-4">
                      {st.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                    Step {st.num} Protocol
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#0B1220] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Partner With Us For Your Next Event or Season
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            Whether you are preparing for wedding season or planning a complete room amenity upgrade, our concierge team is ready to assist.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0B1220] text-xs sm:text-sm font-bold hover:bg-slate-100 transition-all"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-[#0284c7]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <span>Contact Studio Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
