import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeading from "@/components/common/SectionHeading";
import { SITE_CONFIG } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Studio Desk | Aquvana Water Rishikesh",
  description:
    "Let's create your bottle. Connect with our bespoke packaging studio in Tapovan, Rishikesh. We deliver custom water bottles across Rishikesh, Haridwar, Dehradun, and pan-India.",
};

export default function ContactPage() {
  const waUrlLine1 = buildWhatsAppLink({ notes: "Line 1 Studio Inquiry." }, "primary");
  const waUrlLine2 = buildWhatsAppLink({ notes: "Line 2 Production Dispatch Inquiry." }, "secondary");

  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Packaging Concierge"
          title="Let's Create Your Bottle."
          subtitle="Whether you need 500 bespoke bottles for a weekend destination wedding or scheduled recurring replenishment for your hotel, our team is ready to assist."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Studio Contact & Local Footprint (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-extrabold text-[#0B1220] font-heading">
                Rishikesh Bottling Studio Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operating directly from Uttarakhand, we specialize in high-touch local service for the Himalayan hospitality belt, with nationwide freight reach.
              </p>

              <div className="space-y-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0B1220] font-bold">Studio Hub:</strong>
                    <span>
                      Tapovan, Rishikesh, Uttarakhand — 249192
                      <br />
                      Servicing Rishikesh, Haridwar, Dehradun & Mussoorie
                    </span>
                  </div>
                </div>

                {/* Line 1: Studio & Design */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] block">
                    {SITE_CONFIG.contact.primaryDeskLabel}
                  </span>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-[#0284c7]" />
                      <a
                        href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                        className="hover:text-[#0284c7] font-bold text-[#0B1220]"
                      >
                        {SITE_CONFIG.contact.phoneDisplay}
                      </a>
                    </span>
                    <a
                      href={waUrlLine1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Line 1</span>
                    </a>
                  </div>
                </div>

                {/* Line 2: Production & Urgent Orders */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] block">
                    {SITE_CONFIG.contact.secondaryDeskLabel}
                  </span>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-[#0284c7]" />
                      <a
                        href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s+/g, "")}`}
                        className="hover:text-[#0284c7] font-bold text-[#0B1220]"
                      >
                        {SITE_CONFIG.contact.phoneSecondaryDisplay}
                      </a>
                    </span>
                    <a
                      href={waUrlLine2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Line 2</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-[#0284c7] shrink-0" />
                  <div>
                    <strong className="block text-[#0B1220] font-bold">Email Inquiries:</strong>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="hover:text-[#0284c7] transition-colors"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-[#0284c7] shrink-0" />
                  <div>
                    <strong className="block text-[#0B1220] font-bold">Operating Hours:</strong>
                    <span>{SITE_CONFIG.contact.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Service Areas Badge List */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Primary Delivery Corridors:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SITE_CONFIG.contact.address.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 bg-[#F8FAFC] border border-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Turnaround Guarantee Pill */}
            <div className="bg-[#0B1220] text-white rounded-2xl p-5 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-[#22D3EE] shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white text-sm">24-Hour Digital Proof Guarantee</div>
                <div className="text-slate-300 mt-0.5">
                  Submit your logo and receive an interactive 3D digital proof before committing.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
