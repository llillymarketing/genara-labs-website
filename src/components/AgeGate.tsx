"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("genara-age-verified");
    if (!verified) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const canEnter = ageConfirmed && privacyAccepted;

  const handleEnter = () => {
    if (!canEnter) return;
    localStorage.setItem("genara-age-verified", "true");
    setShow(false);
    document.body.style.overflow = "";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
        <div className="w-14 h-14 rounded-xl bg-ice flex items-center justify-center mx-auto mb-5">
          <FlaskConical className="w-7 h-7 text-royal" />
        </div>

        <h2 className="font-display text-xl font-bold text-navy mb-2">
          Age Verification Required
        </h2>

        <p className="text-steel text-sm leading-relaxed mb-8">
          You must be 21 years of age or older to access this website. All
          products sold by Genara Labs are for research use only and are not for
          human consumption.
        </p>

        {/* Toggles */}
        <div className="space-y-4 mb-8 text-left">
          <label className="flex items-center justify-between gap-3 cursor-pointer group">
            <span className="text-sm text-graphite">
              I confirm I am 21 years of age or older
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={ageConfirmed}
              onClick={() => setAgeConfirmed(!ageConfirmed)}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
                ageConfirmed ? "bg-royal" : "bg-silver"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  ageConfirmed ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-3 cursor-pointer group">
            <span className="text-sm text-graphite">
              I accept the{" "}
              <Link
                href="/privacy"
                className="text-royal underline hover:text-deep-blue transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={privacyAccepted}
              onClick={() => setPrivacyAccepted(!privacyAccepted)}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
                privacyAccepted ? "bg-royal" : "bg-silver"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  privacyAccepted ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>

        <button
          onClick={handleEnter}
          disabled={!canEnter}
          className={`w-full font-display font-semibold text-[16px] py-3 rounded-lg transition-colors ${
            canEnter
              ? "bg-royal text-white hover:bg-deep-blue cursor-pointer"
              : "bg-silver/50 text-slate/50 cursor-not-allowed"
          }`}
        >
          Enter Site
        </button>
      </div>
    </div>
  );
}
