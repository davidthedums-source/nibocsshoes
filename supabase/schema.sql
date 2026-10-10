-- NIBOCS Shoes backend schema (Supabase / PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  product_name text not null,
  size text not null,
  delivery_location text,
  leather_type text,
  custom_notes text,
  status text not null default 'received' check (status in ('received', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  appointment_date date not null,
  purpose text not null,
  time_slot text,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- All writes go through the server using the service-role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to the browser.
alter table public.orders enable row level security;
alter table public.appointments enable row level security;
