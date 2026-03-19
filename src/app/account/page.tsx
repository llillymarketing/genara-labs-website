"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { ElegantShape } from "@/components/ui/elegant-shape";
import {
  User,
  MapPin,
  Package,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ChevronRight,
  LogOut,
  Bell,
  BellOff,
  Lock,
  Mail,
  Phone,
  Home,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

/* ─── Types ──────────────────────────────────────────────────── */
type Tab = "profile" | "addresses" | "orders" | "settings";

interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
}

/* ─── Tab config ─────────────────────────────────────────────── */
const TABS: { key: Tab; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "orders", label: "Order History", icon: Package },
  { key: "settings", label: "Settings", icon: Settings },
];

/* ─── Mock data ──────────────────────────────────────────────── */
const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Lab — Primary",
    name: "Dr. Alex Chen",
    street: "1200 Research Parkway, Suite 400",
    city: "Cambridge",
    state: "MA",
    zip: "02142",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Satellite Facility",
    name: "Dr. Alex Chen",
    street: "9800 Innovation Blvd",
    city: "San Diego",
    state: "CA",
    zip: "92121",
    isDefault: false,
  },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "GNR-20260301",
    date: "2026-03-01",
    status: "delivered",
    total: 189.0,
    items: [
      { name: "BPC-157 (5mg)", qty: 2, price: 45 },
      { name: "TB-500 (5mg)", qty: 1, price: 52 },
      { name: "GHK-Cu (50mg)", qty: 1, price: 47 },
    ],
  },
  {
    id: "GNR-20260215",
    date: "2026-02-15",
    status: "shipped",
    total: 134.0,
    items: [
      { name: "Ipamorelin (5mg)", qty: 1, price: 62 },
      { name: "Sermorelin (2mg)", qty: 1, price: 72 },
    ],
  },
  {
    id: "GNR-20260128",
    date: "2026-01-28",
    status: "processing",
    total: 210.0,
    items: [
      { name: "CJC-1295 (2mg)", qty: 3, price: 42 },
      { name: "Melanotan II (10mg)", qty: 1, price: 84 },
    ],
  },
  {
    id: "GNR-20260110",
    date: "2026-01-10",
    status: "cancelled",
    total: 52.0,
    items: [{ name: "Selank (5mg)", qty: 1, price: 52 }],
  },
];

/* ─── Status badge ───────────────────────────────────────────── */
function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    processing: {
      color: "#D97706",
      bg: "rgba(217,119,6,0.08)",
      Icon: Clock,
      label: "Processing",
    },
    shipped: {
      color: "#1565C0",
      bg: "rgba(21,101,192,0.08)",
      Icon: Truck,
      label: "Shipped",
    },
    delivered: {
      color: "#16874A",
      bg: "rgba(22,135,74,0.08)",
      Icon: CheckCircle,
      label: "Delivered",
    },
    cancelled: {
      color: "#C53030",
      bg: "rgba(197,48,48,0.08)",
      Icon: XCircle,
      label: "Cancelled",
    },
  };
  const cfg = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium tracking-wide uppercase"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      <cfg.Icon className="size-3.5" />
      {cfg.label}
    </span>
  );
}

