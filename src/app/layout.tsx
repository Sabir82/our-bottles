import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFloatingCTA from "@/components/common/WhatsAppFloatingCTA";

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
    default: "Custom Branded Water Bottles in Rishikesh | AquaCraft Studio",
    template: "%s | AquaCraft Studio",
  },
  description:
    "Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses across Rishikesh, Haridwar, Dehradun and India. Get a custom quote.",
  keywords: [
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
    title: "Custom Branded Water Bottles in Rishikesh | AquaCraft Studio",
    description:
      "Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses. Get a custom quote.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AquaCraft Studio — Custom Branded Water Bottles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Branded Water Bottles in Rishikesh | AquaCraft Studio",
    description:
      "Custom-branded drinking water bottles for hotels, restaurants, weddings, events and businesses.",
    images: ["/og-image.png"],
  },
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
      <body className="font-sans bg-[#F8FAFC] text-[#020617] antialiased selection:bg-[#22D3EE]/20 selection:text-[#0B1220]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}
