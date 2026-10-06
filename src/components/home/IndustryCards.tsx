import Link from "next/link";
import {
  Hotel,
  Utensils,
  HeartHandshake,
  Briefcase,
  Sparkles,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { INDUSTRIES } from "@/data/industries";

const ICON_MAP: Record<string, React.ElementType> = {
  Hotel,
  Utensils,
  HeartHandshake,
  Briefcase,
  Sparkles,
  CalendarCheck,
};

export default function IndustryCards() {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Targeted Solutions"
          title="Made For Your Business"
          subtitle="Every hospitality venue and event requires a tailored bottle presence. Explore how custom branded water integrates seamlessly into your guest journey."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INDUSTRIES.map((industry) => {
            const Icon = ICON_MAP[industry.iconName] || Sparkles;

            return (
              <div
                key={industry.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1220] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#22D3EE]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {industry.accentBadge}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-[#0B1220] font-heading">
                      {industry.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#0284c7] mt-1.5 leading-snug">
                      “{industry.headline}”
                    </p>
                    <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    {industry.keyBenefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Recommended: <strong className="text-slate-800">{industry.suggestedSize}</strong>
                  </span>
                  <Link
                    href={`/quote?category=${encodeURIComponent(industry.title)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B1220] group-hover:text-[#0284c7] transition-colors"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
