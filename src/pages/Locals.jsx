// src/pages/Locals.jsx
import { motion } from "framer-motion";
import {
  MapPin,
  ShieldCheck,
  Users,
  MessageCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { megaMenuData } from "../data/megaMenuData";

/* Safely read labels regardless of key names used in your data */
const getLabel = (obj) =>
  obj?.title ?? obj?.name ?? obj?.label ?? obj?.category ?? "";

/* Finders by label */
const findCategory = (label) =>
  megaMenuData.find((c) => getLabel(c)?.toLowerCase() === label?.toLowerCase());
const findTopic = (catObj, label) =>
  (catObj?.topics || []).find(
    (t) => getLabel(t)?.toLowerCase() === label?.toLowerCase()
  );

export default function Locals() {
  const [filters, setFilters] = useState({
    distance: "10 miles",
    category: "",
    topic: "",
    subtopic: "",
    ageGroup: "",
    goals: "",
  });

  /* Build options from megaMenuData */
  const categoryOptions = useMemo(
    () => megaMenuData.map((c) => getLabel(c)).filter(Boolean),
    []
  );

  const topicOptions = useMemo(() => {
    const catObj = findCategory(filters.category);
    return (catObj?.topics || []).map((t) => getLabel(t)).filter(Boolean);
  }, [filters.category]);

  const subtopicOptions = useMemo(() => {
    const catObj = findCategory(filters.category);
    const topicObj = findTopic(catObj, filters.topic);
    return (topicObj?.subtopics || [])
      .map((s) => s?.name || getLabel(s))
      .filter(Boolean);
  }, [filters.category, filters.topic]);

  /* Cascading handlers */
  const handleCategory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
      topic: "",
      subtopic: "",
    }));
  };

  const handleTopic = (value) => {
    setFilters((prev) => ({
      ...prev,
      topic: value,
      subtopic: "",
    }));
  };

  const handleSubtopic = (value) => {
    setFilters((prev) => ({ ...prev, subtopic: value }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#181C2A] font-manrope">
      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src="/locals-image1.jpg"
          alt="Locals Map Visual"
          className="w-full max-h-[600px] object-cover rounded-b-3xl shadow-md"
        />
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-3xl text-white">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Connect with Mentors and Friends Near You
            </motion.h1>
            <p className="mt-4 text-lg md:text-xl text-orange-200 font-medium">
              Explore, chat, and meet — locally and safely.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Filter + Content */}
      <div className="grid md:grid-cols-[320px_1fr] gap-8 px-6 md:px-20 py-16">
        {/* Sidebar Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-orange-100">
          <h2 className="text-xl font-bold text-orange-700 flex items-center gap-2">
            <SlidersHorizontal size={22} /> Search Nearby
          </h2>

          {/* Distance */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Distance
            </label>
            <select
              value={filters.distance}
              onChange={(e) =>
                setFilters((f) => ({ ...f, distance: e.target.value }))
              }
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {["5 miles", "10 miles", "25 miles", "50+ miles"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Category (from megaMenuData) */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleCategory(e.target.value)}
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Topic (depends on category) */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Topic
            </label>
            <select
              value={filters.topic}
              onChange={(e) => handleTopic(e.target.value)}
              disabled={!filters.category}
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">
                {filters.category ? "Select Topic" : "Choose a category first"}
              </option>
              {topicOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic (depends on topic) */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Subtopic
            </label>
            <select
              value={filters.subtopic}
              onChange={(e) => handleSubtopic(e.target.value)}
              disabled={!filters.topic}
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">
                {filters.topic ? "Select Subtopic" : "Choose a topic first"}
              </option>
              {subtopicOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Age Group */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Age Group
            </label>
            <select
              value={filters.ageGroup}
              onChange={(e) =>
                setFilters((f) => ({ ...f, ageGroup: e.target.value }))
              }
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Age Group</option>
              {["Teens", "20s", "30s", "40+", "All Ages"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Goals */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Goals
            </label>
            <select
              value={filters.goals}
              onChange={(e) =>
                setFilters((f) => ({ ...f, goals: e.target.value }))
              }
              className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Goals</option>
              {[
                "Make Friends",
                "Hire a Coach",
                "Accountability",
                "Study Together",
              ].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-white font-bold bg-orange-600 hover:bg-orange-700 py-3 rounded-lg transition-all mt-4">
            <Search size={18} /> Find Matches
          </button>
        </div>

        {/* Map + Chat Preview */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <MapPin size={24} /> Live Local Map
            </h2>
            <p className="text-gray-700 mb-4">
              See who's nearby and available to chat, collaborate, or mentor. The
              map auto-updates with real-time locations of users who’ve opted in.
            </p>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm">
              🔒 Map Placeholder (Connects to location API in future)
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <MessageCircle size={24} /> Instant Messaging
            </h2>
            <p className="text-gray-700 mb-4">
              Start conversations instantly with users on the map. Safe, private,
              and moderated chat with built-in location awareness (but no exact
              GPS sharing).
            </p>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm">
              💬 Chat Preview Area (Live UI in dev)
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust & Safety */}
      <div className="bg-orange-100 py-20 px-6 md:px-20">
        <motion.h2
          className="text-3xl font-bold text-center text-orange-700 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Built with Trust & Safety in Mind
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <ShieldCheck className="text-orange-600" size={32} />,
              title: "Private & Encrypted",
              desc:
                "Chats are protected. Your exact location is never shared without consent.",
            },
            {
              icon: <Users className="text-orange-600" size={32} />,
              title: "Meet Real People",
              desc:
                "All members are part of the MentorWise platform. No anonymous profiles.",
            },
            {
              icon: <MapPin className="text-orange-600" size={32} />,
              title: "Meet Safely in Public",
              desc:
                "Choose verified public spots to meet. Never meet in private unless you trust the user.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="bg-gradient-to-r from-orange-100 to-orange-200 py-16 px-6 md:px-20 text-center rounded-t-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
          Ready to Connect with Locals?
        </h2>
        <p className="text-gray-700 mb-6">
          Find support, conversation, and opportunity — all within reach.
        </p>
        <motion.a
          href="/signin"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-orange-700 transition"
        >
          Sign In to Explore Nearby
        </motion.a>
      </motion.div>
    </div>
  );
}
