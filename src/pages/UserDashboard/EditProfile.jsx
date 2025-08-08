// src/pages/UserDashboard/EditProfile.jsx

import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setFullName(auth.currentUser.displayName || "");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (auth.currentUser) {
        await auth.currentUser.updateProfile({ displayName: fullName });
        // Future: Save bio, interests, location to Firestore here
      }
      setMessage("Profile updated!");
      setSaving(false);
      setTimeout(() => navigate("/dashboard/profile"), 1300);
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-6 sm:p-10"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-10 relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-orange-100 opacity-30 rounded-full z-0"></div>

          <h1 className="text-4xl font-extrabold text-orange-600 mb-8 font-manrope relative z-10">
            Edit Your Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Tell mentors more about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            {/* Interests */}
            <div>
              <label htmlFor="interests" className="block text-gray-700 font-medium mb-2">
                Interests
              </label>
              <input
                type="text"
                id="interests"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="e.g., Web Development, UX Design"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Success/Error Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-orange-700 font-semibold"
              >
                {message}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button type="submit" className="w-full">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
