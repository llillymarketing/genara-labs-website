"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Microscope, TestTubes, ShieldCheck, Atom, ArrowRight } from "lucide-react";
import Link from "next/link";

const qualitySteps = [
  {
    title: "HPLC Purity Analysis",
    desc: "High-performance liquid chromatography confirms compound identity and purity to ≥98%.",
    icon: Microscope,
  },
  {
    title: "Mass Spectrometry",
    desc: "Molecular weight verification ensures you receive exactly the compound specified.",
    icon: Atom,
  },
  {
    title: "Endotoxin Testing",
    desc: "LAL testing confirms endotoxin levels fall below acceptable research thresholds.",
    icon: TestTubes,
  },
  {
    title: "Sterility Verification",
    desc: "Applicable products undergo sterility testing per USP standards.",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: 98, prefix: "≥", suffix: "%", label: "Minimum Purity" },
  { value: 60, suffix: "+", label: "Compounds" },
  { text: "Same-Day", label: "Shipping" },
  { value: 100, suffix: "%", label: "CoA Coverage" },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── Opening Statement — no hero banner, just text on white ── */}
      <section className="pt-20 pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-6">
              About Genara Labs
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-[1.08] mb-8">
              <TextGenerateEffect
                words="We built the compound supplier we wished existed."
                className="text-navy [&_span]:text-navy"
                duration={0.5}
              />
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-steel text-lg leading-relaxed max-w-2xl">
              Genara Labs is a Chicago-based research chemical supplier. We exist
              because researchers deserve compounds they can trust — verified,
              documented, and shipped without delay.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Gradient blend: white → mist ── */}
      <div className="h-24 bg-gradient-to-b from-white to-mist" />

      {/* ── Story — side-by-side layout ── */}
      <section className="pb-24 px-4 bg-mist">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: story text */}
          <div>
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-8">
                Our Story
              </h2>
            </FadeIn>
            <div className="space-y-5 text-graphite leading-relaxed">
              <FadeIn delay={0.1}>
                <p>
                  The research chemical market was saturated with suppliers who
                  prioritized volume over quality. Researchers navigated
                  inconsistent purity levels, missing documentation, and
                  unreliable fulfillment. We set out to build something better.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p>
                  From day one, every compound in our catalog is sourced from
                  vetted manufacturers, subjected to independent third-party
                  testing, and accompanied by a comprehensive Certificate of
                  Analysis. We don&apos;t ship anything we wouldn&apos;t trust in
                  our own research.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  Today, Genara Labs serves a growing community of researchers
                  across the United States. Our catalog spans peptides, amino acid
                  derivatives, and specialty compounds — each held to the same
                  uncompromising standard.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Right: stats grid */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4 lg:mt-16">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-6 border border-silver/30"
                >
                  <div className="font-display text-3xl font-bold text-navy mb-1">
                    {"text" in stat ? (
                      stat.text
                    ) : (
                      <>
                        {stat.prefix}
                        <NumberTicker value={stat.value} delay={0.3} className="text-navy" />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-steel text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quality Standard — navy with diagonal + DNA video ── */}
      <section className="relative bg-navy overflow-hidden">
        {/* Video background handled by layout.tsx server component */}
        {/* Diagonal top edge */}
        <div className="relative h-20">
          <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path d="M0 0H1440V80L0 0Z" fill="#FFFFFF" />
          </svg>
        </div>
        <div className="relative z-10 px-4 pb-24">
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-3">
              Quality Assurance
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Quality Standard
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-white/40 max-w-xl mb-14">
              Quality at Genara Labs isn&apos;t a marketing claim — it&apos;s a
              process. Every compound passes through a multi-step verification
              pipeline before it ships.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {qualitySteps.map((item, i) => (
              <FadeIn key={item.title} delay={0.1 + i * 0.08}>
                <div className="bg-deep-blue/60 border border-white/[0.06] rounded-xl p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-sky" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-white/30 mt-10 max-w-xl text-sm">
              Complete analytical documentation — including lot numbers, testing
              dates, and methodology — is provided with every purchase. No
              exceptions.
            </p>
          </FadeIn>
        </div>
        </div>{/* close pb-24 wrapper */}
        {/* Bottom diagonal inside section so video covers it */}
        <div className="relative h-20">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path d="M0 0L1440 80H0V0Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
              Ready to Order?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-steel max-w-lg mx-auto mb-8">
              Browse our full catalog of research-grade compounds. Every product
              ships with a Certificate of Analysis and same-day fulfillment.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-royal text-white px-8 py-3.5 rounded-lg font-display font-semibold text-lg hover:bg-deep-blue transition-colors"
            >
              Browse Compounds
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4 bg-white">
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
