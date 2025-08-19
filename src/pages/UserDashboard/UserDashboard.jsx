import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, // Using a more standard icon for the main dashboard link
  MessageCircle,
  CalendarCheck,
  CalendarClock,
  Target,
  CreditCard,
  Settings,
  Heart, // Using Heart for Favorites
  HelpCircle,
  LogOut,
  Pencil,
  FileText,
} from "lucide-react";

// --- Data Constants (for performance) ---
// Defining these outside the component prevents them from being re-created on every render.
const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/dashboard/projects", icon: FileText },
    { name: "Messages", path: "/dashboard/messages", icon: MessageCircle },
    { name: "Schedule", path: "/dashboard/schedule", icon: CalendarCheck },
    { name: "Bookings", path: "/dashboard/bookings", icon: CalendarClock },
    { name: "Goals", path: "/dashboard/goals", icon: Target },
    { name: "Billing", path: "/dashboard/billing", icon: CreditCard },
    { name: "Edit Profile", path: "/dashboard/edit-profile", icon: Pencil },
    { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
    { name: "Help", path: "/dashboard/help", icon: HelpCircle },
    { name: "Logout", path: "/dashboard/logout", icon: LogOut },
];

const dashboardCards = [
    { icon: CalendarCheck, title: "Upcoming Sessions", value: "Next: Aug 12, 3PM", link: "/dashboard/schedule" },
    { icon: CalendarClock, title: "Your Bookings", value: "View and manage", link: "/dashboard/bookings" },
    { icon: MessageCircle, title: "New Messages", value: "2 unread chats", link: "/dashboard/messages" },
    { icon: Target, title: "Mentorship Goals", value: "Create & track goals", link: "/dashboard/goals" },
    { icon: CreditCard, title: "Billing", value: "$79 due this month", link: "/dashboard/billing" },
    { icon: Heart, title: "Favorite Mentors", value: "4 saved", link: "/dashboard/favorites" },
    { icon: Settings, title: "Account Status", value: "Profile 80% complete", link: "/dashboard/settings" },
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
                Your Dashboard
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
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07 } },
                }}
            >
                {dashboardCards.map((card) => (
                    <motion.div
                        key={card.title}
                        className="text-left bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100/80 cursor-pointer group hover:-translate-y-1"
                        onClick={() => navigate(card.link)}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-slate-800 font-semibold text-lg">{card.title}</div>
                            <card.icon className="text-orange-500 w-6 h-6 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900">{card.value}</div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}

// --- Main Layout Component ---
export default function UserDashboard() {
  const location = useLocation();
  // Check if the current path is the root dashboard path
  const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-blue-50 to-white font-manrope">
      <Sidebar />
      <main className="flex-1 px-6 py-10 md:px-12">
        {/* Render the dashboard cards only on the root dashboard page */}
        {isDashboardRoot ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
}
