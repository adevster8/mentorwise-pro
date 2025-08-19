// src/pages/UserDashboard/Billing.jsx
import { motion } from "framer-motion";

function GlassCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-8 mb-10 
                 bg-white/20 backdrop-blur-lg
                 border border-white/30 shadow-lg"
    >
      {children}
    </motion.div>
  );
}

export default function Billing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-100 py-14">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h1
          className="text-4xl font-extrabold text-orange-600 mb-7 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Billing & Payments
        </motion.h1>

        <p className="mb-10 text-lg text-slate-600 text-center">
          Securely manage your payment methods, subscriptions, and billing history all in one place.
        </p>

        <GlassCard delay={0.1}>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Payment Method</h2>
          <p className="text-base text-slate-700 mb-6">
            <span className="font-semibold text-slate-900">Visa **** 4242</span> is currently on file.
          </p>
          <button className="bg-blue-100 hover:bg-blue-200 text-gray-900 font-bold px-6 py-3 rounded-lg text-lg shadow-md transition-all focus:ring-2 focus:ring-orange-500 hover:scale-105">
            Update Payment Method
          </button>
        </GlassCard>

        <GlassCard delay={0.2}>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Subscription Plan</h2>
          <p className="text-base text-slate-700 mb-6">
            You’re subscribed to the <span className="font-bold text-orange-600">MentorWise Pro</span> plan —{" "}
            <span className="font-semibold">$29/month</span>.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg text-lg shadow-md transition-all focus:ring-2 focus:ring-orange-500 hover:scale-105">
            Cancel Subscription
          </button>
        </GlassCard>

        <GlassCard delay={0.3}>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Billing History</h2>
          <ul className="text-base text-slate-800 space-y-1">
            <li>July 1, 2025 — $29.00</li>
            <li>June 1, 2025 — $29.00</li>
            <li>May 1, 2025 — $29.00</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

