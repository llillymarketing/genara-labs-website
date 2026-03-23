"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import {
  FlaskConical,
  ShoppingCart,
  ArrowLeft,
  Shield,
  FileText,
  Truck,
  CheckCircle2,
  Minus,
  Plus,
  Beaker,
  Snowflake,
  Info,
} from "lucide-react";
import { useCart } from "@/components/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    variant: "5mg",
    price: "$42.99",
    category: "Peptide Fragments",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    molecularWeight: "1419.53 g/mol",
    purity: "≥98%",
    cas: "137525-51-0",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "BPC-157 is a synthetic peptide fragment derived from body protection compound. It has been extensively studied in research settings for its properties related to cellular signaling and tissue interaction.",
    research:
      "BPC-157 has been the subject of over 100 published research studies. In-vitro and in-vivo models have examined its effects on angiogenesis, fibroblast outgrowth, nitric oxide system modulation, and GABAergic neurotransmission. Research has focused on its cytoprotective properties in gastric mucosal cells and its interaction with the dopaminergic system.",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    variant: "5mg",
    price: "$38.99",
    category: "Peptide Fragments",
    sequence: "Ac-Ser-Asp-Lys-Pro",
    molecularWeight: "4963.44 g/mol",
    purity: "≥98.7%",
    cas: "77591-33-4",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring peptide. It has been the subject of numerous in-vitro and in-vivo research studies examining its role in cellular migration and differentiation.",
    research:
      "TB-500 research has explored its role in actin sequestration, cell migration, and angiogenesis. Studies have examined its effects on wound-healing models, cardiac tissue, and inflammatory pathways. Its interaction with G-actin is of particular interest in cytoskeletal research.",
  },
  {
    slug: "pt-141",
    name: "PT-141",
    variant: "10mg",
    price: "$54.99",
    category: "Neuropeptides",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    molecularWeight: "1025.18 g/mol",
    purity: "≥98.4%",
    cas: "189691-06-3",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "PT-141, also known as Bremelanotide, is a synthetic peptide analog of alpha-melanocyte-stimulating hormone. It is used in research settings to study melanocortin receptor activation.",
    research:
      "PT-141 research focuses on melanocortin receptor (MC3R and MC4R) agonism. Studies have explored its effects on central nervous system pathways, particularly those involving hypothalamic signaling. It is distinct from other melanocortin analogs due to its receptor selectivity profile.",
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    variant: "10mg",
    price: "$32.99",
    category: "Dermal Peptides",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
    molecularWeight: "1024.18 g/mol",
    purity: "≥98.9%",
    cas: "121062-08-6",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Melanotan II is a synthetic analog of alpha-melanocyte-stimulating hormone. It is widely used in dermatological research for studying melanogenesis and pigmentation pathways.",
    research:
      "Melanotan II has been studied for its non-selective agonism of melanocortin receptors (MC1R–MC5R). Research has focused on melanocyte stimulation, eumelanin production pathways, and UV-independent pigmentation models in cell culture studies.",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    variant: "2mg",
    price: "$29.99",
    category: "Secretagogues",
    sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    molecularWeight: "3367.97 g/mol",
    purity: "≥98.5%",
    cas: "863288-34-0",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "CJC-1295 is a synthetic peptide analog of growth hormone-releasing hormone (GHRH). It is frequently used in research to study pituitary function and growth hormone secretion dynamics.",
    research:
      "CJC-1295 research has examined its prolonged half-life compared to native GHRH and its effects on pulsatile GH release. Studies have investigated its binding affinity to the GHRH receptor and downstream effects on IGF-1 expression in hepatic tissue models.",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    variant: "5mg",
    price: "$34.99",
    category: "Secretagogues",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    molecularWeight: "711.85 g/mol",
    purity: "≥98%",
    cas: "170851-70-4",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue. It is studied in research for its highly selective mechanism of action on the GHS receptor.",
    research:
      "Ipamorelin is noted in research for its selectivity — it stimulates GH release without significantly affecting cortisol, prolactin, or ACTH levels. Studies have compared its receptor binding profile to other GHS-R agonists like GHRP-6 and GHRP-2.",
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    variant: "2mg",
    price: "$27.99",
    category: "Secretagogues",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    molecularWeight: "3357.88 g/mol",
    purity: "≥98.3%",
    cas: "86168-78-7",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Sermorelin is a synthetic peptide corresponding to the first 29 amino acids of GHRH. It is used in research to investigate growth hormone-releasing hormone receptor signaling.",
    research:
      "Sermorelin (GHRH 1-29) retains the full biological activity of the 44-amino acid native GHRH. Research has examined its pharmacokinetics, receptor binding properties, and its use as a diagnostic tool in pituitary function assessment models.",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    variant: "50mg",
    price: "$44.99",
    category: "Dermal Peptides",
    sequence: "Gly-His-Lys:Cu²⁺",
    molecularWeight: "403.93 g/mol",
    purity: "≥98%",
    cas: "49557-75-7",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "GHK-Cu is a naturally occurring copper peptide complex. It is widely studied in research for its interactions with extracellular matrix proteins and gene expression modulation.",
    research:
      "GHK-Cu research has shown it modulates the expression of over 4,000 genes. Studies have focused on its roles in collagen synthesis, decorin production, and metalloproteinase activity. Its copper-binding properties make it unique among research peptides.",
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    variant: "5mg",
    price: "$49.99",
    category: "Thymic Peptides",
    sequence: "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn-OH",
    molecularWeight: "3108.28 g/mol",
    purity: "≥98.6%",
    cas: "62304-98-7",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Thymosin Alpha-1 is a peptide fragment of prothymosin alpha. It is researched extensively for its role in immune cell differentiation and thymic function studies.",
    research:
      "Thymosin Alpha-1 research spans immunology and oncology. Studies have examined its effects on dendritic cell maturation, T-cell differentiation, and toll-like receptor signaling. It has been studied in models examining immune response modulation.",
  },
  {
    slug: "selank",
    name: "Selank",
    variant: "5mg",
    price: "$36.99",
    category: "Neuropeptides",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    molecularWeight: "751.90 g/mol",
    purity: "≥98.8%",
    cas: "129954-34-3",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Selank is a synthetic analog of the immunomodulatory peptide tuftsin. It is used in neuroscience research to study anxiolytic mechanisms and neuropeptide interactions.",
    research:
      "Selank research has examined its effects on BDNF expression, enkephalin metabolism, and GABAergic neurotransmission. Studies have investigated its anxiolytic properties in behavioral models and its modulation of inflammatory cytokine expression.",
  },
  {
    slug: "semax",
    name: "Semax",
    variant: "5mg",
    price: "$39.99",
    category: "Neuropeptides",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    molecularWeight: "813.93 g/mol",
    purity: "≥98%",
    cas: "80714-61-0",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Semax is a synthetic peptide derived from ACTH (4-10). It is studied in research contexts for its effects on neurotrophic factor expression and cognitive-related pathways.",
    research:
      "Semax research has focused on its effects on BDNF and NGF expression in hippocampal and cortical neurons. Studies have examined its role in neuroprotection models, dopaminergic system modulation, and its unique pharmacokinetic profile as a heptapeptide.",
  },
  {
    slug: "dsip",
    name: "DSIP",
    variant: "5mg",
    price: "$31.99",
    category: "Neuropeptides",
    sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu",
    molecularWeight: "848.82 g/mol",
    purity: "≥98.5%",
    cas: "62568-57-4",
    form: "Lyophilized Powder",
    storage: "-20°C, desiccated",
    description:
      "Delta Sleep-Inducing Peptide (DSIP) is a neuropeptide studied in research for its role in sleep architecture, stress response modulation, and neuroendocrine signaling.",
    research:
      "DSIP research has examined its effects on circadian rhythm-related gene expression, cortisol modulation, and sleep spindle activity in EEG studies. Its role in the hypothalamic-pituitary-adrenal axis and interactions with opioid receptors have also been investigated.",
  },
];

