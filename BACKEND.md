# NIBOCS Shoes backend

The live backend uses **Supabase PostgreSQL + the `nibocs-bookings` Edge Function**. The Vite/React frontend calls this function to save orders and workshop appointments. The existing Firebase/Firestore copy is retained for the current admin dashboard when Firebase is available.

## Live resources
- Supabase project: https://supabase.com/dashboard/project/cuszpnnrsgmnbwwfvfvc
- Database schema: [`supabase/schema.sql`](./supabase/schema.sql)
- Edge Function: `nibocs-bookings`

## Request payloads
The function accepts POST JSON with `kind: "order"` or `kind: "appointment"`.
- Orders save customer name, phone, optional email and delivery location, product, size, leather preference, and notes.
- Appointments save customer name, phone, optional email, date, time slot, purpose, and notes.

## Security
- Both tables have Row Level Security enabled.
- Browser roles `anon` and `authenticated` have no direct table access.
- The Edge Function uses the server-side `SUPABASE_SERVICE_ROLE_KEY`. Never expose this secret in browser code or a `VITE_*` variable.
- The project URL and publishable key in `src/lib/supabase.ts` are public client configuration; they are not privileged secrets.

## Deployment
Changes pushed to the `main` branch should deploy through Vercel if the GitHub repository is connected to the Vercel project. The Supabase Edge Function is deployed separately in Supabase.
