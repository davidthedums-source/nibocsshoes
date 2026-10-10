-- NIBOCS Shoes backend schema (Supabase / PostgreSQL)
-- Order and appointment submissions are handled by the nibocs-bookings Edge Function.
-- Keep the service-role key server-side only.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  delivery_location text,
  product_name text not null,
  size text not null,
  leather_type text,
  custom_notes text,
  status text not null default 'received'
    check (status in ('received', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  appointment_date date not null,
  time_slot text,
  purpose text not null,
  notes text,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.appointments enable row level security;

revoke all on public.orders from anon, authenticated;
revoke all on public.appointments from anon, authenticated;
grant all on public.orders to service_role;
grant all on public.appointments to service_role;
