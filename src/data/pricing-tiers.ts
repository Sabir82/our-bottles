export interface PricingTier {
  id: string;
  name: string;
  quantityRange: string;
  tagline: string;
  pricingLabel: string;
  isPopular?: boolean;
  idealFor: string;
  features: string[];
  ctaText: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "tier-starter",
    name: "Starter Batch",
    quantityRange: "500 – 999 Bottles",
    tagline: "Ideal for intimate destination weddings, boutique cafes, and exclusive retreats.",
    pricingLabel: "Request Quote",
    isPopular: false,
    idealFor: "Weddings, private banquets, trial hotel runs",
    features: [
      "Custom full-color label wrap",
      "500ml or 1L bottle sizes",
      "Complimentary digital 3D proof before printing",
      "Waterproof matte or gloss BOPP finish",
      "Standard tamper-evident caps",
      "Direct venue delivery in Rishikesh & Dehradun",
    ],
    ctaText: "Request Starter Quote",
  },
  {
    id: "tier-hospitality",
    name: "Hospitality & Bulk",
    quantityRange: "1,000 – 4,999 Bottles",
    tagline: "Our most requested volume for mid-sized resorts, busy restaurants, and multi-day conferences.",
    pricingLabel: "Volume Tier Pricing",
    isPopular: true,
    idealFor: "Resorts, fine-dining restaurants, corporate conclaves",
    features: [
      "Significant volume price advantages",
      "Dedicated account manager & proof coordinator",
      "Choice of specialty finishes (Matte, Gloss, Metallic Foil)",
      "Split-shipment scheduling available",
      "Staggered monthly delivery for dining rooms",
      "Priority dispatch across Uttarakhand & North India",
    ],
    ctaText: "Get Bulk Pricing",
  },
  {
    id: "tier-enterprise",
    name: "Enterprise & Recurring",
    quantityRange: "5,000+ Bottles",
    tagline: "Engineered for hotel chains, convention centers, and sustained monthly recurring orders.",
    pricingLabel: "Custom Enterprise Pricing",
    isPopular: false,
    idealFor: "Luxury hotel chains, large event organizers, annual supply",
    features: [
      "Maximum cost optimization per bottle",
      "Custom cap color matching to brand palette",
      "Warehousing & scheduled replenishment cycles",
      "Custom packaging carton branding options",
      "Dedicated production batch runs",
      "Pan-India freight logistics support",
    ],
    ctaText: "Contact Enterprise Desk",
  },
];

export const PRICING_VARIABLES = [
  {
    title: "Bottle Size & Silhouette",
    description: "500ml is standard for table service; 1L requires heavier gauge preforms for suites and conferences.",
  },
  {
    title: "Order Volume",
    description: "Plate setup and print calibration costs amortize significantly as batch volume increases.",
  },
  {
    title: "Label Material & Specialty Foil",
    description: "Standard waterproof BOPP vs. soft-touch velvet matte or metallic hot-stamp foil embellishments.",
  },
  {
    title: "Delivery Geography",
    description: "Local door delivery in Rishikesh, Haridwar, and Dehradun vs. pan-India multi-point pallet freight.",
  },
  {
    title: "Lead Time & Turnaround",
    description: "Standard production (5–7 working days post-proof) vs. expedited emergency turnaround.",
  },
];
