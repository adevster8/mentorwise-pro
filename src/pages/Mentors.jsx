// src/pages/Mentors.jsx (FIXED & Fully Responsive)
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { mentors as mockMentors } from "../data/mentorsData";
import { megaMenuData } from "../data/megaMenuData";

const AVATAR_FALLBACK = "/default-avatar.png";

// --- Custom Hooks ---

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
        const combined = [...liveMentors, ...mockMentors.filter(mock => !liveMentors.some(live => live.id === mock.id || live.email === mock.email))].map(m => ({ ...m, image: m.image || AVATAR_FALLBACK }));
        setAllMentors(combined);
      } catch (err) {
        console.error("Mentor fetch failed, using mock data:", err);
        setAllMentors(mockMentors.map(m => ({ ...m, image: m.image || AVATAR_FALLBACK })));
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchMentors();
  }, []);

  return { allMentors, isLoading };
};

// --- REWRITTEN HOOK TO FIX THE INITIALIZATION ERROR ---
const useMentorFilters = (allMentors) => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const topicFromUrl = useMemo(() => queryParams.get("topic"), [queryParams]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const memoizedData = useMemo(() => {
    let base = allMentors;
    let isRelatedResult = false;
    const activeFilter = selectedFilter || topicFromUrl;
    if (activeFilter) {
      const lowercasedFilter = activeFilter.toLowerCase();
      const exactMatches = base.filter(m => m.specialties?.some(s => s.toLowerCase() === lowercasedFilter));
      if (exactMatches.length > 0) {
        base = exactMatches;
      } else {
        base = base.filter(m => m.specialties?.some(s => s.toLowerCase().includes(lowercasedFilter)));
        isRelatedResult = base.length > 0;
      }
    }
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      base = base.filter(m => m.name?.toLowerCase().includes(lowercasedQuery) || m.specialties?.some(s => s.toLowerCase().includes(lowercasedQuery)));
    }
    return { filteredMentors: base, isRelated: isRelatedResult };
  }, [allMentors, topicFromUrl, selectedFilter, searchQuery]);

  return {
    ...memoizedData,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    topicFromUrl
  };
};

// --- UI Primitives & Helper Icons ---

