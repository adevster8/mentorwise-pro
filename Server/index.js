// Server/index.js — clean, Zoom-first, optional Stripe/Firebase
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const bodyParser = require('body-parser'); // only for Stripe webhooks

// ---------------------- Basic Config ----------------------
const PORT = Number(process.env.PORT || 5050);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// ---------------------- App Setup -------------------------
const app = express();

// Minimal request log (helps with CORS/debug)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} :: ${req.headers.origin || 'no-origin'}`);
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false })); // safe defaults
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json()); // all JSON routes except Stripe webhook

// Health
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/api/ping', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// ---------------------- Zoom (Server-to-Server OAuth) ----------------------
async function getZoomAccessToken() {
  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error('Missing Zoom env: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET');
  }
  const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
  const authHeader = 'Basic ' + Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
  const { data } = await axios.post(url, {}, { headers: { Authorization: authHeader } });
  return data.access_token;
}

async function createZoomMeeting({ topic = 'MentorWise Session', start_time, duration = 60 }) {
  const accessToken = await getZoomAccessToken();
  const payload = {
    topic,
    type: 2, // scheduled
    start_time, // ISO8601
    duration,
    settings: { join_before_host: false, waiting_room: true },
  };
  const { data } = await axios.post('https://api.zoom.us/v2/users/me/meetings', payload, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  });
  return { join_url: data.join_url, start_url: data.start_url, id: data.id };
}

app.post('/api/create-meeting', async (req, res) => {
  try {
    const { topic = 'MentorWise Session', start_time } = req.body || {};
    const iso = start_time || new Date(Date.now() + 60 * 60 * 1000).toISOString(); // +1h default
    const meeting = await createZoomMeeting({ topic, start_time: iso, duration: 60 });
    res.json(meeting);
  } catch (err) {
    const detail = err.response?.data || err.message || 'Unknown Zoom error';
    console.error('❌ Zoom create-meeting failed:', detail);
    res.status(500).json({ error: 'Failed to create Zoom meeting', detail });
  }
});

// ---------------------- Optional: Stripe + Firebase Admin ----------------------
let stripe = null;
let STRIPE_WEBHOOK_SECRET = null;
let admin = null;
let db = null;
let bucket = null;

(async () => {
  // Stripe (optional)
  if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || null;
    console.log('✅ Stripe initialized');
  } else {
    console.log('ℹ️ Stripe not configured; skipping payments/webhooks');
  }

  // Firebase Admin (optional)
  try {
    admin = require('firebase-admin');

    if (!admin.apps.length) {
      // Prefer GOOGLE_APPLICATION_CREDENTIALS pointing to JSON file
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp({
          credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined, // e.g. your-project-id.appspot.com
        });
        console.log('✅ Firebase Admin initialized via service account JSON');
      } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
        });
        console.log('✅ Firebase Admin initialized via inline credentials');
      } else {
        console.log('ℹ️ Firebase Admin not configured; skipping Firestore/Storage');
      }
    }

    if (admin?.apps?.length) {
      db = admin.firestore();
      try {
        bucket = admin.storage().bucket();
      } catch (_) {}
    }
  } catch {
    console.log('ℹ️ firebase-admin not installed; skipping Firestore/Storage');
  }

  // Stripe webhook (only if Stripe enabled)
  if (stripe) {
    app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), (req, res) => {
      try {
        const sig = req.headers['stripe-signature'];
        const event = STRIPE_WEBHOOK_SECRET
          ? stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
          : JSON.parse(req.body.toString('utf8')); // DEV fallback (unsafe for prod)
        if (event.type === 'checkout.session.completed') {
          console.log('✅ Stripe: checkout.session.completed');
          // TODO: write to Firestore, schedule Zoom, etc.
        }
        res.json({ received: true });
      } catch (err) {
        console.error('❌ Stripe webhook error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    });

    // Minimal checkout route (optional)
    app.post('/api/checkout', async (req, res) => {
      try {
        const {
          mentorId = 'mentor',
          menteeId = 'mentee',
          slotId = 'slot',
          rateCents = 1000,
          currency = 'usd',
        } = req.body || {};

        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: [
            {
              price_data: {
                currency,
                product_data: { name: `1:1 Session with ${mentorId}` },
                unit_amount: rateCents,
              },
              quantity: 1,
            },
          ],
          metadata: { mentorId, menteeId, slotId },
          success_url: `${FRONTEND_ORIGIN}/booking-confirmation`,
          cancel_url: `${FRONTEND_ORIGIN}/`,
        });

        res.json({ url: session.url });
      } catch (err) {
        console.error('❌ /api/checkout error:', err);
        res.status(500).json({ error: 'Checkout failed' });
      }
    });
  }
})();

// ---------------------- Errors & Boot ----------------------
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error', detail: err?.message || 'unknown' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`   CORS origin: ${FRONTEND_ORIGIN}`);
});
