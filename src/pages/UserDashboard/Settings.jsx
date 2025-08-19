// src/pages/UserDashboard/Settings.jsx
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  CalendarClock,
  CreditCard,
  Shield,
  Eye,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Profile",
      desc: "Name, photo, bio, and basic details.",
      to: "/dashboard/edit-profile",
      icon: <User className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Edit Profile", to: "/dashboard/edit-profile" }],
    },
    {
      title: "Account & Security",
      desc: "Email, password, and login devices.",
      to: "/dashboard/settings/account",
      icon: <Lock className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Manage", to: "/dashboard/settings/account" }],
    },
    {
      title: "Notifications",
      desc: "Session reminders and message alerts.",
      to: "/dashboard/settings/notifications",
      icon: <Bell className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Edit", to: "/dashboard/settings/notifications" }],
    },
    {
      title: "Scheduling",
      desc: "Default timezone and calendar sync.",
      to: "/dashboard/schedule",
      icon: <CalendarClock className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Open Schedule", to: "/dashboard/schedule" }],
    },
    {
      title: "Billing & Payments",
      desc: "Cards on file, invoices, and receipts.",
      to: "/dashboard/billing",
      icon: <CreditCard className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Go to Billing", to: "/dashboard/billing" }],
    },
    {
      title: "Privacy",
      desc: "Profile visibility and data download.",
      to: "/dashboard/settings/privacy",
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      actions: [{ label: "Configure", to: "/dashboard/settings/privacy" }],
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 font-manrope">
      <div className="px-6 py-8 md:px-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Account Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Update your profile, security, notifications, and billing in one place.
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
              {/* Card is a div (not Link) to avoid nested anchors */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(c.to)}
                onKeyDown={(e) => (e.key === "Enter" ? navigate(c.to) : null)}
                className="block rounded-2xl bg-white/80 backdrop-blur border border-orange-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                      onClick={(e) => e.stopPropagation()} // prevent parent click
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Safety / Danger zone */}
        <div className="mt-10">
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-red-100 p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-red-500 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 mb-1">Privacy & Safety</div>
                <p className="text-sm text-slate-600">
                  Download your data, control visibility, or close your account.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/dashboard/settings/privacy"
                    className="rounded-lg border border-orange-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-white transition"
                  >
                    Privacy Options
                  </Link>
                  <Link
                    to="/dashboard/settings/account"
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
