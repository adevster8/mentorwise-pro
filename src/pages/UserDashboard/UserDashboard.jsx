// src/pages/UserDashboard/UserDashboard.jsx
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  MessageCircle,
  Target,
  CreditCard,
  Settings,
  Smile,
  HelpCircle,
  LogOut,
  HeartHandshake,
  Pencil,
  FileText,   // ← add this
} from "lucide-react";


export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Smile /> },
    { name: "Projects", path: "/dashboard/projects", icon: <FileText /> },

    { name: "Messages", path: "/dashboard/messages", icon: <MessageCircle /> },
    { name: "Schedule", path: "/dashboard/schedule", icon: <CalendarCheck /> },
    { name: "Goals", path: "/dashboard/goals", icon: <Target /> },
    { name: "Billing", path: "/dashboard/billing", icon: <CreditCard /> },
    { name: "Edit Profile", path: "/dashboard/edit-profile", icon: <Pencil /> },
    { name: "Favorites", path: "/dashboard/favorites", icon: <HeartHandshake /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings /> },
    { name: "Help", path: "/dashboard/help", icon: <HelpCircle /> },
    { name: "Logout", path: "/dashboard/logout", icon: <LogOut /> },
  ];

  const cards = [
    { icon: <CalendarCheck className="text-orange-500 w-6 h-6" />, title: "Upcoming Sessions", value: "Next: Aug 12, 3PM", link: "/dashboard/schedule" },
    { icon: <MessageCircle className="text-orange-500 w-6 h-6" />, title: "New Messages", value: "2 unread chats", link: "/dashboard/messages" },
    { icon: <Target className="text-orange-500 w-6 h-6" />, title: "Mentorship Goals", value: "Create & track goals", link: "/dashboard/goals" },
    { icon: <CreditCard className="text-orange-500 w-6 h-6" />, title: "Billing", value: "$79 due this month", link: "/dashboard/billing" },
    { icon: <HeartHandshake className="text-orange-500 w-6 h-6" />, title: "Favorite Mentors", value: "4 saved", link: "/dashboard/favorites" },
    { icon: <Settings className="text-orange-500 w-6 h-6" />, title: "Account Status", value: "Profile 80% complete", link: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-orange-50 font-manrope">
      {/* Sidebar */}
      <motion.aside
        className="w-72 bg-white border-r border-orange-100 shadow-2xl px-6 py-10 sticky top-0 hidden md:block"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-10 tracking-tight">Your Dashboard</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base font-semibold ${
                location.pathname === link.path
                  ? "bg-orange-100 text-orange-700 shadow-sm"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 px-6 py-10 md:px-12 bg-orange-50">
        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cards.map((card, i) => (
            <motion.button
              key={i}
              className="text-left bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-orange-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(card.link)}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-800 font-semibold text-lg">{card.title}</div>
                {card.icon}
              </div>
              <div className="text-2xl font-bold text-orange-600">{card.value}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Nested routes (Goals, Messages, Schedule, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}
