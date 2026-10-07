"use client";

import { useState } from "react";
import {
  Send,
  MessageCircle,
  CheckCircle2,
  Upload,
  X,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/config/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [bottleSize, setBottleSize] = useState("500ml");
  const [quantity, setQuantity] = useState("1000");
  const [location, setLocation] = useState("Rishikesh");
  const [message, setMessage] = useState("");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<"primary" | "secondary">("primary");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setLogoFile(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = "Full name is required";
    if (!businessName.trim()) err.businessName = "Business / Event name is required";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      err.phone = "Valid 10-digit phone number is required";
    }
    if (!location.trim()) err.location = "Delivery location is required";
    if (!message.trim() || message.trim().length < 5) {
      err.message = "Please write a brief note about your requirements";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const waContactUrlLine1 = buildWhatsAppLink(
    {
      name,
      businessName,
      phone,
      whatsapp: whatsapp || phone,
      email,
      bottleSize,
      quantity,
      location,
      notes: message || "Direct website contact inquiry.",
    },
    "primary"
  );

  const waContactUrlLine2 = buildWhatsAppLink(
    {
      name,
      businessName,
      phone,
      whatsapp: whatsapp || phone,
      email,
      bottleSize,
      quantity,
      location,
      notes: message || "Direct website contact inquiry.",
    },
    "secondary"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const targetUrl =
      selectedRecipient === "secondary" ? waContactUrlLine2 : waContactUrlLine1;

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageName: "Contact Page",
          pageUrl: typeof window !== "undefined" ? window.location.href : "https://www.aquvana.in/contact",
          formName: "Contact Studio Desk Form",
          formType: "Contact Enquiry",
          name,
          businessName,
          phone,
          whatsapp,
          email,
          bottleSize,
          quantity,
          location,
          message,
          logoDataUrl: logoFile,
          selectedRecipient:
            selectedRecipient === "secondary"
              ? "Owner 2 (82180 86865)"
              : "Owner 1 (90842 77705)",
          honeypot,
          fields: {
            "Contact Person": name,
            "Business / Brand": businessName,
            "Phone Number": phone,
            "WhatsApp Number": whatsapp || phone,
            "Email Address": email || "Not provided",
            "Bottle Silhouette": bottleSize,
            "Estimated Quantity": `${quantity} Units`,
            "Delivery Location": location,
            "Preferred Owner Line":
              selectedRecipient === "secondary"
                ? "Owner 2 (82180 86865)"
                : "Owner 1 (90842 77705)",
            "Client Message / Notes": message,
          },
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "We couldn't send your enquiry right now. Please try again or contact us directly."
        );
      }

      setIsSubmitted(true);

      // Launch WhatsApp with the entire inquiry pre-filled
      if (typeof window !== "undefined") {
        window.open(targetUrl, "_blank");
      }

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // no-op
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setSubmitError(
        err?.message ||
          "We couldn't send your enquiry right now. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
            Inquiry Ready & WhatsApp Opened
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-heading mt-3">
            Thank You, {name}!
          </h3>
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold text-xs sm:text-sm max-w-md mx-auto mt-2.5">
            Thank you! We&apos;ve received your enquiry. We&apos;ll get back to you shortly.
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            Your inquiry for <strong className="text-slate-900">{businessName}</strong> has been prepared and opened in WhatsApp. Simply tap send in your WhatsApp window!
          </p>
        </div>

        {/* Dual WhatsApp Buttons */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Did WhatsApp not open? Or want to notify both owners?
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={waContactUrlLine1}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Send to Owner 1 (90842 77705)</span>
            </a>

            <a
              href={waContactUrlLine2}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0B1220] hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all border border-slate-700"
            >
              <MessageCircle className="w-4 h-4 text-[#22D3EE]" />
              <span>Send to Owner 2 (82180 86865)</span>
            </a>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-[#0B1220] transition-colors"
          >
            Submit Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6"
    >
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
          Send Your Order Specifications
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Submitting this form connects directly with our owners on WhatsApp with your exact order requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alok Verma"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Business / Event Name *
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Ganga Retreat & Spa"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
          {errors.businessName && (
            <p className="text-xs text-rose-500 mt-1">{errors.businessName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Phone Number (Calls) *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            WhatsApp Number (Optional)
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="If different from phone"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Bottle Size *
          </label>
          <select
            value={bottleSize}
            onChange={(e) => setBottleSize(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none font-semibold"
          >
            <option value="250ml">250 ML (Welcome & Valet)</option>
            <option value="500ml">500 ML (Dining & Events — Most Popular)</option>
            <option value="1000ml">1 Litre (Suites & Banquets)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Approx. Quantity *
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none font-semibold"
          >
            <option value="500">500 Bottles (Starter Batch)</option>
            <option value="1000">1,000 Bottles</option>
            <option value="2500">2,500 Bottles</option>
            <option value="5000">5,000 Bottles</option>
            <option value="10000+">10,000+ Bottles</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Delivery City *
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Rishikesh, Dehradun"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
          {errors.location && (
            <p className="text-xs text-rose-500 mt-1">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Work Email (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="concierge@resort.com"
            className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Attach Logo (Optional)
          </label>
          {logoFile ? (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-xs text-emerald-700 font-semibold">
                Logo Attached
              </span>
              <button
                type="button"
                onClick={() => setLogoFile(null)}
                className="text-slate-400 hover:text-rose-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-400 text-xs text-slate-600">
              <Upload className="w-4 h-4 text-[#0284c7]" />
              <span>Upload PNG, JPG, or SVG</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleLogoUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Project Notes / Delivery Timing *
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your event dates, design preferences, or recurring delivery requirements..."
          className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
        />
        {errors.message && (
          <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Recipient Owner Selection */}
      <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Send This Query to Owner:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedRecipient("primary")}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selectedRecipient === "primary"
                ? "bg-white border-emerald-500 ring-1 ring-emerald-500 shadow-2xs"
                : "bg-white/70 border-slate-200 hover:bg-white text-slate-600"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                selectedRecipient === "primary"
                  ? "border-emerald-600"
                  : "border-slate-300"
              }`}
            >
              {selectedRecipient === "primary" && (
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-[#0B1220]">
                First Owner: {SITE_CONFIG.contact.phoneDisplay}
              </div>
              <div className="text-[10.5px] text-slate-500">
                {SITE_CONFIG.contact.primaryDeskLabel}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRecipient("secondary")}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selectedRecipient === "secondary"
                ? "bg-white border-[#0B1220] ring-1 ring-[#0B1220] shadow-2xs"
                : "bg-white/70 border-slate-200 hover:bg-white text-slate-600"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                selectedRecipient === "secondary"
                  ? "border-[#0B1220]"
                  : "border-slate-300"
              }`}
            >
              {selectedRecipient === "secondary" && (
                <div className="w-2 h-2 rounded-full bg-[#0B1220]" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-[#0B1220]">
                Second Owner: {SITE_CONFIG.contact.phoneSecondaryDisplay}
              </div>
              <div className="text-[10.5px] text-slate-500">
                {SITE_CONFIG.contact.secondaryDeskLabel}
              </div>
            </div>
          </button>
        </div>
      </div>

      {submitError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm">
          {submitError}
        </div>
      )}

      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="website_url_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Sending Enquiry...</span>
          ) : (
            <>
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Submit & Send Query on WhatsApp</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-1 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Opens WhatsApp immediately with your pre-filled message
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Direct connection to owners (no middlemen)
        </span>
      </div>
    </form>
  );
}
