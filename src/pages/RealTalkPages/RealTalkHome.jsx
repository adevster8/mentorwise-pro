// src/pages/RealTalkPages/RealTalkHome.jsx

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkThreadCard from "../../components/RealTalkComponents/RealTalkThreadCard";
import RealTalkStartModal from "../../components/RealTalkComponents/RealTalkStartModal";
import IconPic from "../../components/IconPic";

// 🔧 Sample Data (Replace with Firestore later)
const threads = [
  {
    id: "1",
    title: "How do I stop overthinking everything?",
    category: "Career & Business",
    subcategory: "Productivity",
    replies: 12,
    createdAt: "2h ago",
    author: "JessR",
  },
  {
    id: "2",
    title: "First freelance gig: what should I charge?",
    category: "Career & Business",
    subcategory: "Entrepreneurship",
    replies: 5,
    createdAt: "4h ago",
    author: "DevMo",
  },
  {
    id: "3",
    title: "Got lowballed on salary, what now?",
    category: "Career & Business",
    subcategory: "Salary & Negotiation",
    replies: 9,
    createdAt: "3h ago",
    author: "NYCtechie",
  },
];

export default function RealTalkHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>RealTalk | Peer Mentorship Conversations</title>
        <meta
          name="description"
          content="Join vibrant conversations about real challenges and growth. Start a chat, share your journey, or get peer advice instantly."
        />
      </Helmet>

      <main className="flex w-full bg-[#FFF8F2] pt-0 md:pl-10">
        {/* Sidebar */}
        <RealTalkCategorySidebar />

        {/* Main Section */}
        <section className="flex-1 flex flex-col items-start pl-6 pr-6 md:pr-12 py-16">
          {/* Header & Start Button */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <motion.h1
              className="text-5xl font-black text-orange-600 tracking-tight drop-shadow-sm leading-tight font-manrope"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              RealTalk
            </motion.h1>
            <RealTalkStartModal />
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full mb-8"
          >
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-xl px-5 py-3 text-lg border border-orange-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition placeholder-gray-400"
            />
          </motion.div>

          {/* Thread List */}
          <div className="w-full space-y-5">
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <RealTalkThreadCard key={thread.id} thread={thread} />
              ))
            ) : (
              <motion.div
                className="text-center w-full py-20 px-6 bg-white rounded-xl shadow-inner border border-orange-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  No threads match your search.
                </h3>
                <p className="text-gray-500 mt-2">Try adjusting your keywords.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Decorative Graphic (Optional) */}
      <IconPic />

      {/* CTA Section */}
      <section className="w-full py-16 bg-white border-t border-orange-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 font-manrope">
            Need Personalized 1-on-1 Help?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-lato">
            Sometimes a community post is just the start. If you're ready to dive deeper,
            our mentors can help you build a real plan.
          </p>
          <Link
            to="/find-mentor"
            className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-0.5"
          >
            Find a Mentor
          </Link>
        </div>
      </section>
    </div>
  );
}
