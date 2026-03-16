import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, FlaskConical, Building2 } from "lucide-react";

const navLinks = [
  { text: "Home", href: "/" },
  { text: "Shop", href: "/shop" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

const compoundLinks = [
  { text: "Growth Hormone Secretagogues", href: "/shop" },
  { text: "Repair & Recovery", href: "/shop" },
  { text: "Cognitive & Neuropeptides", href: "/shop" },
  { text: "Cosmetic Peptides", href: "/shop" },
];

const supportLinks = [
  { text: "Contact Us", href: "/contact" },
  { text: "About Us", href: "/about" },
  { text: "Browse Peptides", href: "/shop" },
];

const legalLinks = [
  { text: "Terms & Conditions", href: "/terms" },
  { text: "Privacy Policy", href: "/privacy" },
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
    <footer className="bg-carbon w-full rounded-t-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="flex justify-center gap-2.5 sm:justify-start items-center">
              <Image
                src="/genara-logo.png"
                alt="Genara Labs"
                width={160}
                height={36}
                className="h-9 w-auto brightness-0 invert"
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
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
                Compounds
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {compoundLinks.map(({ text, href }) => (
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
          <p className="text-slate/60 text-xs leading-relaxed max-w-4xl mx-auto text-center sm:text-left">
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. Products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>

          <div className="mt-6 text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-slate/50 text-xs">
              &copy; {new Date().getFullYear()} Genara Labs LLC. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-2 sm:mt-0">
              {legalLinks.map(({ text, href }) => (
                <Link key={text} href={href} className="text-slate/40 text-xs hover:text-sky transition-colors">
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