const tabs = ["Description", "Research", "Specifications"];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  if (!product) {
    return (
      <main className="py-32 px-4 text-center">
        <h1 className="font-display text-2xl font-bold text-navy mb-4">
          Compound Not Found
        </h1>
        <p className="text-steel mb-6">
          The compound you&apos;re looking for isn&apos;t in our catalog.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-royal font-semibold hover:text-deep-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const priceNum = parseFloat(product.price.replace("$", ""));

  return (
    <main className="bg-white">

      {/* ── Product Hero ── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Image */}
          <FadeIn>
            <div className="sticky top-28">
              <div className="bg-gradient-to-br from-navy via-deep-blue to-[#0a1f3d] rounded-2xl aspect-square flex items-center justify-center border border-royal/20 relative overflow-hidden">
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#1565C0 1px, transparent 1px), linear-gradient(90deg, #1565C0 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {product.slug === "bpc-157" ? (
                  <Image
                    src="/genara-logo.png"
                    alt="Genara Labs"
                    width={240}
                    height={240}
                    className="object-contain"
                  />
                ) : (
                  <FlaskConical className="w-24 h-24 text-silver/60" />
                )}
              </div>

              {/* Trust strip under image */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Shield, text: "Third-Party Tested" },
                  { icon: FileText, text: "CoA Included" },
                  { icon: Truck, text: "Same-Day Shipping" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white border border-silver/30 hover:border-royal/20 hover:shadow-sm transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 text-royal" />
                    <span className="text-[11px] text-steel font-medium text-center leading-tight">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Product Info */}
          <FadeIn delay={0.1}>
            <div>
              {/* Category badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ice border border-royal/10 mb-4">
                <FlaskConical className="w-3 h-3 text-royal" />
                <span className="text-xs text-royal font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-1">
                {product.name}
              </h1>
              <p className="text-steel text-sm mb-6">
                {product.variant} · Lyophilized Powder · For Research Use Only
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-display text-4xl font-bold text-navy">
                  {product.price}
                </span>
                <span className="text-sm text-steel">per vial</span>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Purity", value: product.purity, icon: CheckCircle2 },
                  { label: "Form", value: product.form, icon: Beaker },
                  { label: "CAS", value: product.cas, icon: Info },
                  { label: "Storage", value: product.storage, icon: Snowflake },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-mist/50 border border-silver/20"
                  >
                    <spec.icon className="w-4 h-4 text-royal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-slate uppercase tracking-wider font-medium">
                        {spec.label}
                      </p>
                      <p className="text-sm text-navy font-medium">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-silver/40 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-3 text-slate hover:text-navy hover:bg-mist transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-display font-semibold text-navy text-sm">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-3 text-slate hover:text-navy hover:bg-mist transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <motion.button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) {
                      addItem({
                        slug: product.slug,
                        name: product.name,
                        variant: product.variant,
                        price: priceNum,
                      });
                    }
                  }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="btn-glow flex-1 inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-deep-blue transition-all duration-200 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart — ${(priceNum * qty).toFixed(2)}
                </motion.button>
              </div>

              {/* Shipping note */}
              <p className="text-xs text-steel mb-8 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-royal" />
                Order before 1:00 PM EST for same-day dispatch
              </p>

              {/* ── Tabs ── */}
              <div className="border-t border-silver/30">
                <div className="flex gap-0 border-b border-silver/30">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-medium transition-colors relative cursor-pointer ${
                        activeTab === tab
                          ? "text-royal"
                          : "text-slate hover:text-navy"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-royal"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-6">
                  {activeTab === "Description" && (
                    <FadeIn>
                      <p className="text-steel text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </FadeIn>
                  )}
                  {activeTab === "Research" && (
                    <FadeIn>
                      <p className="text-steel text-sm leading-relaxed">
                        {product.research}
                      </p>
                    </FadeIn>
                  )}
                  {activeTab === "Specifications" && (
                    <FadeIn>
                      <div className="space-y-0">
                        {[
                          ["Compound", product.name],
                          ["CAS Number", product.cas],
                          ["Molecular Weight", product.molecularWeight],
                          ["Purity (HPLC)", product.purity],
                          ["Physical Form", product.form],
                          ["Quantity", product.variant],
                          ["Storage", product.storage],
                          ["Sequence", product.sequence],
                        ].map(([label, value], i) => (
                          <div
                            key={label}
                            className={`flex justify-between py-3 text-sm ${
                              i > 0 ? "border-t border-silver/20" : ""
                            }`}
                          >
                            <span className="text-slate">{label}</span>
                            <span className="text-navy font-medium text-right max-w-[60%] break-words">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 bg-mist/40 border-t border-silver/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-navy mb-8">
              Related Compounds
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((rp) => (
                <FadeIn key={rp.slug}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Card className="group bg-white overflow-hidden h-full">
                      <Link href={`/shop/${rp.slug}`} className="block">
                        <div className="bg-gradient-to-br from-mist to-silver/20 h-40 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.03] to-cerulean/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <FlaskConical className="w-10 h-10 text-silver group-hover:text-royal/40 transition-colors duration-300" />
                        </div>
                      </Link>
                      <CardContent className="p-5">
                        <Link href={`/shop/${rp.slug}`}>
                          <h3 className="font-display text-base font-semibold text-navy hover:text-royal transition-colors">
                            {rp.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-slate mt-0.5 mb-3">
                          {rp.variant} · For Research Use Only
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-lg font-bold text-navy">
                            {rp.price}
                          </span>
                          <Link
                            href={`/shop/${rp.slug}`}
                            className="text-royal text-sm font-semibold hover:text-deep-blue transition-colors"
                          >
                            View Details →
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className={`px-4 py-8 ${relatedProducts.length > 0 ? "bg-mist/40" : ""}`}>
        <div className="max-w-4xl mx-auto">
        <p className="text-slate/50 text-xs leading-relaxed">
          <strong className="text-steel font-semibold">Disclaimer:</strong>{" "}
          For Research Use Only. Not for Human Consumption. Not FDA Approved.
          Not a Supplement. This product is intended exclusively for in-vitro
          research and laboratory use. Not intended to diagnose, treat, cure,
          or prevent any disease. Purchasers must be 21 years of age or older.
        </p>
        </div>
      </div>
    </main>
  );
}
