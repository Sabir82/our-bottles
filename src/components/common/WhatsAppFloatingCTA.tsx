"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloatingCTA() {
  const waUrl = buildWhatsAppLink({
    notes: "Hello, I am inquiring from your website and would like to ask a quick question.",
  });

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with AquaCraft Studio"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-3 rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/40"
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-bold tracking-wide uppercase hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
