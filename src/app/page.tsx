"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MolecularOrbital from "@/components/MolecularOrbital";
import { FadeIn } from "@/components/ui/fade-in";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShineBorder } from "@/components/ui/shine-border";
import { Card, CardContent } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Shield, Clock, MapPin, FlaskConical, ArrowRight, CheckCircle2 } from "lucide-react";

const featuredProducts = [
  { name: "BPC-157", variant: "5mg", price: "$42.99" },
  { name: "TB-500", variant: "5mg", price: "$38.99" },
  { name: "CJC-1295", variant: "2mg", price: "$29.99" },
  { name: "Ipamorelin", variant: "5mg", price: "$34.99" },
  { name: "GHK-Cu", variant: "50mg", price: "$44.99" },
  { name: "Selank", variant: "5mg", price: "$36.99" },
];


export default function HomePage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <main>
      {/* ── One gradient wraps hero + catalogue + bento ── */}
      <div className="bg-gradient-to-br from-mist via-[#EAF0F7] to-white">

      {/* ───── HERO ───── */}
      <section className="relative min-h-[90vh] py-24 flex items-center overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(21,101,192,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(21,101,192,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Animated accent line top */}
        <motion.div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-royal to-transparent" initial={{ width: "0%" }} animate={{ width: "40%" }} transition={{ duration: 1.5, ease: "easeOut" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-royal/10 mb-8">
                <FlaskConical className="h-3.5 w-3.5 text-royal" />
                <span className="text-sm text-royal tracking-wide font-medium">Research-Grade Compounds</span>
              </div>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.05] mb-6 tracking-tight text-navy">
              <TextGenerateEffect
                words="Precision Peptides for Serious Research"
                className="text-navy [&_span]:text-navy"
                duration={0.5}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="text-steel text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Third-party tested. Certificate of Analysis with every order. Trusted by researchers nationwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Link href="/shop" className="inline-flex items-center gap-2 bg-royal text-white px-8 py-3.5 rounded-lg font-display font-semibold text-lg hover:bg-deep-blue transition-colors shadow-lg shadow-royal/20">
                  Browse Peptides
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <Link href="/about" className="inline-flex items-center gap-1.5 text-steel font-display font-semibold text-base hover:text-navy transition-colors py-3.5">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {[
                { value: 98, prefix: "≥", suffix: "%", label: "Purity" },
                { value: 60, prefix: "", suffix: "+", label: "Compounds" },
                { text: "Same-Day", label: "Shipping" },
                { value: 100, prefix: "", suffix: "%", label: "CoA Coverage" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-navy mb-0.5">
                    {"text" in stat ? (
                      stat.text
                    ) : (
                      <>
                        {stat.prefix}
                        <NumberTicker value={stat.value} delay={2.2 + i * 0.2} className="text-navy" />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-steel text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="text-slate/30 text-xs mt-8"
            >
              For Research Use Only &middot; Not for Human Consumption &middot; Not FDA Approved &middot; Not a Supplement
            </motion.p>
          </div>

          {/* Right: Molecular Orbital SVG (desktop only) */}
          <div className="hidden lg:flex items-center justify-center">
            <MolecularOrbital />
          </div>
        </div>
      </section>

      {/* ───── FEATURED PRODUCTS + TRUST BENTO ───── */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase text-center mb-3">Catalog</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy text-center mb-4">Featured Research Peptides</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-steel text-center max-w-xl mx-auto mb-16">Our most requested peptides and compounds, ready to ship.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.name} delay={0.05 + i * 0.08}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <ShineBorder borderRadius={12} borderWidth={1} duration={16} color={["#2196F3", "#1565C0", "#4FC3F7"]} className="group bg-white overflow-hidden cursor-pointer">
                  <div className="bg-gradient-to-br from-mist to-silver/20 h-48 flex items-center justify-center relative overflow-hidden rounded-t-[11px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.03] to-cerulean/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <FlaskConical className="w-12 h-12 text-silver group-hover:text-royal/40 transition-colors duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-navy mb-0.5">{product.name}</h3>
                    <p className="text-xs text-slate mb-3">{product.variant} &middot; For Research Use Only</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-navy">{product.price}</span>
                      <Link href={`/shop/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="inline-flex items-center gap-1 text-royal text-sm font-semibold hover:text-deep-blue transition-colors">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ShineBorder>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <motion.div className="inline-block" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Link href="/shop" className="inline-flex items-center gap-2 text-royal font-display font-semibold hover:text-deep-blue transition-colors">
                  View All Peptides
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
        {/* ───── TRUST / VALUE PROPS — BENTO GRID (continues same section) ───── */}
        <div className="relative mt-24 mx-auto max-w-6xl overflow-hidden">
          <BackgroundBeams className="opacity-40" />
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase text-center mb-3">Why Genara Labs</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy text-center mb-4">Built for Researchers Who Won&apos;t Compromise</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-steel text-center max-w-xl mx-auto mb-16">Every compound we supply meets the standards your research demands.</p>
          </FadeIn>

          <div className="relative z-10 grid grid-cols-6 gap-3">
            {/* Purity stat card — with NumberTicker */}
            <FadeIn delay={0.1} className="col-span-full lg:col-span-2">
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="relative flex overflow-hidden h-full">
                <CardContent className="relative m-auto size-fit pt-6">
                  <div className="relative flex h-24 w-56 items-center">
                    <svg className="text-silver absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor" />
                    </svg>
                    <span className="mx-auto block w-fit text-5xl font-bold font-display text-navy">
                      ≥<NumberTicker value={98} delay={0.3} className="text-navy" />%
                    </span>
                  </div>
                  <h2 className="mt-6 text-center text-xl font-semibold font-display text-navy">Verified Purity</h2>
                  <p className="text-steel text-sm text-center mt-2">Every compound HPLC-verified to ≥98% before release</p>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Third-Party Tested */}
            <FadeIn delay={0.18} className="col-span-full sm:col-span-3 lg:col-span-2">
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="pt-6">
                  <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-silver/40 before:absolute before:-inset-2 before:rounded-full before:border before:border-silver/20">
                    <Shield className="m-auto size-12 text-royal" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h2 className="text-lg font-semibold font-display text-navy">Third-Party Tested</h2>
                    <p className="text-steel text-sm leading-relaxed">Every batch undergoes independent laboratory analysis to verify identity, purity, and potency before release.</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Certificate of Analysis */}
            <FadeIn delay={0.26} className="col-span-full sm:col-span-3 lg:col-span-2">
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="pt-6">
                  <div className="pt-4 pb-2 flex flex-col items-center gap-3">
                    {["HPLC Purity Analysis", "Mass Spectrometry", "Endotoxin Testing", "Sterility Verification"].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 w-full max-w-[220px]">
                        <CheckCircle2 className="w-4 h-4 text-royal shrink-0" />
                        <span className="text-sm text-graphite">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h2 className="text-lg font-semibold font-display text-navy">Certificate of Analysis</h2>
                    <p className="text-steel text-sm leading-relaxed">Full analytical documentation accompanies every purchase — no exceptions.</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Same-Day Shipping */}
            <FadeIn delay={0.34} className="col-span-full lg:col-span-3">
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="grid pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-silver/40 before:absolute before:-inset-2 before:rounded-full before:border before:border-silver/20">
                      <Clock className="m-auto size-5 text-royal" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold font-display text-navy">Same-Day Shipping</h2>
                      <p className="text-steel text-sm leading-relaxed">Orders placed before 1:00 PM EST ship the same business day. Reliable carriers, tracked from dispatch to delivery.</p>
                    </div>
                  </div>
                  <div className="relative -mb-6 -mr-6 mt-6 h-fit rounded-tl-xl border-l border-t border-silver/40 p-6 sm:ml-6">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full border border-silver/60 bg-silver/20" />
                      <span className="block size-2 rounded-full border border-silver/60 bg-silver/20" />
                      <span className="block size-2 rounded-full border border-silver/60 bg-silver/20" />
                    </div>
                    <div className="pt-4 space-y-3">
                      {[
                        { time: "9:02 AM", status: "Order placed", color: "bg-royal" },
                        { time: "10:15 AM", status: "Quality check passed", color: "bg-cerulean" },
                        { time: "12:34 PM", status: "Shipped via UPS", color: "bg-sky" },
                      ].map((step) => (
                        <div key={step.time} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${step.color}`} />
                          <span className="text-xs text-slate font-mono w-16">{step.time}</span>
                          <span className="text-sm text-graphite">{step.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* US-Based Operations */}
            <FadeIn delay={0.42} className="col-span-full lg:col-span-3">
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
              <Card className="relative overflow-hidden h-full">
                <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-silver/40 before:absolute before:-inset-2 before:rounded-full before:border before:border-silver/20">
                      <MapPin className="m-auto size-5 text-royal" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold font-display text-navy">US-Based Operations</h2>
                      <p className="text-steel text-sm leading-relaxed">Headquartered in the United States with domestic fulfillment. All compounds sourced, tested, and shipped from US facilities.</p>
                    </div>
                  </div>
                  <div className="relative mt-6 sm:-my-6 sm:-mr-6 border-l border-silver/40 sm:ml-6">
                    <div className="relative flex h-full flex-col justify-center space-y-5 py-6 pl-6">
                      {[
                        { label: "Sourced", desc: "US-vetted manufacturers" },
                        { label: "Tested", desc: "Independent US laboratories" },
                        { label: "Shipped", desc: "Domestic fulfillment center" },
                      ].map((item, i) => (
                        <div key={item.label} className="flex items-start gap-3">
                          <div className="mt-1 w-7 h-7 rounded-lg bg-ice flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-royal">{i + 1}</span>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-navy block">{item.label}</span>
                            <span className="text-xs text-steel">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
      </div>{/* close gradient wrapper */}

      {/* ───── STATS BAND ───── */}
      <section className="relative py-16 pb-8 px-4 bg-navy overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { value: 60, suffix: "+", label: "Compounds Available" },
                { value: 98, prefix: "≥", suffix: "%", label: "Verified Purity" },
                { text: "Same-Day", label: "Order Fulfillment" },
                { value: 100, suffix: "%", label: "CoA Included" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                    {"text" in stat ? (
                      stat.text
                    ) : (
                      <>
                        {stat.prefix}
                        <NumberTicker value={stat.value} delay={0.2 + i * 0.15} className="text-white" />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div className="bg-navy px-4 pb-8">
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
      </div>
    </main>
  );
}
