"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MolecularOrbital from "@/components/MolecularOrbital";
import { FadeIn } from "@/components/ui/fade-in";
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
  return (
    <main className="bg-white">

      {/* ───── HERO ───── */}
      <section className="relative min-h-[92vh] py-28 flex items-center overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0A1F44 0%, #0D2B5A 50%, #0A1F44 100%)" }}>

        {/* Very subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, #93C5FD 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Soft radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 65% 45%, rgba(37,99,235,0.18) 0%, transparent 65%)" }} />

        {/* Thin accent line */}
        <motion.div
          className="absolute top-0 left-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.6), transparent)" }}
          initial={{ width: "0%", x: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase"
                style={{ background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.2)", color: "#93C5FD", letterSpacing: "0.08em" }}>
                <FlaskConical className="h-3 w-3" />
                Research-Grade Compounds
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.04] mb-7 text-white" style={{ letterSpacing: "-0.04em" }}>
              <TextGenerateEffect
                words="Precision Peptides for Serious Research"
                className="text-white [&_span]:text-white"
                duration={0.45}
              />
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
              className="text-base sm:text-lg leading-relaxed mb-12 max-w-lg mx-auto lg:mx-0"
              style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}
            >
              Third-party tested. Certificate of Analysis with every order.
              Trusted by researchers nationwide.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-16"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <Link href="/shop"
                  className="inline-flex items-center gap-2.5 bg-white text-navy font-display font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-200"
                  style={{ boxShadow: "0 0 0 0 rgba(37,99,235,0)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(10,31,68,0.25)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(37,99,235,0)"}
                >
                  Browse Peptides
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <Link href="/about"
                className="inline-flex items-center gap-1.5 font-medium text-sm py-3.5 transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.7, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6"
            >
              {[
                { value: 98, prefix: "≥", suffix: "%", label: "Purity" },
                { value: 60, suffix: "+", label: "Compounds" },
                { text: "Same-Day", label: "Shipping" },
                { value: 100, suffix: "%", label: "CoA Coverage" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl font-bold text-white mb-1" style={{ letterSpacing: "-0.02em" }}>
                    {"text" in stat ? stat.text : (
                      <>{stat.prefix}<NumberTicker value={stat.value} delay={2.1 + i * 0.15} className="text-white" />{stat.suffix}</>
                    )}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="text-[11px] mt-10"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              For Research Use Only &middot; Not for Human Consumption &middot; Not FDA Approved
            </motion.p>
          </div>

          {/* Right — Molecular Orbital */}
          <div className="hidden lg:flex items-center justify-center opacity-80">
            <MolecularOrbital />
          </div>
        </div>
      </section>

      {/* ───── FEATURED PRODUCTS ───── */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0A1F44 0%, #0D2B5A 40%, #0A1F44 100%)" }}>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, #93C5FD 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-28">

          {/* Section header */}
          <div className="mb-20 lg:mb-24">
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: "#93C5FD" }}>Catalog</p>
            </FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <FadeIn delay={0.08}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-md" style={{ letterSpacing: "-0.032em", lineHeight: "1.08" }}>
                  Featured Research Peptides
                </h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors shrink-0"
                  style={{ color: "rgba(147,197,253,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#93C5FD"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(147,197,253,0.7)"}
                >
                  View all compounds
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.name} delay={0.04 + i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.25, 0.4, 0.25, 1] } }}
                  whileTap={{ scale: 0.99 }}
                  className="group rounded-2xl overflow-hidden cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Link href={`/shop/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                    <div className="h-44 flex items-center justify-center relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, rgba(10,31,68,0.7) 0%, rgba(13,43,90,0.5) 100%)" }}>
                      <div className="absolute inset-0 opacity-[0.035]"
                        style={{ backgroundImage: "linear-gradient(rgba(147,197,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.1) 0%, transparent 70%)" }} />
                      <FlaskConical className="w-10 h-10 relative z-10 transition-all duration-300"
                        style={{ color: "rgba(147,197,253,0.35)" }}
                        onMouseEnter={e => (e.currentTarget as SVGElement).style.color = "rgba(147,197,253,0.65)"}
                      />
                    </div>
                  </Link>
                  <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href={`/shop/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <h3 className="font-display text-[15px] font-semibold text-white mb-1 group-hover:text-sky transition-colors duration-200"
                        style={{ letterSpacing: "-0.01em" }}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[12px] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>{product.variant} &middot; Research Grade</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-white" style={{ letterSpacing: "-0.02em" }}>{product.price}</span>
                      <Link href={`/shop/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="inline-flex items-center gap-1 text-[13px] font-medium transition-colors"
                        style={{ color: "rgba(147,197,253,0.65)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#93C5FD"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(147,197,253,0.65)"}
                      >
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TRUST / VALUE PROPS ───── */}
      <section className="bg-white py-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-20">
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-5 text-royal">Why Genara Labs</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy max-w-xl" style={{ letterSpacing: "-0.032em", lineHeight: "1.08" }}>
                Built for Researchers Who Won&apos;t Compromise
              </h2>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="mt-5 text-steel text-base leading-relaxed max-w-lg">
                Every compound we supply meets the standards your research demands.
              </p>
            </FadeIn>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-6 gap-4 lg:gap-5">

            {/* Purity */}
            <FadeIn delay={0.08} className="col-span-full lg:col-span-2">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full"
                onMouseEnter={e => (e.currentTarget.firstElementChild as HTMLElement).style.boxShadow = "0 8px 40px rgba(10,31,68,0.12)"}
                onMouseLeave={e => (e.currentTarget.firstElementChild as HTMLElement).style.boxShadow = "0 1px 3px rgba(10,31,68,0.04), 0 4px 24px rgba(10,31,68,0.06)"}
              >
              <Card className="relative flex overflow-hidden h-full">
                <CardContent className="relative m-auto size-fit pt-8">
                  <div className="relative flex h-24 w-56 items-center">
                    <svg className="absolute inset-0 size-full" style={{ color: "#EFF6FF" }} viewBox="0 0 254 104" fill="none">
                      <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor" />
                    </svg>
                    <span className="mx-auto block w-fit text-5xl font-bold font-display text-navy" style={{ letterSpacing: "-0.04em" }}>
                      ≥<NumberTicker value={98} delay={0.3} className="text-navy" />%
                    </span>
                  </div>
                  <h3 className="mt-8 text-center text-lg font-semibold font-display text-navy">Verified Purity</h3>
                  <p className="text-steel text-sm text-center mt-2 leading-relaxed">Every compound HPLC-verified to ≥98% before release</p>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Third-Party Tested */}
            <FadeIn delay={0.14} className="col-span-full sm:col-span-3 lg:col-span-2">
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
              <Card className="relative overflow-hidden h-full">
                <CardContent className="pt-8">
                  <div className="relative mx-auto flex aspect-square size-28 rounded-full items-center justify-center mb-8"
                    style={{ background: "#EFF6FF" }}>
                    <Shield className="size-11 text-royal" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold font-display text-navy mb-3">Third-Party Tested</h3>
                    <p className="text-steel text-sm leading-relaxed">Every batch undergoes independent laboratory analysis to verify identity, purity, and potency before release.</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Certificate of Analysis */}
            <FadeIn delay={0.2} className="col-span-full sm:col-span-3 lg:col-span-2">
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
              <Card className="relative overflow-hidden h-full">
                <CardContent className="pt-8">
                  <div className="flex flex-col gap-3 mb-8">
                    {["HPLC Purity Analysis", "Mass Spectrometry", "Endotoxin Testing", "Sterility Verification"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#EFF6FF" }}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-royal" />
                        </div>
                        <span className="text-sm text-graphite font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold font-display text-navy mb-3">Certificate of Analysis</h3>
                    <p className="text-steel text-sm leading-relaxed">Full analytical documentation accompanies every purchase — no exceptions.</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>

            {/* Same-Day Shipping */}
            <FadeIn delay={0.26} className="col-span-full lg:col-span-3">
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
              <Card className="relative overflow-hidden h-full">
                <CardContent className="grid pt-8 sm:grid-cols-2">
                  <div className="flex flex-col justify-between space-y-10 lg:space-y-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                      <Clock className="size-5 text-royal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-display text-navy mb-3">Same-Day Shipping</h3>
                      <p className="text-steel text-sm leading-relaxed">Orders placed before 1:00 PM EST ship the same business day. Reliable carriers, tracked from dispatch to delivery.</p>
                    </div>
                  </div>
                  <div className="relative -mb-8 -mr-8 mt-8 rounded-tl-2xl p-6 sm:ml-8" style={{ background: "#F8FAFC", borderLeft: "1px solid #E2E8F0", borderTop: "1px solid #E2E8F0" }}>
                    <div className="flex gap-1.5 mb-5">
                      {[0,1,2].map(d => <span key={d} className="block w-2 h-2 rounded-full bg-silver/60" />)}
                    </div>
                    <div className="space-y-4">
                      {[
                        { time: "9:02 AM", status: "Order placed", color: "#2563EB" },
                        { time: "10:15 AM", status: "Quality check passed", color: "#3B82F6" },
                        { time: "12:34 PM", status: "Shipped via UPS", color: "#93C5FD" },
                      ].map((step) => (
                        <div key={step.time} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                          <span className="text-[11px] text-slate font-mono w-16">{step.time}</span>
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
            <FadeIn delay={0.32} className="col-span-full lg:col-span-3">
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="h-full">
              <Card className="relative overflow-hidden h-full">
                <CardContent className="grid h-full pt-8 sm:grid-cols-2">
                  <div className="flex flex-col justify-between space-y-10 lg:space-y-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                      <MapPin className="size-5 text-royal" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-display text-navy mb-3">US-Based Operations</h3>
                      <p className="text-steel text-sm leading-relaxed">Headquartered in the United States with domestic fulfillment. All compounds sourced, tested, and shipped from US facilities.</p>
                    </div>
                  </div>
                  <div className="relative mt-8 sm:-my-8 sm:-mr-8 sm:ml-8 flex flex-col justify-center space-y-6 py-6 pl-8" style={{ borderLeft: "1px solid #E2E8F0" }}>
                    {[
                      { label: "Sourced", desc: "US-vetted manufacturers" },
                      { label: "Tested", desc: "Independent US laboratories" },
                      { label: "Shipped", desc: "Domestic fulfillment center" },
                    ].map((item, i) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs text-royal" style={{ background: "#EFF6FF" }}>
                          {i + 1}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-navy block mb-0.5">{item.label}</span>
                          <span className="text-xs text-steel">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───── STATS BAND ───── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: "#0A1F44" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { value: 60, suffix: "+", label: "Compounds Available" },
                { value: 98, prefix: "≥", suffix: "%", label: "Verified Purity" },
                { text: "Same-Day", label: "Order Fulfillment" },
                { value: 100, suffix: "%", label: "CoA Included" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-2" style={{ letterSpacing: "-0.03em" }}>
                    {"text" in stat ? stat.text : (
                      <>{stat.prefix}<NumberTicker value={stat.value} delay={0.2 + i * 0.12} className="text-white" />{stat.suffix}</>
                    )}
                  </div>
                  <div className="text-xs font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div className="px-6 py-10" style={{ background: "#0A1F44", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            <strong style={{ color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>Disclaimer: </strong>
            For Research Use Only. Not for Human Consumption. Not FDA Approved. Not a Supplement.
            All products sold by Genara Labs LLC are intended exclusively for in-vitro research and laboratory use.
            Not intended to diagnose, treat, cure, or prevent any disease. Purchasers must be 21 years of age or older.
          </p>
        </div>
      </div>
    </main>
  );
}
