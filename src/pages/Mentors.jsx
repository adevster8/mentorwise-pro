import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { mentors as mockMentors } from "../data/mentorsData";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from 'framer-motion';

const AVATAR_FALLBACK = "/default-avatar.png";

export default function Mentors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTopic = queryParams.get("topic");

  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [isRelated, setIsRelated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // <-- New search state

  // Fetch and merge mentors once
  useEffect(() => {
    async function fetchAndSetMentors() {
      setIsLoading(true);
      const q = query(collection(db, "users"), where("role", "==", "mentor"));
      const snapshot = await getDocs(q);
      const liveMentors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const combined = [
        ...liveMentors,
        ...mockMentors.filter(mock => !liveMentors.some(live => live.id === mock.id || (live.email && mock.email === live.email)))
      ].map(m => ({ ...m, image: m.image || AVATAR_FALLBACK }));

      setAllMentors(combined);
      setIsLoading(false);
    }
    fetchAndSetMentors();
  }, []);

  // Filtering logic combined with search
  useEffect(() => {
    if (isLoading) return;

    let baseFiltered;

    if (selectedTopic) {
      let exactMatches = allMentors.filter(mentor =>
        mentor.specialties?.some(s => s.toLowerCase() === selectedTopic.toLowerCase())
      );

      if (exactMatches.length > 0) {
        baseFiltered = exactMatches;
        setIsRelated(false);
      } else {
        const relatedMatches = allMentors.filter(mentor =>
          mentor.specialties?.some(s => s.toLowerCase().includes(selectedTopic.toLowerCase()))
        );
        baseFiltered = relatedMatches;
        setIsRelated(true);
      }
    } else {
      baseFiltered = allMentors;
      setIsRelated(false);
    }

    // Apply search filter on top of topic filtering
    if (searchQuery.trim() !== "") {
      const lowerSearch = searchQuery.toLowerCase();
      baseFiltered = baseFiltered.filter(mentor =>
        (mentor.name?.toLowerCase().includes(lowerSearch)) ||
        (mentor.specialties?.some(s => s.toLowerCase().includes(lowerSearch)))
      );
    }

    setFilteredMentors(baseFiltered);
  }, [selectedTopic, allMentors, isLoading, searchQuery]);

  // Unique list of specialties for filter bar
  const allSpecialties = useMemo(() => {
    const specialtiesSet = new Set();
    allMentors.forEach(mentor => {
      mentor.specialties?.forEach(spec => specialtiesSet.add(spec));
    });
    return Array.from(specialtiesSet).sort();
  }, [allMentors]);

  return (
    <div className="w-full min-h-screen bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* === HEADER === */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 font-manrope">
            Find Your Mentor
          </h1>
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            Browse our community of experts. Click a category below to filter by specialty.
          </p>
        </div>

        {/* === SEARCH BAR === */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name or specialty..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* === CATEGORY FILTER BAR === */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        </div>

        {/* === RESULTS AREA === */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">No Mentors Found for "{selectedTopic || searchQuery}"</h3>
            <p className="text-gray-500 mt-2">Try selecting another category, using different search terms, or viewing all mentors.</p>
          </div>
        ) : (
          <>
            {selectedTopic && (
              <p className="text-center text-sm text-gray-600 mb-6">
                {isRelated && <span className="font-bold text-orange-500">No exact matches found. </span>}
                Showing mentors for: <span className="font-semibold text-gray-800">{selectedTopic}</span>
              </p>
            )}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {filteredMentors.map((mentor) => (
                <motion.div
                  layout
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
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
                      className="mt-4 w-full text-center px-6 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 shadow-md group-hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
