// src/pages/MentorDashboard/MentorDashboard.jsx
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  LayoutDashboard,
  MessageCircle,
  CalendarCheck,
  ClipboardList,
  DollarSign,
  Star,
  Settings,
  HelpCircle,
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

  const links = [
    { name: "Dashboard", path: "/mentor-dashboard", icon: <LayoutDashboard /> },
    { name: "Messages", path: "/mentor-dashboard/messages", icon: <MessageCircle /> },
    { name: "Bookings", path: "/mentor-dashboard/bookings", icon: <CalendarCheck /> },
    { name: "Requests", path: "/mentor-dashboard/requests", icon: <ClipboardList /> },
    { name: "Availability", path: "/mentor-dashboard/availability", icon: <CalendarCheck /> },
    { name: "Earnings", path: "/mentor-dashboard/earnings", icon: <DollarSign /> },
    { name: "Reviews", path: "/mentor-dashboard/reviews", icon: <Star /> },
    { name: "Settings", path: "/mentor-dashboard/settings", icon: <Settings /> },
    { name: "Help", path: "/mentor-dashboard/help", icon: <HelpCircle /> },
  ];

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-orange-50">
        <div className="text-slate-700">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-orange-50 font-manrope">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-orange-100 shadow-2xl px-6 py-10 sticky top-0 hidden md:block">
        <h2 className="text-2xl font-bold text-orange-600 mb-10 tracking-tight">Mentor Dashboard</h2>
        <nav className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base font-semibold
                ${location.pathname === link.path
                  ? "bg-orange-100 text-orange-700 shadow-sm"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"}`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-10 md:px-12 bg-orange-50">
        <Outlet />
      </main>
    </div>
  );
}
