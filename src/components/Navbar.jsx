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
  Squares2X2Icon, UserCircleIcon, XMarkIcon,
} from "@heroicons/react/24/outline";

// --- Hooks ---
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          setUserData(userDoc.exists() ? userDoc.data() : null);
        } catch {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
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

  return { user, userData, handleLogout };
};

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback?.();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ref, callback]);
};


// --- Constants ---
const NAV_LINKS = [
  { label: "How It Works", path: "/how-it-works", dropdown: true },
  { label: "Mentors", path: "/mentors" },
  { label: "Become a Mentor", path: "/become-a-mentor" },
  { label: "Get Matched", path: "/schedule-a-call" },
  { label: "Locals", path: "/locals" },
];

const HOW_IT_WORKS_SUB_LINKS = [
  { label: "For Clients", path: "/how-it-works/clients" },
  { label: "For Mentors", path: "/how-it-works/coaches" }, // same route, clearer label
   { label: "Pricing", path: "/pricing" },
  { label: "Programs vs. Projects", path: "/how-it-works/programs-vs-projects" }, // NEW
];

const getUserDropdownLinks = (dashboardPath) => [
  { label: "Dashboard", path: dashboardPath, icon: Squares2X2Icon },
  { label: "Settings", path: `${dashboardPath}/settings`, icon: Cog6ToothIcon },
];

// --- Subcomponents ---
const BrandLogo = React.memo(() => (
  <Link
    to="/"
    className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
  >
    <img
      src="/Compass.png"
      alt="MentorWise Logo"
      className="w-10 h-10 object-contain"
    />
    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">
      MentorWise
    </h1>
  </Link>
));

