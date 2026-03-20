"use client";

import { useState, useMemo } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlaskConical, Droplets, Syringe, Calculator } from "lucide-react";

/* ── Preset options ── */
const dosePresets = [0.1, 0.25, 0.5, 1, 2, 3, 5, 10];
const vialPresets = [2, 5, 10, 15, 20, 30, 50];
const waterPresets = [0.5, 1, 1.5, 2, 2.5, 3];

/* ── Syringe SVG Component ── */
function SyringeSVG({ fillPercent }: { fillPercent: number }) {
  const clampedFill = Math.min(Math.max(fillPercent, 0), 100);
  // Syringe body dimensions inside the SVG
  const bodyTop = 40;
  const bodyHeight = 200;
  const fillHeight = (clampedFill / 100) * bodyHeight;
  const fillY = bodyTop + bodyHeight - fillHeight;

  // Tick marks for 10-unit increments
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <svg
      viewBox="0 0 120 300"
      className="w-full max-w-[140px] h-auto"
      aria-label={`Syringe filled to ${clampedFill.toFixed(0)} units`}
    >
      {/* Plunger handle */}
      <rect x="48" y="4" width="24" height="8" rx="2" fill="#CBD5E1" />
      {/* Plunger rod */}
      <rect x="57" y="12" width="6" height={28 + (bodyHeight - fillHeight)} rx="2" fill="#94A3B8" />

      {/* Barrel outline */}
      <rect
        x="30"
        y={bodyTop}
        width="60"
        height={bodyHeight}
        rx="6"
        fill="white"
        stroke="#CBD5E1"
        strokeWidth="2"
      />

      {/* Fill */}
      {clampedFill > 0 && (
        <rect
          x="32"
          y={fillY}
          width="56"
          height={fillHeight}
          rx={fillHeight === bodyHeight ? 5 : 0}
          fill="url(#syringeFillGradient)"
          style={{ transition: "y 0.4s ease, height 0.4s ease" }}
        />
      )}

      {/* Tick marks + labels */}
      {ticks.map((unit) => {
        const y = bodyTop + bodyHeight - (unit / 100) * bodyHeight;
        const isMajor = unit % 50 === 0;
        return (
          <g key={unit}>
            <line
              x1={isMajor ? 20 : 24}
              y1={y}
              x2="30"
              y2={y}
              stroke="#94A3B8"
              strokeWidth={isMajor ? 1.5 : 0.8}
            />
            {unit % 20 === 0 && (
              <text
                x="16"
                y={y + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="#64748B"
                fontFamily="monospace"
              >
                {unit}
              </text>
            )}
          </g>
        );
      })}

      {/* Needle hub */}
      <path d="M50 240 L70 240 L66 258 L54 258 Z" fill="#CBD5E1" />
      {/* Needle */}
      <line x1="60" y1="258" x2="60" y2="296" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="syringeFillGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="100%" stopColor="#1565C0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Preset Button ── */
function PresetButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer transition-all duration-200 font-display font-semibold text-sm px-3.5 py-2 rounded-lg border"
      style={{
        backgroundColor: selected ? "#1565C0" : "#E1F5FE",
        color: selected ? "#ffffff" : "#0D2137",
        borderColor: selected ? "#1565C0" : "#B3E5FC",
      }}
    >
      {label}
    </button>
  );
}

