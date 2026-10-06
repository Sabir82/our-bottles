"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Palette,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import RealisticBottleMockup from "@/components/visual/RealisticBottleMockup";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const COLOR_PRESETS = [
  { name: "Obsidian Black", hex: "#0B1220", textColor: "#FFFFFF", accent: "#22D3EE" },
  { name: "Royal Midnight", hex: "#0F172A", textColor: "#FFFFFF", accent: "#38BDF8" },
  { name: "Himalayan Forest", hex: "#064E3B", textColor: "#FFFFFF", accent: "#34D399" },
  { name: "Heritage Burgundy", hex: "#4C0519", textColor: "#FFFFFF", accent: "#FB7185" },
  { name: "Imperial Amethyst", hex: "#3B0764", textColor: "#FFFFFF", accent: "#C084FC" },
  { name: "Ivory Minimalist", hex: "#FFFFFF", textColor: "#0B1220", accent: "#0284c7" },
];

const FINISHES = [
  { id: "matte" as const, name: "Ultra-Matte Velvet", desc: "Soft-touch, non-reflective premium texture" },
  { id: "gloss" as const, name: "High-Gloss BOPP", desc: "Vibrant color saturation with water-sheen" },
  { id: "metallic" as const, name: "Metallic Foil Accent", desc: "Reflective specular shimmer for luxury events" },
];

