import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";

export default function Settings() {
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reminders: true,
    dataSharing: false,
  });

  const handleToggle = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved! (Replace this with real logic)");
  };

  const sectionVariants = {
    collapsed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8 font-manrope">Account Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Personal Info */}
          <div>
            <button
              type="button"
              onClick={() => handleToggle("info")}
              className="w-full text-left text-lg font-semibold text-blue-900 bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 transition mb-2"
            >
              Personal Info
            </button>
            <AnimatePresence initial={false}>
              {expanded === "info" && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  transition={{ duration: 0.4 }}
                  className="space-y-4 px-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-orange-400 focus:outline-none"
                      placeholder="Jordan Rivers"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 2: Email & Password */}
          <div>
            <button
              type="button"
              onClick={() => handleToggle("auth")}
              className="w-full text-left text-lg font-semibold text-blue-900 bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 transition mb-2"
            >
              Email & Password
            </button>
            <AnimatePresence initial={false}>
              {expanded === "auth" && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  transition={{ duration: 0.4 }}
                  className="space-y-4 px-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-orange-400 focus:outline-none"
                      placeholder="jordan@example.com"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-orange-400 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 3: Notifications */}
          <div>
            <button
              type="button"
              onClick={() => handleToggle("notifications")}
              className="w-full text-left text-lg font-semibold text-blue-900 bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 transition mb-2"
            >
              Session Reminders
            </button>
            <AnimatePresence initial={false}>
              {expanded === "notifications" && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  transition={{ duration: 0.4 }}
                  className="px-4 space-y-4"
                >
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="reminders"
                      checked={formData.reminders}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <span className="text-gray-700">Email me 24 hours before my sessions</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 4: Privacy */}
          <div>
            <button
              type="button"
              onClick={() => handleToggle("privacy")}
              className="w-full text-left text-lg font-semibold text-blue-900 bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 transition mb-2"
            >
              Privacy Settings
            </button>
            <AnimatePresence initial={false}>
              {expanded === "privacy" && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  transition={{ duration: 0.4 }}
                  className="px-4 space-y-4"
                >
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="dataSharing"
                      checked={formData.dataSharing}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <span className="text-gray-700">Allow mentors to view profile activity</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button type="submit" className="w-full">
              Save All Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