const HowItWorksDropdown = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/how-it-works"
        className="text-white hover:text-orange-400 font-semibold transition-colors inline-flex items-center gap-1"
      >
        How It Works{" "}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180 text-orange-400" : ""
          }`}
        />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 mt-3 w-56 rounded-xl border border-white/10 bg-white/90 backdrop-blur-md shadow-2xl p-2"
          >
            {HOW_IT_WORKS_SUB_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-orange-50"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const DesktopNavLinks = React.memo(({ links }) => (
  <div className="hidden xl:flex space-x-20 text-lg tracking-wide items-center">
    {links.map((link) =>
      link.dropdown ? (
        <HowItWorksDropdown key={link.label} />
      ) : (
        <Link
          key={link.label}
          to={link.path}
          className="text-white hover:text-orange-400 font-semibold transition-colors"
        >
          {link.label}
        </Link>
      )
    )}
  </div>
));

const AuthButtons = React.memo(() => (
  <div className="hidden sm:flex items-center gap-2">
    <Link
      to="/signin"
      className="text-white hover:text-orange-400 font-bold px-4 py-2 rounded-lg transition-colors text-base"
    >
      Sign In
    </Link>
    <Link
      to="/signup"
      className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-base"
    >
      Sign Up
    </Link>
  </div>
));

const UserMenu = React.memo(({ user, userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const userRole = userData?.role;
  const dashboardPath =
    userRole === "mentor" ? "/mentor-dashboard" : "/dashboard";
  const userLinks = getUserDropdownLinks(dashboardPath);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 w-11 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Open user menu"
      >
        {userData?.image ? (
          <img
            src={userData.image}
            alt="User"
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <UserCircleIcon className="h-7 w-7 text-orange-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-60 bg-gray-800 shadow-lg rounded-lg py-2 z-[9999] border border-gray-700"
          >
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm text-white font-semibold truncate">
                {userData?.name || user?.email}
              </p>
              <p className="text-xs text-orange-400 capitalize">{userRole}</p>
            </div>
            {userLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-orange-600 transition-colors"
              >
                <link.icon className="w-5 h-5" /> {link.label}
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" /> Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// --- Mobile Menu Subcomponents (Condensed & Corrected) ---
const MobileMegaMenuSubtopic = React.memo(({ subtopic, categoryLabel, closeMenu }) => {
    const subName = subtopic?.name || subtopic || '';
    const to = subtopic?.path || `/mentors?category=${encodeURIComponent(categoryLabel)}&subtopic=${encodeURIComponent(subName)}`;
    
    return (
        <Link to={to} className="block text-sm text-gray-300 hover:text-orange-400 py-1 transition-colors" onClick={closeMenu}>
            {subName}
        </Link>
    );
});

const MobileMegaMenuTopic = React.memo(({ topic, categoryLabel, closeMenu }) => {
    const topicPath = `/mentors?topic=${encodeURIComponent(topic?.title || '')}`;
    
    return (
        <li>
            <Link to={topicPath} onClick={closeMenu}>
                <p className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors mt-2 mb-1.5">
                    {topic?.title || 'Topic'}
                </p>
            </Link>
            <div className="grid grid-cols-1 gap-1.5">
                {topic?.subtopics?.map((sub, j) => (
                    <MobileMegaMenuSubtopic key={sub?.name || j} subtopic={sub} categoryLabel={categoryLabel} closeMenu={closeMenu} />
                ))}
            </div>
        </li>
    );
});

const MobileMegaMenuCategory = React.memo(({ category, index, openIndex, setOpenIndex, closeMenu }) => {
    const isOpen = openIndex === index;
    const categoryLabel = category?.name || `Category ${index + 1}`;
    
    return (
        <li className="border-b border-gray-800 last:border-b-0">
            <button
                className="w-full flex items-center justify-between py-2.5 text-left font-semibold hover:text-orange-400 transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`mm-cat-${index}`}
            >
                {categoryLabel}
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`mm-cat-${index}`}
                        initial="collapsed" animate="open" exit="collapsed"
                        variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pl-2 pr-1 pb-2 overflow-hidden"
                    >
                        <ul className="mt-1 space-y-2">
                            {category?.topics?.map((topic, i) => (
                                <MobileMegaMenuTopic key={topic?.title || i} topic={topic} categoryLabel={categoryLabel} closeMenu={closeMenu} />
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
});


const MobileMenu = React.memo(({ isOpen, onClose, user, userData, onLogout }) => {
    const [openCategoryIdx, setOpenCategoryIdx] = useState(null);
    const dashboardPath = userData?.role === "mentor" ? "/mentor-dashboard" : "/dashboard";

    useEffect(() => { if (!isOpen) setOpenCategoryIdx(null) }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.aside className="fixed top-0 right-0 w-80 max-w-[88vw] h-full bg-gray-900 text-white z-[999] shadow-2xl flex flex-col" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-800 flex-shrink-0">
                            <span className="text-orange-500 font-bold text-lg">Menu</span>
                            <button aria-label="Close menu" onClick={onClose}><XMarkIcon className="w-7 h-7" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <nav className="space-y-4">
                                {NAV_LINKS.map((link) => <Link key={link.path} to={link.path} className="block font-medium hover:text-orange-400" onClick={onClose}>{link.label}</Link>)}
                                <Link to="/realtalk" onClick={onClose} className="inline-block mt-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold shadow">🫂 RealTalk</Link>
                            </nav>
                            <div className="border-t border-gray-800" />
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Browse Categories</p>
                                <ul className="space-y-1">
                                    {megaMenuData.map((cat, idx) => (
                                        <MobileMegaMenuCategory key={cat?.name || idx} category={cat} index={idx} openIndex={openCategoryIdx} setOpenIndex={setOpenCategoryIdx} closeMenu={onClose} />
                                    ))}
                                </ul>
                            </div>
                            <div className="border-t border-gray-800" />
                            <div className="space-y-4">
                                {!user ? (
                                    <div className="flex items-center gap-4"><Link to="/signin" onClick={onClose} className="flex-1 text-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 font-semibold">Sign In</Link><Link to="/signup" onClick={onClose} className="flex-1 text-center px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold">Sign Up</Link></div>
                                ) : (
                                    <div className="space-y-3 font-medium"><Link to={dashboardPath} onClick={onClose} className="block hover:text-orange-400">Dashboard</Link><Link to={`${dashboardPath}/settings`} onClick={onClose} className="block hover:text-orange-400">Settings</Link><button onClick={() => { onLogout(); onClose(); }} className="text-left text-red-400 hover:text-red-500">Log Out</button></div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
});


// --- Main Navbar ---
export default function Navbar() {
  const { user, userData, handleLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 px-4 md:px-6 h-20 w-full overflow-x-clip flex justify-between items-center sticky top-0 z-[999] shadow-lg">
        <BrandLogo />
        <DesktopNavLinks links={NAV_LINKS} />
        <div className="hidden xl:flex space-x-10 xl:space-x-16 items-center">
          <Link to="/realtalk" className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-lg font-bold shadow transition-all transform hover:scale-105 text-base">🫂 RealTalk</Link>
          {user ? <UserMenu user={user} userData={userData} onLogout={handleLogout} /> : <AuthButtons />}
        </div>
        <button className="xl:hidden text-white hover:text-orange-400" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="w-8 h-8" />
        </button>
      </nav>
      
      {/* FIX: This div correctly controls the visibility of the MegaMenuNavbar */}
      <div className="hidden md:block">
        <MegaMenuNavbar />
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} user={user} userData={userData} onLogout={handleLogout} />
    </>
  );
}