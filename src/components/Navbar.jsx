import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";

import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import MegaMenuNavbar from "./MegaMenuNavbar";
import { megaMenuData } from "../data/megaMenuData";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategoryIdx, setOpenCategoryIdx] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        if (snap.exists()) setUserData(snap.data());
      } else {
        setUserData(null);
      }
    });
    return () => unsub();
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
      setMobileMenuOpen(false);
      navigate("/");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const userRole = userData?.role;
  const dashboardPath = userRole === "mentor" ? "/mentor-dashboard" : "/dashboard";

  const toggleAccordion = (idx) => {
    setOpenCategoryIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* Top nav */}
      <nav className="bg-gray-900 px-4 md:px-6 h-20 flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <img src="/Compass.png" alt="MentorWise Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">MentorWise</h1>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-20 text-lg tracking-wide items-center">
<Link
  to="/how-it-works"
  className="text-white hover:text-orange-400 font-semibold transition-colors"
>
  How It Works
</Link>
          <Link to="/mentors" className="text-white hover:text-orange-400 font-semibold transition-colors">Mentors</Link>
          <Link to="/become-a-mentor" className="text-white hover:text-orange-400 font-semibold transition-colors">Become a Mentor</Link>
          <Link to="/schedule-a-call" className="text-white hover:text-orange-400 font-semibold transition-colors">Schedule a Call</Link>
          <Link to="/locals" className="text-white hover:text-orange-400 font-semibold transition-colors">Locals</Link>
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex space-x-16 text-lg tracking-wide items-center">
          <Link
            to="/realtalk"
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-lg font-bold shadow transition-all transform hover:scale-105 text-base"
          >
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
                  <img src={userData.image} alt="User" className="h-11 w-11 rounded-full object-cover" />
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
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-60 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700"
                  >
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-white font-semibold truncate">{userData?.name || user?.email}</p>
                      <p className="text-xs text-orange-400 capitalize">{userRole}</p>
                    </div>
                    <Link to={dashboardPath} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      <Squares2X2Icon className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link to={`${dashboardPath}/settings`} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      <Cog6ToothIcon className="w-5 h-5" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white hover:text-orange-400"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
      </nav>

      {/* MegaMenu desktop */}
      <div className="hidden md:block">
        <MegaMenuNavbar />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 w-80 max-w-[88vw] h-full bg-gray-900 text-white z-[999] shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
                <span className="text-orange-500 font-bold text-lg">Menu</span>
                <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                  <XMarkIcon className="w-7 h-7" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                <nav className="space-y-3">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">Home</Link>
                  <Link to="/mentors" onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">Mentors</Link>
                  <Link to="/become-a-mentor" onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">Become a Mentor</Link>
                  <Link to="/schedule-a-call" onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">Schedule a Call</Link>
                  <Link to="/locals" onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">Locals</Link>

                  <Link to="/realtalk" onClick={() => setMobileMenuOpen(false)} className="inline-block mt-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold shadow">
                    🫂 RealTalk
                  </Link>
                </nav>

                <div className="border-t border-gray-800 my-4" />

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Browse Categories</p>
                  <ul className="space-y-1">
                    {megaMenuData.map((cat, idx) => {
                      const open = openCategoryIdx === idx;
                      return (
                        <li key={cat.name} className="border-b border-gray-800 pb-2">
                          <button
                            className="w-full flex items-center justify-between py-2 text-left hover:text-orange-400"
                            aria-expanded={open}
                            onClick={() => toggleAccordion(idx)}
                          >
                            <span className="font-semibold">{cat.name}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="pl-3 pr-1"
                              >
                                <div className="grid grid-cols-1 gap-1 pb-2">
                                  {cat.topics.map((topic) => (
                                    <div key={topic.title} className="mt-2 first:mt-1">
                                      <p className="text-xs text-gray-400 mb-1">{topic.title}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {topic.subtopics.map((sub) => (
                                          <Link
                                            key={sub.name}
                                            to={sub.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm text-gray-200 hover:text-orange-400"
                                          >
                                            {sub.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-4">
                  {!user ? (
                    <div className="flex gap-3">
                      <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white">
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link to={dashboardPath} onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">
                        Dashboard
                      </Link>
                      <Link to={`${dashboardPath}/settings`} onClick={() => setMobileMenuOpen(false)} className="block hover:text-orange-400">
                        Settings
                      </Link>
                      <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-500">
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
