// src/pages/Mentors.jsx (Polished & Optimized Version)
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { mentors as mockMentors } from "../data/mentorsData";
import { megaMenuData } from "../data/megaMenuData";

const AVATAR_FALLBACK = "/default-avatar.png";

// --- Custom Hooks (Separating Logic from UI) ---

/**
 * Hook to fetch and manage the master list of all mentors.
 * Handles Firestore fetching with a mock data fallback.
 */
const useMentorData = () => {
  const [allMentors, setAllMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const mentorQuery = query(collection(db, "users"), where("role", "==", "mentor"));
        const snapshot = await getDocs(mentorQuery);
        const liveMentors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Combine live data with mock data, avoiding duplicates
        const combined = [
          ...liveMentors,
          ...mockMentors.filter(mock => !liveMentors.some(live => live.id === mock.id || live.email === mock.email)),
        ].map(m => ({ ...m, image: m.image || AVATAR_FALLBACK }));

        setAllMentors(combined);
      } catch (err) {
        console.error("Mentor fetch failed, using mock data:", err);
        setAllMentors(mockMentors.map(m => ({ ...m, image: m.image || AVATAR_FALLBACK })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return { allMentors, isLoading };
};

/**
 * Hook to manage all filtering and searching logic.
 */
const useMentorFilters = (allMentors) => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const topicFromUrl = useMemo(() => queryParams.get("topic"), [queryParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null); // Sidebar filter

  const { filteredMentors, isRelated } = useMemo(() => {
    let base = allMentors;
    let isRelatedResult = false;

    // 1. Filter by topic from URL or sidebar
    const activeFilter = selectedFilter || topicFromUrl;
    if (activeFilter) {
      const lowercasedFilter = activeFilter.toLowerCase();
      const exactMatches = base.filter(m => m.specialties?.some(s => s.toLowerCase() === lowercasedFilter));
      
      if (exactMatches.length > 0) {
        base = exactMatches;
      } else {
        // Fallback to partial match if no exact match found
        base = base.filter(m => m.specialties?.some(s => s.toLowerCase().includes(lowercasedFilter)));
        isRelatedResult = base.length > 0;
      }
    }
    
    // 2. Filter by search query
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      base = base.filter(m =>
        m.name?.toLowerCase().includes(lowercasedQuery) ||
        m.specialties?.some(s => s.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    return { filteredMentors: base, isRelated: isRelatedResult };
  }, [allMentors, topicFromUrl, selectedFilter, searchQuery]);
  
  // Create a memoized list of all unique specialties for filter chips
  const allSpecialties = useMemo(() => {
    const specialtySet = new Set();
    allMentors.forEach(m => m.specialties?.forEach(s => specialtySet.add(s)));
    return Array.from(specialtySet).sort();
  }, [allMentors]);

  return { filteredMentors, isRelated, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter, topicFromUrl, allSpecialties };
};


// --- UI Primitives & Helpers ---
const getLabel = (obj) => obj?.title ?? obj?.name ?? obj?.label ?? obj?.category ?? "";

const Chevron = React.memo(({ open, className = "w-4 h-4" }) => (
  <motion.svg viewBox="0 0 20 20" fill="currentColor" initial={false} animate={{ rotate: open ? 180 : 0 }} className={className}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </motion.svg>
));

const Collapsible = ({ isOpen, children }) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div key="content" initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.22 }} className="overflow-hidden">
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Page Components ---
const FilterSidebar = React.memo(({ selectedFilter, onFilterSelect, topicFromUrl }) => {
  const [openCats, setOpenCats] = useState({});
  const [openTopics, setOpenTopics] = useState({});

  useEffect(() => {
    const activeFilter = selectedFilter || topicFromUrl;
    if (!activeFilter) return;

    const nextCats = {};
    const nextTopics = {};
    megaMenuData.forEach((cat, cIdx) => {
      cat.topics?.forEach((topic, tIdx) => {
        if (topic.subtopics?.some(s => s.name.toLowerCase() === activeFilter.toLowerCase())) {
          nextCats[cIdx] = true;
          nextTopics[`${cIdx}-${tIdx}`] = true;
        }
      });
    });
    setOpenCats(prev => ({...prev, ...nextCats}));
    setOpenTopics(prev => ({...prev, ...nextTopics}));
  }, [selectedFilter, topicFromUrl]);

  const toggleCat = (cIdx) => setOpenCats(s => ({ ...s, [cIdx]: !s[cIdx] }));
  const toggleTopic = (cIdx, tIdx) => setOpenTopics(s => ({ ...s, [`${cIdx}-${tIdx}`]: !s[`${cIdx}-${tIdx}`] }));

  return (
    <aside className="w-64 hidden lg:block pr-8">
      <div className="sticky top-24 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 font-manrope">Filter by Topic</h3>
        {megaMenuData.map((cat, cIdx) => {
          const catLabel = getLabel(cat);
          return (
            <div key={`cat-${cIdx}`} className="rounded-lg bg-white border border-gray-200 shadow-sm">
              <button onClick={() => toggleCat(cIdx)} className="w-full flex items-center justify-between px-3 py-2 text-left">
                <span className="font-semibold text-sm text-gray-800 tracking-wide truncate">{catLabel}</span>
                <span className="text-gray-500"><Chevron open={!!openCats[cIdx]} /></span>
              </button>
              <Collapsible isOpen={!!openCats[cIdx]}>
                <div className="px-2 pb-2">
                  {cat.topics?.map((topic, tIdx) => {
                    const topicLabel = getLabel(topic);
                    const key = `${cIdx}-${tIdx}`;
                    return (
                      <div key={`topic-${key}`} className="rounded-md">
                        <button onClick={() => toggleTopic(cIdx, tIdx)} className="w-full flex items-center justify-between text-sm font-medium text-gray-700 px-2 py-2 hover:bg-orange-50 rounded-md">
                          <span className="truncate">{topicLabel}</span>
                          <span className="text-gray-400"><Chevron open={!!openTopics[key]} className="w-3.5 h-3.5" /></span>
                        </button>
                        <Collapsible isOpen={!!openTopics[key]}>
                          <div className="pl-2 pb-2">
                            {topic.subtopics?.map((sub, sIdx) => (
                              <button key={`sub-${key}-${sIdx}`} onClick={() => onFilterSelect(sub.name)} className={`block text-left w-full px-3 py-1.5 rounded-md text-sm font-medium transition mt-1 ml-2 ${selectedFilter === sub.name ? "bg-orange-500 text-white shadow" : "bg-white text-gray-700 hover:bg-orange-100"}`}>
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
          )
        })}
        <button onClick={() => onFilterSelect(null)} className="block text-left w-full mt-1 px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 font-medium text-gray-800">
          Clear Filter
        </button>
      </div>
    </aside>
  );
});

const PageHeader = React.memo(({ isRelated, topicFromUrl }) => (
  <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 font-manrope">Find Your Mentor</h1>
    <p className="text-base sm:text-lg text-gray-600 font-lato max-w-2xl mx-auto">Browse our expert mentors. Use search, category bar, or the sidebar to filter.</p>
    {isRelated && topicFromUrl && <p className="mt-2 text-sm text-gray-500">Showing related mentors for “{topicFromUrl}”.</p>}
  </motion.div>
));

const SearchAndChips = React.memo(({ searchQuery, onSearchChange, specialties, topicFromUrl }) => (
  <>
    <motion.div className="max-w-md mx-auto mb-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search mentors by name or specialty..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
    </motion.div>
    <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <Link to="/mentors" className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${!topicFromUrl ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-orange-100"}`}>All Mentors</Link>
      {specialties.slice(0, 12).map((topic, idx) => (
        <Link key={`chip-${idx}-${topic}`} to={`/mentors?topic=${encodeURIComponent(topic)}`} className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${topicFromUrl === topic ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-orange-100"}`}>{topic}</Link>
      ))}
    </motion.div>
  </>
));

const MentorCard = React.memo(({ mentor }) => (
  <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <img src={mentor.image} alt={mentor.name || "Mentor"} className="w-full h-48 object-cover" onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}/>
    <div className="p-6 flex flex-col flex-grow">
      <h2 className="text-xl font-bold text-gray-800 mb-1 font-manrope">{mentor.name || "Mentor"}</h2>
      <p className="text-sm text-orange-600 mb-3 font-semibold">{mentor.title || "Mentor"}</p>
      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{mentor.bio}</p>
      <Link to={`/mentors/${mentor.id}`} className="mt-auto w-full text-center px-6 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 shadow-md group-hover:shadow-lg transition-all">View Profile</Link>
    </div>
  </motion.div>
));

const MentorGrid = React.memo(({ mentors, isLoading, filterQuery }) => {
  if (isLoading) return <p className="text-center text-gray-500">Loading mentors...</p>;
  if (mentors.length === 0) return (
    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700">No mentors found for "{filterQuery}"</h3>
      <p className="text-gray-500 mt-2">Try clearing filters or searching again.</p>
    </div>
  );
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      <AnimatePresence>
        {mentors.map(mentor => <MentorCard key={mentor.id || mentor.email} mentor={mentor} />)}
      </AnimatePresence>
    </motion.div>
  );
});


// --- Main Page Component (Orchestrator) ---
export default function Mentors() {
  const { allMentors, isLoading } = useMentorData();
  const { filteredMentors, isRelated, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter, topicFromUrl, allSpecialties } = useMentorFilters(allMentors);

  return (
    <div className="flex w-full min-h-screen bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <FilterSidebar selectedFilter={selectedFilter} onFilterSelect={setSelectedFilter} topicFromUrl={topicFromUrl} />
      <main className="flex-1 max-w-7xl mx-auto">
        <PageHeader isRelated={isRelated} topicFromUrl={topicFromUrl} />
        <SearchAndChips searchQuery={searchQuery} onSearchChange={setSearchQuery} specialties={allSpecialties} topicFromUrl={topicFromUrl} />
        <MentorGrid mentors={filteredMentors} isLoading={isLoading} filterQuery={topicFromUrl || selectedFilter || searchQuery} />
      </main>
    </div>
  );
}