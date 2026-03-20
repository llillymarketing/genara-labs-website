-- =============================================
-- Genara Labs — Initial Database Schema
-- Mirrors Kern Peptides schema (proven system)
-- =============================================

-- ─── Profiles (extends auth.users) ───────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  full_name     text not null default '',
  phone         text default '',
  newsletter    boolean default false,
  first_order_at timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── Addresses ───────────────────────────────────────────────
create table if not exists public.addresses (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.profiles(id) on delete cascade,
  label         text not null default 'Home',
  full_name     text not null,
  line1         text not null,
  line2         text default '',
  city          text not null,
  state         text not null,
  zip           text not null,
  country       text not null default 'US',
  is_default    boolean default false,
  address_type  text not null default 'shipping' check (address_type in ('shipping', 'billing')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.addresses enable row level security;

create policy "Users can manage own addresses"
  on public.addresses for all
  using (auth.uid() = customer_id);

-- ─── Orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  customer_id        uuid not null references public.profiles(id) on delete cascade,
  order_number       serial,
  status             text not null default 'processing'
                       check (status in ('processing','shipped','delivered','cancelled','refunded')),
  subtotal           numeric(10,2) not null default 0,
  shipping_cost      numeric(10,2) not null default 0,
  tax                numeric(10,2) not null default 0,
  total              numeric(10,2) not null default 0,
  shipping_address   jsonb,
  billing_address    jsonb,
  tracking_number    text,
  shipstation_order_id text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can read own orders"
  on public.orders for select
  using (auth.uid() = customer_id);

-- ─── Order Items ─────────────────────────────────────────────
create table if not exists public.order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.orders(id) on delete cascade,
  sku           text not null,
  product_name  text not null,
  variant       text not null default '',
  quantity      integer not null default 1,
  unit_price    numeric(10,2) not null,
  total_price   numeric(10,2) not null,
  created_at    timestamptz default now()
);

alter table public.order_items enable row level security;

create policy "Users can read own order items"
  on public.order_items for select
  using (
    order_id in (
      select id from public.orders where customer_id = auth.uid()
    )
  );

-- ─── Payment Records ────────────────────────────────────────
create table if not exists public.payment_records (
  id                 uuid primary key default gen_random_uuid(),
  order_id           uuid not null references public.orders(id) on delete cascade,
  customer_id        uuid not null references public.profiles(id) on delete cascade,
  processor          text not null default 'bankful',
  transaction_id     text,
  amount             numeric(10,2) not null,
  currency           text not null default 'USD',
  status             text not null default 'pending'
                       check (status in ('pending','authorized','captured','failed','refunded','voided')),
  card_last4         text,
  card_brand         text,
  processor_response jsonb,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

alter table public.payment_records enable row level security;

create policy "Users can read own payment records"
  on public.payment_records for select
  using (auth.uid() = customer_id);

-- ─── Indexes ─────────────────────────────────────────────────
create index idx_addresses_customer on public.addresses(customer_id);
create index idx_orders_customer on public.orders(customer_id);
create index idx_orders_status on public.orders(status);
create index idx_order_items_order on public.order_items(order_id);
create index idx_payment_records_order on public.payment_records(order_id);
create index idx_payment_records_customer on public.payment_records(customer_id);

-- ─── Auto-update timestamps ─────────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function handle_updated_at();

create trigger set_addresses_updated_at
  before update on public.addresses
  for each row execute function handle_updated_at();

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function handle_updated_at();

create trigger set_payment_records_updated_at
  before update on public.payment_records
  for each row execute function handle_updated_at();

-- ─── Auto-create profile on signup ──────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── Set first_order_at on first order ──────────────────────
create or replace function handle_first_order()
returns trigger as $$
begin
  update public.profiles
    set first_order_at = now()
  where id = new.customer_id
    and first_order_at is null;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_first_order
  after insert on public.orders
  for each row execute function handle_first_order();
