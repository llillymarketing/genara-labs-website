import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, FlaskConical, Building2 } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { FadeIn } from "@/components/ui/fade-in";

const navLinks = [
  { text: "Home", href: "/" },
  { text: "Shop", href: "/shop" },
  { text: "About", href: "/about" },
  { text: "Calculator", href: "/calculator" },
  { text: "Affiliates", href: "/affiliates" },
  { text: "Contact", href: "/contact" },
];

const supportLinks = [
  { text: "Contact Us", href: "/contact" },
  { text: "About Us", href: "/about" },
  { text: "Browse Peptides", href: "/shop" },
];

const legalLinks = [
  { text: "Terms & Conditions", href: "/terms" },
  { text: "Privacy Policy", href: "/privacy" },
  { text: "Shipping Policy", href: "/shipping" },
  { text: "Refund Policy", href: "/refund-policy" },
  { text: "Disclaimer", href: "/disclaimer" },
];

const contactInfo = [
  { icon: Mail, text: "support@genaralabs.com" },
  { icon: MapPin, text: "30 N LaSalle St, Suite 1234, Chicago, IL 60602", isAddress: true },
  { icon: Building2, text: "Genara Labs LLC — Wyoming, US" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-navy via-carbon to-carbon w-full overflow-hidden">
      {/* Particles span the entire footer */}
      <Particles className="absolute inset-0 z-0" quantity={50} color="#4FC3F7" size={0.3} staticity={40} ease={80} />

      {/* ── Footer Links ── */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="flex justify-center gap-2.5 sm:justify-start items-center">
              <Image
                src="/genara-badge.png"
                alt="Genara Labs"
                width={200}
                height={200}
                className="h-20 w-auto mix-blend-screen opacity-90"
              />
            </div>

            <p className="text-slate text-sm mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              Research-grade peptides and compounds with verified purity.
              Third-party tested, Certificate of Analysis provided with every
              order. Built for researchers who demand precision.
            </p>

            <div className="mt-8 flex justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                <FlaskConical className="h-3.5 w-3.5 text-sky" />
                <span className="text-xs text-white/50 tracking-wide">
                  Research Use Only
                </span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold font-display uppercase tracking-wider text-silver">
                Navigation
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {navLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-slate hover:text-sky transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold font-display uppercase tracking-wider text-silver">
                Support
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {supportLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-slate hover:text-sky transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-sm font-semibold font-display uppercase tracking-wider text-silver mt-8">
                Legal
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {legalLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-slate hover:text-sky transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold font-display uppercase tracking-wider text-silver">
                Contact
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <div className="flex items-start justify-center gap-2 sm:justify-start">
                      <Icon className="size-4 shrink-0 text-royal mt-0.5" />
                      {isAddress ? (
                        <address className="text-slate not-italic leading-relaxed">
                          {text}
                        </address>
                      ) : (
                        <span className="text-slate">{text}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-steel/20 pt-6">
          <p className="text-slate/60 text-xs leading-relaxed max-w-4xl text-left">
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. Products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>

          <div className="mt-6 text-center sm:text-left">
            <p className="text-slate/50 text-xs">
              &copy; {new Date().getFullYear()} Genara Labs LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
