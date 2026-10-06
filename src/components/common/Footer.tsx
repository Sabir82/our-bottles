import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const waLinkLine1 = buildWhatsAppLink({ notes: "Footer contact inquiry." }, "primary");
  const waLinkLine2 = buildWhatsAppLink({ notes: "Footer contact inquiry." }, "secondary");

  return (
    <footer className="bg-[#0B1220] text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-slate-800">
          
          {/* Brand Info (Full width on tablet/sm, 2 cols on lg) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0088FF] rounded-xl py-1"
              aria-label="Aquvana Water Home"
            >
              <Image
                src="/logo-white.png"
                alt="Aquvana Water — Simple. Pure. Yours."
                width={190}
                height={95}
                unoptimized
                className="h-14 sm:h-16 md:!h-[80px] w-auto max-w-[220px] sm:max-w-none object-contain transition-transform duration-200 group-hover:scale-104 drop-shadow-sm"
              />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              We empower hospitality leaders, restaurateurs, and event planners to transform packaged drinking water into an elegant brand touchpoint. Bottled with multi-barrier purification and delivered directly to your venue.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
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
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="inline-block py-1 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-white transition-colors">
                  Bottle Showcase & Specs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-block py-1 hover:text-white transition-colors">
                  Pricing & Calculator
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="inline-block py-1 hover:text-white transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1 hover:text-white transition-colors">
                  About Our Bottling Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 hover:text-white transition-colors">
                  Contact Studio Desk
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/quote"
                  className="text-[#22D3EE] font-semibold hover:underline inline-flex items-center gap-1 py-1"
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
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Hotels & Luxury Resorts
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Restaurants & Cafés
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Destination Weddings
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Corporate Conclaves & Summits
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Celebrations & Galas
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1 hover:text-slate-200 transition-colors">
                  Event Planners & Agencies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Hub */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Studio & Dispatch Hub
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Tapovan, Rishikesh — 249192
                  <br />
                  Uttarakhand, India
                </span>
              </li>

              {/* Phone Line 1 */}
              <li className="space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {SITE_CONFIG.contact.primaryDeskLabel}:
                  </span>
                </div>
                <div className="pl-5.5 flex flex-wrap items-center gap-x-3 gap-y-1">
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
                    className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WA Line 1</span>
                  </a>
                </div>
              </li>

              {/* Phone Line 2 */}
              <li className="space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    {SITE_CONFIG.contact.secondaryDeskLabel}:
                  </span>
                </div>
                <div className="pl-5.5 flex flex-wrap items-center gap-x-3 gap-y-1">
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
                    className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WA Line 2</span>
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors break-all sm:break-normal text-xs sm:text-sm"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved. Packaged drinking water processed under rigorous multi-barrier hygienic standards.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-slate-300 transition-colors py-0.5">
              Purity Standards
            </Link>
            <Link href="/pricing" className="hover:text-slate-300 transition-colors py-0.5">
              Order Policies
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors py-0.5">
              Concierge Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
