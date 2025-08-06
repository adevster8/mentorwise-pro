// src/components/RealTalkComponents/RealTalkUserTag.jsx

import { motion } from "framer-motion";

// Add more roles/colors as needed!
const roleColors = {
  Mentor: "bg-blue-100 text-blue-700 border-blue-300",
  Admin: "bg-orange-100 text-orange-700 border-orange-300",
  "New User": "bg-gray-100 text-gray-700 border-gray-300",
  "Mentee": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Expert": "bg-orange-200 text-orange-800 border-orange-300",
  default: "bg-blue-50 text-blue-600 border-blue-100",
};

export default function RealTalkUserTag({ user, role = "", className = "" }) {
  const colorClass = roleColors[role] || roleColors.default;

  return (
    <motion.span
      className={`inline-block px-3 py-1 rounded-full border text-xs font-bold shadow-sm mr-1 ${colorClass} ${className}`}
      initial={{ scale: 0.92, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.18 }}
      title={role ? `${role}` : "User"}
    >
      {user}
      {role && (
        <span className="ml-2 opacity-75 font-medium capitalize">
          {role}
        </span>
      )}
    </motion.span>
  );
}

