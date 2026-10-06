import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waLinkLine1 = buildWhatsAppLink({ notes: "Footer contact inquiry." }, "primary");
  const waLinkLine2 = buildWhatsAppLink({ notes: "Footer contact inquiry." }, "secondary");

  return (
    <footer className="bg-[#0B1220] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#22D3EE]"
                >
                  <path
                    d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9v6"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight font-heading">
                  AquaCraft<span className="text-[#22D3EE]">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  Bespoke Bottling Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We empower hospitality leaders, restaurateurs, and event planners to transform packaged drinking water into an elegant brand touchpoint. Bottled with multi-barrier purification and delivered directly to your venue.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 text-xs font-medium text-slate-300 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Serving Uttarakhand & Pan-India
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Bottle Showcase & Specs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing & Calculator
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Bottling Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Studio Desk
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-[#22D3EE] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Segments */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Industries Served
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Hotels & Luxury Resorts
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Restaurants & Cafés
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Destination Weddings
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Corporate Conclaves & Summits
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Celebrations & Galas
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-slate-200">
                  Event Planners & Agencies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Hub */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Studio & Dispatch Hub
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <span>
                  Tapovan, Rishikesh — 249192
                  <br />
                  Uttarakhand, India
                </span>
              </li>
              <li className="space-y-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {SITE_CONFIG.contact.primaryDeskLabel}:
                  </span>
                </div>
                <div className="pl-5 flex items-center gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-white font-semibold transition-colors"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <a
                    href={waLinkLine1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-medium inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WA Line 1</span>
                  </a>
                </div>
              </li>

              <li className="space-y-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {SITE_CONFIG.contact.secondaryDeskLabel}:
                  </span>
                </div>
                <div className="pl-5 flex items-center gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s+/g, "")}`}
                    className="hover:text-white font-semibold transition-colors"
                  >
                    {SITE_CONFIG.contact.phoneSecondaryDisplay}
                  </a>
                  <a
                    href={waLinkLine2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-medium inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WA Line 2</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved. Packaged drinking water processed under rigorous multi-barrier hygienic standards.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Purity Standards
            </Link>
            <Link href="/pricing" className="hover:text-slate-300 transition-colors">
              Order Policies
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Concierge Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
