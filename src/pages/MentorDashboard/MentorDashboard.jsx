import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import {
  LayoutDashboard, MessageCircle, CalendarCheck, ClipboardList, DollarSign,
  Star, Settings, HelpCircle, FileText, PlusCircle,
} from "lucide-react";

// --- Data Constants (for performance) ---
// FIX: Restored the missing "Create Project" and "Reviews" links.
const sidebarLinks = [
  { name: "Dashboard", path: "/mentor-dashboard", icon: LayoutDashboard },
  { name: "Messages", path: "/mentor-dashboard/messages", icon: MessageCircle },
  { name: "Bookings", path: "/mentor-dashboard/bookings", icon: CalendarCheck },
  { name: "Requests", path: "/mentor-dashboard/requests", icon: ClipboardList },
  { name: "Projects", path: "/mentor-dashboard/projects", icon: FileText },
  { name: "Create Project", path: "/mentor-dashboard/projects/create", icon: PlusCircle },
  { name: "Availability", path: "/mentor-dashboard/availability", icon: CalendarCheck },
  { name: "Earnings", path: "/mentor-dashboard/earnings", icon: DollarSign },
  { name: "Reviews", path: "/mentor-dashboard/reviews", icon: Star },
  { name: "Settings", path: "/mentor-dashboard/settings", icon: Settings },
  { name: "Help", path: "/mentor-dashboard/help", icon: HelpCircle },
];

const dashboardCards = [
    { title: "New Messages", value: "2 unread", to: "/mentor-dashboard/messages", icon: MessageCircle, desc: "Reply faster to win more clients." },
    { title: "Upcoming Bookings", value: "Next: Tue 3:00 PM", to: "/mentor-dashboard/bookings", icon: CalendarCheck, desc: "See your schedule and Zoom links." },
    { title: "Open Requests", value: "3 waiting", to: "/mentor-dashboard/requests", icon: ClipboardList, desc: "Review new client plans to accept." },
    { title: "Create Project", value: "Start a New Plan", to: "/mentor-dashboard/projects/create", icon: PlusCircle, desc: "Build a new offer for a client." },
    { title: "Manage Projects", value: "View All", to: "/mentor-dashboard/projects", icon: FileText, desc: "Track scopes, budgets, and milestones." },
    { title: "Earnings (Month)", value: "$1,240", to: "/mentor-dashboard/earnings", icon: DollarSign, desc: "Track payouts and fees." },
];

// --- Subcomponents for Readability ---

const Sidebar = React.memo(() => {
    const location = useLocation();
    const isActive = (p) => location.pathname === p || location.pathname.startsWith(`${p}/`);

    return (
        <motion.aside
            className="w-72 bg-white/80 backdrop-blur-sm border-r border-orange-100 shadow-lg px-6 py-10 sticky top-0 h-screen hidden md:flex flex-col"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-2xl font-bold text-orange-600 mb-10 tracking-tight">
                Mentor Dashboard
            </h2>
            <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-base font-semibold ${
                            isActive(link.path)
                                ? "bg-orange-100 text-orange-700"
                                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                        aria-current={isActive(link.path) ? "page" : undefined}
                    >
                        <link.icon size={20} />
                        {link.name}
                    </Link>
                ))}
            </nav>
        </motion.aside>
    );
});

const DashboardHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Welcome back, Coach
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Manage requests, projects, bookings, and earnings — all in one place.
                    </p>
                </div>
                <Link
                    to="/mentor-dashboard/projects/create"
                    className="hidden md:inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 font-bold text-white shadow-sm hover:bg-orange-700 transition"
                >
                    <PlusCircle className="w-5 h-5" />
                    Create Project
                </Link>
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
                {dashboardCards.map((card) => (
                    <motion.div
                        key={card.title}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <Link
                            to={card.to}
                            className="block rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100/80 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-slate-900 font-semibold text-lg">{card.title}</div>
                                <card.icon className="w-6 h-6 text-orange-500 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="text-3xl font-extrabold text-slate-800">{card.value}</div>
                            <div className="text-sm text-slate-600 mt-2">{card.desc}</div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}

// --- Main Layout Component ---
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

  useEffect(() => {
    if (!checking && !uid) navigate("/signin");
  }, [checking, uid, navigate]);

  const isDashboardRoot = location.pathname === "/mentor-dashboard" || location.pathname === "/mentor-dashboard/";

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-orange-50">
        <div className="text-slate-700">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-blue-50 to-white font-manrope">
      <Sidebar />
      <main className="flex-1 px-6 py-10 md:px-12">
        {isDashboardRoot ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
}