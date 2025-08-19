// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../firebase";
import { megaMenuData } from "../data/megaMenuData";

import MegaMenuNavbar from "./MegaMenuNavbar";
import {
  ArrowRightOnRectangleIcon, Bars3Icon, ChevronDownIcon, Cog6ToothIcon,
  Squares2X2Icon, UserCircleIcon, XMarkIcon
} from "@heroicons/react/24/outline";

// --- Custom Hooks (Separation of Concerns) ---
// Encapsulates Firebase auth logic, cleaning up the Navbar component.
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, userData, loading, handleLogout };
};

// Reusable hook for detecting clicks outside a referenced element.
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};


// --- Data Constants (Single Source of Truth) ---
const NAV_LINKS = [
  { label: "How It Works", path: "/how-it-works", dropdown: true },
  { label: "Mentors", path: "/mentors" },
  { label: "Become a Mentor", path: "/become-a-mentor" },
  { label: "Get Matched", path: "/schedule-a-call" },
  { label: "Locals", path: "/locals" },
];

const HOW_IT_WORKS_SUB_LINKS = [
    { label: "For Clients", path: "/how-it-works/clients" },
    { label: "For Coaches", path: "/how-it-works/coaches" },
];

const getUserDropdownLinks = (dashboardPath) => [
    { label: "Dashboard", path: dashboardPath, icon: Squares2X2Icon },
    { label: "Settings", path: `${dashboardPath}/settings`, icon: Cog6ToothIcon },
];


// --- Sub-Components (Componentization) ---
const BrandLogo = React.memo(() => (
  <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
    <img src="/Compass.png" alt="MentorWise Logo" className="w-10 h-10 object-contain" />
    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">MentorWise</h1>
  </Link>
));

const HowItWorksDropdown = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link to="/how-it-works" className="text-white hover:text-orange-400 font-semibold transition-colors inline-flex items-center gap-1">
        How It Works <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-orange-400" : ""}`} />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 mt-3 w-56 rounded-xl border border-white/10 bg-white/90 backdrop-blur-md shadow-2xl p-2"
          >
            {HOW_IT_WORKS_SUB_LINKS.map(link => (
              <Link key={link.path} to={link.path} className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-orange-50">{link.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const DesktopNavLinks = React.memo(({ links }) => (
  <div className="hidden xl:flex space-x-20 text-lg tracking-wide items-center">
    {links.map(link => link.dropdown ? <HowItWorksDropdown key={link.label} /> : (
      <Link key={link.label} to={link.path} className="text-white hover:text-orange-400 font-semibold transition-colors">{link.label}</Link>
    ))}
  </div>
));

const AuthButtons = React.memo(() => (
  <div className="hidden sm:flex items-center gap-2">
    <Link to="/signin" className="text-white hover:text-orange-400 font-bold px-4 py-2 rounded-lg transition-colors text-base">Sign In</Link>
    <Link to="/signup" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-base">Sign Up</Link>
  </div>
));

const UserMenu = React.memo(({ user, userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const userRole = userData?.role;
  const dashboardPath = userRole === "mentor" ? "/mentor-dashboard" : "/dashboard";
  const userLinks = getUserDropdownLinks(dashboardPath);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="h-11 w-11 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" aria-label="Open user menu">
        {userData?.image ? <img src={userData.image} alt="User" className="h-11 w-11 rounded-full object-cover" /> : <UserCircleIcon className="h-7 w-7 text-orange-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-60 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700"
          >
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm text-white font-semibold truncate">{userData?.name || user?.email}</p>
              <p className="text-xs text-orange-400 capitalize">{userRole}</p>
            </div>
            {userLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                <link.icon className="w-5 h-5" /> {link.label}
              </Link>
            ))}
            <button onClick={onLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
              <ArrowRightOnRectangleIcon className="w-5 h-5" /> Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const MobileMenu = React.memo(({ isOpen, onClose, user, userData, onLogout }) => {
    const [openCategoryIdx, setOpenCategoryIdx] = useState(null);
    const dashboardPath = userData?.role === "mentor" ? "/mentor-dashboard" : "/dashboard";
    
    // Close accordion when mobile menu closes
    useEffect(() => {
        if (!isOpen) {
            setOpenCategoryIdx(null);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/50 z-[998]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.aside
                        className="fixed top-0 right-0 w-80 max-w-[88vw] h-full bg-gray-900 text-white z-[999] shadow-xl flex flex-col"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
                            <span className="text-orange-500 font-bold text-lg">Menu</span>
                            <button aria-label="Close menu" onClick={onClose}><XMarkIcon className="w-7 h-7" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                            {/* Navigation Links */}
                            <nav className="space-y-3">
                                {NAV_LINKS.map(link => <Link key={link.path} to={link.path} onClick={onClose} className="block hover:text-orange-400">{link.label}</Link>)}
                                <Link to="/realtalk" onClick={onClose} className="inline-block mt-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold shadow">🫂 RealTalk</Link>
                            </nav>
                            <div className="border-t border-gray-800 my-4" />
                            {/* MegaMenu Accordion */}
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Browse Categories</p>
                                {/* Accordion content remains largely the same as it's mobile-specific */}
                                <ul className="space-y-1">
                                    {megaMenuData.map((cat, idx) => (
                                    <li key={cat.name} className="border-b border-gray-800 pb-2">
                                        <button className="w-full flex items-center justify-between py-2 text-left hover:text-orange-400" onClick={() => setOpenCategoryIdx(prev => prev === idx ? null : idx)}>
                                            <span className="font-semibold">{cat.name}</span>
                                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${openCategoryIdx === idx ? "rotate-180" : ""}`} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                        {openCategoryIdx === idx && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-3 pr-1 overflow-hidden">
                                            {/* Sub-items rendering */}
                                            </motion.div>
                                        )}
                                        </AnimatePresence>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Auth Section */}
                            <div className="mt-4">
                                {!user ? (
                                    <div className="flex gap-3">
                                        <Link to="/signin" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">Sign In</Link>
                                        <Link to="/signup" onClick={onClose} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white">Sign Up</Link>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link to={dashboardPath} onClick={onClose} className="block hover:text-orange-400">Dashboard</Link>
                                        <Link to={`${dashboardPath}/settings`} onClick={onClose} className="block hover:text-orange-400">Settings</Link>
                                        <button onClick={() => { onLogout(); onClose(); }} className="text-left text-red-400 hover:text-red-500">Log Out</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
});


// --- Main Navbar Component (Orchestrator) ---
export default function Navbar() {
  const { user, userData, handleLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 px-4 md:px-6 h-20 w-full overflow-x-clip flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        <BrandLogo />
        <DesktopNavLinks links={NAV_LINKS} />

        <div className="hidden xl:flex space-x-10 xl:space-x-16 items-center">
          <Link to="/realtalk" className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-lg font-bold shadow transition-all transform hover:scale-105 text-base">
            🫂 RealTalk
          </Link>
          {user ? <UserMenu user={user} userData={userData} onLogout={handleLogout} /> : <AuthButtons />}
        </div>
        
        <button className="xl:hidden text-white hover:text-orange-400" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="w-8 h-8" />
        </button>
      </nav>

      <div className="hidden lg:block"><MegaMenuNavbar /></div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        userData={userData}
        onLogout={handleLogout}
      />
    </>
  );
}