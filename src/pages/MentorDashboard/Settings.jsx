// src/pages/MentorDashboard/Settings.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Lock,
  Bell,
  CalendarClock,
  CreditCard,
  Eye,
  Plug,
  Shield,
} from "lucide-react";

export default function Settings() {
  const cards = [
    {
      title: "Account & Security",
      desc: "Change password, enable 2FA, manage login devices.",
      to: "/mentor-dashboard/settings/account",
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Manage", to: "/mentor-dashboard/settings/account" }],
    },
    {
      title: "Notifications",
      desc: "Email + push preferences for messages and bookings.",
      to: "/mentor-dashboard/settings/notifications",
      icon: <Bell className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Edit", to: "/mentor-dashboard/settings/notifications" }],
    },
    {
      title: "Availability Defaults",
      desc: "Set weekly hours and reschedule/cancellation rules.",
      to: "/mentor-dashboard/availability",
      icon: <CalendarClock className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Set Hours", to: "/mentor-dashboard/availability" }],
    },
    {
      title: "Payments & Payouts",
      desc: "Connect Stripe, set currency, review fees and taxes.",
      to: "/mentor-dashboard/earnings",
      icon: <CreditCard className="w-6 h-6 text-orange-500" />,
      actions: [
        { label: "View Earnings", to: "/mentor-dashboard/earnings" },
        { label: "Connect Stripe", to: "/mentor-dashboard/settings/payouts" },
      ],
    },
    {
      title: "Profile Visibility",
      desc: "Toggle profile discoverability and search settings.",
      to: "/mentor-dashboard/settings/visibility",
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Configure", to: "/mentor-dashboard/settings/visibility" }],
    },
    {
      title: "Connected Apps",
      desc: "Zoom, Google Calendar, and other integrations.",
      to: "/mentor-dashboard/settings/integrations",
      icon: <Plug className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Manage", to: "/mentor-dashboard/settings/integrations" }],
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 font-manrope">
      <div className="px-6 py-8 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Mentor Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Manage your account preferences, notifications, availability, and privacy options.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link
                to={c.to}
                className="block rounded-2xl bg-white/80 backdrop-blur border border-orange-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-slate-900 font-semibold text-lg">{c.title}</div>
                  {c.icon}
                </div>
                <p className="text-sm text-slate-600 mb-4">{c.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {c.actions.map((a) => (
                    <Link
                      key={a.label}
                      to={a.to}
                      className="inline-flex items-center rounded-lg border border-orange-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-white hover:shadow transition"
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Danger zone / extra */}
        <div className="mt-10">
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-red-100 p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-red-500 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 mb-1">Privacy & Safety</div>
                <p className="text-sm text-slate-600">
                  Export your data, disable public profile, or close your account.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/mentor-dashboard/settings/visibility"
                    className="rounded-lg border border-orange-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-white transition"
                  >
                    Visibility Options
                  </Link>
                  <Link
                    to="/mentor-dashboard/settings/account"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
                  >
                    Close Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
