import { createClient, SupabaseClient } from '@supabase/supabase-js';

function isValidSupabaseUrl(url: unknown): url is string {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    const isHttp = parsed.protocol === 'http:' || parsed.protocol === 'https:';
    const isPlaceholder =
      parsed.hostname.includes('your-project') ||
      parsed.hostname.includes('example') ||
      parsed.hostname.includes('placeholder') ||
      parsed.hostname === 'localhost' && !parsed.port;
    return isHttp && !isPlaceholder && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

function isValidAnonKey(key: unknown): key is string {
  if (typeof key !== 'string' || !key.trim()) return false;
  const trimmed = key.trim();
  return trimmed.length > 20 && !trimmed.includes('your-anon-key') && !trimmed.includes('placeholder');
}

function initSupabaseClient(): SupabaseClient | null {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL;
  const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!isValidSupabaseUrl(rawUrl) || !isValidAnonKey(rawKey)) {
    return null;
  }

  try {
    return createClient(rawUrl.trim(), rawKey.trim());
  } catch (err) {
    console.warn('Supabase client initialization skipped:', err);
    return null;
  }
}

export const supabase: SupabaseClient | null = initSupabaseClient();
export const isSupabaseConfigured: boolean = Boolean(supabase !== null);

export interface SupabaseOrderRow {
  id?: string;
  full_name: string;
  phone: string;
  email?: string | null;
  delivery_location?: string | null;
  product_name: string;
  size: string;
  leather_type?: string | null;
  custom_notes?: string | null;
  status: string;
  created_at?: string;
}

export interface SupabaseAppointmentRow {
  id?: string;
  full_name: string;
  phone: string;
  email?: string | null;
  appointment_date: string;
  time_slot?: string | null;
  purpose: string;
  notes?: string | null;
  status: string;
  created_at?: string;
}

/**
 * SQL Schema definition for Supabase SQL Editor:
 * Run this snippet in your Supabase project dashboard -> SQL Editor:
 */
export const SUPABASE_SQL_SCHEMA = `
-- Orders table for NIBOCS SHOE Atelier
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text not null,
  email text,
  delivery_location text,
  product_name text not null,
  size text not null,
  leather_type text,
  custom_notes text,
  status text not null default 'received',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Appointments table for Workshop visits & fittings
create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text not null,
  email text,
  appointment_date text not null,
  time_slot text,
  purpose text not null,
  notes text,
  status text not null default 'scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.appointments enable row level security;

-- Allow anonymous or authenticated customers to insert orders
create policy "Allow public order submissions"
  on public.orders for insert
  with check (true);

-- Allow public appointment bookings
create policy "Allow public appointment bookings"
  on public.appointments for insert
  with check (true);
`;

/**
 * Syncs an order to Supabase if configured.
 */
export async function insertSupabaseOrder(order: {
  fullName: string;
  phone: string;
  email?: string;
  deliveryLocation?: string;
  productName: string;
  size: string;
  leatherType?: string;
  customNotes?: string;
}): Promise<string | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          full_name: order.fullName,
          phone: order.phone,
          email: order.email || null,
          delivery_location: order.deliveryLocation || null,
          product_name: order.productName,
          size: order.size,
          leather_type: order.leatherType || null,
          custom_notes: order.customNotes || null,
          status: 'received',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.warn('Supabase order insert warning:', error.message);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.warn('Supabase sync error:', err);
    return null;
  }
}

/**
 * Syncs an appointment to Supabase if configured.
 */
export async function insertSupabaseAppointment(appt: {
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot?: string;
  purpose: string;
  notes?: string;
}): Promise<string | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          full_name: appt.fullName,
          phone: appt.phone,
          email: appt.email || null,
          appointment_date: appt.date,
          time_slot: appt.timeSlot || null,
          purpose: appt.purpose,
          notes: appt.notes || null,
          status: 'scheduled',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.warn('Supabase appointment insert warning:', error.message);
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.warn('Supabase sync error:', err);
    return null;
  }
}
