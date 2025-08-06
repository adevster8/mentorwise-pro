// src/components/RealTalkComponents/RealTalkCategorySidebar.jsx

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { realTalkCategories } from "../../data/realTalkCategories"; 

export default function RealTalkCategorySidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  // Get current category from URL
  const match = location.pathname.match(/category\/([^/]+)/);
  const currentCategory = match ? decodeURIComponent(match[1]) : "";

  // Toggle subcategory dropdown
  const toggleCategory = (catName) => {
    setExpanded((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  return (
    <aside className="hidden md:block w-72 flex-shrink-0">
      <motion.div
        className="bg-white rounded-3xl shadow-xl py-8 px-6 border-2 border-blue-100 sticky top-24"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="text-lg font-bold text-orange-600 mb-6 tracking-wide uppercase">
          Topics
        </h2>
        <ul className="space-y-2">
          {realTalkCategories.map((cat) => (
            <li key={cat.name}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold cursor-pointer transition
                  ${cat.subcategories.includes(currentCategory)
                    ? "bg-blue-100 text-blue-700 shadow"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                  }`}
                onClick={() => toggleCategory(cat.name)}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="ml-auto text-lg">
                  {expanded[cat.name] ? "▼" : "▶"}
                </span>
              </div>
              <AnimatePresence>
                {expanded[cat.name] && (
                  <motion.ul
                    className="ml-8 mt-2 space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <NavLink
                          to={`/realtalk/category/${encodeURIComponent(sub)}`}
                          className={({ isActive }) =>
                            `block px-3 py-1 rounded-lg text-base transition
                              ${
                                isActive || currentCategory === sub
                                  ? "bg-orange-200 text-orange-900 font-bold"
                                  : "text-gray-600 hover:bg-orange-100 hover:text-orange-700"
                              }`
                          }
                          end
                        >
                          {sub}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        {/* Optional: See All Categories Button */}
        <button
          className="w-full mt-6 bg-blue-50 hover:bg-orange-100 text-blue-700 font-semibold rounded-xl py-2 px-3 shadow transition"
          onClick={() => navigate("/realtalk/home")}
        >
          All Conversations
        </button>
      </motion.div>
    </aside>
  );
}