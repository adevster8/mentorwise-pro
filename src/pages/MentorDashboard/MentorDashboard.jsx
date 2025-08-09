// src/pages/MentorDashboard/MentorDashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageCircle,
  CalendarCheck,
  ClipboardList,
  DollarSign,
  Star,
  Settings,
  HelpCircle,
  FileText, // ✅ for Projects
} from "lucide-react";

export default function MentorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUid(u?.uid || null);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  // gate the page if logged out
  useEffect(() => {
    if (!checking && !uid) navigate("/signin");
  }, [checking, uid, navigate]);

  const links = useMemo(
    () => [
      { name: "Dashboard", path: "/mentor-dashboard", icon: <LayoutDashboard /> },
      { name: "Messages", path: "/mentor-dashboard/messages", icon: <MessageCircle /> },
      { name: "Bookings", path: "/mentor-dashboard/bookings", icon: <CalendarCheck /> },
      { name: "Requests", path: "/mentor-dashboard/requests", icon: <ClipboardList /> },
      { name: "Projects", path: "/mentor-dashboard/projects", icon: <FileText /> }, // ✅ NEW
      { name: "Availability", path: "/mentor-dashboard/availability", icon: <CalendarCheck /> },
      { name: "Earnings", path: "/mentor-dashboard/earnings", icon: <DollarSign /> },
      { name: "Reviews", path: "/mentor-dashboard/reviews", icon: <Star /> },
      { name: "Settings", path: "/mentor-dashboard/settings", icon: <Settings /> },
      { name: "Help", path: "/mentor-dashboard/help", icon: <HelpCircle /> },
    ],
    []
  );

  // active state should match nested paths too (e.g., /mentor-dashboard/messages/123)
  const isActive = (p) =>
    location.pathname === p || location.pathname.startsWith(p + "/");

  const onRoot = location.pathname === "/mentor-dashboard";

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-orange-50">
        <div className="text-slate-700">Loading dashboard…</div>
      </div>
    );
  }

  // Cards shown on the base dashboard page
  const cards = [
    {
      title: "New Messages",
      value: "2 unread",
      to: "/mentor-dashboard/messages",
      icon: <MessageCircle className="w-6 h-6 text-orange-500" />,
      desc: "Reply faster to win more clients.",
    },
    {
      title: "Upcoming Bookings",
      value: "Next: Tue 3:00 PM",
      to: "/mentor-dashboard/bookings",
      icon: <CalendarCheck className="w-6 h-6 text-orange-500" />,
      desc: "See your schedule and Zoom links.",
    },
    {
      title: "Open Requests",
      value: "3 waiting",
      to: "/mentor-dashboard/requests",
      icon: <ClipboardList className="w-6 h-6 text-orange-500" />,
      desc: "Review new client plans to accept.",
    },
    {
      title: "Projects",
      value: "Create & manage",
      to: "/mentor-dashboard/projects", // ✅ NEW quick link
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      desc: "Scopes, budgets, milestones.",
    },
    {
      title: "Earnings (Month)",
      value: "$1,240",
      to: "/mentor-dashboard/earnings",
      icon: <DollarSign className="w-6 h-6 text-orange-500" />,
      desc: "Track payouts and fees.",
    },
    {
      title: "Availability",
      value: "Set hours",
      to: "/mentor-dashboard/availability",
      icon: <CalendarCheck className="w-6 h-6 text-orange-500" />,
      desc: "Offer recurring weekly slots.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-orange-50 font-manrope">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-orange-100 shadow-2xl px-6 py-10 sticky top-0 hidden md:block">
        <h2 className="text-2xl font-bold text-orange-600 mb-10 tracking-tight">
          Mentor Dashboard
        </h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base font-semibold
                ${
                  isActive(link.path)
                    ? "bg-orange-100 text-orange-700 shadow-sm"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-10 md:px-12 bg-orange-50">
        {onRoot && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Welcome back, Coach
              </h1>
              <p className="text-slate-600 mt-2">
                Manage requests, projects, bookings, and earnings — all in one place.
              </p>
            </div>

            {/* Cards grid */}
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
                    <div className="text-2xl font-extrabold text-orange-600">{c.value}</div>
                    <div className="text-sm text-slate-600 mt-2">{c.desc}</div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick links row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Edit Profile", to: "/mentor-dashboard/edit-profile" },
                { label: "Settings", to: "/mentor-dashboard/settings" },
                { label: "Create an Offer", to: "/mentor-dashboard/requests" },
                { label: "Help Center", to: "/mentor-dashboard/help" },
              ].map((q) => (
                <Link
                  key={q.label}
                  to={q.to}
                  className="rounded-xl border border-orange-100 bg-white/80 backdrop-blur px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-white hover:shadow transition"
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Nested routes render here (Messages, Projects, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}
