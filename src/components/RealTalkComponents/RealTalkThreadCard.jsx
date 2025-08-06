// src/components/RealTalkComponents/RealTalkThreadCard.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RealTalkEmojiBar from "./RealTalkEmojiBar";

export default function RealTalkThreadCard({ thread }) {
  // Props: thread = { id, title, category, subcategory, replies, createdAt, author, emojiCounts }
  return (
    <motion.div
      className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-7 flex flex-col gap-2 group"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {/* Show both category and subcategory */}
        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {thread.category}
        </span>
        {thread.subcategory && (
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
            {thread.subcategory}
          </span>
        )}
        <span className="text-gray-400 text-xs">
          {thread.createdAt}
        </span>
        <span className="ml-auto text-blue-600 font-semibold text-xs">
          {thread.replies} Replies
        </span>
      </div>
      <Link
        to={`/realtalk/thread/${thread.id}`}
        className="block"
      >
        <h2 className="text-xl font-extrabold text-blue-700 mb-1 group-hover:text-orange-500 transition-colors">
          {thread.title}
        </h2>
      </Link>
      <div className="flex items-center justify-between mt-1">
        <span className="text-gray-500 text-sm">
          by <span className="font-semibold text-gray-700">{thread.author}</span>
        </span>
        <RealTalkEmojiBar initialCounts={thread.emojiCounts || {}} />
      </div>
    </motion.div>
  );
}
