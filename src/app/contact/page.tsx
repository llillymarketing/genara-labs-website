"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CheckCircle2, Mail, Send, MapPin, Building2, Clock, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      first_name: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_submissions").insert(data);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      {/* ── Opening — no hero banner, straight into content ── */}
      <section className="relative pt-20 pb-24 px-4 bg-white overflow-hidden">
        <BackgroundBeams className="opacity-30" />
        <BackgroundGlow position="top-left" color="cerulean" className="opacity-40" />
        <BackgroundGlow position="bottom-right" color="sky" className="opacity-35" />

        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Contact
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-3">
              <TextGenerateEffect
                words="Get in Touch"
                className="text-navy [&_span]:text-navy"
                duration={0.5}
              />
            </h1>
            <p className="text-steel max-w-lg mb-14">
              Have a question about our compounds, your order, or a research
              inquiry? Reach out and our team will respond within one business
              day.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <FadeIn delay={0.05}>
                <div className="flex items-start gap-3">
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
                <div className="flex items-start gap-3">
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
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-royal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy font-display">Response Time</p>
                    <p className="text-sm text-steel">Within 1 business day</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-royal" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy font-display">Company</p>
                    <p className="text-sm text-steel">Genara Labs LLC — Wyoming, US</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
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
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-graphite mb-1.5">First Name</label>
                        <input type="text" id="firstName" required className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all" placeholder="Jane" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-graphite mb-1.5">Last Name</label>
                        <input type="text" id="lastName" required className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-graphite mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                        <input type="email" id="email" required className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all" placeholder="jane@laboratory.edu" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-graphite mb-1.5">Subject</label>
                      <select id="subject" required className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all appearance-none" defaultValue="">
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-graphite mb-1.5">Message</label>
                      <textarea id="message" required rows={5} className="w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all resize-none" placeholder="Tell us about your research inquiry..." />
                    </div>
                    {errorMsg && (
                      <p className="text-red-600 text-sm">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mt-12">
          <p className="text-slate/50 text-xs leading-relaxed">
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
