import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustFeatures from "@/components/home/TrustFeatures";
import BottleShowcase from "@/components/home/BottleShowcase";
import BottleCustomizer from "@/components/home/BottleCustomizer";
import IndustryCards from "@/components/home/IndustryCards";
import HowItWorksTimeline from "@/components/home/HowItWorksTimeline";
import SampleFeedback from "@/components/home/SampleFeedback";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PricingSummary from "@/components/home/PricingSummary";
import FinalCTA from "@/components/home/FinalCTA";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Aquvana Water | Premium Custom Branded Drinking Water in Rishikesh & India",
  description:
    "Elevate your hospitality brand with Aquvana Water. Bespoke private-label bottled drinking water for 5-star hotels, luxury resorts, fine-dining restaurants, weddings, and corporate events across Rishikesh, Haridwar, Dehradun, and pan-India.",
  keywords: [
    "custom water bottles Rishikesh",
    "custom branded drinking water",
    "hotel branded water bottles Rishikesh",
    "resort packaged drinking water Haridwar",
    "personalized water bottles wedding Uttarakhand",
    "private label packaged drinking water Dehradun",
    "luxury water bottle supplier Uttarakhand",
    "corporate branded water bottles India",
    "custom logo water bottles",
    "water bottles with company logo",
    "event bottled water printing",
    "Aquvana Water",
    "bespoke bottled water",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aquvana Water | Premium Custom Branded Drinking Water",
    description:
      "Bespoke private-label packaged drinking water for hotels, resorts, destination weddings, and corporate events across Rishikesh, Haridwar, Dehradun, and India.",
    url: `${SITE_CONFIG.url}/`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aquvana Water — Custom Branded Drinking Water Bottles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquvana Water | Premium Custom Branded Drinking Water",
    description:
      "Custom-branded drinking water bottles for luxury hotels, resorts, weddings, and corporate summits across Rishikesh and pan-India.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aquvana",
  legalName: SITE_CONFIG.legalName,
  image: `${SITE_CONFIG.url}/og-image.png`,
  url: `${SITE_CONFIG.url}/`,
  telephone: SITE_CONFIG.contact.phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.contact.address.hub,
    addressLocality: "Rishikesh",
    addressRegion: SITE_CONFIG.contact.address.state,
    postalCode: SITE_CONFIG.contact.address.pincode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "30.1313",
    longitude: "78.3242",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:30",
    },
  ],
  areaServed: SITE_CONFIG.contact.address.serviceAreas.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* 1. Hero with Dynamic Bottle Preview & Samples */}
      <Hero />

      {/* 2. Trust & Value Proposition */}
      <TrustFeatures />

      {/* 3. Bottle Showcase (500ml, 1L specifications) */}
      <BottleShowcase />

      {/* 4. Interactive Bottle Customizer Studio */}
      <BottleCustomizer />

      {/* 5. Industries (Hotels, Cafes, Weddings, Corporate, etc.) */}
      <IndustryCards />

      {/* 6. How It Works (4-Step Timeline) */}
      <HowItWorksTimeline />

      {/* 7. Sample Feedback (Strictly marked placeholder content) */}
      <SampleFeedback />

      {/* 8. Why Choose Us (Built Around Your Brand) */}
      <WhyChooseUs />

      {/* 9. Transparent Pricing Structure & Factors */}
      <PricingSummary />

      {/* 10. Final High-Converting CTA */}
      <FinalCTA />
    </div>
  );
}