/* ─── Profile Section ────────────────────────────────────────── */
function ProfileSection() {
  const [name, setName] = useState("Dr. Alex Chen");
  const [email, setEmail] = useState("a.chen@biolabs.edu");
  const [phone, setPhone] = useState("(617) 555-0142");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-navy mb-1">
        Profile Information
      </h2>
      <p className="text-steel text-sm mb-8">
        Manage your personal details and contact information.
      </p>

      {/* Avatar + name banner */}
      <div className="flex items-center gap-5 mb-8 p-5 rounded-xl bg-gradient-to-r from-ice/60 to-white border border-silver/40">
        <div className="flex items-center justify-center size-16 rounded-full bg-royal/10 text-royal font-display text-xl font-bold shrink-0">
          {name
            .split(" ")
            .filter((p) => p.length > 1)
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-navy font-display font-semibold text-lg">
            {name}
          </p>
          <p className="text-steel text-sm">{email}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-silver/40 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
              />
            </div>
          </div>
        </div>
        <div className="max-w-sm mb-6">
          <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full border border-silver rounded-lg pl-10 pr-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-5 border-t border-silver/40">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-royal text-white font-display font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-deep-blue transition-colors"
          >
            {saved ? (
              <>
                <Check className="size-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              Profile updated successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Addresses Section ──────────────────────────────────────── */
function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    label: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const resetForm = () => {
    setForm({ label: "", name: "", street: "", city: "", state: "", zip: "" });
    setEditing(null);
    setAdding(false);
  };

  const handleEdit = (addr: Address) => {
    setForm({
      label: addr.label,
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
    });
    setEditing(addr.id);
    setAdding(false);
  };

  const handleSave = () => {
    if (editing) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editing ? { ...a, ...form } : a
        )
      );
    } else if (adding) {
      setAddresses((prev) => [
        ...prev,
        {
          id: `addr-${Date.now()}`,
          ...form,
          isDefault: prev.length === 0,
        },
      ]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const isFormOpen = editing !== null || adding;

  const inputCls =
    "w-full border border-silver rounded-lg px-4 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy mb-1">
            Shipping Addresses
          </h2>
          <p className="text-steel text-sm">
            Manage your shipping destinations for research orders.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => {
              resetForm();
              setAdding(true);
            }}
            className="inline-flex items-center gap-2 bg-royal text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-deep-blue transition-colors"
          >
            <Plus className="size-4" />
            Add Address
          </button>
        )}
      </div>

      {/* Address form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white border border-royal/20 rounded-xl p-6">
              <h3 className="font-display font-semibold text-navy text-lg mb-5">
                {editing ? "Edit Address" : "New Address"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                    Label
                  </label>
                  <input
                    value={form.label}
                    onChange={(e) =>
                      setForm({ ...form, label: e.target.value })
                    }
                    placeholder="e.g. Main Lab"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                    Recipient Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                  Street Address
                </label>
                <input
                  value={form.street}
                  onChange={(e) =>
                    setForm({ ...form, street: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                    City
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                    State
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    placeholder="CA"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                    ZIP Code
                  </label>
                  <input
                    value={form.zip}
                    onChange={(e) =>
                      setForm({ ...form, zip: e.target.value })
                    }
                    placeholder="90210"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 bg-royal text-white font-display font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-deep-blue transition-colors"
                >
                  <Check className="size-4" />
                  {editing ? "Update" : "Save Address"}
                </button>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 border border-silver text-graphite font-display font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-mist transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative bg-white border rounded-xl p-5 transition-colors ${
              addr.isDefault
                ? "border-royal/30 ring-1 ring-royal/10"
                : "border-silver/40"
            }`}
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-xs font-semibold text-royal bg-royal/8 px-2 py-0.5 rounded">
                <CheckCircle className="size-3" />
                Default
              </span>
            )}
            <div className="flex items-center gap-2 mb-3">
              <Home className="size-4 text-royal" />
              <span className="font-display font-semibold text-navy text-sm">
                {addr.label}
              </span>
            </div>
            <p className="text-graphite text-sm leading-relaxed">
              {addr.name}
              <br />
              {addr.street}
              <br />
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-silver/30">
              <button
                onClick={() => handleEdit(addr)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-royal transition-colors"
              >
                <Pencil className="size-3" />
                Edit
              </button>
              {!addr.isDefault && (
                <>
                  <span className="text-silver">|</span>
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-royal transition-colors"
                  >
                    Set Default
                  </button>
                  <span className="text-silver">|</span>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="size-3" />
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-16 bg-white border border-silver/40 rounded-xl">
          <MapPin className="size-10 text-silver mx-auto mb-3" />
          <p className="text-steel text-sm">No addresses saved yet.</p>
          <button
            onClick={() => {
              resetForm();
              setAdding(true);
            }}
            className="mt-4 inline-flex items-center gap-2 text-royal font-display font-semibold text-sm hover:text-deep-blue transition-colors"
          >
            <Plus className="size-4" />
            Add your first address
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Orders Section ─────────────────────────────────────────── */
function OrdersSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-navy mb-1">
        Order History
      </h2>
      <p className="text-steel text-sm mb-8">
        Track your research compound orders and view past purchases.
      </p>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-16 bg-white border border-silver/40 rounded-xl">
          <Package className="size-10 text-silver mx-auto mb-3" />
          <p className="text-steel text-sm">No orders yet.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-2 text-royal font-display font-semibold text-sm hover:text-deep-blue transition-colors"
          >
            Browse compounds
            <ChevronRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_ORDERS.map((order) => {
            const isOpen = expanded === order.id;
            return (
              <div
                key={order.id}
                className="bg-white border border-silver/40 rounded-xl overflow-hidden"
              >
                {/* Order row */}
                <button
                  onClick={() =>
                    setExpanded(isOpen ? null : order.id)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cloud/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-wrap min-w-0">
                    <span className="font-display font-semibold text-navy text-sm">
                      {order.id}
                    </span>
                    <span className="text-steel text-sm hidden sm:inline">
                      {formatDate(order.date)}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-display font-bold text-navy">
                      ${order.total.toFixed(2)}
                    </span>
                    <ChevronRight
                      className={`size-4 text-slate transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-silver/30">
                        <p className="text-steel text-xs mt-3 mb-3 sm:hidden">
                          {formatDate(order.date)}
                        </p>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-xs text-steel uppercase tracking-wider">
                              <th className="py-2">Item</th>
                              <th className="py-2 text-center">Qty</th>
                              <th className="py-2 text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-t border-silver/20"
                              >
                                <td className="py-2.5 text-graphite">
                                  {item.name}
                                </td>
                                <td className="py-2.5 text-center text-steel">
                                  {item.qty}
                                </td>
                                <td className="py-2.5 text-right text-navy font-medium">
                                  ${(item.price * item.qty).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-silver/40">
                              <td
                                colSpan={2}
                                className="py-3 text-right font-display font-semibold text-navy text-sm pr-4"
                              >
                                Total
                              </td>
                              <td className="py-3 text-right font-display font-bold text-navy">
                                ${order.total.toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Settings Section ───────────────────────────────────────── */
function SettingsSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [newProducts, setNewProducts] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  const inputCls =
    "w-full border border-silver rounded-lg pl-10 pr-12 py-3 text-[16px] text-graphite bg-white focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/15 transition-all";

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-navy mb-1">
        Account Settings
      </h2>
      <p className="text-steel text-sm mb-8">
        Update your password and notification preferences.
      </p>

      {/* Change Password */}
      <div className="bg-white border border-silver/40 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="size-5 text-royal" />
          <h3 className="font-display font-semibold text-navy text-lg">
            Change Password
          </h3>
        </div>
        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate hover:text-graphite transition-colors"
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate hover:text-graphite transition-colors"
              >
                {showNew ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-steel uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputCls}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate hover:text-graphite transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-royal text-white font-display font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-deep-blue transition-colors"
            >
              Update Password
            </button>
            {passwordSaved && (
              <span className="text-sm text-green-600 font-medium">
                Password updated
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-silver/40 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="size-5 text-royal" />
          <h3 className="font-display font-semibold text-navy text-lg">
            Notification Preferences
          </h3>
        </div>
        <div className="space-y-4">
          {[
            {
              label: "Order Updates",
              desc: "Shipping confirmations, delivery notifications, and tracking updates.",
              value: orderUpdates,
              setter: setOrderUpdates,
            },
            {
              label: "Promotions & Discounts",
              desc: "Exclusive offers and discount codes for research compounds.",
              value: promotions,
              setter: setPromotions,
            },
            {
              label: "New Product Announcements",
              desc: "Be the first to know when new compounds are available.",
              value: newProducts,
              setter: setNewProducts,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-start justify-between gap-4 py-3 border-b border-silver/20 last:border-b-0"
            >
              <div>
                <p className="text-graphite font-medium text-sm">
                  {pref.label}
                </p>
                <p className="text-steel text-xs mt-0.5">{pref.desc}</p>
              </div>
              <button
                onClick={() => pref.setter(!pref.value)}
                className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  pref.value ? "bg-royal" : "bg-silver"
                }`}
              >
                <span
                  className={`inline-block size-4 rounded-full bg-white transition-transform ${
                    pref.value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-white border border-silver/40 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-navy text-lg">
              Sign Out
            </h3>
            <p className="text-steel text-sm mt-1">
              Log out of your Genara Labs account on this device.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 border border-red-200 text-red-600 font-display font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Account Page ──────────────────────────────────────── */
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Show loading state
  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-royal animate-spin" />
      </main>
    );
  }

  // Redirect to sign-in if not logged in (but still show page for demo/preview)
  // When Supabase is connected, uncomment the redirect below:
  // if (!isLoggedIn) { router.push("/sign-in"); return null; }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "addresses":
        return <AddressesSection />;
      case "orders":
        return <OrdersSection />;
      case "settings":
        return <SettingsSection />;
    }
  };

  return (
    <main>
      {/* Hero header */}
      <section className="relative bg-navy py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal/[0.05] via-transparent to-cerulean/[0.03]" />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={280}
            height={70}
            rotate={-12}
            gradient="from-royal/[0.06]"
            className="left-[-6%] top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={220}
            height={55}
            rotate={8}
            gradient="from-cerulean/[0.05]"
            className="right-[-3%] bottom-[15%]"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-sky/60 font-display text-sm font-semibold tracking-wider uppercase mb-4">
              Dashboard
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              My Account
            </h1>
            <p className="text-white/40 max-w-lg mx-auto font-light">
              Manage your profile, shipping addresses, orders, and account
              settings in one place.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content area */}
      <section className="py-10 sm:py-16 px-4 bg-cloud min-h-[60vh]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-6">
              {/* ── Sidebar (desktop) / Horizontal scroll tabs (mobile) ── */}
              <nav className="md:w-56 shrink-0">
                {/* Mobile: horizontal scrollable tabs */}
                <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-display font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          isActive
                            ? "bg-royal text-white"
                            : "bg-white text-steel border border-silver/40 hover:text-navy hover:border-silver"
                        }`}
                      >
                        <Icon className="size-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Desktop: vertical sidebar */}
                <div className="hidden md:block bg-white border border-silver/40 rounded-xl p-2">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-display font-semibold transition-colors mb-0.5 last:mb-0 cursor-pointer ${
                          isActive
                            ? "bg-royal/8 text-royal"
                            : "text-steel hover:bg-cloud hover:text-navy"
                        }`}
                      >
                        <Icon className="size-4.5 shrink-0" />
                        {tab.label}
                        {isActive && (
                          <ChevronRight className="size-3.5 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* ── Content panel ── */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-cloud">
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
    </main>
  );
}
