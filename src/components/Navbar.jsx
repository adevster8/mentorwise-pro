// src/components/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { UserCircleIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import MegaMenuNavbar from "./MegaMenuNavbar"; // Make sure this import is here

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userRole = userData?.role;
  const dashboardPath = userRole === 'mentor' ? '/mentor-dashboard' : '/dashboard';

  return ( 
    <>
      <nav className="bg-gray-900 px-6 h-24 flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src="/Compass.png" alt="MentorWise Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-3xl font-bold text-orange-600">MentorWise</h1>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex space-x-10 text-lg tracking-wide items-center">
          <Link to="/" className="text-white hover:text-orange-400 font-semibold transition-colors">Home</Link>
          <Link to="/mentors" className="text-white hover:text-orange-400 font-semibold transition-colors">Mentors</Link>
          <Link to="/become-a-mentor" className="text-white hover:text-orange-400 font-semibold transition-colors">Become a Mentor</Link>
         <Link to="/schedule-call" className="text-white hover:text-orange-400 font-semibold transition-colors">Find a Coach</Link>

        </div>

        {/* Right Side Auth & Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/realtalk" className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-lg font-bold shadow transition-all transform hover:scale-105 text-base">
            🫂 RealTalk
          </Link>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-11 w-11 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                aria-label="Open user menu"
              >
                {userData?.image ? (
                  <img src={userData.image} alt="User" className="h-11 w-11 rounded-full object-cover"/>
                ) : (
                  <UserCircleIcon className="h-7 w-7 text-orange-400" />
                )}
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-60 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700"
                  >
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-white font-semibold truncate">{userData?.name || user.email}</p>
                      <p className="text-xs text-orange-400 capitalize">{userRole}</p>
                    </div>
                    <Link to={dashboardPath} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      <Squares2X2Icon className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link to={`${dashboardPath}/settings`} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                       <Cog6ToothIcon className="w-5 h-5" /> Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                      <ArrowRightOnRectangleIcon className="w-5 h-5" /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/signin" className="text-white hover:text-orange-400 font-bold px-4 py-2 rounded-lg transition-colors text-base">
                Sign In
              </Link>
              <Link to="/signup" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-base">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* THIS IS THE FIX: The MegaMenuNavbar is now included again */}
      <MegaMenuNavbar />
    </>
  );
}