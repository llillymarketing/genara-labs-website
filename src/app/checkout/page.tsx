"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartDrawer";
import { FadeIn } from "@/components/ui/fade-in";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  Lock,
  FlaskConical,
  Package,
  CreditCard,
  Mail,
  MapPin,
} from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 200;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

export default function CheckoutPage() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();

  const [email, setEmail] = useState("");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const orderTotal = totalPrice + shippingCost;

  const handleZipChange = async (zip: string) => {
    const cleaned = zip.replace(/\D/g, "").slice(0, 5);
    setShipping((prev) => ({ ...prev, zip: cleaned }));

    if (cleaned.length === 5) {
      try {
        const res = await fetch(`https://api.zippopotam.us/us/${cleaned}`);
        if (res.ok) {
          const data = await res.json();
          const place = data.places?.[0];
          if (place) {
            setShipping((prev) => ({
              ...prev,
              city: place["place name"],
              state: place["state abbreviation"],
            }));
          }
        }
      } catch {
        // User can fill manually
      }
    }
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-20 h-20 rounded-full bg-ice flex items-center justify-center">
          <FlaskConical className="w-8 h-8 text-royal" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-navy mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-steel text-sm max-w-xs mx-auto">
            Add research compounds to your cart before proceeding to checkout.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-royal text-white font-display font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-deep-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-silver/30 bg-cloud">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-steel hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <h1 className="font-display text-lg sm:text-xl font-bold text-navy">
            Checkout
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-steel">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Main grid: Order Summary LEFT, Form RIGHT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Order Summary */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <FadeIn delay={0.1} direction="left">
              <div className="lg:sticky lg:top-[120px]">
                <div className="bg-cloud rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-5 h-5 text-royal" />
                    <h2 className="font-display text-lg font-bold text-navy">
                      Order Summary
                    </h2>
                    <span className="ml-auto text-xs text-steel bg-white px-2.5 py-1 rounded-full">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-xl p-4 flex items-center gap-4"
                      >
                        {/* Icon placeholder */}
                        <div className="w-12 h-12 rounded-lg bg-ice flex items-center justify-center shrink-0">
                          <FlaskConical className="w-5 h-5 text-royal" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm font-semibold text-navy truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate mt-0.5">{item.variant}</p>
                        </div>

                        {/* Qty + Price */}
                        <div className="text-right shrink-0">
                          <p className="font-display text-sm font-bold text-navy">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5 justify-end">
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                              className="w-6 h-6 rounded border border-silver/60 flex items-center justify-center text-steel hover:bg-mist transition-colors text-xs"
                            >
                              &minus;
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-navy">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                              className="w-6 h-6 rounded border border-silver/60 flex items-center justify-center text-steel hover:bg-mist transition-colors text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-silver/40 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-steel">Subtotal</span>
                      <span className="font-medium text-navy">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-steel flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        Shipping
                      </span>
                      <span
                        className={`font-medium ${
                          shippingCost === 0 ? "text-emerald-600" : "text-navy"
                        }`}
                      >
                        {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-royal">
                        Add ${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} more for free
                        shipping
                      </p>
                    )}
                    <div className="border-t border-silver/40 pt-4 flex justify-between items-baseline">
                      <span className="font-display text-sm font-bold text-navy uppercase tracking-wide">
                        Total
                      </span>
                      <span className="font-display text-2xl font-bold text-navy">
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: ShieldCheck, label: "Lab Tested" },
                    { icon: Truck, label: "Same-Day Ship" },
                    { icon: Lock, label: "Encrypted" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-ice/50 text-center"
                    >
                      <Icon className="w-4 h-4 text-royal" />
                      <span className="text-[11px] text-steel font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Customer Info Form */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <FadeIn delay={0.2} direction="right">
              <div className="space-y-8">
                {/* Section 1: Contact */}
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-royal text-white flex items-center justify-center text-sm font-display font-bold">
                      1
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-royal" />
                      <h2 className="font-display text-base font-bold text-navy">
                        Contact Information
                      </h2>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="researcher@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                      style={{ fontSize: "16px" }}
                    />
                    <p className="text-xs text-slate mt-2">
                      Order confirmation and tracking details will be sent here.
                    </p>
                  </div>
                </section>

                <div className="border-t border-silver/30" />

                {/* Section 2: Shipping */}
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-royal text-white flex items-center justify-center text-sm font-display font-bold">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-royal" />
                      <h2 className="font-display text-base font-bold text-navy">
                        Shipping Address
                      </h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={shipping.firstName}
                        onChange={(e) =>
                          setShipping({ ...shipping, firstName: e.target.value })
                        }
                        className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={shipping.lastName}
                        onChange={(e) =>
                          setShipping({ ...shipping, lastName: e.target.value })
                        }
                        className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Research Blvd"
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping({ ...shipping, address: e.target.value })
                        }
                        className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                        Apt / Suite{" "}
                        <span className="normal-case tracking-normal text-slate/60">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Apt 4B"
                        value={shipping.apt}
                        onChange={(e) =>
                          setShipping({ ...shipping, apt: e.target.value })
                        }
                        className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Austin"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
                        }
                        className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                          State
                        </label>
                        <select
                          value={shipping.state}
                          onChange={(e) =>
                            setShipping({ ...shipping, state: e.target.value })
                          }
                          className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all appearance-none"
                          style={{
                            fontSize: "16px",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                            paddingRight: "32px",
                          }}
                        >
                          <option value="">--</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-steel uppercase tracking-wider mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          placeholder="78701"
                          value={shipping.zip}
                          onChange={(e) => handleZipChange(e.target.value)}
                          maxLength={5}
                          className="w-full rounded-lg border border-silver/60 bg-white px-4 py-3 text-navy placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div className="border-t border-silver/30" />

                {/* Section 3: Payment */}
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-silver/40 text-steel flex items-center justify-center text-sm font-display font-bold">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-steel" />
                      <h2 className="font-display text-base font-bold text-navy">
                        Payment
                      </h2>
                    </div>
                  </div>
                  <div className="rounded-xl bg-ice/60 border border-sky/20 p-6 sm:p-8 text-center">
                    <Lock className="w-8 h-8 text-royal/50 mx-auto mb-3" />
                    <p className="text-sm font-medium text-navy mb-1">
                      Payment processing will be available soon
                    </p>
                    <p className="text-xs text-steel">
                      Secure, encrypted checkout is being configured. Check back shortly.
                    </p>
                  </div>
                </section>

                {/* Place Order button */}
                <motion.button
                  disabled
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-silver/50 text-steel font-display font-bold text-base tracking-wide cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontSize: "16px" }}
                >
                  <Lock className="w-4 h-4" />
                  Place Order
                </motion.button>
                <p className="text-xs text-center text-slate -mt-4">
                  Payment integration coming soon. Orders cannot be placed yet.
                </p>

                {/* Disclaimer */}
                <div className="mt-4">
                  <p className="text-slate/70 text-xs leading-relaxed">
                    <strong className="text-steel font-semibold">Disclaimer:</strong>{" "}
                    For Research Use Only. Not for Human Consumption. Not FDA Approved.
                    Not a Supplement. All products sold by Genara Labs LLC are intended
                    exclusively for in-vitro research and laboratory use. Not intended to
                    diagnose, treat, cure, or prevent any disease. Purchasers must be 21
                    years of age or older.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
