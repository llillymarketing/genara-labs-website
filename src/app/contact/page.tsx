"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { CheckCircle2, Mail, Send, MapPin, Building2, Clock } from "lucide-react";

const subjects = [
  "General Inquiry",
  "Product Question",
  "Order Status",
  "Bulk / Wholesale",
  "Technical Support",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      {/* Header */}
      <section className="relative bg-navy py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={300}
            height={75}
            rotate={10}
            gradient="from-royal/[0.08]"
            className="right-[-4%] top-[30%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Contact
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Get in Touch
            </h1>
            <p className="text-white/40 max-w-lg mx-auto font-light">
              Have a question about our compounds, your order, or a research
              inquiry? Reach out and our team will respond within one business
              day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Business Info Strip */}
      <section className="bg-mist border-b border-silver/40 px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FadeIn delay={0.05}>
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-royal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy font-display">Email</p>
                <p className="text-sm text-steel">support@genaralabs.com</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-royal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy font-display">Address</p>
                <p className="text-sm text-steel">30 N LaSalle St, Suite 1234<br />Chicago, IL 60602</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-royal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy font-display">Response Time</p>
                <p className="text-sm text-steel">Within 1 business day</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-20 px-4 bg-white overflow-hidden">
        <BackgroundBeams className="opacity-30" />
        <BackgroundGlow position="top-left" color="cerulean" className="opacity-40" />
        <BackgroundGlow position="bottom-right" color="sky" className="opacity-35" />
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <FadeIn>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-xl bg-ice flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-royal" />
                </div>
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Message Sent
                </h2>
                <p className="text-steel">
                  Thank you for reaching out. We&apos;ll get back to you within
                  one business day.
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-graphite mb-1.5"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-graphite mb-1.5"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-graphite mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="jane@laboratory.edu"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-graphite mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-graphite mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all resize-none"
                    placeholder="Tell us about your research inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-mist border-t border-silver/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate text-xs leading-relaxed text-center">
            For Research Use Only. Not for Human Consumption. Not FDA Approved.
            Not a Supplement. Products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Not intended to
            diagnose, treat, cure, or prevent any disease. Purchasers must be 21
            years of age or older.
          </p>
        </div>
      </section>
    </main>
  );
}
