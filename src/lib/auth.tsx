"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; variant: string; qty: number; price: number }[];
  total: number;
  tracking?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  newsletter: boolean;
  addresses: Address[];
  orders: Order[];
}

interface AuthCtx {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, newsletter?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  refreshOrders: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: () => {},
  addAddress: () => {},
  removeAddress: () => {},
  updateAddress: () => {},
  refreshOrders: async () => {},
  resetPassword: async () => {},
  clearError: () => {},
});

const supabase = createClient();

/* ─── Helpers ────────────────────────────────────────────────── */

function mapDbAddress(row: Record<string, unknown>): Address {
  return {
    id: row.id as string,
    label: row.label as string,
    name: row.full_name as string,
    line1: row.line1 as string,
    line2: (row.line2 as string) || "",
    city: row.city as string,
    state: row.state as string,
    zip: row.zip as string,
    country: row.country as string,
    isDefault: row.is_default as boolean,
  };
}

function mapDbOrder(row: Record<string, unknown>, items: Record<string, unknown>[]): Order {
  return {
    id: String(row.order_number || row.id),
    date: row.created_at as string,
    status: row.status as Order["status"],
    items: items.map((i) => ({
      name: i.product_name as string,
      variant: i.variant as string,
      qty: i.quantity as number,
      price: Number(i.unit_price),
    })),
    total: Number(row.total),
    tracking: (row.tracking_number as string) || undefined,
  };
}

async function fetchProfile(userId: string): Promise<User | null> {
  const { data: customer } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (!customer) return null;

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: true });

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false });

  return {
    id: customer.id,
    name: customer.full_name,
    email: customer.email,
    phone: customer.phone || "",
    joinedDate: customer.created_at,
    newsletter: customer.newsletter,
    addresses: (addresses || []).map(mapDbAddress),
    orders: (orders || []).map((o: Record<string, unknown>) =>
      mapDbOrder(o, (o.order_items as Record<string, unknown>[]) || []),
    ),
  };
}

/* ─── Provider ───────────────────────────────────────────────── */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const manualAuthInProgress = useRef(false);

  useEffect(() => {
    supabase.auth.getUser()
      .then(async ({ data: { user: authUser } }) => {
        if (authUser) {
          try {
            const profile = await fetchProfile(authUser.id);
            setUser(profile);
          } catch {
            // Profile fetch failed
          }
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          return;
        }
        if (manualAuthInProgress.current) return;
        if (event !== "SIGNED_IN" && event !== "USER_UPDATED") return;

        if (session?.user) {
          try {
            const profile = await fetchProfile(session.user.id);
            setUser(profile);
          } catch {
            // Profile fetch failed
          }
        }
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    manualAuthInProgress.current = true;
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error(authError.message);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const profile = await fetchProfile(authUser.id);
        setUser(profile);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      throw err;
    } finally {
      manualAuthInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, newsletter?: boolean) => {
    setError(null);
    setIsLoading(true);
    manualAuthInProgress.current = true;
    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (authError) throw new Error(authError.message);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        if (newsletter !== undefined) {
          await supabase.from("profiles").update({ newsletter }).eq("id", authUser.id);
        }
        const profile = await fetchProfile(authUser.id);
        setUser(profile);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      throw err;
    } finally {
      manualAuthInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const refreshOrders = useCallback(async () => {
    if (!user) return;
    const { data: orders } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    if (orders) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              orders: orders.map((o: Record<string, unknown>) =>
                mapDbOrder(o, (o.order_items as Record<string, unknown>[]) || []),
              ),
            }
          : null,
      );
    }
  }, [user]);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return;
      setUser((prev) => (prev ? { ...prev, ...updates } : null));
      const dbUpdates: Record<string, unknown> = {};
      if (updates.name !== undefined) dbUpdates.full_name = updates.name;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.newsletter !== undefined) dbUpdates.newsletter = updates.newsletter;
      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from("profiles").update(dbUpdates).eq("id", user.id);
      }
    },
    [user],
  );

  const addAddress = useCallback(
    async (address: Omit<Address, "id">) => {
      if (!user) return;
      if (address.isDefault) {
        await supabase.from("addresses").update({ is_default: false }).eq("customer_id", user.id);
      }
      const { data } = await supabase
        .from("addresses")
        .insert({
          customer_id: user.id,
          label: address.label,
          full_name: address.name,
          line1: address.line1,
          line2: address.line2 || "",
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country,
          is_default: address.isDefault,
        })
        .select()
        .single();

      if (data) {
        setUser((prev) => {
          if (!prev) return null;
          const addresses = address.isDefault
            ? prev.addresses.map((a) => ({ ...a, isDefault: false }))
            : [...prev.addresses];
          return { ...prev, addresses: [...addresses, mapDbAddress(data)] };
        });
      }
    },
    [user],
  );

  const removeAddress = useCallback(
    async (id: string) => {
      if (!user) return;
      await supabase.from("addresses").delete().eq("id", id);
      setUser((prev) =>
        prev ? { ...prev, addresses: prev.addresses.filter((a) => a.id !== id) } : null,
      );
    },
    [user],
  );

  const updateAddress = useCallback(
    async (id: string, updates: Partial<Address>) => {
      if (!user) return;
      const dbUpdates: Record<string, unknown> = {};
      if (updates.label !== undefined) dbUpdates.label = updates.label;
      if (updates.name !== undefined) dbUpdates.full_name = updates.name;
      if (updates.line1 !== undefined) dbUpdates.line1 = updates.line1;
      if (updates.line2 !== undefined) dbUpdates.line2 = updates.line2;
      if (updates.city !== undefined) dbUpdates.city = updates.city;
      if (updates.state !== undefined) dbUpdates.state = updates.state;
      if (updates.zip !== undefined) dbUpdates.zip = updates.zip;
      if (updates.country !== undefined) dbUpdates.country = updates.country;
      if (updates.isDefault !== undefined) dbUpdates.is_default = updates.isDefault;

      if (updates.isDefault) {
        await supabase.from("addresses").update({ is_default: false }).eq("customer_id", user.id);
      }
      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from("addresses").update(dbUpdates).eq("id", id);
      }

      setUser((prev) => {
        if (!prev) return null;
        let addresses = prev.addresses.map((a) =>
          a.id === id ? { ...a, ...updates } : a,
        );
        if (updates.isDefault) {
          addresses = addresses.map((a) =>
            a.id === id ? a : { ...a, isDefault: false },
          );
        }
        return { ...prev, addresses };
      });
    },
    [user],
  );

  const resetPassword = useCallback(async (email: string) => {
    setError(null);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account?reset=true`,
      });
      if (resetError) throw new Error(resetError.message);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send reset email";
      setError(msg);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        addAddress,
        removeAddress,
        updateAddress,
        refreshOrders,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
