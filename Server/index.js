// server/index.js — Zoom-first server with Stripe + optional Firebase
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const bodyParser = require('body-parser'); // raw body for Stripe webhook only

// ---------------------- Basic Config ----------------------
const PORT = Number(process.env.PORT || 5050);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// ---------------------- App Setup -------------------------
const app = express();

// Minimal request log
app.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} :: ${req.headers.origin || 'no-origin'}`
  );
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// ---------------------- Stripe webhook (MUST be before express.json) ----------------------
let stripe = null;
let STRIPE_WEBHOOK_SECRET = null;

// Initialize Stripe if configured
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || null;
  console.log('✅ Stripe initialized');
} else {
  console.log('ℹ️ Stripe not configured; skipping payments/webhooks');
}

// Webhook route (raw body)
if (stripe) {
  app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      const event = STRIPE_WEBHOOK_SECRET
        ? stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
        : JSON.parse(req.body.toString('utf8')); // dev fallback only

      switch (event.type) {
        case 'payment_intent.succeeded': {
          const pi = event.data.object;
          console.log('✅ payment_intent.succeeded', {
            amount: pi.amount,
            currency: pi.currency,
            metadata: pi.metadata,
          });
          break;
        }
        case 'payment_intent.payment_failed': {
          const pi = event.data.object;
          console.log('❌ payment_intent.payment_failed', pi.last_payment_error?.message);
          break;
        }
        case 'checkout.session.completed': {
          console.log('✅ checkout.session.completed');
          break;
        }
        default:
          // console.log('Unhandled event:', event.type);
          break;
      }

      res.json({ received: true });
    } catch (err) {
      console.error('❌ Stripe webhook error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });
}

// ---------------------- JSON parser (after webhook) ----------------------
app.use(express.json()); // safe for all non-webhook routes

// ---------------------- Health ----------------------
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
    type: 2,
    start_time,
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

// ---------------------- Stripe REST (PaymentIntent + Checkout) ----------------------
if (stripe) {
  // Server-side price catalog (cents)
  const PRICE_CATALOG = {
    'pay-in-full-basic': { amount: 24900, currency: 'usd', description: 'Pay in Full (Basic)' },
    'milestones-starter': { amount: 9900, currency: 'usd', description: 'Milestones Starter (per milestone)' },
    'retainer-standard': { amount: 49900, currency: 'usd', description: 'Monthly Retainer (Standard)' },
    'time-pack-5h': { amount: 39000, currency: 'usd', description: '5-Hour Time Pack' },
  };

  // Create PaymentIntent for Payment Element
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { planKey, quantity = 1, customerEmail, metadata = {} } = req.body || {};
      const plan = PRICE_CATALOG[planKey];
      if (!plan) return res.status(400).json({ error: 'Invalid planKey' });

      const amount = plan.amount * Number(quantity || 1);
      const pi = await stripe.paymentIntents.create({
        amount,
        currency: plan.currency,
        automatic_payment_methods: { enabled: true },
        receipt_email: customerEmail || undefined,
        description: plan.description,
        metadata: { planKey, quantity, ...metadata },
      });

      res.json({ clientSecret: pi.client_secret });
    } catch (err) {
      console.error('❌ Create PI error:', err);
      res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
  });

  // Minimal Checkout Session (optional)
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

// ---------------------- Optional: Firebase Admin ----------------------
let admin = null;
let db = null;
let bucket = null;

try {
  admin = require('firebase-admin');

  if (!admin.apps.length) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp({
        credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
      });
      console.log('✅ Firebase Admin initialized via service account JSON');
    } else if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
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

// ---------------------- Errors & Boot ----------------------
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error', detail: err?.message || 'unknown' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`   CORS origin: ${FRONTEND_ORIGIN}`);
});