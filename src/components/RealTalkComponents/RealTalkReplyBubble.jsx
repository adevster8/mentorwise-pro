import { motion } from "framer-motion";

/**
 * Props:
 *   reply = {
 *     author: string,
 *     createdAt: string,
 *     text: string
 *   }
 */
export default function RealTalkReplyBubble({ reply }) {
  const { author, createdAt, text } = reply;

  // Color "You" differently (if desired)
  const isYou = author === "You";

  return (
    <motion.div
      className={`flex flex-col items-start max-w-2xl ${
        isYou ? "ml-auto items-end" : ""
      }`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className={`rounded-2xl px-6 py-3 shadow-md mb-1 text-base leading-relaxed relative
          ${
            isYou
              ? "bg-blue-100 text-blue-800 border border-blue-200"
              : "bg-orange-100 text-orange-900 border border-orange-200"
          }`}
        style={{
          borderBottomLeftRadius: isYou ? "1.5rem" : "0.5rem",
          borderBottomRightRadius: isYou ? "0.5rem" : "1.5rem",
        }}
      >
        {text}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 px-2">
        <span className={isYou ? "font-bold text-blue-600" : "font-semibold text-orange-700"}>
          {author}
        </span>
        <span>·</span>
        <span>{createdAt}</span>
      </div>
    </motion.div>
  );
}