export default function BottleCustomizer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customizer State
  const [size, setSize] = useState<"500ml" | "1000ml" | "250ml">("500ml");
  const [brandName, setBrandName] = useState("THE GRAND RESORT");
  const [tagline, setTagline] = useState("Tapovan • Rishikesh");
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [customHex, setCustomHex] = useState("#0B1220");
  const [useCustomColor, setUseCustomColor] = useState(false);
  const [finish, setFinish] = useState<"matte" | "gloss" | "metallic">("matte");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Logo file handler
  const handleLogoUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (.png, .jpg, .svg)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedLogo(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const resetCustomizer = () => {
    setSize("500ml");
    setBrandName("THE GRAND RESORT");
    setTagline("Tapovan • Rishikesh");
    setSelectedColor(COLOR_PRESETS[0]);
    setUseCustomColor(false);
    setFinish("matte");
    setUploadedLogo(null);
  };

  // Determine active colors
  const activeBgColor = useCustomColor ? customHex : selectedColor.hex;
  const activeTextColor = useCustomColor ? "#FFFFFF" : selectedColor.textColor;
  const activeAccent = useCustomColor ? "#22D3EE" : selectedColor.accent;

  // Request design action
  const handleRequestDesign = () => {
    // Save draft in sessionStorage if available
    if (typeof window !== "undefined") {
      const designPayload = {
        size,
        brandName,
        tagline,
        color: activeBgColor,
        finish,
        hasUploadedLogo: Boolean(uploadedLogo),
      };
      sessionStorage.setItem("aquacraft_design_draft", JSON.stringify(designPayload));
    }
    // Route to quote with parameters
    router.push(
      `/quote?size=${size}&brandName=${encodeURIComponent(
        brandName
      )}&finish=${finish}`
    );
  };

  const waQuoteUrl = buildWhatsAppLink({
    businessName: brandName,
    bottleSize: size,
    labelStyle: `${finish.toUpperCase()} finish (${activeBgColor})`,
    notes: `I customized a bottle in your live preview tool for "${brandName}" (${tagline}). Please share production pricing.`,
  });

  return (
    <section
      id="bottle-customizer"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/60 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive Design Studio"
          title="See Your Brand On The Bottle"
          subtitle="Upload your logo and preview how your branded bottle could look. Experiment with bottle sizes, label finishes, and brand color palettes in real time."
          align="center"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#0284c7]" />
                <h3 className="text-base sm:text-lg font-bold text-[#0B1220]">
                  Bottle & Label Configurations
                </h3>
              </div>
              <button
                type="button"
                onClick={resetCustomizer}
                className="text-xs font-semibold text-slate-500 hover:text-[#0B1220] flex items-center gap-1 transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Logo Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Upload Brand Logo / Monogram
              </label>
              
              {uploadedLogo ? (
                <div className="flex items-center justify-between bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center p-1.5 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedLogo}
                        alt="Uploaded logo preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0B1220] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Logo Placed on Bottle Label
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Will be automatically scaled & centered
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedLogo(null)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove logo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 bg-white ${
                    isDragging
                      ? "border-[#0284c7] bg-sky-50/50"
                      : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleLogoUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#0284c7] mx-auto mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag and drop your logo
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    PNG, JPG, or SVG with transparent background recommended
                  </p>
                </div>
              )}
            </div>

            {/* 2. Brand Name & Tagline Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. Business / Event Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  maxLength={30}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. AURA RETREAT"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tagline / City / Date
                </label>
                <input
                  type="text"
                  value={tagline}
                  maxLength={35}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Rishikesh • Uttarakhand"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* 3. Bottle Size Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Choose Bottle Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSize("250ml")}
                  className={`py-3 px-3 rounded-xl text-left border transition-all ${
                    size === "250ml"
                      ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-2xs"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="font-extrabold text-xs sm:text-sm text-[#0B1220]">
                    250 ML Mini
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Welcome & Valet
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSize("500ml")}
                  className={`py-3 px-3 rounded-xl text-left border transition-all ${
                    size === "500ml"
                      ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-2xs"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="font-extrabold text-xs sm:text-sm text-[#0B1220]">
                    500 ML Standard
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Dining & Events
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSize("1000ml")}
                  className={`py-3 px-3 rounded-xl text-left border transition-all ${
                    size === "1000ml"
                      ? "bg-white border-[#0B1220] ring-2 ring-[#0B1220] shadow-2xs"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="font-extrabold text-xs sm:text-sm text-[#0B1220]">
                    1 Litre Bottle
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Suites & Banquets
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Label Finish Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Select Label Material & Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinish(f.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      finish === f.id
                        ? "bg-white border-[#0284c7] ring-1 ring-[#0284c7] shadow-2xs"
                        : "bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0B1220]">
                      {f.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                      {f.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Brand Color Preset / Custom */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                5. Brand Color Palette
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = !useCustomColor && selectedColor.hex === preset.hex;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(preset);
                        setUseCustomColor(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-white border-[#0B1220] ring-1 ring-[#0B1220] font-bold"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span>{preset.name}</span>
                    </button>
                  );
                })}

                <div className="flex items-center gap-1.5 ml-auto">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Custom Hex:
                  </label>
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setUseCustomColor(true);
                    }}
                    className="w-7 h-7 rounded cursor-pointer border border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleRequestDesign}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0B1220] text-white text-sm sm:text-base font-bold shadow-md hover:bg-slate-800 transition-all active:scale-98"
              >
                <span>Request This Design</span>
                <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
              </button>

              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Send Design via WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              * This is a live visual simulation and inquiry tool. Free 3D digital production proofs and physical sample bottles are finalized before production runs.
            </p>
          </div>

          {/* RIGHT: Dynamic Bottle Canvas (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-gradient-to-b from-slate-900 to-[#0B1220] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[580px]">
              
              {/* Studio Light Badge */}
              <div className="w-full flex items-center justify-between text-xs border-b border-white/10 pb-3">
                <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Live Studio Render
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-[#22D3EE] font-mono">
                  {size} • {finish.toUpperCase()}
                </span>
              </div>

              {/* Dynamic Bottle Mockup */}
              <div className="my-6">
                <RealisticBottleMockup
                  size={size}
                  brandName={brandName}
                  tagline={tagline}
                  logoUrl={uploadedLogo}
                  labelColor={activeBgColor}
                  labelTextColor={activeTextColor}
                  labelFinish={finish}
                  accentColor={activeAccent}
                  floating={true}
                />
              </div>

              {/* Simulation Notice Footer */}
              <div className="w-full text-center bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] text-slate-300">
                <p>
                  Current Preset: <span className="font-bold text-white">{brandName || "Untitled Brand"}</span> ({size})
                </p>
                <p className="text-slate-400 mt-0.5">
                  High-definition vector proof prepared upon quote confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
