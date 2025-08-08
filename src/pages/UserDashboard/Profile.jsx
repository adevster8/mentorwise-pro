// src/pages/UserDashboard/Profile.jsx

import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const mockProfile = {
    fullName: user?.displayName || "Jordan Rivers",
    bio: "Lifelong learner passionate about design, coding, and personal growth. Always looking to level up and share knowledge with others.",
    interests: "UX Design, React Development, Productivity Systems",
    location: "Austin, Texas",
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 px-6 py-12 flex justify-center items-start"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white relative overflow-hidden shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-orange-100">
        {/* Overlay accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 opacity-30 rounded-full z-0"></div>

        <h1 className="text-4xl font-extrabold text-orange-600 mb-10 relative z-10 font-manrope">
          Your Profile
        </h1>

        <div className="space-y-8 relative z-10 text-base md:text-lg">
          {/* Email */}
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-orange-500 mt-1 text-xl" />
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Email</h2>
              <p className="text-gray-900 font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-start gap-4">
            <FaUser className="text-orange-500 mt-1 text-xl" />
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Full Name</h2>
              <p className="text-gray-900 font-medium">{mockProfile.fullName}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="flex items-start gap-4">
            <FaHeart className="text-orange-500 mt-1 text-xl" />
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Bio</h2>
              <p className="text-gray-700 leading-relaxed">{mockProfile.bio}</p>
            </div>
          </div>

          {/* Interests */}
          <div className="flex items-start gap-4">
            <FaHeart className="text-orange-500 mt-1 text-xl" />
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Interests</h2>
              <p className="text-gray-700">{mockProfile.interests}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-orange-500 mt-1 text-xl" />
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase">Location</h2>
              <p className="text-gray-700">{mockProfile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
