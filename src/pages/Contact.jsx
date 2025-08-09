// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // TODO: hook up to your backend/email service (e.g., Firebase/SendGrid)
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-orange-600 mb-3"
        >
          Contact Us
        </motion.h1>
        <p className="text-gray-600 mb-10">
          Questions, feedback, partnership ideas? Drop us a line and we’ll get back within 1–2 business days.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="bg-white/80 backdrop-blur-md border border-orange-100 shadow-xl rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* Honeypot (spam trap) */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                type="text" name="name" placeholder="Alex Morgan" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                type="email" name="email" placeholder="you@domain.com" required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              type="text" name="subject" placeholder="Partnership, Support, Press…" required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 min-h-[140px] outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              name="message" placeholder="Tell us a bit more…" required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              By submitting, you agree to our <a href="/terms" className="underline text-orange-600">Terms</a> and <a href="/privacy" className="underline text-orange-600">Privacy Policy</a>.
            </p>
            <button
              disabled={loading || sent}
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg hover:bg-orange-600 disabled:opacity-60"
            >
              {sent ? "Message Sent ✓" : loading ? "Sending…" : "Send Message"}
            </button>
          </div>
        </motion.form>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-2xl bg-white/70 border border-gray-100 p-4">
            <p className="font-semibold text-gray-900">Support</p>
            <p className="text-gray-600">Mon–Fri, 9am–6pm ET</p>
          </div>
          <div className="rounded-2xl bg-white/70 border border-gray-100 p-4">
            <p className="font-semibold text-gray-900">Email</p>
            <p className="text-gray-600">support@yourdomain.com</p>
          </div>
          <div className="rounded-2xl bg-white/70 border border-gray-100 p-4">
            <p className="font-semibold text-gray-900">Response Time</p>
            <p className="text-gray-600">Usually within 24–48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
