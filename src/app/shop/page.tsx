"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartDrawer";
import { FadeIn } from "@/components/ui/fade-in";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ShineBorder } from "@/components/ui/shine-border";

const categories = [
  "All Compounds",
  "Secretagogues",
  "Peptide Fragments",
  "Neuropeptides",
  "Dermal Peptides",
  "Thymic Peptides",
];

const products = [
  { slug: "bpc-157", name: "BPC-157", variant: "5mg", price: "$42.99", category: "Peptide Fragments" },
  { slug: "tb-500", name: "TB-500", variant: "5mg", price: "$38.99", category: "Peptide Fragments" },
  { slug: "pt-141", name: "PT-141", variant: "10mg", price: "$54.99", category: "Neuropeptides" },
  { slug: "melanotan-ii", name: "Melanotan II", variant: "10mg", price: "$32.99", category: "Dermal Peptides" },
  { slug: "cjc-1295", name: "CJC-1295", variant: "2mg", price: "$29.99", category: "Secretagogues" },
  { slug: "ipamorelin", name: "Ipamorelin", variant: "5mg", price: "$34.99", category: "Secretagogues" },
  { slug: "sermorelin", name: "Sermorelin", variant: "2mg", price: "$27.99", category: "Secretagogues" },
  { slug: "ghk-cu", name: "GHK-Cu", variant: "50mg", price: "$44.99", category: "Dermal Peptides" },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", variant: "5mg", price: "$49.99", category: "Thymic Peptides" },
  { slug: "selank", name: "Selank", variant: "5mg", price: "$36.99", category: "Neuropeptides" },
  { slug: "semax", name: "Semax", variant: "5mg", price: "$39.99", category: "Neuropeptides" },
  { slug: "dsip", name: "DSIP", variant: "5mg", price: "$31.99", category: "Neuropeptides" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All Compounds");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { addItem } = useCart();

  const filtered =
    activeCategory === "All Compounds"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Page Header — clean, no banner */}
      <section className="pt-20 pb-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-3">
              Catalog
            </p>
          </FadeIn>
          <div className="mb-3">
            <TextGenerateEffect
              words="Research Compounds"
              className="font-display text-3xl sm:text-4xl font-bold text-navy [&_span]:text-navy"
              duration={0.5}
            />
          </div>
          <FadeIn delay={0.3}>
            <p className="text-steel max-w-xl">
              Browse our full catalog of research-grade peptides and compounds.
              Every product ships with a Certificate of Analysis.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden mb-6 text-royal font-semibold text-sm flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside
            className={`lg:w-56 shrink-0 ${mobileFilterOpen ? "block" : "hidden"} lg:block`}
          >
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate mb-4">
              Categories
            </h2>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-ice text-royal font-semibold"
                        : "text-steel hover:text-navy hover:bg-mist"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-slate mb-6">
              Showing {filtered.length} compound{filtered.length !== 1 && "s"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <FadeIn key={product.name} delay={0.03 * i}>
                  <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <ShineBorder
                    borderRadius={12}
                    borderWidth={1}
                    duration={16}
                    color={["#2196F3", "#1565C0", "#4FC3F7"]}
                    className="group bg-white overflow-hidden"
                  >
                    <Link href={`/shop/${product.slug}`} className="block">
                      <div className="bg-gradient-to-br from-mist to-silver/20 h-44 flex items-center justify-center relative overflow-hidden rounded-t-[11px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.03] to-cerulean/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <FlaskConical className="w-10 h-10 text-silver group-hover:text-royal/40 transition-colors duration-300" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-display text-base font-semibold text-navy hover:text-royal transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate mt-0.5 mb-4">
                        {product.variant} &middot; For Research Use Only
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-navy">
                          {product.price}
                        </span>
                        <button
                          onClick={() =>
                            addItem({
                              slug: product.slug,
                              name: product.name,
                              variant: product.variant,
                              price: parseFloat(product.price.replace("$", "")),
                            })
                          }
                          className="inline-flex items-center gap-1.5 bg-royal text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-deep-blue transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </ShineBorder>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <p className="text-slate/50 text-xs leading-relaxed">
          <strong className="text-steel font-semibold">Disclaimer:</strong>{" "}
          For Research Use Only. Not for Human Consumption. Not FDA Approved.
          Not a Supplement. All products sold by Genara Labs LLC are intended
          exclusively for in-vitro research and laboratory use. Not intended to
          diagnose, treat, cure, or prevent any disease. Purchasers must be 21
          years of age or older.
        </p>
      </div>
    </main>
  );
}
