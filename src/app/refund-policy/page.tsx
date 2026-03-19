import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";

export default function RefundPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={330}
            height={82}
            rotate={8}
            gradient="from-royal/[0.08]"
            className="right-[-5%] top-[26%]"
          />
          <ElegantShape
            delay={0.5}
            width={245}
            height={62}
            rotate={-10}
            gradient="from-cerulean/[0.06]"
            className="left-[-3%] bottom-[20%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Refund Policy
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-light max-w-xl mx-auto">
              Our policy on returns, refunds, and order issues for products
              purchased from Genara Labs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-slate text-sm mb-12">
              Last Updated: March 15, 2026
            </p>
          </FadeIn>

          <div className="space-y-10">
            <FadeIn delay={0.05}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                All Sales Are Final
              </h2>
              <p className="text-graphite leading-relaxed">
                Due to the nature of research chemicals and the strict quality
                control standards required for their handling, all sales made by
                Genara Labs LLC are final. Once an order has been shipped, we
                cannot accept returns for reasons including but not limited to
                change of mind, ordering errors by the customer, or
                incompatibility with the customer&apos;s intended research
                application. We encourage all customers to carefully review
                their orders before completing a purchase.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Exceptions
              </h2>
              <p className="text-graphite leading-relaxed mb-3">
                We stand behind the quality of our products. Refunds or
                replacements may be issued in the following circumstances:
              </p>
              <ul className="text-graphite leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-navy">Damaged Products:</strong> If
                  your order arrives with visible damage to the product or
                  packaging that compromises the integrity of the compound
                </li>
                <li>
                  <strong className="text-navy">Incorrect Products:</strong> If
                  you receive a product different from what you ordered
                </li>
                <li>
                  <strong className="text-navy">Defective Products:</strong> If
                  the product does not meet the specifications stated on the
                  Certificate of Analysis (CoA) provided with your order
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.11}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                How to Request a Return
              </h2>
              <p className="text-graphite leading-relaxed mb-3">
                If you believe your order qualifies for a refund or replacement
                under the exceptions listed above, please follow these steps:
              </p>
              <ol className="text-graphite leading-relaxed space-y-3 list-decimal list-inside">
                <li>
                  <strong className="text-navy">
                    Contact us within 48 hours
                  </strong>{" "}
                  of receiving your order by emailing{" "}
                  <a
                    href="mailto:support@genaralabs.com"
                    className="text-royal hover:text-cerulean transition-colors"
                  >
                    support@genaralabs.com
                  </a>{" "}
                  with your order number and a detailed description of the issue
                </li>
                <li>
                  <strong className="text-navy">Include photographs</strong>{" "}
                  clearly showing the damage, defect, or incorrect product
                  received. Photos must include the product label, the product
                  itself, and the shipping packaging
                </li>
                <li>
                  <strong className="text-navy">
                    Do not dispose of the product
                  </strong>{" "}
                  or packaging until your claim has been reviewed and resolved
                </li>
              </ol>
              <p className="text-graphite leading-relaxed mt-4">
                Claims submitted after the 48-hour window or without sufficient
                photographic evidence may not be eligible for a refund or
                replacement.
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Refund Processing
              </h2>
              <p className="text-graphite leading-relaxed">
                Once your claim is approved, refunds will be processed within
                5-10 business days to the original payment method used at
                checkout. You will receive an email confirmation when your
                refund has been issued. Please note that it may take an
                additional 3-5 business days for the refund to appear on your
                statement, depending on your financial institution. In some
                cases, we may offer a replacement shipment instead of a refund,
                at our discretion and with your agreement.
              </p>
            </FadeIn>

            <FadeIn delay={0.17}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Shipping Damage Claims
              </h2>
              <p className="text-graphite leading-relaxed">
                If your package arrives with visible external damage, please
                document the condition of the outer packaging before opening it
                by taking photographs. If the products inside are also damaged,
                follow the return request process outlined above. For packages
                that are lost in transit, please contact us and we will work
                with the shipping carrier to resolve the issue. Genara Labs is
                not responsible for packages that are stolen after delivery
                confirmation.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Contact Us
              </h2>
              <div className="text-graphite leading-relaxed space-y-1">
                <p>
                  For any questions regarding our refund policy or to submit a
                  claim, please contact us:
                </p>
                <p className="mt-3">
                  <strong className="text-navy">Genara Labs LLC</strong>
                </p>
                <p>30 N LaSalle St, Suite 1234, Chicago, IL 60602</p>
                <p>United States</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@genaralabs.com"
                    className="text-royal hover:text-cerulean transition-colors"
                  >
                    support@genaralabs.com
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-white">
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

      {/* Gradient blend into footer */}
      <div className="h-12 bg-gradient-to-b from-white to-carbon" />
    </main>
  );
}