const getLabel = (obj) => obj?.title ?? obj?.name ?? obj?.label ?? obj?.category ?? "";
const ChevronIcon = React.memo(({ open, className = "w-4 h-4" }) => ( <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" initial={false} animate={{ rotate: open ? 180 : 0 }} className={className}><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z" clipRule="evenodd" /></motion.svg>));
const SearchIcon = ({ className = "w-5 h-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>);
const EmptyStateIcon = ({ className = "w-16 h-16" }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>);
const FilterIcon = ({ className = "w-5 h-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>);
const CloseIcon = ({ className = "w-6 h-6" }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

const Collapsible = ({ isOpen, children }) => (
  <AnimatePresence initial={false}>
    {isOpen && ( <motion.div key="content" initial="collapsed" animate="open" exit="collapsed" variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">{children}</motion.div>)}
  </AnimatePresence>
);

const SidebarContent = ({ setSelectedFilter, selectedFilter, topicFromUrl, onDone = () => {} }) => {
    const [openCats, setOpenCats] = useState({});
    const [openTopics, setOpenTopics] = useState({});

    useEffect(() => {
        const activeFilter = selectedFilter || topicFromUrl;
        if (!activeFilter) return;
        const nextCats = {}; const nextTopics = {};
        megaMenuData.forEach((cat, cIdx) => {
            cat.topics?.forEach((topic, tIdx) => {
                if (topic.subtopics?.some(s => s.name.toLowerCase() === activeFilter.toLowerCase())) {
                    nextCats[cIdx] = true; nextTopics[`${cIdx}-${tIdx}`] = true;
                }
            });
        });
        setOpenCats(prev => ({ ...prev, ...nextCats }));
        setOpenTopics(prev => ({ ...prev, ...nextTopics }));
    }, [selectedFilter, topicFromUrl]);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        onDone();
    };

    return (
        <>
            {megaMenuData.map((cat, cIdx) => (
                <div key={`cat-${cIdx}`}>
                    <button onClick={() => setOpenCats(s => ({ ...s, [cIdx]: !s[cIdx] }))} className="w-full flex items-center justify-between p-2 text-left rounded-md hover:bg-slate-800">
                        <span className="font-semibold text-sm text-slate-100">{getLabel(cat)}</span>
                        <span className="text-slate-400"><ChevronIcon open={!!openCats[cIdx]} /></span>
                    </button>
                    <Collapsible isOpen={!!openCats[cIdx]}>
                        <div className="pl-3 mt-1 space-y-1">
                            {cat.topics?.map((topic, tIdx) => {
                                const key = `${cIdx}-${tIdx}`;
                                return (
                                    <div key={key}>
                                        <button onClick={() => setOpenTopics(s => ({ ...s, [key]: !s[key] }))} className="w-full flex items-center justify-between text-sm font-medium text-slate-200 p-2 hover:bg-slate-800 rounded-md">
                                            <span className="truncate">{getLabel(topic)}</span>
                                            <span className="text-slate-400"><ChevronIcon open={!!openTopics[key]} className="w-3.5 h-3.5" /></span>
                                        </button>
                                        <Collapsible isOpen={!!openTopics[key]}>
                                            <div className="pl-4 py-1">
                                                {topic.subtopics?.map((sub, sIdx) => (<button key={`${key}-${sIdx}`} onClick={() => handleFilterClick(sub.name)} className={`block text-left w-full px-3 py-1.5 rounded-md text-sm transition-colors mt-1 ${selectedFilter === sub.name ? "bg-orange-500 text-white font-semibold" : "text-slate-300 hover:bg-slate-700"}`}>{sub.name}</button>))}
                                            </div>
                                        </Collapsible>
                                    </div>
                                );
                            })}
                        </div>
                    </Collapsible>
                </div>
            ))}
            {(selectedFilter || topicFromUrl) && (<div className="pt-3 border-t border-slate-700"><button onClick={() => handleFilterClick(null)} className="w-full mt-1 px-4 py-2 text-sm rounded-md bg-slate-700 hover:bg-slate-600 font-semibold text-white transition-colors">Clear Filter</button></div>)}
        </>
    );
};

const DesktopSidebar = (props) => (
    <aside className="w-80 flex-shrink-0">
        <div className="sticky top-28 space-y-3 bg-slate-900 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-white px-1 pb-2 border-b border-slate-700">Browse Categories</h3>
            <SidebarContent {...props} />
        </div>
    </aside>
);

const MobileFilterDrawer = ({ isOpen, onClose, ...props }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                <motion.aside initial={{ x: "-100%" }} animate={{ x: "0%" }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 left-0 h-full w-80 bg-slate-900 shadow-2xl z-50 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <h3 className="text-lg font-bold text-white">Filter by Topic</h3>
                        <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"><CloseIcon /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2"><SidebarContent {...props} onDone={onClose} /></div>
                </motion.aside>
            </>
        )}
    </AnimatePresence>
);

const PageHeader = React.memo(({ isRelated, topicFromUrl }) => ( <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}><h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-3">Find Your Mentor</h1><p className="text-lg text-slate-600 max-w-2xl mx-auto">Connect with industry experts who can guide you to success.</p>{isRelated && topicFromUrl && (<p className="mt-3 text-sm text-orange-600 bg-orange-100 rounded-full py-1 px-3 inline-block">Showing related mentors for “{topicFromUrl}”</p>)}</motion.div>));
const MentorCard = React.memo(({ mentor }) => ( <motion.div layout initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeOut" }} className="bg-white rounded-xl shadow-sm border border-transparent overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-orange-500"><div className="h-40 lg:h-48 overflow-hidden"><img src={mentor.image} alt={mentor.name || "Mentor"} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}/></div><div className="p-4 lg:p-6 flex flex-col flex-grow"><h2 className="text-lg lg:text-xl font-bold text-slate-800 mb-1 truncate">{mentor.name || "Mentor"}</h2><p className="text-sm text-orange-600 mb-3 font-semibold">{mentor.title || "Mentor"}</p><div className="flex flex-wrap gap-2 mb-4">{mentor.specialties?.slice(0, 2).map(spec => (<span key={spec} className="px-2.5 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded-full">{spec}</span>))}</div><p className="text-slate-600 text-sm mb-5 flex-grow line-clamp-2 lg:line-clamp-3">{mentor.bio}</p><Link to={`/mentors/${mentor.id}`} className="mt-auto w-full text-center px-4 py-2 lg:px-6 lg:py-2.5 bg-slate-800 text-white rounded-lg font-semibold text-sm hover:bg-slate-900 shadow-sm group-hover:shadow-lg transition-all">View Profile</Link></div></motion.div>));
const SkeletonCard = () => ( <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div className="h-40 lg:h-48 bg-gray-200 animate-pulse"></div><div className="p-4 lg:p-6"><div className="h-5 lg:h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div><div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div><div className="flex flex-wrap gap-2 mb-4"><div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div><div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div></div><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-5"></div><div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div></div></div>);
const MentorGrid = React.memo(({ mentors, isLoading, filterQuery }) => { if (isLoading) { return (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">{Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}</div>); } if (mentors.length === 0) { return ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border col-span-full"><EmptyStateIcon className="mx-auto text-gray-400" /><h3 className="mt-4 text-xl font-semibold text-gray-800">No Mentors Found</h3><p className="text-gray-500 mt-2">We couldn't find any mentors matching your criteria for "{filterQuery}".</p></motion.div>); } return (<motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8"><AnimatePresence>{mentors.map(mentor => <MentorCard key={mentor.id || mentor.email} mentor={mentor} />)}</AnimatePresence></motion.div>); });

// --- Main Page Component ---
export default function Mentors() {
  const { allMentors, isLoading } = useMentorData();
  const filterProps = useMentorFilters(allMentors);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
        <MobileFilterDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} {...filterProps} />

        <div className="xl:flex xl:flex-row xl:items-start">
            <div className="hidden xl:block pt-12 pl-4 sm:pl-6 lg:pl-8">
                <DesktopSidebar {...filterProps} />
            </div>

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="xl:hidden flex items-center mb-6">
                    <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <FilterIcon />
                        Filter Mentors
                    </button>
                </div>

                <PageHeader isRelated={filterProps.isRelated} topicFromUrl={filterProps.topicFromUrl} />
            
                <div className="max-w-2xl mx-auto mb-12 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon className="text-gray-400" /></div>
                    <input type="text" value={filterProps.searchQuery} onChange={e => filterProps.setSearchQuery(e.target.value)} placeholder="Search by name, specialty..." className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" />
                </div>

                <MentorGrid mentors={filterProps.filteredMentors} isLoading={isLoading} filterQuery={filterProps.searchQuery || filterProps.selectedFilter || filterProps.topicFromUrl || "All"} />
            </main>
        </div>
    </div>
  );
}