export interface BottleProduct {
  id: string;
  name: string;
  capacity: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  idealFor: string[];
  description: string;
  specs: {
    height: string;
    diameter: string;
    labelDimensions: string;
    labelFinishes: string[];
    capOptions: string[];
    bottleMaterial: string;
    waterProfile: string;
    shelfLife: string;
  };
  features: string[];
  recommendedMinOrder: number;
}

export const PRODUCTS: BottleProduct[] = [
  {
    id: "500ml",
    name: "500 ML Premium",
    capacity: "500 ml",
    badge: "Most Popular",
    isPopular: true,
    tagline: "The gold standard for hospitality, dining tables, and events.",
    idealFor: [
      "Hotels & Boutique Resorts",
      "Restaurants & Cafés",
      "Weddings & Private Celebrations",
      "Corporate Seminars & Workshops",
    ],
    description:
      "Engineered with ergonomic fluting and a crystal-clear profile. The 500ml silhouette offers generous 360-degree wrap canvas for your brand's emblem, typography, and storytelling.",
    specs: {
      height: "215 mm",
      diameter: "64 mm",
      labelDimensions: "198 mm x 68 mm",
      labelFinishes: ["Ultra-Matte Velvet", "Gloss Waterproof BOPP", "Metallic Foil Accent", "Transparent Minimalist"],
      capOptions: ["Deep Obsidian Black", "Glacier White", "Cyan Accent", "Custom Matched"],
      bottleMaterial: "100% Recyclable, Food-Grade 100% Virgin PET (BPA-Free)",
      waterProfile: "Multi-Barrier RO + UV + Essential Electrolyte Infusion",
      shelfLife: "6 Months from date of bottling",
    },
    features: [
      "Optically clear PET with glass-like clarity",
      "Waterproof, scratch-resistant laminated label wrap",
      "Tamper-evident airtight sealing cap",
      "Ergonomic structural grip designed for guest comfort",
    ],
    recommendedMinOrder: 500,
  },
  {
    id: "1000ml",
    name: "1 Litre Hospitality",
    capacity: "1000 ml",
    badge: "Hospitality & Conclaves",
    isPopular: false,
    tagline: "Substantial elegance for suites, conference tables, and banquets.",
    idealFor: [
      "Luxury Hotel Guest Suites",
      "Executive Boardroom Tables",
      "Fine Dining Long-Format Service",
      "Multi-Day Corporate Conferences",
    ],
    description:
      "A towering, authoritative silhouette designed to remain prominent on banquet tables and executive suites throughout entire dining experiences or all-day summits.",
    specs: {
      height: "275 mm",
      diameter: "82 mm",
      labelDimensions: "250 mm x 95 mm",
      labelFinishes: ["Ultra-Matte Velvet", "Gloss Waterproof BOPP", "Metallic Foil Accent", "Transparent Minimalist"],
      capOptions: ["Deep Obsidian Black", "Glacier White", "Cyan Accent", "Custom Matched"],
      bottleMaterial: "100% Recyclable, Heavy-Gauge Virgin PET (BPA-Free)",
      waterProfile: "Multi-Barrier RO + UV + Essential Electrolyte Infusion",
      shelfLife: "6 Months from date of bottling",
    },
    features: [
      "High-volume capacity suited for prolonged guest meetings",
      "Extended vertical canvas for comprehensive brand narrative",
      "Reinforced heavy-gauge base prevents accidental tipping",
      "Airtight threaded closure preserves crisp freshness",
    ],
    recommendedMinOrder: 500,
  },
  {
    id: "250ml",
    name: "250 ML Express",
    capacity: "250 ml",
    badge: "Express & Welcome Drinks",
    isPopular: false,
    tagline: "Compact elegance for welcome trays, bridal suites, and valet gifts.",
    idealFor: [
      "Resort Check-In & Welcome Trays",
      "Bridal & Groom Prep Rooms",
      "Quick-Turnaround Executive Meetings",
      "Valet Courtesy Trays & Spas",
    ],
    description:
      "A pocket-sized statement of hospitality. Ideal for situations where guest hydration is a welcoming gesture without surplus waste.",
    specs: {
      height: "155 mm",
      diameter: "54 mm",
      labelDimensions: "165 mm x 52 mm",
      labelFinishes: ["Ultra-Matte Velvet", "Gloss Waterproof BOPP", "Metallic Foil Accent"],
      capOptions: ["Deep Obsidian Black", "Glacier White", "Cyan Accent"],
      bottleMaterial: "100% Recyclable Virgin PET (BPA-Free)",
      waterProfile: "Multi-Barrier RO + UV + Essential Electrolyte Infusion",
      shelfLife: "6 Months from date of bottling",
    },
    features: [
      "Zero-waste single-serving presentation",
      "Featherlight, sleek handheld form factor",
      "Fits seamlessly into welcome hampers and amenity bags",
    ],
    recommendedMinOrder: 1000,
  },
];
