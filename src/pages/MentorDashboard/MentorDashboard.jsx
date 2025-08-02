import { Outlet, Link, useLocation } from "react-router-dom";

export default function MentorDashboard() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/mentor-dashboard" },
    { name: "Messages", path: "/mentor-dashboard/messages" },
    { name: "Requests", path: "/mentor-dashboard/requests" },
    { name: "Availability", path: "/mentor-dashboard/availability" },
    { name: "Earnings", path: "/mentor-dashboard/earnings" },
    { name: "Reviews", path: "/mentor-dashboard/reviews" },
    { name: "Edit Profile", path: "/mentor-dashboard/edit-profile" },
    { name: "Settings", path: "/mentor-dashboard/settings" },
    { name: "Help", path: "/mentor-dashboard/help" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-orange-600 mb-6">Mentor Dashboard</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded ${
                location.pathname === link.path
                  ? "bg-orange-100 text-orange-700 font-semibold"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-orange-50 p-10">
        <Outlet />
      </main>
    </div>
  );
}
