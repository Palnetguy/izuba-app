create type public.profile_role as enum ('admin', 'restaurant', 'farmer');
create type public.order_status as enum ('reserved', 'packed', 'in_transit', 'delivered');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.profile_role not null,
  name text not null,
  organization_name text,
  phone text,
  location text,
  created_at timestamptz not null default now()
);

create table public.farms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  district text not null,
  lead_farmer_name text not null,
  female_farmer_count integer not null default 0,
  active_tubes integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  district text not null,
  contact_name text not null,
  delivery_address text not null,
  created_at timestamptz not null default now()
);

create table public.harvest_batches (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  mushroom_type text not null,
  available_kg numeric(10, 2) not null,
  reserved_kg numeric(10, 2) not null default 0,
  harvest_date date not null,
  price_per_kg integer not null,
  quality_score integer not null default 90,
  eta_hours integer not null default 24,
  substrate_kg numeric(10, 2) not null default 0,
  status text not null default 'available',
  qr_slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  status public.order_status not null default 'reserved',
  delivery_date date not null,
  delivery_window text not null,
  route text not null,
  distance_km numeric(10, 2) not null default 0,
  total_kg numeric(10, 2) not null,
  total_amount integer not null,
  spoilage_prevented_kg numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  harvest_batch_id uuid not null references public.harvest_batches(id) on delete cascade,
  quantity_kg numeric(10, 2) not null,
  unit_price integer not null
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  gross_amount integer not null,
  farmer_share integer not null,
  izuba_share integer not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.biomass_sales (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  source_batch_id uuid references public.harvest_batches(id) on delete set null,
  weight_kg numeric(10, 2) not null,
  buyer text not null,
  amount integer not null,
  energy_use_case text not null,
  created_at timestamptz not null default now()
);

create table public.farm_rooms (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  room_code text not null,
  stage text not null,
  tubes integer not null,
  humidity integer not null,
  temp_c integer not null,
  ready_in_days integer not null,
  created_at timestamptz not null default now()
);

create table public.demand_signals (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  forecast_kg numeric(10, 2) not null,
  match_rate integer not null,
  priority text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.farms enable row level security;
alter table public.restaurants enable row level security;
alter table public.harvest_batches enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.biomass_sales enable row level security;
alter table public.farm_rooms enable row level security;
alter table public.demand_signals enable row level security;

create policy "demo read profiles" on public.profiles for select using (true);
create policy "demo read farms" on public.farms for select using (true);
create policy "demo read restaurants" on public.restaurants for select using (true);
create policy "demo read harvests" on public.harvest_batches for select using (true);
create policy "demo read orders" on public.orders for select using (true);
create policy "demo read order items" on public.order_items for select using (true);
create policy "demo read ledger" on public.ledger_entries for select using (true);
create policy "demo read biomass" on public.biomass_sales for select using (true);
create policy "demo read farm rooms" on public.farm_rooms for select using (true);
create policy "demo read demand signals" on public.demand_signals for select using (true);
