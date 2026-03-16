"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { ShineBorder } from "@/components/ui/shine-border";
import { Microscope, TestTubes, ShieldCheck, Atom } from "lucide-react";

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

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-navy py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={380}
            height={95}
            rotate={8}
            gradient="from-royal/[0.08]"
            className="right-[-6%] top-[25%]"
          />
          <ElegantShape
            delay={0.5}
            width={260}
            height={65}
            rotate={-12}
            gradient="from-cerulean/[0.06]"
            className="left-[-4%] bottom-[15%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              About Us
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Precision Compounds for Serious Research
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-light">
              Genara Labs supplies research-grade peptides and compounds to
              laboratories, academic institutions, and independent researchers.
              Our commitment is simple: verified purity, complete documentation,
              and reliable fulfillment — every order, every time.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-24 px-4 bg-white overflow-hidden">
        <BackgroundBeams className="opacity-35" />
        <BackgroundGlow position="top-right" color="sky" className="opacity-50" />
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-10">
              Founded on a Simple Principle
            </h2>
          </FadeIn>
          <div className="space-y-6 text-graphite leading-relaxed">
            <FadeIn delay={0.1}>
              <p>
                Genara Labs was founded on a straightforward observation: the
                research chemical market was saturated with suppliers who
                prioritized volume over quality. Researchers were forced to
                navigate inconsistent purity levels, missing documentation, and
                unreliable fulfillment. We set out to build something better.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p>
                From day one, our approach has been rooted in analytical rigor.
                Every compound in our catalog is sourced from vetted
                manufacturers, subjected to independent third-party testing, and
                accompanied by a comprehensive Certificate of Analysis. We
                don&apos;t ship anything we wouldn&apos;t trust in our own
                research.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                Today, Genara Labs serves a growing community of researchers
                across the United States. Our catalog spans peptides, amino acid
                derivatives, and specialty compounds — each held to the same
                uncompromising standard. We believe that reliable research starts
                with reliable materials, and that&apos;s exactly what we deliver.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quality Standard */}
      <section className="relative py-24 px-4 bg-mist overflow-hidden">
        <BackgroundGlow position="center" color="ice" className="opacity-70" />
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase text-center mb-3">
              Quality Assurance
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-4">
              Our Quality Standard
            </h2>
            <p className="text-steel text-center max-w-xl mx-auto mb-14">
              Quality at Genara Labs isn&apos;t a marketing claim — it&apos;s a
              process. Every compound passes through a multi-step verification
              pipeline.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {qualitySteps.map((item, i) => (
              <FadeIn key={item.title} delay={0.1 + i * 0.08}>
                <ShineBorder
                  borderRadius={12}
                  borderWidth={1}
                  duration={14}
                  color={["#1565C0", "#4FC3F7"]}
                  className="bg-white h-full"
                >
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-royal" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-navy mb-2">
                      {item.title}
                    </h3>
                    <p className="text-steel text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ShineBorder>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-steel text-center mt-10 max-w-xl mx-auto text-sm">
              Complete analytical documentation — including lot numbers, testing
              dates, and methodology — is provided with every purchase. No
              exceptions.
            </p>
          </FadeIn>
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
