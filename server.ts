import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json({ limit: '32kb' }));

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;
const clean = (value: unknown, max = 500): string | null =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null;

app.get('/api/health', (_req, res) => res.json({
  status: 'ok', service: 'NIBOCS Shoes API', timestamp: new Date().toISOString(),
  databaseConfigured: Boolean(supabase),
}));
app.get('/api/backend/status', (_req, res) => res.json({
  service: 'NIBOCS Shoes API', database: supabase ? 'Supabase configured' : 'Not configured', version: '1.1.0',
}));

app.post('/api/orders', async (req, res) => {
  const body = req.body ?? {};
  const full_name = clean(body.fullName, 120);
  const phone = clean(body.phone, 40);
  const product_name = clean(body.productName, 160);
  const size = clean(String(body.size ?? ''), 30);
  if (!full_name || !phone || !product_name || !size)
    return res.status(400).json({ error: 'fullName, phone, productName and size are required.' });
  if (!supabase)
    return res.status(503).json({ error: 'Order storage is not configured. Configure server-side Supabase credentials.' });
  const { data, error } = await supabase.from('orders').insert({
    full_name, phone, product_name, size,
    delivery_location: clean(body.deliveryLocation, 300),
    leather_type: clean(body.leatherType, 100),
    custom_notes: clean(body.customNotes, 2000),
    status: 'received',
  }).select('id, status, created_at').single();
  if (error) {
    console.error('Order insert failed:', error.message);
    return res.status(500).json({ error: 'Could not save your order. Please try again later.' });
  }
  return res.status(201).json({ success: true, order: data, message: 'Your order request has been received.' });
});

app.post('/api/appointments', async (req, res) => {
  const body = req.body ?? {};
  const full_name = clean(body.fullName, 120);
  const phone = clean(body.phone, 40);
  const date = clean(body.date, 30);
  const purpose = clean(body.purpose, 300);
  if (!full_name || !phone || !date || !purpose)
    return res.status(400).json({ error: 'fullName, phone, date and purpose are required.' });
  if (!supabase)
    return res.status(503).json({ error: 'Appointment storage is not configured. Configure server-side Supabase credentials.' });
  const { data, error } = await supabase.from('appointments').insert({
    full_name, phone, appointment_date: date, purpose,
    time_slot: clean(body.timeSlot, 80), notes: clean(body.notes, 2000), status: 'scheduled',
  }).select('id, status, created_at').single();
  if (error) {
    console.error('Appointment insert failed:', error.message);
    return res.status(500).json({ error: 'Could not save your appointment. Please try again later.' });
  }
  return res.status(201).json({ success: true, appointment: data, message: 'Your appointment request has been received.' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true, hmr: false }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.resolve(distPath, 'index.html')));
  }
  app.listen(PORT, '0.0.0.0', () => console.log(`NIBOCS Shoes server listening on ${PORT}`));
}
startServer().catch((error) => { console.error('Failed to start server:', error); process.exit(1); });
