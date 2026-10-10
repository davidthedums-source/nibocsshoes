# NIBOCS Shoes backend

The booking backend uses **Supabase PostgreSQL + the `nibocs-bookings` Edge Function**. The Vite/React frontend calls this function to save customer orders and workshop appointments. The existing Firebase/Firestore copy is retained for the current admin dashboard when Firebase is available.

## Live resources

- Website: https://nibocsshoes.vercel.app
- Supabase project: https://supabase.com/dashboard/project/cuszpnnrsgmnbwwfvfvc
- Database schema: [`supabase/schema.sql`](./supabase/schema.sql)
- Edge Function source: [`supabase/functions/nibocs-bookings/index.ts`](./supabase/functions/nibocs-bookings/index.ts)
- Edge Function endpoint: `https://cuszpnnrsgmnbwwfvfvc.supabase.co/functions/v1/nibocs-bookings`

## What it saves

The function accepts POST JSON with `kind: "order"` or `kind: "appointment"`.

- Orders save customer name, phone, optional email and delivery location, product, shoe size, leather preference, and custom notes.
- Appointments save customer name, phone, optional email, date, time slot, purpose, and notes.
- It validates required fields and input lengths before inserting records.
- Successful submissions return a database record ID. The website should only show success after the Supabase function confirms the save.

## Security

- Both database tables have Row Level Security enabled.
- Browser roles `anon` and `authenticated` have no direct table access.
- The Edge Function uses the server-side `SUPABASE_SERVICE_ROLE_KEY`. Never expose this secret in browser code or a `VITE_*` variable.
- The project URL and publishable key in `src/lib/supabase.ts` are public client configuration; they are not privileged secrets.
- The function is callable by public website visitors because customers do not log in to place an order. It validates input and only allows order/appointment insert operations.

## Deployments

- **Supabase:** the `nibocs-bookings` function is deployed separately in Supabase. Its source is tracked in `supabase/functions/nibocs-bookings/index.ts`.
- **GitHub:** `main` is the source repository. Commit changes to the main branch.
- **Vercel:** if the Vercel project is linked to this GitHub repository, a push to `main` should trigger a frontend deployment automatically. Confirm the deployment status in the Vercel dashboard.
- **Google AI Studio:** if editing the same app in AI Studio, import/open the current GitHub project or paste the backend integration changes into its code editor, then export/push the resulting code back to this repository. Do not replace the Supabase Edge Function URL or expose the service-role secret in frontend code.

## Environment variables

The browser app uses:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (a publishable/legacy anon key only)

The Edge Function uses:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side secret)

Never put `SUPABASE_SERVICE_ROLE_KEY` in Google AI Studio frontend code or Vercel variables prefixed with `VITE_`.