/* ── Input Group ── */
function InputGroup({
  label,
  icon: Icon,
  unit,
  presets,
  value,
  onChange,
  presetSuffix,
}: {
  label: string;
  icon: React.ElementType;
  unit: string;
  presets: number[];
  value: string;
  onChange: (val: string) => void;
  presetSuffix: string;
}) {
  const numericValue = parseFloat(value);

  return (
    <div style={{ marginBottom: 32 }}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="size-5 text-royal" />
        <label className="font-display font-semibold text-navy text-base">
          {label}
        </label>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map((p) => (
          <PresetButton
            key={p}
            label={`${p}${presetSuffix}`}
            selected={numericValue === p}
            onClick={() => onChange(String(p))}
          />
        ))}
      </div>

      {/* Custom input */}
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          step="any"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Custom value"
          className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 pr-16 text-navy font-medium focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
          style={{ fontSize: 16 }}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate text-sm font-medium pointer-events-none">
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ── Result Card ── */
function ResultCard({
  label,
  value,
  unit,
  sublabel,
}: {
  label: string;
  value: string;
  unit: string;
  sublabel?: string;
}) {
  return (
    <div
      className="rounded-xl border border-silver/40 bg-white p-5 sm:p-6"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <p className="text-slate text-sm font-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl sm:text-4xl font-bold text-navy">
          {value}
        </span>
        <span className="text-slate text-sm font-medium">{unit}</span>
      </div>
      {sublabel && (
        <p className="text-slate/70 text-xs mt-1.5">{sublabel}</p>
      )}
    </div>
  );
}

/* ── Main Calculator Page ── */
export default function CalculatorPage() {
  const [dose, setDose] = useState("0.5");
  const [vial, setVial] = useState("10");
  const [water, setWater] = useState("2");

  const results = useMemo(() => {
    const d = parseFloat(dose);
    const v = parseFloat(vial);
    const w = parseFloat(water);

    if (!d || !v || !w || d <= 0 || v <= 0 || w <= 0) {
      return null;
    }

    const concentration = v / w; // mg/mL
    const injectionMl = d / concentration; // mL
    const injectionUnits = injectionMl * 100; // IU (1 mL = 100 units)
    const dosesPerVial = v / d;

    return {
      concentration,
      injectionMl,
      injectionUnits,
      dosesPerVial,
    };
  }, [dose, vial, water]);

  // Syringe fill percentage (out of 1mL / 100 units)
  const syringeFill = results ? Math.min(results.injectionMl / 1, 1) * 100 : 0;

  const formatNum = (n: number, decimals = 2) => {
    if (Number.isFinite(n)) {
      // Show up to `decimals` places, but trim trailing zeros
      return parseFloat(n.toFixed(decimals)).toString();
    }
    return "—";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#EAF0F7] to-white overflow-hidden">
      <BackgroundBeams className="opacity-30" />
      {/* ── Header Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
        <FadeIn>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="size-5 text-royal" />
            <span className="text-royal font-display text-sm font-semibold tracking-wider uppercase">
              Research Tool
            </span>
          </div>
        </FadeIn>

        <TextGenerateEffect
          words="Peptide Reconstitution Calculator"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight"
        />

        <FadeIn delay={0.2}>
          <p className="text-slate text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
            Calculate the precise volume to draw from a reconstituted peptide
            vial for your desired research dose. Enter your peptide dose, vial
            strength, and bacteriostatic water volume below.
          </p>
        </FadeIn>
      </section>

      {/* ── Calculator Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left column: Inputs */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <InputGroup
                label="Peptide Dose"
                icon={FlaskConical}
                unit="mg"
                presets={dosePresets}
                value={dose}
                onChange={setDose}
                presetSuffix="mg"
              />
            </FadeIn>

            <FadeIn delay={0.15}>
              <InputGroup
                label="Vial Strength"
                icon={FlaskConical}
                unit="mg"
                presets={vialPresets}
                value={vial}
                onChange={setVial}
                presetSuffix="mg"
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <InputGroup
                label="Bacteriostatic Water Volume"
                icon={Droplets}
                unit="mL"
                presets={waterPresets}
                value={water}
                onChange={setWater}
                presetSuffix="mL"
              />
            </FadeIn>
          </div>

          {/* Right column: Syringe visualization */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.25}>
              <div className="sticky top-[100px]">
                <div
                  className="rounded-2xl border border-silver/40 bg-mist/50 p-6 sm:p-8 flex flex-col items-center"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                >
                  <p className="font-display font-semibold text-navy text-sm mb-4 uppercase tracking-wider">
                    Injection Volume
                  </p>

                  <SyringeSVG fillPercent={syringeFill} />

                  <div className="mt-4 text-center">
                    <p className="font-display text-2xl font-bold text-royal">
                      {results ? formatNum(results.injectionUnits, 1) : "—"}{" "}
                      <span className="text-base font-medium text-slate">units</span>
                    </p>
                    <p className="text-slate text-sm mt-1">
                      {results ? formatNum(results.injectionMl, 3) : "—"} mL
                    </p>
                  </div>

                  {results && results.injectionMl > 1 && (
                    <div className="mt-4 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-amber-800 text-xs text-center font-medium">
                        Volume exceeds 1mL syringe capacity.
                        Consider using more water or a larger syringe.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Results Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="Concentration"
              value={results ? formatNum(results.concentration) : "—"}
              unit="mg/mL"
              sublabel="Vial strength / water volume"
            />
            <ResultCard
              label="Volume per Dose"
              value={results ? formatNum(results.injectionUnits, 1) : "—"}
              unit="units"
              sublabel={
                results
                  ? `${formatNum(results.injectionMl, 3)} mL per dose`
                  : "Enter values above"
              }
            />
            <ResultCard
              label="Doses per Vial"
              value={results ? formatNum(results.dosesPerVial, 1) : "—"}
              unit="doses"
              sublabel="Total doses in vial"
            />
          </div>
        </FadeIn>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn delay={0.1}>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-silver/40 bg-white p-5">
              <div className="flex items-center justify-center size-10 rounded-lg bg-ice mb-3">
                <span className="font-display font-bold text-royal text-lg">1</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-1.5">Concentration</h3>
              <p className="text-slate text-sm leading-relaxed">
                Divide the total peptide in the vial (mg) by the volume of
                bacteriostatic water added (mL) to get your concentration in
                mg/mL.
              </p>
              <code className="block mt-2 text-xs text-royal bg-ice/60 rounded px-2 py-1.5 font-mono">
                concentration = vial (mg) / water (mL)
              </code>
            </div>

            <div className="rounded-xl border border-silver/40 bg-white p-5">
              <div className="flex items-center justify-center size-10 rounded-lg bg-ice mb-3">
                <span className="font-display font-bold text-royal text-lg">2</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-1.5">Injection Volume</h3>
              <p className="text-slate text-sm leading-relaxed">
                Divide your desired dose (mg) by the concentration (mg/mL) to
                get the volume to draw in mL. Multiply by 100 for syringe units.
              </p>
              <code className="block mt-2 text-xs text-royal bg-ice/60 rounded px-2 py-1.5 font-mono">
                volume = dose (mg) / concentration
              </code>
            </div>

            <div className="rounded-xl border border-silver/40 bg-white p-5">
              <div className="flex items-center justify-center size-10 rounded-lg bg-ice mb-3">
                <span className="font-display font-bold text-royal text-lg">3</span>
              </div>
              <h3 className="font-display font-semibold text-navy mb-1.5">Doses per Vial</h3>
              <p className="text-slate text-sm leading-relaxed">
                Divide the total peptide in the vial (mg) by your dose (mg) to
                see how many doses you can draw from a single vial.
              </p>
              <code className="block mt-2 text-xs text-royal bg-ice/60 rounded px-2 py-1.5 font-mono">
                doses = vial (mg) / dose (mg)
              </code>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Disclaimer ── */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate/70 text-xs leading-relaxed">
            <strong className="text-steel font-semibold">Disclaimer:</strong>{" "}
            This calculator is provided for educational purposes only. For
            Research Use Only. Not for Human Consumption. Not FDA Approved. Not
            a Supplement. All products sold by Genara Labs LLC are intended
            exclusively for in-vitro research and laboratory use. Purchasers
            must be 21 years of age or older.
          </p>
        </div>
      </section>
    </div>
  );
}
