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
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
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
    "Aquvana Water — Simple. Pure. Yours. Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses across Rishikesh, Haridwar, Dehradun and India. Get a custom quote.",
  keywords: [
    "Aquvana Water",
    "Aquvana",
    "custom water bottles Rishikesh",
    "branded water bottles Rishikesh",
    "customized water bottles Haridwar",
    "custom water bottle printing Dehradun",
    "branded drinking water Uttarakhand",
    "hotel branded water bottles",
    "wedding water bottles",
    "event water bottles",
    "corporate branded water",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    title: "Aquvana Water | Custom Branded Drinking Water",
    description:
      "Aquvana Water — Simple. Pure. Yours. Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses. Get a custom quote.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aquvana Water — Simple. Pure. Yours.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquvana Water | Custom Branded Drinking Water",
    description:
      "Aquvana Water — Simple. Pure. Yours. Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses.",
    images: ["/og-image.png"],
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#F8FAFC] text-[#020617] antialiased selection:bg-[#22D3EE]/20 selection:text-[#0B1220] relative">
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
