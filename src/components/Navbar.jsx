// src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import MegaMenuNavbar from "./MegaMenuNavbar";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Listen for login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
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

  return (
    <>
      <nav className="bg-gray-900 px-6 h-24 flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/Compass.png"
            alt="MentorWise Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-3xl font-bold text-orange-600">MentorWise</h1>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex space-x-10 text-lg tracking-wide items-center">
          <Link to="/" className="text-white hover:text-orange-400 font-semibold">Home</Link>
          <Link to="/mentors" className="text-white hover:text-orange-400 font-semibold">Mentors</Link>
          <Link to="/become-a-mentor" className="text-white hover:text-orange-400 font-semibold">Become a Mentor</Link>
          <Link to="/schedule-call" className="text-white hover:text-orange-400 font-semibold">Schedule a Call</Link>
        </div>

        {/* Auth Dropdown */}
        <div className="relative z-[9999]" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-orange-500 text-3xl"
              >
                <FaUserCircle />
              </button>
             {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700">
    <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-orange-500">
      Dashboard Home
    </Link>
    <Link to="/dashboard/profile" className="block px-4 py-2 text-white hover:bg-orange-500">
      View Profile
    </Link>
    <Link to="/dashboard/edit-profile" className="block px-4 py-2 text-white hover:bg-orange-500">
      Edit Profile
    </Link>
    <Link to="/dashboard/schedule" className="block px-4 py-2 text-white hover:bg-orange-500">
      Schedule
    </Link>
    <Link to="/dashboard/billing" className="block px-4 py-2 text-white hover:bg-orange-500">
      Billing
    </Link>
    
    {/* Optional Divider */}
    <hr className="my-2 border-gray-600" />

    <Link to="/dashboard/messages" className="block px-4 py-2 text-white hover:bg-orange-500">
      My Messages
    </Link>
    <Link to="/dashboard/bookings" className="block px-4 py-2 text-white hover:bg-orange-500">
      My Bookings
    </Link>
    <Link to="/dashboard/settings" className="block px-4 py-2 text-white hover:bg-orange-500">
      Settings
    </Link>
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
            <div className="space-x-4">
              <Link to="/signin" className="text-blue-300 hover:text-white font-medium">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-orange-600 border border-orange-600 px-3 py-1 rounded hover:bg-orange-600 hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* MegaMenu (Second Row) */}
      <MegaMenuNavbar />
    </>
  );
}