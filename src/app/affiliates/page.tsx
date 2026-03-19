"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShineBorder } from "@/components/ui/shine-border";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, DollarSign, Users, BarChart3, Link2, Mail, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Generous Commissions",
    desc: "Earn competitive commissions on every referred sale. The more you refer, the more you earn.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    desc: "Track clicks, conversions, and earnings in real time through your personal affiliate portal.",
  },
  {
    icon: Link2,
    title: "Custom Referral Links",
    desc: "Get unique tracking links and discount codes to share with your audience.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "Our affiliate team is here to help you succeed with assets, guidance, and fast responses.",
  },
];

const steps = [
  { step: "01", title: "Apply", desc: "Fill out the form below with your details and how you plan to promote." },
  { step: "02", title: "Get Approved", desc: "Our team reviews applications within 48 hours. You'll receive your unique links upon approval." },
  { step: "03", title: "Share & Earn", desc: "Promote Genara Labs to your audience and earn commissions on every qualifying purchase." },
];

export default function AffiliatesPage() {
  return (
    <main>
      {/* ── Unified gradient wrapper: Hero + Benefits + How It Works ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#EAF0F7] to-white">
        <BackgroundBeams className="opacity-30" />

        {/* ── Hero Section ── */}
        <section className="relative z-10 pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-4">
                Partner Program
              </p>
            </FadeIn>
            <div className="mb-6 max-w-2xl">
              <TextGenerateEffect
                words="Become a Genara Labs Affiliate"
                className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight [&_span]:text-navy"
                duration={0.5}
              />
            </div>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg max-w-xl leading-relaxed">
                Partner with a trusted name in research-grade peptides. Earn commissions by referring researchers, laboratories, and science-minded buyers to our catalog.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Benefits Grid ── */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-4">
                Why Partner With Us
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-steel text-center max-w-lg mx-auto mb-12">
                Everything you need to succeed as a Genara Labs affiliate.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <FadeIn key={b.title} delay={0.05 + i * 0.08}>
                  <Card className="h-full bg-white border-silver/40">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center mb-4">
                        <b.icon className="w-5 h-5 text-royal" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-navy mb-2">{b.title}</h3>
                      <p className="text-steel text-sm leading-relaxed">{b.desc}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-12">
                How It Works
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <FadeIn key={s.step} delay={0.05 + i * 0.1}>
                  <div className="text-center">
                    <div className="font-display text-5xl font-bold text-royal/10 mb-3">{s.step}</div>
                    <h3 className="font-display text-lg font-semibold text-navy mb-2">{s.title}</h3>
                    <p className="text-steel text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Diagonal divider ── */}
      <div className="relative h-16 -mt-[2px] bg-white">
        <svg className="absolute bottom-0 left-0 w-full block" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
          <path d="M0 64L1440 0V64H0Z" fill="#0D2137" />
        </svg>
      </div>

      {/* ── Application Form ── */}
      <section className="py-20 px-4 bg-navy">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-4">
              Apply Now
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="text-white/40 text-center mb-10">
              Tell us about yourself and how you plan to promote Genara Labs. We review all applications within 48 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-sky/40 focus:ring-2 focus:ring-sky/20 transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-sky/40 focus:ring-2 focus:ring-sky/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Website or Social Media *</label>
                <input
                  type="url"
                  required
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-sky/40 focus:ring-2 focus:ring-sky/20 transition-all"
                  placeholder="https://yourwebsite.com or @handle"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Audience Size (approximate)</label>
                <input
                  type="text"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-sky/40 focus:ring-2 focus:ring-sky/20 transition-all"
                  placeholder="e.g. 10,000 Instagram followers"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">How do you plan to promote Genara Labs? *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:border-sky/40 focus:ring-2 focus:ring-sky/20 transition-all resize-none"
                  placeholder="Tell us about your audience, content style, and promotion strategy..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full bg-sky text-navy px-6 py-4 rounded-lg font-display font-semibold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(79,195,247,0.3)] transition-all duration-300"
              >
                Submit Application
              </motion.button>

              <p className="text-white/20 text-xs text-center mt-4">
                For Research Use Only. Not for Human Consumption. Not FDA Approved. Not a Supplement.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-navy">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/30 text-xs leading-relaxed">
            <strong className="text-white/50 font-semibold">Disclaimer:</strong>{" "}
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. All products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>
        </div>
      </section>

      {/* Gradient blend into footer */}
      <div className="h-12 bg-gradient-to-b from-navy to-carbon" />
    </main>
  );
}
