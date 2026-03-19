"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { FlaskConical, ShoppingCart, ArrowLeft, Shield, FileText, Truck } from "lucide-react";
import { useCart } from "@/components/CartDrawer";

const products = [
  { slug: "bpc-157", name: "BPC-157", variant: "5mg", price: "$42.99", category: "Peptide Fragments", description: "BPC-157 is a synthetic peptide fragment derived from body protection compound. It has been extensively studied in research settings for its properties related to cellular signaling and tissue interaction." },
  { slug: "tb-500", name: "TB-500", variant: "5mg", price: "$38.99", category: "Peptide Fragments", description: "TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring peptide. It has been the subject of numerous in-vitro and in-vivo research studies examining its role in cellular migration and differentiation." },
  { slug: "pt-141", name: "PT-141", variant: "10mg", price: "$54.99", category: "Neuropeptides", description: "PT-141, also known as Bremelanotide, is a synthetic peptide analog of alpha-melanocyte-stimulating hormone. It is used in research settings to study melanocortin receptor activation." },
  { slug: "melanotan-ii", name: "Melanotan II", variant: "10mg", price: "$32.99", category: "Dermal Peptides", description: "Melanotan II is a synthetic analog of alpha-melanocyte-stimulating hormone. It is widely used in dermatological research for studying melanogenesis and pigmentation pathways." },
  { slug: "cjc-1295", name: "CJC-1295", variant: "2mg", price: "$29.99", category: "Secretagogues", description: "CJC-1295 is a synthetic peptide analog of growth hormone-releasing hormone (GHRH). It is frequently used in research to study pituitary function and growth hormone secretion dynamics." },
  { slug: "ipamorelin", name: "Ipamorelin", variant: "5mg", price: "$34.99", category: "Secretagogues", description: "Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue. It is studied in research for its highly selective mechanism of action on the GHS receptor." },
  { slug: "sermorelin", name: "Sermorelin", variant: "2mg", price: "$27.99", category: "Secretagogues", description: "Sermorelin is a synthetic peptide corresponding to the first 29 amino acids of GHRH. It is used in research to investigate growth hormone-releasing hormone receptor signaling." },
  { slug: "ghk-cu", name: "GHK-Cu", variant: "50mg", price: "$44.99", category: "Dermal Peptides", description: "GHK-Cu is a naturally occurring copper peptide complex. It is widely studied in research for its interactions with extracellular matrix proteins and gene expression modulation." },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", variant: "5mg", price: "$49.99", category: "Thymic Peptides", description: "Thymosin Alpha-1 is a peptide fragment of prothymosin alpha. It is researched extensively for its role in immune cell differentiation and thymic function studies." },
  { slug: "selank", name: "Selank", variant: "5mg", price: "$36.99", category: "Neuropeptides", description: "Selank is a synthetic analog of the immunomodulatory peptide tuftsin. It is used in neuroscience research to study anxiolytic mechanisms and neuropeptide interactions." },
  { slug: "semax", name: "Semax", variant: "5mg", price: "$39.99", category: "Neuropeptides", description: "Semax is a synthetic peptide derived from ACTH (4-10). It is studied in research contexts for its effects on neurotrophic factor expression and cognitive-related pathways." },
  { slug: "dsip", name: "DSIP", variant: "5mg", price: "$31.99", category: "Neuropeptides", description: "Delta Sleep-Inducing Peptide (DSIP) is a neuropeptide studied in research for its role in sleep architecture, stress response modulation, and neuroendocrine signaling." },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();

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

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-mist border-b border-silver/40 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-slate">
            <Link href="/shop" className="hover:text-royal transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-navy font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image placeholder */}
          <FadeIn>
            <div className="bg-gradient-to-br from-mist to-silver/20 rounded-xl h-96 flex items-center justify-center border border-silver/40">
              <FlaskConical className="w-20 h-20 text-silver" />
            </div>
          </FadeIn>

          {/* Product info */}
          <FadeIn delay={0.1}>
            <div>
              <p className="text-royal font-display text-sm font-semibold tracking-wider uppercase mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl font-bold text-navy mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-slate mb-6">
                {product.variant} &middot; For Research Use Only
              </p>

              <div className="font-display text-3xl font-bold text-navy mb-8">
                {product.price}
              </div>

              <p className="text-steel text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              <button
                onClick={() =>
                  product && addItem({
                    slug: product.slug,
                    name: product.name,
                    variant: product.variant,
                    price: parseFloat(product.price.replace("$", "")),
                  })
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-royal text-white font-display font-semibold text-[16px] px-8 py-3.5 rounded-lg hover:bg-deep-blue transition-colors mb-6"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Trust badges */}
              <div className="space-y-3 pt-6 border-t border-silver/40">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-royal shrink-0" />
                  <span className="text-sm text-steel">
                    Third-party tested &middot; Independent lab verified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-royal shrink-0" />
                  <span className="text-sm text-steel">
                    Certificate of Analysis provided with every order
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-royal shrink-0" />
                  <span className="text-sm text-steel">
                    Same-day shipping on orders before 1:00 PM EST
                  </span>
                </div>
              </div>
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
            Not a Supplement. This product is intended exclusively for in-vitro
            research and laboratory use. Not intended to diagnose, treat, cure,
            or prevent any disease. Purchasers must be 21 years of age or older.
          </p>
        </div>
      </section>

      {/* Gradient blend into footer */}
      <div className="h-12 bg-gradient-to-b from-white to-carbon" />
    </main>
  );
}
