import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";

export default function TermsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={350}
            height={88}
            rotate={7}
            gradient="from-royal/[0.08]"
            className="right-[-5%] top-[24%]"
          />
          <ElegantShape
            delay={0.5}
            width={270}
            height={68}
            rotate={-9}
            gradient="from-cerulean/[0.06]"
            className="left-[-4%] bottom-[14%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-light max-w-xl mx-auto">
              The terms governing your use of the Genara Labs website and
              purchase of our products.
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
                Acceptance of Terms
              </h2>
              <p className="text-graphite leading-relaxed">
                By accessing or using the Genara Labs website (genaralabs.com)
                or purchasing any products from Genara Labs LLC, you agree to be
                bound by these Terms &amp; Conditions. If you do not agree to
                all of these terms, you must not use our website or purchase our
                products. These terms constitute a legally binding agreement
                between you and Genara Labs LLC.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Eligibility
              </h2>
              <p className="text-graphite leading-relaxed">
                You must be at least 21 years of age to use this website and
                purchase products from Genara Labs. By placing an order, you
                represent and warrant that you are at least 21 years old and
                that you are located within the United States. Genara Labs
                currently ships only within the United States. We reserve the
                right to verify your age and refuse service to anyone who does
                not meet our eligibility requirements.
              </p>
            </FadeIn>

            <FadeIn delay={0.11}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Product Use Restrictions
              </h2>
              <p className="text-graphite leading-relaxed">
                All products sold by Genara Labs are research chemicals intended
                strictly for in-vitro research and laboratory use only. Products
                are not for human consumption, veterinary use, or any clinical
                application. They are not dietary supplements, food additives,
                drugs, or pharmaceuticals. By purchasing, you agree that you
                will use all products exclusively for legitimate scientific
                research purposes and in compliance with all applicable laws and
                regulations. Any misuse of products is solely the
                purchaser&apos;s responsibility.
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Ordering and Payment
              </h2>
              <p className="text-graphite leading-relaxed">
                All orders are subject to acceptance by Genara Labs. We reserve
                the right to refuse or cancel any order for any reason,
                including but not limited to product availability, errors in
                pricing or product information, or suspicion of fraudulent
                activity. Prices are listed in U.S. dollars and are subject to
                change without notice. Payment must be completed in full at the
                time of order. You agree to provide accurate and complete
                billing and shipping information for all orders.
              </p>
            </FadeIn>

            <FadeIn delay={0.17}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Shipping and Delivery
              </h2>
              <p className="text-graphite leading-relaxed">
                Genara Labs ships to addresses within the United States only.
                Orders placed before 1:00 PM EST on business days are typically
                shipped same day. Shipping times and costs vary based on the
                delivery method selected at checkout. Genara Labs is not
                responsible for delays caused by shipping carriers, weather, or
                other circumstances beyond our control. Risk of loss and title
                for products pass to you upon delivery to the shipping carrier.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Intellectual Property
              </h2>
              <p className="text-graphite leading-relaxed">
                All content on the Genara Labs website — including text, images,
                logos, graphics, design elements, and software — is the property
                of Genara Labs LLC or its licensors and is protected by United
                States and international copyright, trademark, and intellectual
                property laws. You may not reproduce, distribute, modify, or
                create derivative works from any content on this website without
                our prior written consent.
              </p>
            </FadeIn>

            <FadeIn delay={0.23}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Limitation of Liability
              </h2>
              <p className="text-graphite leading-relaxed">
                To the maximum extent permitted by law, Genara Labs LLC and its
                officers, directors, employees, and affiliates shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or related to your use of our
                website or products. Our total liability for any claim arising
                from a purchase shall not exceed the amount you paid for the
                specific product giving rise to the claim. This limitation
                applies regardless of the theory of liability, whether based in
                contract, tort, negligence, strict liability, or otherwise.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Indemnification
              </h2>
              <p className="text-graphite leading-relaxed">
                You agree to indemnify, defend, and hold harmless Genara Labs
                LLC, its officers, directors, employees, agents, and affiliates
                from and against any and all claims, damages, losses,
                liabilities, costs, and expenses (including reasonable
                attorneys&apos; fees) arising out of or related to your use of
                our products, your violation of these Terms &amp; Conditions, or
                your violation of any applicable law or regulation.
              </p>
            </FadeIn>

            <FadeIn delay={0.29}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Governing Law
              </h2>
              <p className="text-graphite leading-relaxed">
                These Terms &amp; Conditions shall be governed by and construed
                in accordance with the laws of the State of Wyoming, United
                States, without regard to its conflict of law provisions. Any
                legal action or proceeding arising under these terms shall be
                brought exclusively in the state or federal courts located in
                Wyoming.
              </p>
            </FadeIn>

            <FadeIn delay={0.32}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Dispute Resolution
              </h2>
              <p className="text-graphite leading-relaxed">
                Any dispute arising out of or relating to these Terms &amp;
                Conditions or your use of Genara Labs products shall first be
                attempted to be resolved through good-faith negotiation between
                the parties. If the dispute cannot be resolved through
                negotiation within 30 days, either party may submit the dispute
                to binding arbitration in the State of Wyoming, administered
                under the rules of the American Arbitration Association. The
                arbitrator&apos;s decision shall be final and binding. You agree
                that any dispute resolution proceedings will be conducted on an
                individual basis and not as a class action.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Modifications to Terms
              </h2>
              <p className="text-graphite leading-relaxed">
                Genara Labs reserves the right to modify these Terms &amp;
                Conditions at any time. Changes will be effective immediately
                upon posting on this page with an updated &quot;Last
                Updated&quot; date. Your continued use of our website or
                purchase of products after any modifications constitutes your
                acceptance of the revised terms. We encourage you to review
                these terms periodically.
              </p>
            </FadeIn>

            <FadeIn delay={0.38}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Contact Information
              </h2>
              <div className="text-graphite leading-relaxed space-y-1">
                <p>
                  If you have any questions about these Terms &amp; Conditions,
                  please contact us:
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

    </main>
  );
}
