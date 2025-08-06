import { useState } from "react";
import { Helmet } from "react-helmet-async";
import RealTalkCategorySidebar from "../../components/RealTalkComponents/RealTalkCategorySidebar";
import RealTalkThreadCard from "../../components/RealTalkComponents/RealTalkThreadCard";
import RealTalkStartModal from "../../components/RealTalkComponents/RealTalkStartModal";
import { motion } from "framer-motion";
import { realTalkCategories } from "../../data/realTalkCategories"; 

// MASSIVE fake data for demo — use real data/database later!
const threads = [
  // Career & Business
  {
    id: "1",
    title: "How do I stop overthinking everything?",
    category: "Productivity",
    replies: 12,
    createdAt: "2h ago",
    author: "JessR",
  },
  {
    id: "2",
    title: "First freelance gig: what should I charge?",
    category: "Entrepreneurship",
    replies: 5,
    createdAt: "4h ago",
    author: "DevMo",
  },
  {
    id: "3",
    title: "Got lowballed on salary, what now?",
    category: "Salary & Negotiation",
    replies: 9,
    createdAt: "3h ago",
    author: "NYCtechie",
  },
  // Personal Growth
  {
    id: "4",
    title: "Lost my confidence after a breakup.",
    category: "Confidence",
    replies: 13,
    createdAt: "1h ago",
    author: "BraverNow",
  },
  {
    id: "5",
    title: "How to actually set goals you’ll hit?",
    category: "Goal Setting",
    replies: 7,
    createdAt: "5h ago",
    author: "CoachLou",
  },
  // Health & Wellness
  {
    id: "6",
    title: "Do I need therapy or just more sleep?",
    category: "Mental Health",
    replies: 8,
    createdAt: "2d ago",
    author: "SleeplessinAZ",
  },
  {
    id: "7",
    title: "Plant-based diet advice for athletes?",
    category: "Nutrition",
    replies: 10,
    createdAt: "10h ago",
    author: "IronChef",
  },
  {
    id: "8",
    title: "Burnt out at work, no energy for gym.",
    category: "Burnout",
    replies: 17,
    createdAt: "1d ago",
    author: "BurntToast",
  },
  // Finance & Money
  {
    id: "9",
    title: "Investing with $100/month — worth it?",
    category: "Investing",
    replies: 18,
    createdAt: "7h ago",
    author: "SaveForRain",
  },
  {
    id: "10",
    title: "How to pay off student debt without losing my mind",
    category: "Debt & Credit",
    replies: 16,
    createdAt: "3d ago",
    author: "Grad2Debt",
  },
  // Relationships
  {
    id: "11",
    title: "Ghosted by friends after sobriety.",
    category: "Friendships",
    replies: 19,
    createdAt: "4d ago",
    author: "NewChapter",
  },
  {
    id: "12",
    title: "How to heal after a messy divorce?",
    category: "Breakups",
    replies: 12,
    createdAt: "8h ago",
    author: "DivorcedDad",
  },
  // Creative Life
  {
    id: "13",
    title: "Publishing poetry online: where to start?",
    category: "Writing & Publishing",
    replies: 8,
    createdAt: "6h ago",
    author: "HaikuQueen",
  },
  {
    id: "14",
    title: "YouTube algorithm got me down.",
    category: "Content Creation",
    replies: 10,
    createdAt: "2d ago",
    author: "ViralTry",
  },
  // Tech & Learning
  {
    id: "15",
    title: "Learning Python as an absolute beginner.",
    category: "Coding & Dev",
    replies: 11,
    createdAt: "3h ago",
    author: "Zero2Hero",
  },
  {
    id: "16",
    title: "Best way to pick up a new language at 40?",
    category: "Language Learning",
    replies: 13,
    createdAt: "5d ago",
    author: "OldDogNewTricks",
  },
  // Emotional Support
  {
    id: "17",
    title: "How do you cope with constant anxiety?",
    category: "Anxiety",
    replies: 23,
    createdAt: "1h ago",
    author: "WorriedAlways",
  },
  {
    id: "18",
    title: "Loneliness in a new city.",
    category: "Isolation & Loneliness",
    replies: 14,
    createdAt: "7h ago",
    author: "CityStranger",
  },
  // Life Challenges
  {
    id: "19",
    title: "Tips for surviving a layoff.",
    category: "Major Transitions",
    replies: 6,
    createdAt: "12h ago",
    author: "CareerReset",
  },
  {
    id: "20",
    title: "Parenting teens in 2025 — what changed?",
    category: "Parenthood",
    replies: 12,
    createdAt: "2d ago",
    author: "MomMode",
  },
  // Student Life
  {
    id: "21",
    title: "Study hacks for finals week?",
    category: "Study Tips",
    replies: 8,
    createdAt: "9h ago",
    author: "Exams4ever",
  },
  {
    id: "22",
    title: "Best apps for campus life?",
    category: "Campus Life",
    replies: 4,
    createdAt: "1d ago",
    author: "Frosh2025",
  },
  // LGBTQ+ & Identity
  {
    id: "23",
    title: "Workplace inclusion tips for allies?",
    category: "Workplace Inclusion",
    replies: 7,
    createdAt: "3d ago",
    author: "AllyUp",
  },
  {
    id: "24",
    title: "Coming out as non-binary in my 30s.",
    category: "Coming Out",
    replies: 9,
    createdAt: "5h ago",
    author: "BOlderNow",
  },
  // Just for Fun
  {
    id: "25",
    title: "2025 movie predictions?",
    category: "Pop Culture",
    replies: 13,
    createdAt: "5h ago",
    author: "MovieBuff",
  },
  {
    id: "26",
    title: "What’s your favorite comfort food?",
    category: "Food & Cooking",
    replies: 15,
    createdAt: "3h ago",
    author: "TastyAF",
  },
  // Even more: random, edgy, and specific (show how big the community could be)
  {
    id: "27",
    title: "Crypto scams: what to watch for now?",
    category: "Crypto & Stocks",
    replies: 4,
    createdAt: "11h ago",
    author: "BlockHead",
  },
  {
    id: "28",
    title: "Best ways to make friends after moving?",
    category: "Moving/Relocation",
    replies: 10,
    createdAt: "2d ago",
    author: "NomadLife",
  },
  {
    id: "29",
    title: "Getting sober: daily motivation?",
    category: "Addiction Recovery",
    replies: 15,
    createdAt: "7h ago",
    author: "Free4Good",
  },
  {
    id: "30",
    title: "How do you deal with social media envy?",
    category: "Self-Discovery",
    replies: 8,
    createdAt: "8h ago",
    author: "RealMe",
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

<main className="flex w-full min-h-[80vh] bg-[#FFF8F2] pt-0 pl-10">
  {/* Sidebar */}
  <aside className="w-72 flex-shrink-0 pt-16">
    <RealTalkCategorySidebar />
  </aside>

  {/* Main forum feed */}
  <section className="flex-1 flex flex-col items-start pl-6 pr-12 py-16">
    {/* Header and Start Conversation button */}
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
    {/* Search Bar */}
    <div className="w-full mb-8">
      <input
        type="text"
        placeholder="Search conversations..."
        className="w-full bg-orange-50 rounded-xl px-5 py-3 text-lg border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
      />
    </div>
    {/* Forum Feed with example cards */}
    <div className="w-full space-y-7">
      {/* Example Card 1 */}
      <div className="bg-white rounded-2xl shadow px-7 py-6 border border-orange-100 w-full">
        <span className="uppercase text-xs font-bold text-orange-500 mb-1 tracking-wider">PRODUCTIVITY</span>
        <a href="#" className="text-xl font-extrabold text-blue-700 hover:underline block mb-2">
          How do I stop overthinking everything?
        </a>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
          <span>by JessR</span>
          <span>·</span>
          <span>2h ago</span>
          <span>·</span>
          <span className="text-blue-600 font-semibold cursor-pointer">12 Replies</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">❤️</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">🔥</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">💡</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">🙏</span>
        </div>
      </div>
      {/* Example Card 2 */}
      <div className="bg-white rounded-2xl shadow px-7 py-6 border border-orange-100 w-full">
        <span className="uppercase text-xs font-bold text-orange-500 mb-1 tracking-wider">ENTREPRENEURSHIP</span>
        <a href="#" className="text-xl font-extrabold text-blue-700 hover:underline block mb-2">
          First freelance gig: what should I charge?
        </a>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
          <span>by DevMo</span>
          <span>·</span>
          <span>4h ago</span>
          <span>·</span>
          <span className="text-blue-600 font-semibold cursor-pointer">5 Replies</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">💸</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">👏</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">💡</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-lg">🎯</span>
        </div>
      </div>
      {/* ...add more posts or map your post data here */}
    </div>
  </section>
</main>
    </div>
  );
}
