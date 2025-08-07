// src/pages/UserDashboard/Billing.jsx
import { motion } from "framer-motion";

export default function Billing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-100 py-14">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h1
          className="text-4xl font-extrabold text-orange-600 mb-7 text-center font-manrope"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Billing & Payments
        </motion.h1>
        <p className="mb-10 text-lg text-slate-600 text-center font-lato">
          Securely manage your payment methods, subscriptions, and billing history all in one place.
        </p>

        {/* Payment Methods */}
        <motion.div
          className="bg-white/90 shadow-xl rounded-3xl p-8 mb-10 border-t-4 border-orange-100"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.10 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-2 font-manrope">Payment Method</h2>
          <p className="text-base text-slate-600 mb-6">
            <span className="font-semibold text-slate-900">Visa **** 4242</span> is currently on file.
          </p>
          <button className="bg-blue-100 hover:bg-blue-200 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg font-lato shadow-md transition-all focus:ring-2 focus:ring-orange-500 hover:scale-105">
            Update Payment Method
          </button>
        </motion.div>

        {/* Subscription Plan */}
        <motion.div
          className="bg-white/90 shadow-xl rounded-3xl p-8 mb-10 border-t-4 border-blue-100"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-2 font-manrope">Subscription Plan</h2>
          <p className="text-base text-slate-600 mb-6">
            You’re subscribed to the <span className="font-bold text-orange-600">MentorWise Pro</span> plan — <span className="font-semibold">$29/month</span>.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg text-lg font-lato shadow-md transition-all focus:ring-2 focus:ring-orange-500 hover:scale-105">
            Cancel Subscription
          </button>
        </motion.div>

        {/* Billing History */}
        <motion.div
          className="bg-white/90 shadow-xl rounded-3xl p-8 border-t-4 border-blue-50"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-2 font-manrope">Billing History</h2>
          <ul className="text-base text-slate-700 font-mono space-y-1">
            <li>July 1, 2025 — $29.00</li>
            <li>June 1, 2025 — $29.00</li>
            <li>May 1, 2025 — $29.00</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
