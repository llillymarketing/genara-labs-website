import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";

export default function DisclaimerPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={340}
            height={85}
            rotate={6}
            gradient="from-royal/[0.08]"
            className="right-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={240}
            height={60}
            rotate={-10}
            gradient="from-cerulean/[0.06]"
            className="left-[-3%] bottom-[18%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Disclaimer
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-light max-w-xl mx-auto">
              Important information regarding the nature, intended use, and
              limitations of products sold by Genara Labs LLC.
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
                Research Use Only
              </h2>
              <p className="text-graphite leading-relaxed">
                All products sold by Genara Labs LLC are intended strictly for
                in-vitro research and laboratory use only. Our products are
                research chemicals and are not intended for human consumption,
                veterinary use, or any form of bodily application. By purchasing
                from Genara Labs, you acknowledge and agree that all products
                will be used exclusively for legitimate scientific research
                purposes.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Not FDA Approved
              </h2>
              <p className="text-graphite leading-relaxed">
                Products offered by Genara Labs are not approved by the U.S.
                Food and Drug Administration (FDA) or any other regulatory body
                for use in humans or animals. Our products are not dietary
                supplements, food additives, pharmaceuticals, or drugs of any
                kind. They have not been evaluated by the FDA for safety,
                efficacy, or any therapeutic purpose.
              </p>
            </FadeIn>

            <FadeIn delay={0.11}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                No Medical Claims
              </h2>
              <p className="text-graphite leading-relaxed">
                Genara Labs makes no claims — express or implied — that any of
                our products are intended to diagnose, treat, cure, mitigate, or
                prevent any disease or medical condition. Any descriptions of
                compound properties, mechanisms, or research findings on our
                website or in our materials are provided for informational and
                educational purposes only and should not be interpreted as
                medical advice, therapeutic recommendations, or endorsements of
                any particular use.
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Limitation of Liability
              </h2>
              <p className="text-graphite leading-relaxed">
                Genara Labs LLC, its officers, directors, employees, and
                affiliates shall not be held liable for any damages, injuries,
                losses, or claims arising from the misuse, improper handling, or
                unauthorized application of any products purchased from us. By
                completing a purchase, you assume full responsibility for the
                proper storage, handling, and use of all products in compliance
                with applicable laws and regulations. Genara Labs disclaims all
                warranties, express or implied, including but not limited to
                implied warranties of merchantability and fitness for a
                particular purpose.
              </p>
            </FadeIn>

            <FadeIn delay={0.17}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Age Requirement
              </h2>
              <p className="text-graphite leading-relaxed">
                You must be at least 21 years of age to purchase products from
                Genara Labs. By placing an order, you confirm that you are 21
                years of age or older and that you are legally permitted to
                purchase research chemicals in your jurisdiction. Genara Labs
                reserves the right to cancel any order and refuse service to any
                individual who does not meet this requirement.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Proper Use and Handling
              </h2>
              <p className="text-graphite leading-relaxed">
                Purchasers are solely responsible for ensuring that all products
                are handled, stored, and used in accordance with standard
                laboratory safety protocols and applicable regulations. Products
                should be stored under conditions specified on their respective
                documentation. Genara Labs provides Certificates of Analysis
                (CoA) with every purchase to support proper identification and
                quality verification. It is the purchaser&apos;s responsibility
                to review all documentation and ensure compliance with their
                institutional and regulatory requirements.
              </p>
            </FadeIn>

            <FadeIn delay={0.23}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Regulatory Compliance
              </h2>
              <p className="text-graphite leading-relaxed">
                Purchasers are responsible for ensuring that their purchase,
                possession, and use of research chemicals comply with all
                applicable federal, state, and local laws and regulations.
                Genara Labs operates in compliance with applicable U.S. laws
                governing the sale of research chemicals. It is the
                buyer&apos;s sole responsibility to verify the legality of
                purchasing and using specific compounds in their jurisdiction.
                Genara Labs reserves the right to refuse or cancel orders at its
                discretion if there is reason to believe products may be used
                improperly or in violation of applicable law.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Contact
              </h2>
              <p className="text-graphite leading-relaxed">
                If you have any questions regarding this disclaimer, please
                contact us at{" "}
                <a
                  href="mailto:support@genaralabs.com"
                  className="text-royal hover:text-cerulean transition-colors"
                >
                  support@genaralabs.com
                </a>
                .
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-white border-t border-silver/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate text-xs leading-relaxed text-center">
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. Products sold by Genara Labs are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>
        </div>
      </section>
    </main>
  );
}
