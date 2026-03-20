"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import Link from "next/link";
import { X, ShoppingCart, Plus, Minus, Trash2, FlaskConical } from "lucide-react";

export interface CartItem {
  slug: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.slug !== slug));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-navy/30 backdrop-blur-sm"
        onClick={closeCart}
      />
      <div
        className="absolute inset-y-0 right-0 w-full max-w-md bg-white flex flex-col"
        style={{ animation: "slideInRight 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-silver/40">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-navy" />
            <h2 className="font-display text-lg font-semibold text-navy">
              Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-graphite rounded-lg hover:bg-mist transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FlaskConical className="w-12 h-12 text-silver mb-4" />
              <p className="text-steel text-sm mb-2">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-sm text-royal font-semibold hover:text-deep-blue transition-colors"
              >
                Browse Compounds
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-4 bg-mist rounded-lg"
                >
                  <div className="w-16 h-16 bg-silver/20 rounded-lg flex items-center justify-center shrink-0">
                    <FlaskConical className="w-6 h-6 text-silver" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold text-navy truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate">{item.variant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-md border border-silver flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3 text-graphite" />
                        </button>
                        <span className="text-sm font-medium text-navy w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-md border border-silver flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3 text-graphite" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-navy">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="self-start p-1 text-slate hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-silver/40 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-steel">Subtotal</span>
              <span className="font-display text-lg font-bold text-navy">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-slate">
              Shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-royal text-white text-center font-display font-semibold text-[16px] py-3.5 rounded-lg hover:bg-deep-blue transition-colors"
            >
              Proceed to Checkout
            </Link>
            <p className="text-xs text-slate/60 text-center">
              For Research Use Only &middot; Not for Human Consumption
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
