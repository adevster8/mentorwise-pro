import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkReplyBubble from "../../components/RealTalkComponents/RealTalkReplyBubble";
import RealTalkEmojiBar from "../../components/RealTalkComponents/RealTalkEmojiBar";
import RealTalkUserTag from "../../components/RealTalkComponents/RealTalkUserTag";
import { realTalkCategories } from "../../data/realTalkCategories";


// Sample thread data (replace with backend data later)
const demoThread = {
  id: "101",
  title: "How do I navigate a toxic job without quitting yet?",
  category: "Career & Business",
  subcategory: "Office Politics",
  author: "SarahD",
  role: "Mentor",
  createdAt: "3h ago",
  body: "I've been feeling stuck and overwhelmed at work, but can't leave just yet. How do I cope and keep my sanity?",
  emojiCounts: { "Support": 6, "Fire": 2, "Curious": 1 }
};

const demoReplies = [
  {
    id: "r1",
    author: "MentorMike",
    role: "Mentor",
    createdAt: "2h ago",
    text: "Set strict work-life boundaries and document everything. If you can, start quietly looking for better jobs now.",
  },
  {
    id: "r2",
    author: "EmilyC",
    role: "New User",
    createdAt: "1h ago",
    text: "Find a few trusted coworkers to vent with, but don't engage with the drama. Focus on small wins each day.",
  },
];

export default function RealTalkThread() {
  const { threadId } = useParams();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(demoReplies);

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplies([
      ...replies,
      {
        id: Date.now().toString(),
        author: "You",
        role: "User",
        createdAt: "Just now",
        text: reply.trim(),
      },
    ]);
    setReply("");
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>{demoThread.title} | RealTalk Thread</title>
        <meta
          name="description"
          content={`Discussion: ${demoThread.title} in ${demoThread.category} on RealTalk. Share your support, advice, or experience.`}
        />
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 py-14 flex gap-8">
        {/* Sidebar */}
        <RealTalkCategorySidebar />

        {/* Main Thread Content */}
        <div className="flex-1">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-300 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <div>
                <h2 className="text-2xl font-extrabold text-blue-600 mb-1">{demoThread.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl font-semibold">
                    {demoThread.category}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">
                    {demoThread.subcategory}
                  </span>
                  <span className="text-gray-400">by</span>
                  <RealTalkUserTag user={demoThread.author} role={demoThread.role} />
                  <span className="text-gray-400">· {demoThread.createdAt}</span>
                </div>
              </div>
              <div className="mt-3 md:mt-0">
                <RealTalkEmojiBar initialCounts={demoThread.emojiCounts} />
              </div>
            </div>
            <p className="text-lg text-gray-800 mb-3">{demoThread.body}</p>
          </motion.div>

          {/* Replies */}
          <div className="mb-12 space-y-4">
            {replies.map((r) => (
              <RealTalkReplyBubble key={r.id} reply={r} />
            ))}
          </div>

          {/* Reply box */}
          <form
            onSubmit={handleReply}
            className="bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-3 border border-blue-100"
          >
            <label htmlFor="reply" className="font-semibold text-blue-600">
              Add Your Reply
            </label>
            <textarea
              id="reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={3}
              className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Share advice, encouragement, or your experience..."
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow transition-all self-end"
            >
              Post Reply
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
