import type { Metadata } from "next";
import PricingView from "@/components/pricing/PricingView";
import { SITE_CONFIG } from "@/config/site";
import { PRICING_VARIABLES } from "@/data/pricing-tiers";

export const metadata: Metadata = {
  title: "Custom Branded Water Bottle Pricing & Volume Tiers | Aquvana Water",
  description:
    "Explore transparent tiered pricing for custom branded drinking water bottles. Starter batches from 500 units to 10,000+ enterprise runs. Free 3D proofing, waterproof label stocks, and direct venue delivery across Uttarakhand and India.",
  keywords: [
    "custom water bottle pricing",
    "branded water bottles cost per unit",
    "bulk customized water bottles price Rishikesh",
    "hotel branded water cost Dehradun",
    "wedding custom water bottle price Haridwar",
    "private label bottled water cost India",
    "500 bottles custom water cost",
    "water bottle label printing prices",
    "bespoke bottled water quote",
    "Aquvana pricing tiers",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/pricing`,
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
    title: "Custom Branded Water Bottle Pricing & Volume Tiers | Aquvana Water",
    description:
      "Transparent tiered volume pricing for hotels, resorts, weddings, and corporate events. Starter batches from 500 bottles to 10,000+ enterprise orders.",
    url: `${SITE_CONFIG.url}/pricing`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aquvana Water Pricing & Volume Tiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Branded Water Bottle Pricing | Aquvana Water",
    description:
      "Transparent volume pricing for custom-branded water bottles with free 3D digital proofing.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_VARIABLES.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.description,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_CONFIG.url}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_CONFIG.url}/pricing`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingView />
    </>
  );
}
