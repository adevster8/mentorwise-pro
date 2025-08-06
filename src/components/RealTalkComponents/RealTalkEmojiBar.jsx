import { useState } from "react";
import { motion } from "framer-motion";

// Expanded emoji reactions for richer, real conversations
const emojiList = [
  { emoji: "🔥", name: "Fire" },
  { emoji: "❤️", name: "Love" },
  { emoji: "👏", name: "Support" },
  { emoji: "😂", name: "Funny" },
  { emoji: "🤯", name: "Mind Blown" },
  { emoji: "🙏", name: "Thankful" },
  { emoji: "🤔", name: "Curious" },
  { emoji: "😢", name: "Empathy" },
  { emoji: "💡", name: "Insightful" },
  { emoji: "🤗", name: "Hug" },
  { emoji: "😮", name: "Surprised" },
  { emoji: "😎", name: "Cool" },
  { emoji: "😤", name: "Relatable" },
  { emoji: "😆", name: "Cheered Me Up" },
  { emoji: "🌟", name: "Inspired" },
];

export default function RealTalkEmojiBar({ initialCounts }) {
  // Allow for external counts (or start all at 0)
  const [counts, setCounts] = useState(
    initialCounts ||
      emojiList.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
  );
  const [selected, setSelected] = useState("");

  // Handle emoji click
  const handleClick = (name) => {
    if (selected === name) return; // prevent double voting
    setSelected(name);
    setCounts((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
      ...(selected && { [selected]: prev[selected] - 1 }),
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2 select-none">
      {emojiList.map(({ emoji, name }) => (
        <motion.button
          key={name}
          whileTap={{ scale: 0.91, rotate: 5 }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-base font-semibold transition
            ${
              selected === name
                ? "bg-blue-100 text-blue-700 shadow"
                : "bg-orange-50 text-gray-700 hover:bg-orange-200 hover:text-orange-800"
            }
          `}
          aria-label={name}
          onClick={() => handleClick(name)}
          type="button"
        >
          <span>{emoji}</span>
          <motion.span
            key={counts[name]}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-bold"
          >
            {counts[name] > 0 ? counts[name] : ""}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}
