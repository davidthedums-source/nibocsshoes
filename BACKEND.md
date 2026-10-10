# NIBOCS Shoes backend

Express + TypeScript API for shoe orders and workshop appointments, backed by Supabase PostgreSQL.

## Endpoints
- `GET /api/health` — health and database configuration check
- `GET /api/backend/status` — backend status
- `POST /api/orders` — persist an order request
- `POST /api/appointments` — persist an appointment request

## Setup
1. In Supabase, open **SQL Editor** and run `supabase/schema.sql`.
2. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the server environment. Keep the service-role key private; never use it in a `VITE_*` variable or browser code.
3. Install dependencies with `npm install`.
4. Run locally with `npm run dev`; build with `npm run build`; start with `npm start`.

The API returns HTTP 503 when the database is not configured rather than claiming an order was saved when it was not. Validate and test the frontend forms against these endpoint field names before launch.
