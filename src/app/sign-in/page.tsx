"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/account");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Login failed. Please try again.");
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
              Sign In
            </h1>
            <p className="text-white/40 max-w-lg mx-auto font-light">
              Access your Genara Labs account to view orders, track shipments,
              and manage your research purchases.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sign In Form */}
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
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="#"
                    className="text-sm text-royal hover:text-deep-blue transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="text-center text-sm text-steel mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/create-account"
                  className="text-royal font-medium hover:text-deep-blue transition-colors"
                >
                  Create one
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
