import { Check, X, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Custom Label Design",
      desc: "Tailored typography, colors, and layout crafted to mirror your establishment's luxury aesthetic.",
    },
    {
      title: "Flexible Order Quantities",
      desc: "Accessible starter batches starting from 500 bottles up to recurring multi-thousand pallet schedules.",
    },
    {
      title: "Premium Presentation",
      desc: "Optically pristine PET, tamper-proof airtight closures, and scratch-resistant waterproof label stocks.",
    },
    {
      title: "Simple Ordering",
      desc: "Zero bureaucracy: share your logo, approve a 3D digital proof, and track your scheduled delivery date.",
    },
    {
      title: "Local Delivery Options",
      desc: "Direct-to-venue delivery across Rishikesh, Haridwar, Dehradun, with pan-India road freight routes.",
    },
    {
      title: "Responsive Support",
      desc: "Direct communication with a human packaging concierge via WhatsApp or phone throughout your order.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Bespoke Difference"
          title="Built Around Your Brand"
          subtitle="Why leading hospitality properties and event organizers transition from generic commercial bottled water to custom-branded presentation."
          align="center"
        />

        {/* 6 Key Pillars */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, i) => (
            <div
              key={i}
              className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 hover:border-slate-300 hover:shadow-2xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B1220] shadow-2xs font-extrabold text-xs">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-[#0B1220] font-heading mt-4">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Side-by-side comparison table card */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0B1220] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE] inline-flex items-center gap-1.5 mb-2">
              <Shield className="w-4 h-4" />
              Side-By-Side Comparison
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Generic Retail Water vs. Your Custom Brand
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every detail in your restaurant or resort is curated—your table water should be no exception.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Generic Water */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Generic Commercial Bottled Water
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Promotes a third-party commercial brand on your tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Lacks personal connection to your event or property</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Standard commodity packaging with generic retail appearance</span>
                </li>
              </ul>
            </div>

            {/* Custom Branded Water */}
            <div className="bg-white/10 border border-[#22D3EE]/30 rounded-2xl p-5 space-y-3 shadow-inner">
              <div className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
                AquaCraft Custom Branded Water
              </div>
              <ul className="space-y-2.5 text-xs text-slate-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>Reinforces YOUR brand identity in guests’ hands for 30–60 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>Customizable label colors, monograms, dates, and QR codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>Premium matte or metallic finishes designed for luxury hospitality</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Ready to elevate your guest tables with custom bottles?
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22D3EE] text-slate-950 font-bold text-xs hover:bg-[#67e8f9] transition-all shadow-sm"
            >
              <span>Get Your Custom Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
