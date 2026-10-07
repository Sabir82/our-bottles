import { Suspense } from "react";
import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import SectionHeading from "@/components/common/SectionHeading";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a Custom Bottled Water Quote & Free 3D Proof | Aquvana Water",
  description:
    "Request custom volume pricing and a complimentary 24-hour 3D digital proof for your hotel, wedding, resort, or corporate brand. Fast turnarounds across Rishikesh, Haridwar, Dehradun, and pan-India.",
  keywords: [
    "request water bottle quote",
    "custom water bottle quotation Rishikesh",
    "get quote branded drinking water",
    "wedding water bottles quote Haridwar",
    "hotel water bottle supplier quotation Dehradun",
    "3D bottle proof free",
    "personalized water bottle price calculator",
    "Aquvana quote wizard",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/quote`,
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
    title: "Request a Custom Bottled Water Quote | Aquvana Water",
    description:
      "Instant 4-step quote builder for branded packaged drinking water. Includes complimentary 24-hour 3D digital proof.",
    url: `${SITE_CONFIG.url}/quote`,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Get an Instant Quote — Aquvana Water",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Custom Bottled Water Quote | Aquvana Water",
    description:
      "Plan your custom bottled water order in under 60 seconds with free 3D digital proofing.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
};

const quoteServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aquvana Custom Bottling & Private Label Packaging Service",
  provider: {
    "@type": "LocalBusiness",
    name: "Aquvana",
    telephone: SITE_CONFIG.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.hub,
      addressLocality: "Rishikesh",
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pincode,
      addressCountry: "IN",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
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
      name: "Quote",
      item: `${SITE_CONFIG.url}/quote`,
    },
  ],
};

export default function QuotePage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC] min-h-[85vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Direct Concierge Request"
          title="Plan Your Custom Bottled Water Order"
          subtitle="Complete our 4-step quote builder in under 60 seconds. Our studio desk will prepare your volume pricing and complimentary 3D digital proof."
          align="center"
          className="mb-10 sm:mb-12"
        />

        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-500">
              Loading quote builder...
            </div>
          }
        >
          <QuoteWizard />
        </Suspense>
      </div>
    </div>
  );
}
