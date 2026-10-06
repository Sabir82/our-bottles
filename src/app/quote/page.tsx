import { Suspense } from "react";
import type { Metadata } from "next";
import QuoteWizard from "@/components/quote/QuoteWizard";
import SectionHeading from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Get a Custom Quote | Custom Branded Water Bottles",
  description:
    "Request custom pricing for branded packaged drinking water bottles. Fast quotes for hotels, restaurants, weddings, and corporate events across Rishikesh, Haridwar, Dehradun, and India.",
};

export default function QuotePage() {
  return (
    <div className="py-12 sm:py-20 bg-[#F8FAFC] min-h-[85vh]">
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
