import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={360}
            height={90}
            rotate={9}
            gradient="from-royal/[0.08]"
            className="right-[-6%] top-[22%]"
          />
          <ElegantShape
            delay={0.5}
            width={250}
            height={62}
            rotate={-11}
            gradient="from-cerulean/[0.06]"
            className="left-[-4%] bottom-[16%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Legal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-light max-w-xl mx-auto">
              How Genara Labs LLC collects, uses, and protects your personal
              information.
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
              <p className="text-graphite leading-relaxed">
                Genara Labs LLC (&quot;Genara Labs,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) is committed to protecting
                the privacy of our customers and website visitors. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website at genaralabs.com or
                place an order with us.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Information We Collect
              </h2>
              <div className="text-graphite leading-relaxed space-y-4">
                <p>
                  <strong className="text-navy">Personal Information:</strong>{" "}
                  When you create an account or place an order, we collect your
                  name, email address, phone number, billing address, and
                  shipping address.
                </p>
                <p>
                  <strong className="text-navy">Order Data:</strong> We collect
                  information related to your purchases, including products
                  ordered, order amounts, payment method details (processed
                  securely by our payment processor — we do not store full card
                  numbers), and transaction history.
                </p>
                <p>
                  <strong className="text-navy">Browsing Data:</strong> We
                  automatically collect certain information when you visit our
                  website, including your IP address, browser type, operating
                  system, referring URLs, pages visited, time spent on pages,
                  and other standard web analytics data.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.11}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                How We Use Your Information
              </h2>
              <ul className="text-graphite leading-relaxed space-y-2 list-disc list-inside">
                <li>Process and fulfill your orders</li>
                <li>
                  Communicate with you about your orders, account, and customer
                  service inquiries
                </li>
                <li>
                  Send transactional emails (order confirmations, shipping
                  notifications, etc.)
                </li>
                <li>
                  Improve our website, products, and services based on usage
                  patterns
                </li>
                <li>Detect and prevent fraud or unauthorized activity</li>
                <li>Comply with legal obligations</li>
                <li>
                  Send marketing communications (only with your explicit
                  consent, and you may opt out at any time)
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.14}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Data Sharing
              </h2>
              <p className="text-graphite leading-relaxed">
                We do not sell, rent, or trade your personal information to
                third parties. We share your data only with trusted service
                providers who are necessary to operate our business, including:
              </p>
              <ul className="text-graphite leading-relaxed space-y-2 list-disc list-inside mt-3">
                <li>
                  <strong className="text-navy">Payment Processors:</strong> To
                  securely process your transactions
                </li>
                <li>
                  <strong className="text-navy">Shipping Carriers:</strong> To
                  deliver your orders (name, address, and contact information)
                </li>
                <li>
                  <strong className="text-navy">Analytics Providers:</strong> To
                  help us understand website usage (anonymized data only)
                </li>
              </ul>
              <p className="text-graphite leading-relaxed mt-3">
                We may also disclose your information if required by law, court
                order, or governmental regulation, or to protect the rights,
                property, or safety of Genara Labs, our customers, or others.
              </p>
            </FadeIn>

            <FadeIn delay={0.17}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-graphite leading-relaxed">
                Our website uses cookies and similar tracking technologies to
                enhance your browsing experience, remember your preferences, and
                collect analytics data. Cookies are small text files stored on
                your device. You can control cookie settings through your
                browser preferences. Disabling cookies may affect some website
                functionality. We use both session cookies (which expire when
                you close your browser) and persistent cookies (which remain
                until they expire or you delete them).
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Data Security
              </h2>
              <p className="text-graphite leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information, including SSL/TLS encryption for all data
                transmitted between your browser and our servers, secure payment
                processing through PCI-compliant providers, and restricted
                access to personal data within our organization. While we take
                reasonable steps to safeguard your information, no method of
                electronic transmission or storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </FadeIn>

            <FadeIn delay={0.23}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Your Rights
              </h2>
              <p className="text-graphite leading-relaxed">
                You have the right to:
              </p>
              <ul className="text-graphite leading-relaxed space-y-2 list-disc list-inside mt-3">
                <li>
                  <strong className="text-navy">Access</strong> the personal
                  information we hold about you
                </li>
                <li>
                  <strong className="text-navy">Correct</strong> any inaccurate
                  or incomplete personal data
                </li>
                <li>
                  <strong className="text-navy">Delete</strong> your personal
                  information (subject to legal retention requirements)
                </li>
                <li>
                  <strong className="text-navy">Opt out</strong> of marketing
                  communications at any time
                </li>
                <li>
                  <strong className="text-navy">Request</strong> a copy of your
                  data in a portable format
                </li>
              </ul>
              <p className="text-graphite leading-relaxed mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:support@genaralabs.com"
                  className="text-royal hover:text-cerulean transition-colors"
                >
                  support@genaralabs.com
                </a>
                . We will respond to your request within 30 days.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Policy Updates
              </h2>
              <p className="text-graphite leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. When we make
                material changes, we will update the &quot;Last Updated&quot;
                date at the top of this page and, where appropriate, notify you
                via email or a prominent notice on our website. Your continued
                use of our website after any changes constitutes your acceptance
                of the updated policy.
              </p>
            </FadeIn>

            <FadeIn delay={0.29}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                Contact Us
              </h2>
              <div className="text-graphite leading-relaxed space-y-1">
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us:
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
