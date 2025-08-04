// src/components/Button.jsx
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  href = null, // if passed, renders <motion.a>
  ...props
}) {
  const sharedClasses = `
    inline-block
    bg-blue-100
    hover:bg-blue-200
    text-gray-900
    px-8 py-4
    rounded-lg
    transition
    text-lg
    font-lato font-bold
    shadow-md
    focus:outline-none
    focus:ring-2 focus:ring-orange-500
    ${className}
  `;

  const hoverShadow = "0 8px 32px 0 #fdba7488";

  const motionProps = {
    whileHover: { scale: 1.07, boxShadow: hoverShadow },
    whileTap: { scale: 0.98 },
  };

  return href ? (
    <motion.a
      href={href}
      className={sharedClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      type={type}
      onClick={onClick}
      className={sharedClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}