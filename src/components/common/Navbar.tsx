"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const waLinkLine1 = buildWhatsAppLink(
    { notes: "I am reaching out via your website navigation bar (Line 1)." },
    "primary"
  );
  const waLinkLine2 = buildWhatsAppLink(
    { notes: "I am reaching out via your website navigation bar (Line 2)." },
    "secondary"
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5"
          : "bg-[#F8FAFC]/80 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-lg"
            aria-label="AquaCraft Studio Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B1220] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
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
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0B1220] font-heading leading-tight">
                AquaCraft<span className="text-[#0284c7]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                Bespoke Bottling Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {SITE_CONFIG.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#0B1220] bg-slate-100 font-semibold"
                      : "text-slate-600 hover:text-[#0B1220] hover:bg-slate-100/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative group">
              <a
                href={waLinkLine1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B1220] bg-white border border-slate-200 rounded-lg hover:border-slate-300 shadow-xs transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Hover Dropdown for Line 1 / Line 2 */}
              <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50 w-56">
                <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-1 text-xs">
                  <a
                    href={waLinkLine1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800">Line 1: Studio Desk</span>
                    <span className="text-[10px] text-slate-500">Design proofs & custom quotes</span>
                  </a>
                  <a
                    href={waLinkLine2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-2 rounded-lg hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    <span className="font-bold text-slate-800">Line 2: Orders & Dispatch</span>
                    <span className="text-[10px] text-slate-500">Urgent batch coordination</span>
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg bg-[#0B1220] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow active:scale-98"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/quote"
              className="px-3 py-1.5 rounded-md bg-[#0B1220] text-white text-xs font-semibold"
            >
              Get Quote
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0B1220] hover:bg-slate-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {SITE_CONFIG.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-[#0B1220] bg-slate-100 font-semibold"
                      : "text-slate-600 hover:text-[#0B1220] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={waLinkLine1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-medium hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">WhatsApp Line 1</span>
              </div>
              <span className="text-[10px] text-slate-500">Studio & Design</span>
            </a>

            <a
              href={waLinkLine2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-medium hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">WhatsApp Line 2</span>
              </div>
              <span className="text-[10px] text-slate-500">Orders & Dispatch</span>
            </a>

            <Link
              href="/quote"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#0B1220] text-white text-sm font-semibold hover:bg-slate-800 mt-1"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
