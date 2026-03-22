"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import DNAFall from "@/components/DNAFall";
import { Mail, Lock, LogIn, Loader2, ArrowLeft, Check, FlaskConical } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");
  const { login, resetPassword } = useAuth();
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0A1F44 0%, #0D2B5A 55%, #0A1F44 100%)" }}
    >
      {/* Falling DNA molecules */}
      <DNAFall />

      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <FadeIn>
          {/* Logo mark */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.15)" }}>
              <FlaskConical className="w-6 h-6 text-sky" />
            </div>
            <p className="text-sky/60 font-display text-xs font-semibold tracking-[0.12em] uppercase mb-2">
              Account
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
              {showForgotPassword ? "Reset Password" : "Sign In"}
            </h1>
            <p className="text-white/35 text-sm mt-2 text-center max-w-xs leading-relaxed">
              {showForgotPassword
                ? "Enter your email and we'll send a reset link."
                : "Access your Genara Labs account to manage orders and shipments."}
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {showForgotPassword ? (
              resetSent ? (
                <div className="text-center py-4">
                  <div className="flex items-center justify-center size-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                    <Check className="size-6" />
                  </div>
                  <h3 className="font-display font-semibold text-navy text-lg mb-2">
                    Check your email
                  </h3>
                  <p className="text-steel text-sm mb-6">
                    We sent a reset link to{" "}
                    <span className="font-medium text-graphite">{resetEmail}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSent(false);
                      setResetEmail("");
                    }}
                    className="inline-flex items-center gap-2 text-royal font-display font-semibold text-sm hover:text-deep-blue transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  {resetError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                      {resetError}
                    </div>
                  )}
                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-graphite mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                      <input
                        type="email"
                        id="reset-email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
                        placeholder="you@laboratory.edu"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {resetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(false); setResetError(""); }}
                    className="w-full inline-flex items-center justify-center gap-2 text-steel font-display font-semibold text-sm hover:text-navy transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                    Back to Sign In
                  </button>
                </form>
              )
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                      {errorMsg}
                    </div>
                  )}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-graphite mb-1.5">
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
                        className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
                        placeholder="you@laboratory.edu"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-graphite mb-1.5">
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
                        className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-royal hover:text-deep-blue transition-colors"
                    >
                      Forgot password?
                    </button>
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
                  <Link href="/create-account" className="text-royal font-medium hover:text-deep-blue transition-colors">
                    Create one
                  </Link>
                </p>
              </>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-white/20 text-[11px] leading-relaxed text-center mt-8 max-w-sm mx-auto">
            For Research Use Only &middot; Not for Human Consumption &middot; Not FDA Approved
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
