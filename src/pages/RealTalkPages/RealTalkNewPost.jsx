import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// MASSIVE CATEGORY LIST (same as sidebar/modal)
const categories = [
  { 
    name: "Career & Business", 
    subs: [
      "Interviews & Job Search",
      "Remote Work",
      "Entrepreneurship",
      "Office Politics",
      "Salary & Negotiation",
      "Networking",
    ],
  },
  { 
    name: "Personal Growth", 
    subs: [
      "Productivity",
      "Goal Setting",
      "Confidence",
      "Habits",
      "Self-Discovery",
      "Overcoming Fear",
    ],
  },
  { 
    name: "Health & Wellness", 
    subs: [
      "Fitness",
      "Mental Health",
      "Nutrition",
      "Sleep",
      "Chronic Illness",
      "Healthy Aging",
    ],
  },
  { 
    name: "Finance & Money", 
    subs: [
      "Budgeting",
      "Investing",
      "Crypto & Stocks",
      "Debt & Credit",
      "Retirement",
      "Side Hustles",
    ],
  },
  { 
    name: "Relationships", 
    subs: [
      "Dating",
      "Marriage",
      "Friendships",
      "Family",
      "Breakups",
      "Conflict Resolution",
    ],
  },
  { 
    name: "Creative Life", 
    subs: [
      "Writing & Publishing",
      "Art & Design",
      "Music & Performing",
      "Content Creation",
      "Photography",
      "Filmmaking",
    ],
  },
  { 
    name: "Tech & Learning", 
    subs: [
      "Coding & Dev",
      "AI & Machine Learning",
      "Math & Science",
      "Language Learning",
      "Online Courses",
      "Career Change",
    ],
  },
  { 
    name: "Emotional Support", 
    subs: [
      "Anxiety",
      "Depression",
      "Grief & Loss",
      "Addiction Recovery",
      "Isolation & Loneliness",
      "Burnout",
    ],
  },
  { 
    name: "Life Challenges", 
    subs: [
      "Major Transitions",
      "Moving/Relocation",
      "Parenthood",
      "Divorce",
      "Legal Issues",
      "Financial Hardship",
    ],
  },
  { 
    name: "Student Life", 
    subs: [
      "Study Tips",
      "Exams",
      "School Stress",
      "College Apps",
      "Grad School",
      "Campus Life",
    ],
  },
  { 
    name: "LGBTQ+ & Identity", 
    subs: [
      "Coming Out",
      "Relationships",
      "Workplace Inclusion",
      "Trans Life",
      "Family Issues",
      "Community",
    ],
  },
  { 
    name: "Just for Fun", 
    subs: [
      "Pop Culture",
      "Sports & Fitness",
      "Gaming",
      "Travel",
      "Food & Cooking",
      "Random Chat",
    ],
  },
  // ...add even more if you like!
];

export default function RealTalkNewPost() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // When changing category, reset subcategory
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !subcategory || !title.trim() || !body.trim()) return;
    setSubmitting(true);

    // Simulate post, then redirect to RealTalk category
    setTimeout(() => {
      setSubmitting(false);
      navigate(`/realtalk/category/${encodeURIComponent(subcategory)}`);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>Start a New Conversation | RealTalk</title>
        <meta
          name="description"
          content="Start a new peer support chat. Pick a category, add your question, and connect instantly with others on RealTalk."
        />
      </Helmet>

      <main className="max-w-xl mx-auto pt-16 px-4 pb-20">
        <motion.div
          className="bg-white p-10 rounded-2xl shadow-2xl border-2 border-orange-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 text-center">
            Start a New Conversation
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Category */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Main Topic</label>
              <select
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a main topic...</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Subcategory */}
            {category && (
              <div>
                <label className="block text-orange-700 font-semibold mb-1">Subtopic</label>
                <select
                  className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                >
                  <option value="">Select a subtopic...</option>
                  {categories
                    .find((cat) => cat.name === category)
                    .subs.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {/* Title */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />
            </div>
            {/* Body */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Details</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                placeholder="Share your thoughts, situation, or question..."
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={2000}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-lg font-bold shadow-md transition
                ${submitting
                  ? "bg-blue-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-orange-400 text-white"}`}
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Start Conversation"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
