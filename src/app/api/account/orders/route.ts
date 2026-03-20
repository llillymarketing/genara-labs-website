import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formatted = (orders || []).map((o) => ({
    id: `GEN-${String(o.order_number).padStart(5, "0")}`,
    date: new Date(o.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: o.status,
    items: (o.order_items || []).map((item: Record<string, unknown>) => ({
      name: item.product_name,
      variant: item.variant,
      qty: item.quantity,
      price: Number(item.unit_price),
    })),
    total: Number(o.total),
    tracking: o.tracking_number || null,
  }));

  return NextResponse.json(formatted);
}
