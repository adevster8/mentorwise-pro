import { Outlet, Link, useLocation } from "react-router-dom";

export default function UserDashboard() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Messages", path: "/dashboard/messages" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Billing", path: "/dashboard/billing" },
    { name: "Schedule", path: "/dashboard/schedule" },
    { name: "Become a Mentor", path: "/dashboard/become-a-mentor" },
    { name: "Edit Profile", path: "/dashboard/edit-profile" },
    { name: "Invite", path: "/dashboard/invite" },
    { name: "Logout", path: "/dashboard/logout" },
    { name: "Settings", path: "/dashboard/settings" },
    { name: "Help", path: "/dashboard/help" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-orange-600 mb-6">Your Dashboard</h2>
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

      {/* Main Content */}
      <main className="flex-1 bg-orange-50 p-10">
        <Outlet />
      </main>
    </div>
  );
}
