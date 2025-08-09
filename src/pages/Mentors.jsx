// src/pages/Mentors.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { mentors as mockMentors } from "../data/mentorsData";
import { megaMenuData } from "../data/megaMenuData";
import { motion, AnimatePresence } from "framer-motion";

const AVATAR_FALLBACK = "/default-avatar.png";

/* --- helpers --- */
const getLabel = (obj) =>
  obj?.title ?? obj?.name ?? obj?.label ?? obj?.category ?? "";

/** Small chevron (no extra deps) */
function Chevron({ open, className = "w-4 h-4" }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </motion.svg>
  );
}

/** Collapsible with height animation */
function Collapsible({ isOpen, children }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

  // dropdown state
  const [openCats, setOpenCats] = useState({});     // { [cIdx]: boolean }
  const [openTopics, setOpenTopics] = useState({}); // { [`c-t`]: boolean }

  const toggleCat = (cIdx) =>
    setOpenCats((s) => ({ ...s, [cIdx]: !s[cIdx] }));

  const toggleTopic = (cIdx, tIdx) => {
    const key = `${cIdx}-${tIdx}`;
    setOpenTopics((s) => ({ ...s, [key]: !s[key] }));
  };

  const expandAll = () => {
    const cats = {};
    const topics = {};
    megaMenuData.forEach((cat, cIdx) => {
      cats[cIdx] = true;
      (cat.topics || []).forEach((_, tIdx) => {
        topics[`${cIdx}-${tIdx}`] = true;
      });
    });
    setOpenCats(cats);
    setOpenTopics(topics);
  };

  const collapseAll = () => {
    setOpenCats({});
    setOpenTopics({});
  };

  // Load mentors (live + mock fallback)
  useEffect(() => {
    let isMounted = true;

    async function fetchMentors() {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const q = query(collection(db, "users"), where("role", "==", "mentor"));
        const snapshot = await getDocs(q);
        const liveMentors = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const combined = [
          ...liveMentors,
          ...mockMentors.filter(
            (mock) =>
              !liveMentors.some(
                (live) =>
                  live.id === mock.id ||
                  (live.email && mock.email && live.email === mock.email)
              )
          ),
        ].map((m) => ({ ...m, image: m.image || AVATAR_FALLBACK }));

        if (isMounted) setAllMentors(combined);
      } catch (err) {
        console.error("Mentor fetch failed, using mock data:", err);
        if (isMounted) {
          const fallback = mockMentors.map((m) => ({
            ...m,
            image: m.image || AVATAR_FALLBACK,
          }));
          setAllMentors(fallback);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchMentors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtering
  useEffect(() => {
    if (isLoading) return;
    let base = allMentors;

    if (selectedTopic) {
      const exact = base.filter((m) =>
        m.specialties?.some((s) => s.toLowerCase() === selectedTopic.toLowerCase())
      );
      base =
        exact.length > 0
          ? exact
          : base.filter((m) =>
              m.specialties?.some((s) =>
                s.toLowerCase().includes(selectedTopic.toLowerCase())
              )
            );
      setIsRelated(exact.length === 0);
    }

    if (selectedFilter) {
      base = base.filter((m) =>
        m.specialties?.some((s) => s.toLowerCase() === selectedFilter.toLowerCase())
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.specialties?.some((s) => s.toLowerCase().includes(q))
      );
    }

    setFilteredMentors(base);
  }, [allMentors, selectedTopic, selectedFilter, searchQuery, isLoading]);

  // Build specialties list for chips
  const allSpecialties = useMemo(() => {
    const set = new Set();
    allMentors.forEach((m) => {
      m.specialties?.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, [allMentors]);

  // Auto-open the category/topic that contains the selected query filter
  useEffect(() => {
    const target = selectedFilter || selectedTopic;
    if (!target) return;

    let nextCats = { ...openCats };
    let nextTopics = { ...openTopics };

    megaMenuData.forEach((cat, cIdx) => {
      (cat.topics || []).forEach((topic, tIdx) => {
        const tLabel = getLabel(topic)?.toLowerCase();
        const matchTopic = tLabel === target.toLowerCase();
        const matchSub = (topic.subtopics || []).some(
          (s) => (s.name || "").toLowerCase() === target.toLowerCase()
        );
        if (matchTopic || matchSub) {
          nextCats[cIdx] = true;
          nextTopics[`${cIdx}-${tIdx}`] = true;
        }
      });
    });

    setOpenCats(nextCats);
    setOpenTopics(nextTopics);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, selectedTopic]);

  return (
    <div className="flex w-full min-h-screen bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* === SIDEBAR (dropdowns) === */}
      <aside className="w-64 hidden lg:block pr-8">
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 font-manrope">
              Filter by <span className="sr-only">Topic</span> Topic
            </h3>
            <div className="text-xs text-gray-500 space-x-2">
              <button onClick={expandAll} className="underline hover:text-gray-700">
                Expand all
              </button>
              <button onClick={collapseAll} className="underline hover:text-gray-700">
                Collapse all
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {megaMenuData.map((cat, cIdx) => {
              const catOpen = !!openCats[cIdx];
              const catLabel = getLabel(cat) || `Category ${cIdx + 1}`;
              return (
                <div
                  key={`cat-${cIdx}-${catLabel}`}
                  className="rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleCat(cIdx)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left"
                    aria-expanded={catOpen}
                  >
                    <span className="font-semibold text-sm text-gray-800 tracking-wide truncate">
                      {catLabel}
                    </span>
                    <span className="text-gray-500">
                      <Chevron open={catOpen} />
                    </span>
                  </button>

                  {/* Category body */}
                  <Collapsible isOpen={catOpen}>
                    <div className="px-2 pb-2">
                      {(cat.topics || []).map((topic, tIdx) => {
                        const key = `${cIdx}-${tIdx}`;
                        const topicOpen = !!openTopics[key];
                        const topicLabel = getLabel(topic) || `Topic ${tIdx + 1}`;
                        return (
                          <div key={`topic-${key}-${topicLabel}`} className="rounded-md">
                            {/* Topic header */}
                            <button
                              onClick={() => toggleTopic(cIdx, tIdx)}
                              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 px-2 py-2 hover:bg-orange-50 rounded-md"
                              aria-expanded={topicOpen}
                            >
                              <span className="truncate">{topicLabel}</span>
                              <span className="text-gray-400">
                                <Chevron open={topicOpen} className="w-3.5 h-3.5" />
                              </span>
                            </button>

                            {/* Subtopics */}
                            <Collapsible isOpen={topicOpen}>
                              <div className="pl-2 pb-2">
                                {(topic.subtopics || []).map((sub, sIdx) => (
                                  <button
                                    key={`sub-${key}-${sIdx}-${sub.name || sIdx}`}
                                    onClick={() => setSelectedFilter(sub.name)}
                                    className={`block text-left w-full px-3 py-1.5 rounded-md text-sm font-medium transition mt-1 ml-2 ${
                                      selectedFilter === sub.name
                                        ? "bg-orange-500 text-white shadow"
                                        : "bg-white text-gray-700 hover:bg-orange-100"
                                    }`}
                                  >
                                    {sub.name}
                                  </button>
                                ))}
                              </div>
                            </Collapsible>
                          </div>
                        );
                      })}
                    </div>
                  </Collapsible>
                </div>
              );
            })}

            <button
              onClick={() => setSelectedFilter(null)}
              className="block text-left w-full mt-1 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 font-medium text-gray-800"
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 font-manrope">
            Find Your Mentor
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            Browse our expert mentors. Use search, category bar, or the sidebar to filter.
          </p>
          {isRelated && selectedTopic && (
            <p className="mt-2 text-sm text-gray-500">
              Showing related mentors for “{selectedTopic}”.
            </p>
          )}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name or specialty..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </motion.div>

        {/* Top chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/mentors"
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${
              !selectedTopic
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-orange-100"
            }`}
          >
            All Mentors
          </Link>
          {allSpecialties.slice(0, 12).map((topic, idx) => (
            <Link
              key={`chip-${idx}-${topic}`}
              to={`/mentors?topic=${encodeURIComponent(topic)}`}
              className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${
                selectedTopic === topic
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
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
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredMentors.map((mentor, idx) => (
                <motion.div
                  layout
                  key={mentor.id || `mentor-${mentor.name || "unknown"}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <img
                    src={mentor.image || AVATAR_FALLBACK}
                    alt={mentor.name || "Mentor"}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = AVATAR_FALLBACK;
                    }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-1 font-manrope">
                      {mentor.name || "Mentor"}
                    </h2>
                    <p className="text-sm text-orange-600 mb-3 font-semibold">
                      {mentor.title || "Mentor"}
                    </p>
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
