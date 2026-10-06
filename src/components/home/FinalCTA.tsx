import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function FinalCTA() {
  const waUrl = buildWhatsAppLink({
    notes: "Hello, I am ready to plan a custom water bottle order for my business/event.",
  });

  return (
    <section className="py-20 sm:py-28 bg-[#0B1220] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#22D3EE]/15 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-white.png"
            alt="Apna Sip Water — Simple. Pure. Yours."
            width={190}
            height={62}
            unoptimized
            className="!h-[90px] w-auto object-contain opacity-95 drop-shadow-sm"
          />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#22D3EE] text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          Elevate Your Hospitality Presence
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
          Let&apos;s Put Your Brand
          <br />
          <span className="bg-gradient-to-r from-white via-slate-200 to-[#22D3EE] bg-clip-text text-transparent">
            On The Bottle.
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us what you need and we&apos;ll help you plan your custom water order with digital proofing, accurate volume pricing, and reliable delivery.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#0B1220] text-sm sm:text-base font-extrabold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl active:scale-98"
          >
            <span>Get a Custom Quote</span>
            <ArrowRight className="w-4 h-4 text-[#0284c7]" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold transition-all shadow-md active:scale-98"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Direct dispatch across Rishikesh • Haridwar • Dehradun • Pan-India
        </p>
      </div>
    </section>
  );
}
