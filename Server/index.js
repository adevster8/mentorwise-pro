// Server/index.js  — clean, safe, and Zoom-first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser'); // for Stripe webhooks only

// ---------------------- Basic Config ----------------------
const PORT = process.env.PORT || 5050;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// ---------------------- App Setup -------------------------
const app = express();

// Minimal request logger (helps debug CORS/URLs)
app.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} origin=${req.headers.origin || 'n/a'}`
  );
  next();
});

// CORS and JSON parsing (webhook route will mount its own raw parser below)
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// Health + ping
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/api/ping', (_req, res) => res.json({ ok: true, at: Date.now() }));

// ---------------------- Zoom (Server-to-Server OAuth) ----------------------
async function getZoomAccessToken() {
  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    throw new Error('Zoom env vars missing (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET)');
  }

  const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
  const authHeader =
    'Basic ' + Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

  const { data } = await axios.post(url, {}, { headers: { Authorization: authHeader } });
  return data.access_token; // bearer
}

async function createZoomMeeting({ topic, start_time, duration = 60 }) {
  const accessToken = await getZoomAccessToken();
  const payload = {
    topic: topic || 'MentorWise Session',
    type: 2, // scheduled
    start_time, // ISO8601, e.g., new Date(Date.now() + 3600_000).toISOString()
    duration,
    settings: { join_before_host: false, waiting_room: true },
  };

  const { data } = await axios.post('https://api.zoom.us/v2/users/me/meetings', payload, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  });

  return { join_url: data.join_url, start_url: data.start_url };
}

// Convenience endpoint (used by your frontend button)
app.post('/api/create-meeting', async (req, res) => {
  try {
    const topic = (req.body && req.body.topic) || 'MentorWise Session';
    const start_time = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h from now
    const { join_url, start_url } = await createZoomMeeting({ topic, start_time, duration: 60 });
    res.json({ join_url, start_url });
  } catch (err) {
    const msg = err.response?.data || err.message || 'Unknown Zoom error';
    console.error('❌ Zoom meeting creation failed:', msg);
    res.status(500).json({ error: 'Failed to create Zoom meeting', detail: msg });
  }
});

// ---------------------- Optional: Stripe + Firestore ----------------------
let stripe = null;
let STRIPE_WEBHOOK_SECRET = null;
let db = null;

(async function setupOptionalDeps() {
  // Stripe (optional)
  if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe');
    stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || null;
    console.log('✅ Stripe initialized');
  } else {
    console.log('ℹ️ Stripe not configured — skipping payments/webhooks');
  }

  // Firebase Admin (optional)
  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp(); // reads from GOOGLE_APPLICATION_CREDENTIALS path
        console.log('✅ Firebase Admin initialized via GOOGLE_APPLICATION_CREDENTIALS');
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
        });
        console.log('✅ Firebase Admin initialized via inline credentials');
      } else {
        console.log('ℹ️ Firebase Admin not configured — skipping Firestore features');
      }
    }
    if (admin.apps.length) {
      db = admin.firestore();
    }
  } catch (e) {
    console.log('ℹ️ Firebase Admin not installed or not configured — skipping');
  }

  // If Stripe is configured, mount webhook + (optionally) checkout route
  if (stripe) {
    // Webhook (raw body)
    app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), (req, res) => {
      let event;
      try {
        const sig = req.headers['stripe-signature'];
        if (!STRIPE_WEBHOOK_SECRET) {
          console.warn('⚠️ STRIPE_WEBHOOK_SECRET missing; accepting event without verification');
          event = JSON.parse(req.body.toString('utf8'));
        } else {
          event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
        }
      } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle events as needed (kept minimal here)
      try {
        if (event.type === 'checkout.session.completed') {
          console.log('✅ checkout.session.completed received');
          // You can expand this section if you want to auto-create Zoom, update Firestore, etc.
        }
        res.json({ received: true });
      } catch (err) {
        console.error('❌ Webhook handler error:', err);
        res.status(500).send('Webhook handler error');
      }
    });

    // Optional minimal checkout endpoint (only if you need it)
    app.post('/api/checkout', async (req, res) => {
      try {
        const { mentorId = 'mentor', menteeId = 'mentee', slotId = 'slot', rateCents = 1000, currency = 'usd' } =
          req.body || {};
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
        console.error('checkout error', err);
        res.status(500).json({ error: 'Internal error' });
      }
    });
  }
})();

// ---------------------- Error Handler ----------------------
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error', detail: err?.message || 'unknown' });
});

// ---------------------- Start Server -----------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
