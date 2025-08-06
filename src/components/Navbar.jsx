import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import MegaMenuNavbar from "./MegaMenuNavbar";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(""); // "mentor" or "mentee"
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get Firebase user object
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If user is logged in, get role from Firestore
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserRole(snap.data().role);
        } else {
          setUserRole("");
        }
      } else {
        setUserRole("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ---- DASHBOARD LINKS ----
  // Mentor links
  const mentorLinks = [
    { label: "Dashboard Home", to: "/mentor-dashboard" },
    { label: "Availability", to: "/mentor-dashboard/availability" },
    { label: "Bookings", to: "/mentor-dashboard/bookings" },
    { label: "Messages", to: "/mentor-dashboard/messages" },
    { label: "Requests", to: "/mentor-dashboard/requests" },
    { label: "Earnings", to: "/mentor-dashboard/earnings" },
    { label: "Reviews", to: "/mentor-dashboard/reviews" },
    { label: "Edit Profile", to: "/mentor-dashboard/edit-profile" },
    { label: "Settings", to: "/mentor-dashboard/settings" },
  ];

  // Mentee (User) links
  const userLinks = [
    { label: "Dashboard Home", to: "/dashboard" },
    { label: "Profile", to: "/dashboard/profile" },
    { label: "Edit Profile", to: "/dashboard/edit-profile" },
    { label: "Schedule", to: "/dashboard/schedule" },
    { label: "Billing", to: "/dashboard/billing" },
    { label: "Messages", to: "/dashboard/messages" },
    { label: "Bookings", to: "/dashboard/bookings" },
    { label: "Settings", to: "/dashboard/settings" },
  ];

  return (
    <>
      <nav className="bg-gray-900 px-6 h-24 flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <img
              src="/Compass.png"
              alt="MentorWise Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-3xl font-bold text-orange-600">MentorWise</h1>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex space-x-10 text-lg tracking-wide items-center">
          <Link to="/" className="text-white hover:text-orange-400 font-semibold">Home</Link>
          <Link to="/mentors" className="text-white hover:text-orange-400 font-semibold">Mentors</Link>
          <Link to="/become-a-mentor" className="text-white hover:text-orange-400 font-semibold">Become a Mentor</Link>
          <Link to="/schedule-call" className="text-white hover:text-orange-400 font-semibold">Schedule a Call</Link>
        </div>

        {/* Right Side Auth & RealTalk */}
        <div className="flex items-center space-x-4" ref={dropdownRef}>
          <Link
            to="/realtalk"
            className="bg-orange-100 hover:bg-orange-300 text-orange-700 px-5 py-2 rounded-lg font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-orange-400 text-base h-[44px] flex items-center justify-center"
            style={{ fontWeight: 700, minWidth: 120 }}
          >
            🫂 RealTalk
          </Link>
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-orange-500 text-3xl h-[44px] w-[44px] flex items-center justify-center rounded-full bg-white/0 hover:bg-orange-100 transition"
                aria-label="Open user menu"
              >
                <FaUserCircle />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700">
                  {/* Show correct menu for mentor or mentee */}
                  {(userRole === "mentor"
                    ? mentorLinks
                    : userLinks
                  ).map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="block px-4 py-2 text-white hover:bg-orange-500 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 hover:text-red-700"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-blue-300 hover:text-white font-bold px-5 py-2 rounded-lg transition text-base h-[44px] flex items-center justify-center"
                style={{ minWidth: 100 }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-orange-600 border border-orange-600 px-5 py-2 rounded-lg hover:bg-orange-600 hover:text-white font-bold transition text-base h-[44px] flex items-center justify-center"
                style={{ minWidth: 100 }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* MegaMenu (Second Row) */}
      <MegaMenuNavbar />
    </>
  );
}
