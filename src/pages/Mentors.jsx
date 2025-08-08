// src/pages/Mentors.jsx

import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { mentors as mockMentors } from "../data/mentorsData";
import { megaMenuData } from "../data/megaMenuData";
import { motion, AnimatePresence } from "framer-motion";

const AVATAR_FALLBACK = "/default-avatar.png";

export default function Mentors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTopic = queryParams.get("topic");

  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isRelated, setIsRelated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMentors() {
      setIsLoading(true);
      const q = query(collection(db, "users"), where("role", "==", "mentor"));
      const snapshot = await getDocs(q);
      const liveMentors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const combined = [
        ...liveMentors,
        ...mockMentors.filter(
          mock => !liveMentors.some(live => live.id === mock.id || (live.email && mock.email === live.email))
        ),
      ].map(m => ({ ...m, image: m.image || AVATAR_FALLBACK }));

      setAllMentors(combined);
      setIsLoading(false);
    }

    fetchMentors();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let base = allMentors;

    if (selectedTopic) {
      const exact = base.filter(m =>
        m.specialties?.some(s => s.toLowerCase() === selectedTopic.toLowerCase())
      );
      base = exact.length > 0 ? exact : base.filter(m =>
        m.specialties?.some(s => s.toLowerCase().includes(selectedTopic.toLowerCase()))
      );
      setIsRelated(exact.length === 0);
    }

    if (selectedFilter) {
      base = base.filter(m =>
        m.specialties?.some(s => s.toLowerCase() === selectedFilter.toLowerCase())
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      base = base.filter(m =>
        m.name?.toLowerCase().includes(q) ||
        m.specialties?.some(s => s.toLowerCase().includes(q))
      );
    }

    setFilteredMentors(base);
  }, [allMentors, selectedTopic, selectedFilter, searchQuery, isLoading]);

  const allSpecialties = useMemo(() => {
    const set = new Set();
    allMentors.forEach(m => {
      m.specialties?.forEach(s => set.add(s));
    });
    return Array.from(set).sort();
  }, [allMentors]);

  return (
    <div className="flex w-full min-h-screen bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* === SIDEBAR === */}
      <aside className="w-64 hidden lg:block pr-8">
        <div className="sticky top-24 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-manrope">Filter by Topic</h3>
          <div className="space-y-2">
            {megaMenuData.map(cat => (
              <div key={cat.title}>
                <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide">{cat.title}</p>
                {cat.topics.map(topic => (
                  <div key={topic.title} className="ml-2 mt-1">
                    <p className="font-medium text-gray-600 text-sm">{topic.title}</p>
                    {topic.subtopics.map(sub => (
                      <button
                        key={sub.name}
                        onClick={() => setSelectedFilter(sub.name)}
                        className={`block text-left w-full px-4 py-1.5 rounded-md text-sm font-medium transition mt-1 ml-2 ${
                          selectedFilter === sub.name
                            ? "bg-orange-500 text-white shadow"
                            : "bg-white text-gray-700 hover:bg-orange-100"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => setSelectedFilter(null)}
              className="block text-left w-full mt-4 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 font-medium text-gray-800"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 font-manrope">Find Your Mentor</h1>
          <p className="text-base sm:text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            Browse our expert mentors. Use search, category bar, or the sidebar to filter.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name or specialty..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </motion.div>

        {/* Top Category Filter Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/mentors"
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${!selectedTopic ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-100'}`}
          >
            All Mentors
          </Link>
          {allSpecialties.slice(0, 12).map(topic => (
            <Link
              key={topic}
              to={`/mentors?topic=${encodeURIComponent(topic)}`}
              className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${selectedTopic === topic ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-100'}`}
            >
              {topic}
            </Link>
          ))}
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading mentors...</p>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">
              No mentors found for "{selectedTopic || selectedFilter || searchQuery}"
            </h3>
            <p className="text-gray-500 mt-2">Try clearing filters or searching again.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredMentors.map(mentor => (
                <motion.div
                  layout
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <img
                    src={mentor.image || AVATAR_FALLBACK}
                    alt={mentor.name}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = AVATAR_FALLBACK; }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-1 font-manrope">
                      {mentor.name || "Mentor"}
                    </h2>
                    <p className="text-sm text-orange-600 mb-3 font-semibold">{mentor.title || "Mentor"}</p>
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                      {mentor.bio}
                    </p>
                    <Link
                      to={`/mentors/${mentor.id}`}
                      className="mt-auto w-full text-center px-6 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 shadow-md group-hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
