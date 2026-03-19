"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Mail, Lock, UserPlus, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function CreateAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [researchAcknowledged, setResearchAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, `${firstName} ${lastName}`.trim());
      router.push("/account");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              Account
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Create Account
            </h1>
            <p className="text-white/40 max-w-lg mx-auto font-light">
              Register for a Genara Labs account to place orders, track
              shipments, and access your Certificates of Analysis.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Create Account Form */}
      <section className="relative py-20 px-4 bg-white overflow-hidden">
        <BackgroundBeams className="opacity-30" />
        <BackgroundGlow position="top-left" color="cerulean" className="opacity-40" />
        <BackgroundGlow position="bottom-right" color="sky" className="opacity-35" />

        <div className="relative z-10 max-w-md mx-auto">
          <FadeIn>
            <div className="bg-white border border-silver/50 rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {errorMsg}
                  </div>
                )}
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="you@laboratory.edu"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-graphite mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                    <input
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-graphite mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                    <input
                      type="password"
                      id="confirmPassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-cerulean focus:ring-2 focus:ring-cerulean/20 transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        required
                        checked={ageVerified}
                        onChange={(e) => setAgeVerified(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border border-silver rounded flex items-center justify-center peer-checked:bg-royal peer-checked:border-royal transition-all group-hover:border-cerulean">
                        {ageVerified && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-steel leading-snug">
                      I confirm I am 21 years of age or older
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        required
                        checked={researchAcknowledged}
                        onChange={(e) =>
                          setResearchAcknowledged(e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border border-silver rounded flex items-center justify-center peer-checked:bg-royal peer-checked:border-royal transition-all group-hover:border-cerulean">
                        {researchAcknowledged && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-steel leading-snug">
                      I acknowledge these products are for research use only
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-steel mt-6">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-royal font-medium hover:text-deep-blue transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </FadeIn>
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
