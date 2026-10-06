"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Hotel,
  Utensils,
  HeartHandshake,
  Briefcase,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Upload,
  X,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const OCCASIONS = [
  { id: "hotel", label: "Hotel / Resort", icon: Hotel, desc: "Room amenities & dining" },
  { id: "restaurant", label: "Restaurant / Café", icon: Utensils, desc: "Table water presentation" },
  { id: "wedding", label: "Wedding", icon: HeartHandshake, desc: "Welcome trays & hampers" },
  { id: "corporate", label: "Corporate", icon: Briefcase, desc: "Conferences & boardrooms" },
  { id: "event", label: "Private Event", icon: Sparkles, desc: "Galas, retreats & parties" },
  { id: "other", label: "Other Business", icon: HelpCircle, desc: "Gyms, salons, studios" },
];

const QUANTITIES = [
  { id: "500", label: "500 Bottles", tier: "Starter Batch", desc: "Weddings & trial runs" },
  { id: "1000", label: "1,000 Bottles", tier: "Most Popular", desc: "Cafes & 2-day events" },
  { id: "5000", label: "5,000 Bottles", tier: "Bulk Volume", desc: "Hotels & recurring service" },
  { id: "10000+", label: "10,000+ Bottles", tier: "Enterprise", desc: "Chains & large conclaves" },
];

const BOTTLE_SIZES = [
  {
    id: "500ml",
    name: "500 ML Silhouette",
    tagline: "Most Popular",
    desc: "Ergonomic dining & event table format",
  },
  {
    id: "1000ml",
    name: "1 Litre Silhouette",
    tagline: "Hospitality & Suites",
    desc: "Commanding presence for conferences & rooms",
  },
  {
    id: "250ml",
    name: "250 ML Express",
    tagline: "Welcome Trays",
    desc: "Compact single-serve for bridal & check-in",
  },
];

