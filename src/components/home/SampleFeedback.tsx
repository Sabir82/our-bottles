"use client";

import { useState } from "react";
import { Info, MessageSquareQuote, Sparkles, Building2, Utensils, HeartHandshake } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { SAMPLE_FEEDBACK, SAMPLE_FEEDBACK_LABEL } from "@/data/sample-feedback";

const CATEGORIES = [
  { id: "all", label: "All Testimonials" },
  { id: "resort", label: "Hotels & Resorts", icon: Building2 },
  { id: "dining", label: "Cafés & Dining", icon: Utensils },
  { id: "wedding", label: "Weddings", icon: HeartHandshake },
];

export default function SampleFeedback() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFeedback = SAMPLE_FEEDBACK.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "resort") return item.scenario.includes("Resort") || item.scenario.includes("Banquet");
    if (activeCategory === "dining") return item.scenario.includes("Cafe") || item.scenario.includes("Dining");
    if (activeCategory === "wedding") return item.scenario.includes("Wedding");
    return true;
  });

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-[#F8FAFC]/65 backdrop-blur-[0.5px] border-b border-slate-200/60 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Transparent Notice Banner */}
        <div className="max-w-2xl mx-auto mb-8 bg-sky-50/90 border border-sky-200 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-sky-800 text-center font-medium shadow-2xs">
          <Info className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{SAMPLE_FEEDBACK_LABEL}</span>
        </div>

        <SectionHeading
          eyebrow="Sample Testimonials & Feedback"
          title="What Hospitality & Event Partners Say"
          subtitle="Real-world scenarios showing how custom-branded water bottles transform guest rooms, restaurant tables, and riverside wedding ceremonies."
          align="center"
        />

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0B1220] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Feedback Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeedback.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 shadow-2xs relative group"
            >
              <div>
                {/* Scenario Tag & Quote Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
                    {item.scenario}
                  </span>
                  <MessageSquareQuote className="w-4 h-4 text-[#0284c7] group-hover:scale-110 transition-transform" />
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              {/* Author with Initials Avatar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B1220] text-[#22D3EE] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs border border-slate-700">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0B1220] truncate">
                    {item.authorName}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.roleOrCompany} • {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance & Replacement Notice */}
        <div className="mt-10 text-center max-w-xl mx-auto space-y-1">
          <p className="text-xs text-slate-500">
            Notice: Feedback entries above represent clearly marked demonstration scenarios.
          </p>
          <p className="text-[11px] text-slate-400">
            In accordance with verified transparency standards, we do not publish fabricated ratings or unverified statistics.
          </p>
        </div>
      </div>
    </section>
  );
}
