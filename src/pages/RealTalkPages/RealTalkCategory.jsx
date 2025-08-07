import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkThreadCard from "../../components/RealTalkComponents/RealTalkThreadCard";
import RealTalkStartModal from "../../components/RealTalkComponents/RealTalkStartModal";
import { megaMenuData } from "../../data/megaMenuData"; // Import the single source of truth

// In a real app, you would fetch these from your database based on the category.
const allThreads = [
    { id: "1", title: "How do I stop overthinking everything?", subcategorySlug: "productivity-systems", replies: 12, createdAt: "2h ago", author: "JessR" },
    { id: "2", title: "First freelance gig: what should I charge?", subcategorySlug: "freelancing-and-consulting", replies: 5, createdAt: "4h ago", author: "DevMo" },
    { id: "3", title: "Got lowballed on salary, what now?", subcategorySlug: "salary-negotiation", replies: 9, createdAt: "3h ago", author: "NYCtechie" },
];

// Helper to find subtopic name from slug
const findSubtopicName = (slug) => {
  for (const category of megaMenuData) {
    for (const topic of category.topics) {
      for (const subtopic of topic.subtopics) {
        if (subtopic.path.endsWith(slug)) {
          return subtopic.name;
        }
      }
    }
  }
  return slug.replace(/-/g, " "); // Fallback
};

export default function RealTalkCategory() {
  const { categoryName: categorySlug } = useParams(); // The URL param is a slug
  const [searchQuery, setSearchQuery] = useState("");

  const subtopicName = useMemo(() => findSubtopicName(categorySlug), [categorySlug]);

  // This is a placeholder filter. In a real app, you'd fetch threads where subcategorySlug matches.
  const filteredThreads = allThreads.filter(
    (thread) =>
      thread.subcategorySlug === categorySlug &&
      thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>{subtopicName} | RealTalk Category</title>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 py-14 flex gap-8">
        <RealTalkCategorySidebar />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight capitalize"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {subtopicName}
            </motion.h1>
            <RealTalkStartModal />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search threads in "${subtopicName}"...`}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm mb-8 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="space-y-6">
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <RealTalkThreadCard key={thread.id} thread={{ ...thread, subcategory: subtopicName }} />
              ))
            ) : (
              <p className="text-gray-500 text-lg text-center py-10 bg-white rounded-lg">
                No conversations found in this category yet. Be the first to start one!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}