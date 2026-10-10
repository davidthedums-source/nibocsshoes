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
  // Public project URL and publishable key are safe for browser use.
  // Vercel environment variables can override these defaults.
  const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cuszpnnrsgmnbwwfvfvc.supabase.co';
  const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QXf6uTuDjlamrsumo0khLQ_7pPLJOqp';

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

/**
 * SQL schema shown in the admin tools for reference.
 * The live project schema is managed through Supabase migrations.
 */
export const SUPABASE_SQL_SCHEMA = `
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
    check (status in ('received','confirmed','in_progress','completed','cancelled')),
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
    check (status in ('scheduled','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.appointments enable row level security;
revoke all on public.orders from anon, authenticated;
revoke all on public.appointments from anon, authenticated;
grant all on public.orders to service_role;
grant all on public.appointments to service_role;
`;

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
    const { data, error } = await supabase.functions.invoke('nibocs-bookings', {
      body: {
        kind: 'order',
        fullName: order.fullName,
        phone: order.phone,
        email: order.email,
        deliveryLocation: order.deliveryLocation,
        productName: order.productName,
        size: order.size,
        leatherType: order.leatherType,
        customNotes: order.customNotes,
      },
    });
    if (error || !data?.success || !data?.id) {
      console.warn('Supabase order save failed:', error?.message || data?.error || 'Unknown error');
      return null;
    }
    return data.id;
  } catch (err) {
    console.warn('Supabase order request failed:', err);
    return null;
  }
}

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
    const { data, error } = await supabase.functions.invoke('nibocs-bookings', {
      body: {
        kind: 'appointment',
        fullName: appt.fullName,
        phone: appt.phone,
        email: appt.email,
        date: appt.date,
        timeSlot: appt.timeSlot,
        purpose: appt.purpose,
        notes: appt.notes,
      },
    });
    if (error || !data?.success || !data?.id) {
      console.warn('Supabase appointment save failed:', error?.message || data?.error || 'Unknown error');
      return null;
    }
    return data.id;
  } catch (err) {
    console.warn('Supabase appointment request failed:', err);
    return null;
  }
}
