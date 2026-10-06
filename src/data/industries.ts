export interface IndustryItem {
  id: string;
  title: string;
  headline: string;
  description: string;
  keyBenefits: string[];
  suggestedSize: string;
  iconName: string;
  accentBadge: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "hotels-resorts",
    title: "Hotels & Resorts",
    headline: "Give guests a more thoughtful hospitality experience.",
    description:
      "Replace commodity commercial labels on nightstands, poolside cabanas, and dining tables with bespoke bottles that echo the tranquility and prestige of your property.",
    keyBenefits: [
      "Signature nightstand & suite amenity",
      "Reinforces five-star attention to detail",
      "Seamless recurring batch replenishment",
    ],
    suggestedSize: "500ml & 1L",
    iconName: "Hotel",
    accentBadge: "Hospitality Standard",
  },
  {
    id: "restaurants-cafes",
    title: "Restaurants & Cafés",
    headline: "Turn every table into a branding opportunity.",
    description:
      "Your diners spend 45 to 90 minutes looking at their table. A custom-branded bottle complements your tableware, menu aesthetics, and social-media photographs.",
    keyBenefits: [
      "Editorial aesthetics matching interior decor",
      "Generates natural social check-in photos",
      "Distinctive table service signature",
    ],
    suggestedSize: "500ml",
    iconName: "Utensils",
    accentBadge: "Dining Atmosphere",
  },
  {
    id: "weddings",
    title: "Weddings",
    headline: "Personalized bottles for your special day.",
    description:
      "Craft bespoke bottles personalized with the couple's monogram, wedding date, or celebratory palette. Perfect for baraat welcome trays, mandap seating, and room hampers.",
    keyBenefits: [
      "Custom couple initials & theme color matching",
      "Welcome kit hampers & guest room placement",
      "Cherished keepsake detail for wedding guests",
    ],
    suggestedSize: "500ml & 250ml",
    iconName: "HeartHandshake",
    accentBadge: "Bespoke Celebrations",
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    headline: "Professional branded water for conferences and meetings.",
    description:
      "Deliver executive authority to leadership conclaves, investor roundtables, and industry summits with sleek minimalist bottles showcasing your company identity.",
    keyBenefits: [
      "Boardroom & keynote speaker podium presence",
      "Consistent brand experience for delegates",
      "Custom sponsor & co-branding label zones",
    ],
    suggestedSize: "500ml & 1L",
    iconName: "Briefcase",
    accentBadge: "Executive Grade",
  },
  {
    id: "events-celebrations",
    title: "Events & Celebrations",
    headline: "Make every detail feel intentional.",
    description:
      "From anniversary galas to private wellness retreats in Rishikesh, tailor every bottle with your emblem, motivational mantra, or commemorative dates.",
    keyBenefits: [
      "Elevates private gatherings with bespoke finesse",
      "Flexible quantities aligned with guest size",
      "High visual appeal for photography & media",
    ],
    suggestedSize: "500ml",
    iconName: "Sparkles",
    accentBadge: "Curated Moments",
  },
  {
    id: "event-planners",
    title: "Event Planners",
    headline: "Reliable branded-water solutions for your clients.",
    description:
      "A trusted production partner who handles artwork verification, digital proofing, precise batch bottling, and on-time venue freight delivery across Uttarakhand.",
    keyBenefits: [
      "Dedicated account coordinator for planners",
      "Direct-to-venue dispatch across Uttarakhand",
      "Fast-turnaround proof approvals within 24 hrs",
    ],
    suggestedSize: "Custom Combinations",
    iconName: "CalendarCheck",
    accentBadge: "Partner Network",
  },
];
