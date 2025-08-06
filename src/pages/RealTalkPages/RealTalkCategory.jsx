import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkThreadCard from "../../components/RealTalkComponents/RealTalkThreadCard";
import RealTalkStartModal from "../../components/RealTalkComponents/RealTalkStartModal";
import { motion } from "framer-motion";
import { realTalkCategories } from "../../data/realTalkCategories";


// You can move thread data to state management later!
const demoThreads = [
  // Example threads for each subcategory — add more for realism!
  {
    id: "201",
    title: "Should I negotiate my salary on a remote job?",
    category: "Salary & Negotiation",
    replies: 8,
    createdAt: "2h ago",
    author: "SarahD",
  },
  {
    id: "202",
    title: "Building confidence for interviews?",
    category: "Confidence",
    replies: 11,
    createdAt: "3h ago",
    author: "PixelPro",
  },
  {
    id: "203",
    title: "Struggling with gym motivation",
    category: "Fitness",
    replies: 5,
    createdAt: "4h ago",
    author: "StrongAlex",
  },
  {
    id: "204",
    title: "Recovering from burnout after a layoff",
    category: "Burnout",
    replies: 17,
    createdAt: "1d ago",
    author: "BurntToast",
  },
  {
    id: "205",
    title: "Budgeting tips for freelancers?",
    category: "Budgeting",
    replies: 3,
    createdAt: "5h ago",
    author: "SoloMoney",
  },
];

export default function RealTalkCategory() {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Show only threads that match this subcategory and the search filter
  const filteredThreads = demoThreads.filter(
    (thread) =>
      thread.category.toLowerCase() === categoryName.toLowerCase() &&
      thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>{categoryName} | RealTalk Category</title>
        <meta
          name="description"
          content={`Join honest conversations in the ${categoryName} subcategory. Share your challenges, get support, and talk it out with others who get it.`}
        />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-14 flex gap-8">
        {/* Sidebar */}
        <RealTalkCategorySidebar />

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight capitalize"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {categoryName.replace(/-/g, " ")}
            </motion.h1>
            <RealTalkStartModal />
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search threads in "${categoryName}"...`}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Threads */}
          <div className="space-y-6">
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <RealTalkThreadCard key={thread.id} thread={thread} />
              ))
            ) : (
              <p className="text-gray-500 text-lg">
                No conversations found in this subcategory yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