export default function QuoteWizard() {
  const searchParams = useSearchParams();

  // Wizard Steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [occasion, setOccasion] = useState("hotel");
  const [quantity, setQuantity] = useState("1000");
  const [bottleSize, setBottleSize] = useState("500ml");
  const [labelFinish, setLabelFinish] = useState("Ultra-Matte Velvet");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Rishikesh / Uttarakhand");
  const [notes, setNotes] = useState("");
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [quoteRecipient, setQuoteRecipient] = useState<"primary" | "secondary">("primary");

  // Auto-fill from query params or session storage
  useEffect(() => {
    const sizeParam = searchParams.get("size");
    if (sizeParam && ["500ml", "1000ml", "250ml"].includes(sizeParam)) {
      setBottleSize(sizeParam);
    }
    const brandParam = searchParams.get("brandName");
    if (brandParam) {
      setBusinessName(brandParam);
    }
  }, [searchParams]);

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoFile(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!businessName.trim()) errors.businessName = "Please enter business or event name";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!location.trim()) errors.location = "Please enter delivery location / city";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const waQuoteUrlLine1 = buildWhatsAppLink(
    {
      name,
      businessName,
      phone,
      whatsapp: whatsapp || phone,
      email,
      eventType: occasion,
      bottleSize,
      quantity,
      labelStyle: labelFinish,
      location,
      notes,
    },
    "primary"
  );

  const waQuoteUrlLine2 = buildWhatsAppLink(
    {
      name,
      businessName,
      phone,
      whatsapp: whatsapp || phone,
      email,
      eventType: occasion,
      bottleSize,
      quantity,
      labelStyle: labelFinish,
      location,
      notes,
    },
    "secondary"
  );

  const handleNext = () => {
    if (currentStep === 4) {
      if (!validateStep4()) return;
      setIsSubmitted(true);

      const targetUrl =
        quoteRecipient === "secondary" ? waQuoteUrlLine2 : waQuoteUrlLine1;
      if (typeof window !== "undefined") {
        window.open(targetUrl, "_blank");
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // no-op if blocked
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto">
      {/* Step Progress Bar */}
      {!isSubmitted && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <span>Step {currentStep} of 4</span>
            <span>
              {currentStep === 1 && "Occasion & Category"}
              {currentStep === 2 && "Volume & Quantity"}
              {currentStep === 3 && "Bottle Specifications"}
              {currentStep === 4 && "Contact & Delivery"}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0B1220] h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Occasion */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
              What are you ordering for?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your business type or event category so we can recommend the optimal bottle and closure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {OCCASIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = occasion === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOccasion(item.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-2xs"
                      : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected
                        ? "bg-[#0B1220] text-[#22D3EE]"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-sm text-[#0B1220]">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Quantity */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
              How many bottles do you anticipate?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our minimum order quantity starts at 500 bottles. Higher volumes benefit from significant batch savings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUANTITIES.map((q) => {
              const isSelected = quantity === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuantity(q.id)}
                  className={`p-5 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-xs"
                      : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xl text-[#0B1220]">
                      {q.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-slate-900 text-[#22D3EE]"
                          : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {q.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">{q.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Bottle Size & Finish */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
              Select bottle size & label finish
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose the physical silhouette and label texture for your brand wrap.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Bottle Silhouette
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BOTTLE_SIZES.map((b) => {
                const isSelected = bottleSize === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBottleSize(b.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-xs"
                        : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm text-[#0B1220]">
                      {b.name}
                    </div>
                    <div className="text-[10px] font-semibold text-[#0284c7] mt-0.5">
                      {b.tagline}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">
                      {b.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Label Stock & Finish
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                "Ultra-Matte Velvet",
                "Gloss Waterproof BOPP",
                "Metallic Foil Accent",
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setLabelFinish(style)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                    labelFinish === style
                      ? "bg-white border-[#0284c7] ring-1 ring-[#0284c7] font-bold text-[#0B1220]"
                      : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Customer Details & Upload */}
      {currentStep === 4 && !isSubmitted && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] font-heading">
              Where should we send your quote?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Provide your details for an accurate quote with digital 3D proofing and freight logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikramaditya Rawat"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
              {formErrors.name && (
                <p className="text-xs text-rose-500 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Business / Resort / Event Name *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Glasshouse Retreat"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
              {formErrors.businessName && (
                <p className="text-xs text-rose-500 mt-1">{formErrors.businessName}</p>
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
              {formErrors.phone && (
                <p className="text-xs text-rose-500 mt-1">{formErrors.phone}</p>
              )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Delivery Location / City *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Tapovan, Rishikesh"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
              {formErrors.location && (
                <p className="text-xs text-rose-500 mt-1">{formErrors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Work Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="concierge@hotel.com"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Logo Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Upload Logo for 3D Proofing (Optional)
            </label>
            {logoFile ? (
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Logo attached for digital proofing
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
              <label className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-400">
                <Upload className="w-4 h-4 text-[#0284c7]" />
                <span className="text-xs text-slate-600">
                  Attach PNG / SVG / JPG (or send later via WhatsApp)
                </span>
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

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Order Timeline or Special Requests (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                occasion === "hotel"
                  ? "e.g. Need initial batch by 1st of next month for room amenities, followed by monthly delivery..."
                  : occasion === "restaurant"
                  ? "e.g. Table water service for 50 covers daily, matte finish preferred..."
                  : occasion === "wedding"
                  ? "e.g. Delivery needed 2 days prior to wedding dates at our venue in Rishikesh/Haridwar..."
                  : occasion === "corporate"
                  ? "e.g. Annual leadership summit, conference hall & delegate seating delivery..."
                  : "Share your delivery timeline, monthly replenishment needs, or any specific label styling preferences..."
              }
              className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0B1220] focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
            />
          </div>
          {/* Recipient Owner Selection */}
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Send Quotation Request To:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setQuoteRecipient("primary")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  quoteRecipient === "primary"
                    ? "bg-white border-emerald-500 ring-1 ring-emerald-500 shadow-2xs"
                    : "bg-white/70 border-slate-200 hover:bg-white text-slate-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    quoteRecipient === "primary"
                      ? "border-emerald-600"
                      : "border-slate-300"
                  }`}
                >
                  {quoteRecipient === "primary" && (
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1220]">
                    First Owner: 90842 77705
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Studio Desk & Custom Mockups
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setQuoteRecipient("secondary")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  quoteRecipient === "secondary"
                    ? "bg-white border-[#0B1220] ring-1 ring-[#0B1220] shadow-2xs"
                    : "bg-white/70 border-slate-200 hover:bg-white text-slate-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    quoteRecipient === "secondary"
                      ? "border-[#0B1220]"
                      : "border-slate-300"
                  }`}
                >
                  {quoteRecipient === "secondary" && (
                    <div className="w-2 h-2 rounded-full bg-[#0B1220]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1220]">
                    Second Owner: 82180 86865
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Bulk Orders & Production Dispatch
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {isSubmitted && (
        <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
              Quote Prepared & WhatsApp Opened
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] font-heading mt-3">
              Thank You, {name}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              Your quotation for <strong className="text-slate-900">{businessName}</strong> has been prepared and opened in WhatsApp. Simply tap send in your WhatsApp window!
            </p>
          </div>

          {/* Order Summary Pill Box */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 text-xs text-left max-w-md mx-auto space-y-2">
            <div className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2">
              Inquiry Summary
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Category:</span>
              <strong className="text-slate-900 capitalize">{occasion}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Bottle Size:</span>
              <strong className="text-slate-900">{bottleSize}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Quantity:</span>
              <strong className="text-slate-900">{quantity} Bottles</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Label Finish:</span>
              <strong className="text-slate-900">{labelFinish}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Destination:</span>
              <strong className="text-slate-900">{location}</strong>
            </div>
          </div>

          {/* Fast Track WhatsApp Options for Both Desks */}
          <div className="pt-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Did WhatsApp not open? Or notify both owners:
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waQuoteUrlLine1}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Send to First Owner (90842 77705)</span>
              </a>

              <a
                href={waQuoteUrlLine2}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0B1220] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 border border-slate-700"
              >
                <MessageCircle className="w-4 h-4 text-[#22D3EE]" />
                <span>Send to Second Owner (82180 86865)</span>
              </a>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#0B1220] transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              Response within 2 hours
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Free 3D Digital Proof
            </span>
          </div>
        </div>
      )}

      {/* Bottom Step Actions */}
      {!isSubmitted && (
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#0B1220] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1220] text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shadow-xs"
          >
            <span>
              {currentStep === 4 ? "Submit & Open on WhatsApp" : "Continue"}
            </span>
            <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
          </button>
        </div>
      )}
    </div>
  );
}
