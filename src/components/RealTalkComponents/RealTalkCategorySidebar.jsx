import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { megaMenuData } from "../../data/megaMenuData";

export default function RealTalkCategorySidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  // Get current subtopic from URL
  const match = location.pathname.match(/category\/(.*)/);
  const currentSubtopic = match ? decodeURIComponent(match[1]) : "";

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
          {megaMenuData.map((cat) => (
            <li key={cat.name}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold cursor-pointer transition
                ${expanded[cat.name] ? "bg-blue-50" : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"}
                `}
                onClick={() => toggleCategory(cat.name)}
              >
                {/* Optional: If your megaMenuData includes icons, use cat.icon */}
                {cat.icon && <span className="text-xl">{cat.icon}</span>}
                <span>{cat.name}</span>
                <span className="ml-auto text-lg">
                  {expanded[cat.name] ? "▼" : "▶"}
                </span>
              </div>
              <AnimatePresence>
                {expanded[cat.name] && (
                  <motion.ul
                    className="ml-4 mt-2 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {cat.topics.map((topic) => (
                      <li key={topic.title}>
                        <span className="block font-bold text-blue-900 text-sm mt-3 mb-1">{topic.title}</span>
                        <ul className="space-y-1">
                          {topic.subtopics.map((sub) => (
                            <li key={sub.name}>
                              <NavLink
                                to={sub.path}
                                className={({ isActive }) =>
                                  `block px-3 py-1 rounded-lg text-base transition
                                  ${isActive || currentSubtopic === sub.name
                                    ? "bg-orange-200 text-orange-900 font-bold"
                                    : "text-gray-600 hover:bg-orange-100 hover:text-orange-700"}`
                                }
                                end
                              >
                                {sub.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
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