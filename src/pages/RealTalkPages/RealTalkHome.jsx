import { useState } from "react";
import { Helmet } from "react-helmet-async";
import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkThreadCard from "../../components/RealTalkComponents/RealTalkThreadCard";
import RealTalkStartModal from "../../components/RealTalkComponents/RealTalkStartModal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IconPic from "../../components/IconPic";

// THE FIX: Removed massive fake data array.
// In a real app, you would fetch these threads from your Firebase backend.
const threads = [
    { id: "1", title: "How do I stop overthinking everything?", category: "Career & Business", subcategory: "Productivity", replies: 12, createdAt: "2h ago", author: "JessR" },
    { id: "2", title: "First freelance gig: what should I charge?", category: "Career & Business", subcategory: "Entrepreneurship", replies: 5, createdAt: "4h ago", author: "DevMo" },
    { id: "3", title: "Got lowballed on salary, what now?", category: "Career & Business", subcategory: "Salary & Negotiation", replies: 9, createdAt: "3h ago", author: "NYCtechie" },
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
        <RealTalkCategorySidebar />

        <section className="flex-1 flex flex-col items-start pl-6 pr-6 md:pr-12 py-16">
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <motion.h1
              className="text-5xl font-black text-orange-600 tracking-tight drop-shadow leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              RealTalk
            </motion.h1>
            <RealTalkStartModal />
          </div>
          
          <div className="w-full mb-8">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-orange-50 rounded-xl px-5 py-3 text-lg border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>
          
          <div className="w-full space-y-4">
            {filteredThreads.map(thread => (
              <RealTalkThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </section>
      </main>

      {/* Note: IconPic was outside main, which might not be intended. Keeping structure. */}
      <IconPic /> 
      
      <section className="w-full py-16 bg-white border-t border-b border-orange-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Need Personalized 1-on-1 Help?</h2>
          <p className="mt-3 text-lg text-gray-600">
            Sometimes a conversation is just the start. If you're ready to dive deeper, our mentors are here to help you build a plan.
          </p>
          <Link
            to="/find-mentor" // Updated link to be more intuitive
            className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Find a Mentor
          </Link>
        </div>
      </section>
    </div>
  );
}