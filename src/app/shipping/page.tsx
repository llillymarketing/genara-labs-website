"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Package, Clock, Truck, MapPin, RotateCcw } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "Processing Time",
    description:
      "Orders placed before 1:00 PM EST on business days are processed and shipped the same day. Orders placed after 1:00 PM EST or on weekends/holidays will be processed the next business day.",
  },
  {
    icon: Truck,
    title: "Shipping Carriers & Methods",
    description:
      "We ship via UPS and USPS. Standard shipping rates range from $4 to $11 depending on package weight and destination. Tracking information is provided via email once your order has shipped.",
  },
  {
    icon: MapPin,
    title: "Shipping Destinations",
    description:
      "We currently ship to addresses within the United States only. International shipping is not available at this time.",
  },
  {
    icon: Package,
    title: "Packaging & Handling",
    description:
      "All orders are carefully packaged to ensure product integrity during transit. Research compounds are shipped in temperature-appropriate packaging. A Certificate of Analysis is provided with every order.",
  },
  {
    icon: RotateCcw,
    title: "Returns & Damaged Shipments",
    description:
      "Due to the nature of research compounds, we do not accept returns. If you receive an incorrect or damaged order, please contact support@genaralabs.com within 48 hours of delivery with photos of the issue. We will resolve the matter promptly.",
  },
];

export default function ShippingPage() {
  return (
    <main>
      {/* Header — clean, no banner */}
      <section className="pt-20 pb-8 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Information
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-3">
              Shipping Policy
            </h1>
            <p className="text-steel max-w-lg">
              Everything you need to know about how we ship your research
              compounds.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gradient blend */}
      <div className="h-12 bg-gradient-to-b from-white to-[#FAFCFE]" />

      {/* Policies */}
      <section className="py-16 px-4 bg-[#FAFCFE]">
        <div className="max-w-3xl mx-auto space-y-10">
          {policies.map((policy, i) => (
            <FadeIn key={policy.title} delay={0.05 * i}>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0 mt-0.5">
                  <policy.icon className="w-5 h-5 text-royal" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-navy mb-2">
                    {policy.title}
                  </h2>
                  <p className="text-steel text-sm leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-[#FAFCFE]">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate/70 text-xs leading-relaxed">
            <strong className="text-steel font-semibold">Disclaimer:</strong>{" "}
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. All products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>
        </div>
      </section>

    </main>
  );
}
