import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const textField = (value: unknown, maxLength: number): string | null => {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned.length > 0 && cleaned.length <= maxLength ? cleaned : null;
};

const optionalField = (value: unknown, maxLength: number): string | null => {
  if (value == null || value === "") return null;
  return textField(value, maxLength);
};

const validDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) return json({ error: "Backend environment is not configured" }, 503);

    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > 16_384) return json({ error: "Request is too large." }, 413);

    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid request body." }, 400);
    }

    const kind = (body as Record<string, unknown>).kind;
    const fullName = textField((body as any).fullName, 120);
    const phone = textField((body as any).phone, 30);
    if (!fullName || fullName.length < 2) return json({ error: "Enter a valid full name." }, 400);
    if (!phone || phone.length < 7) return json({ error: "Enter a valid phone number." }, 400);

    const email = optionalField((body as any).email, 254);
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

    if (kind === "order") {
      const productName = textField((body as any).productName, 160);
      const size = textField(String((body as any).size ?? ""), 40);
      const deliveryLocation = optionalField((body as any).deliveryLocation, 300);
      const leatherType = optionalField((body as any).leatherType, 100);
      const customNotes = optionalField((body as any).customNotes, 2000);
      if (!productName) return json({ error: "Choose a valid shoe or service." }, 400);
      if (!size) return json({ error: "Enter a shoe size." }, 400);

      const { data, error } = await db.from("orders").insert({
        full_name: fullName,
        phone,
        email,
        delivery_location: deliveryLocation,
        product_name: productName,
        size,
        leather_type: leatherType,
        custom_notes: customNotes,
        status: "received",
      }).select("id").single();

      if (error) {
        console.error("Order insert failed:", error.message);
        return json({ error: "Could not save your order. Please try again." }, 500);
      }
      return json({ success: true, id: data.id, message: "Your order was received." }, 201);
    }

    if (kind === "appointment") {
      const date = textField((body as any).date, 10);
      const purpose = textField((body as any).purpose, 180);
      const timeSlot = optionalField((body as any).timeSlot, 80);
      const notes = optionalField((body as any).notes, 2000);
      if (!date || !validDate(date)) return json({ error: "Choose a valid appointment date." }, 400);
      if (!purpose) return json({ error: "Enter an appointment purpose." }, 400);

      const { data, error } = await db.from("appointments").insert({
        full_name: fullName,
        phone,
        email,
        appointment_date: date,
        time_slot: timeSlot,
        purpose,
        notes,
        status: "scheduled",
      }).select("id").single();

      if (error) {
        console.error("Appointment insert failed:", error.message);
        return json({ error: "Could not save your appointment. Please try again." }, 500);
      }
      return json({ success: true, id: data.id, message: "Your appointment request was received." }, 201);
    }

    return json({ error: "Invalid booking type." }, 400);
  } catch (error) {
    console.error("Booking function error:", error);
    return json({ error: "Invalid request. Please check your details and try again." }, 400);
  }
});
