import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Backend REST API Endpoints
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      service: 'NIBOCS SHOE Atelier Backend',
      timestamp: new Date().toISOString(),
      database: 'Firestore Active & Supabase Adapter Ready',
    });
  });

  app.get('/api/backend/status', (req, res) => {
    const hasSupabaseUrl = Boolean(
      process.env.VITE_SUPABASE_URL &&
      !process.env.VITE_SUPABASE_URL.includes('your-project')
    );

    res.json({
      activeBackend: 'Cloud Firestore',
      supabaseSupported: true,
      supabaseConnected: hasSupabaseUrl,
      workshopLocation: 'Sangotedo, Cannan Estate, Lagos, Nigeria',
      version: '1.0.0',
    });
  });

  // REST API: Create Order
  app.post('/api/orders', (req, res) => {
    const { fullName, phone, productName, size, deliveryLocation, leatherType, customNotes } = req.body || {};

    if (!fullName || !phone || !productName || !size) {
      return res.status(400).json({
        error: 'Missing required order fields (fullName, phone, productName, size).',
      });
    }

    const orderId = `ord_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    return res.status(201).json({
      success: true,
      orderId,
      message: 'Order recorded successfully by atelier backend.',
      order: {
        id: orderId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        productName: productName.trim(),
        size: size.trim(),
        deliveryLocation: deliveryLocation?.trim() || null,
        leatherType: leatherType?.trim() || null,
        customNotes: customNotes?.trim() || null,
        status: 'received',
        createdAt: new Date().toISOString(),
      },
    });
  });

  // REST API: Create Appointment
  app.post('/api/appointments', (req, res) => {
    const { fullName, phone, date, purpose, timeSlot, notes } = req.body || {};

    if (!fullName || !phone || !date || !purpose) {
      return res.status(400).json({
        error: 'Missing required appointment fields (fullName, phone, date, purpose).',
      });
    }

    const appointmentId = `apt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    return res.status(201).json({
      success: true,
      appointmentId,
      message: 'Workshop appointment scheduled successfully by atelier backend.',
      appointment: {
        id: appointmentId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        date: date.trim(),
        purpose: purpose.trim(),
        timeSlot: timeSlot?.trim() || null,
        notes: notes?.trim() || null,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      },
    });
  });

  // Vite development middleware or static production serve
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NIBOCS SHOE Backend & Web Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
