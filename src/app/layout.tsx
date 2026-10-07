import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFloatingCTA from "@/components/common/WhatsAppFloatingCTA";
import BackgroundBottle from "@/components/visual/BackgroundBottle";
import WaterScrollCanvas from "@/components/visual/WaterScrollCanvas";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Aquvana Water | Custom Branded Drinking Water in Rishikesh",
    template: "%s | Aquvana Water",
  },
  description:
    "Aquvana Water — Simple. Pure. Yours. Premium custom-branded packaged drinking water bottles for luxury hotels, boutique resorts, fine-dining restaurants, destination weddings, and corporate events across Rishikesh, Haridwar, Dehradun, and India.",
  keywords: [
    "Aquvana Water",
    "Aquvana",
    "custom water bottles Rishikesh",
    "branded water bottles Rishikesh",
    "customized water bottles Haridwar",
    "custom water bottle printing Dehradun",
    "branded drinking water Uttarakhand",
    "hotel branded water bottles",
    "resort water bottles Rishikesh",
    "wedding water bottles Uttarakhand",
    "event water bottles Dehradun",
    "corporate branded water bottles",
    "custom packaged drinking water",
    "private label water bottles India",
    "personalized water bottles for events",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  applicationName: SITE_CONFIG.name,
  category: "Beverage Packaging & Hospitality Supplies",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_CONFIG.url}/`,
    title: "Aquvana Water | Custom Branded Drinking Water",
    description:
      "Aquvana Water — Simple. Pure. Yours. Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses. Get a custom quote.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aquvana Water — Simple. Pure. Yours. Custom Branded Water Bottles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquvana Water | Custom Branded Drinking Water",
    description:
      "Aquvana Water — Simple. Pure. Yours. Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses.",
    images: ["/og-image.png"],
    creator: "@aquvanawater",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  verification: {
    google: "ts0NHQlE1iZw4dOG2ufOJOSUWmlduCGSonkxuF_4mN8",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aquvana",
  legalName: "Aquvana Water LLP",
  url: "https://www.aquvana.in/",
  logo: "https://www.aquvana.in/logo-blue.png",
  email: "contact@aquvana.in",
  telephone: "+91 90842 77705",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tapovan, Rishikesh",
    addressLocality: "Rishikesh",
    addressRegion: "Uttarakhand",
    postalCode: "249192",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-90842-77705",
      contactType: "sales",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-82180-86865",
      contactType: "customer service",
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://instagram.com/aquvanawater",
    "https://linkedin.com/company/aquvanawater",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aquvana",
  url: "https://www.aquvana.in/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TG7KBQGV');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="font-sans bg-[#F8FAFC] text-[#020617] antialiased selection:bg-[#22D3EE]/20 selection:text-[#0B1220] relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TG7KBQGV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Subtle Luxury Bottle in Background with low opacity */}
        <BackgroundBottle opacity={0.24} />

        {/* Dynamic Water Drops Animation on Scroll (Auto-cascades after 2s) */}
        <WaterScrollCanvas />

        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}
