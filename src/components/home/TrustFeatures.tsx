import { Palette, Sparkles, Layers, Truck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export default function TrustFeatures() {
  const features = [
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Your logo, colors and message on every bottle.",
      detail:
        "360-degree cylindrical label wrap printed with high-resolution waterproof ink, matching your brand typography and aesthetic guidelines.",
    },
    {
      icon: Sparkles,
      title: "Premium Presentation",
      description: "Designed to complement your business or event.",
      detail:
        "Optically clear BPA-free PET with crystal reflections, tamper-evident seals, and elegant label finishes that look dignified on every guest table.",
    },
    {
      icon: Layers,
      title: "Flexible Quantities",
      description: "Solutions for events, restaurants, hotels and businesses.",
      detail:
        "From small starter batches of 500 bottles for weekend weddings to scheduled monthly recurring runs for five-star hotels and busy dining rooms.",
    },
    {
      icon: Truck,
      title: "Local Delivery",
      description: "Convenient delivery options for your orders.",
      detail:
        "Direct venue dispatch across Rishikesh, Haridwar, Dehradun, and Mussoorie, with scheduled pallet logistics available pan-India.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Hospitality Advantage"
          title="More Than Water. It's Your Brand."
          subtitle="Packaged water is one of the only items your guests keep directly in front of them for an extended period. We ensure it communicates your dedication to quality."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B1220] group-hover:bg-[#0B1220] group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <Icon className="w-6 h-6 text-[#0284c7] group-hover:text-[#22D3EE] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1220] font-heading mt-5">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center text-[11px] font-semibold text-[#0284c7]">
                  <span>Purity & Craftsmanship</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
