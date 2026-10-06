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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
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
