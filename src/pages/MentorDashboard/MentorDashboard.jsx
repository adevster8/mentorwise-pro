import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaCalendarCheck,
  FaClock,
  FaDollarSign,
  FaStar,
  FaUserEdit,
  FaCogs,
  FaQuestionCircle,
} from "react-icons/fa";

export default function MentorDashboard() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/mentor-dashboard", icon: <FaChalkboardTeacher /> },
    { name: "Messages", path: "/mentor-dashboard/messages", icon: <FaEnvelope /> },
    { name: "Requests", path: "/mentor-dashboard/requests", icon: <FaCalendarCheck /> },
    { name: "Availability", path: "/mentor-dashboard/availability", icon: <FaClock /> },
    { name: "Earnings", path: "/mentor-dashboard/earnings", icon: <FaDollarSign /> },
    { name: "Reviews", path: "/mentor-dashboard/reviews", icon: <FaStar /> },
    { name: "Edit Profile", path: "/mentor-dashboard/edit-profile", icon: <FaUserEdit /> },
    { name: "Settings", path: "/mentor-dashboard/settings", icon: <FaCogs /> },
    { name: "Help", path: "/mentor-dashboard/help", icon: <FaQuestionCircle /> },
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
        <h2 className="text-2xl font-bold text-orange-600 mb-10 tracking-tight">Mentor Dashboard</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base font-semibold
                ${
                  location.pathname === link.path
                    ? "bg-orange-100 text-orange-700 shadow-sm"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }
              `}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 md:px-12 bg-orange-50">
        {location.pathname === "/mentor-dashboard" ? (
          <>
            <h1 className="text-3xl font-bold text-orange-600 mb-6">Welcome Back, Mentor 👋</h1>
            <p className="text-gray-700 mb-10 text-lg">
              Here’s a quick overview of your coaching activity. Stay on top of your sessions, requests, earnings, and more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <DashboardCard title="New Requests" icon={<FaCalendarCheck />} value="3 pending" />
              <DashboardCard title="Upcoming Sessions" icon={<FaClock />} value="2 today" />
              <DashboardCard title="Unread Messages" icon={<FaEnvelope />} value="5 new" />
              <DashboardCard title="This Month's Earnings" icon={<FaDollarSign />} value="$1,240" />
              <DashboardCard title="Your Average Rating" icon={<FaStar />} value="4.9 ★" />
              <DashboardCard title="Profile Completion" icon={<FaUserEdit />} value="95%" />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

// Simple polished card component
function DashboardCard({ title, icon, value }) {
  return (
    <motion.div
      className="bg-white border border-orange-100 rounded-2xl shadow-md p-6 flex items-center gap-5 hover:shadow-xl transition"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-3xl text-orange-500">{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}
