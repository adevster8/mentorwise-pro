import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { mentors as mockMentors } from "../data/mentorsData";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const AVATAR_FALLBACK = "/default-avatar.png";

export default function Mentors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTopic = queryParams.get("topic");

  const [liveMentors, setLiveMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [isRelated, setIsRelated] = useState(false);

  // Fetch Firestore mentors once
  useEffect(() => {
    async function fetchMentors() {
      const q = query(collection(db, "users"), where("role", "==", "mentor"));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name || d.email || "Mentor",
          title: d.title || "Mentor",
          image: d.image || AVATAR_FALLBACK,
          bio: d.bio || "A new MentorWise coach.",
          specialties: d.specialties || [],
          email: d.email,
          ...d
        };
      });
      setLiveMentors(results);
    }
    fetchMentors();
  }, []);

  // Merge and filter
  useEffect(() => {
    // Combine mock and live, but don't double-show same email or id
    const allMentors = [
      ...liveMentors.filter(
        (live) => !mockMentors.some((mock) =>
          (mock.email && live.email && mock.email === live.email) ||
          mock.id === live.id
        )
      ),
      ...mockMentors
    ];

    // Filtering logic (same as yours)
    if (selectedTopic) {
      let filtered = allMentors.filter((mentor) =>
        mentor.specialties?.some(
          (s) => s.toLowerCase() === selectedTopic.toLowerCase()
        )
      );
      if (filtered.length === 0) {
        filtered = allMentors.filter((mentor) =>
          mentor.specialties?.some(
            (s) => s.toLowerCase().includes(selectedTopic.toLowerCase())
          )
        );
        setIsRelated(true);
      } else {
        setIsRelated(false);
      }
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(allMentors);
      setIsRelated(false);
    }
  }, [selectedTopic, mockMentors, liveMentors]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#e7f2fa] via-[#f4faff] to-[#e3e9f3] py-16">
      <div className="max-w-[1500px] mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10 tracking-tight font-manrope drop-shadow-sm">
          Meet Our Mentors
        </h1>
        {selectedTopic && (
          <p className="text-center text-base text-gray-700 mb-6">
            {isRelated && <span className="text-red-400 font-bold">No exact matches. </span>}
            Showing mentors for: <span className="font-semibold text-orange-500">{selectedTopic}</span>
          </p>
        )}
        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-500">
            No mentors found for this topic.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white/95 rounded-3xl shadow-2xl border-t-4 border-orange-100 p-8 flex flex-col items-center transition-all hover:scale-105 hover:shadow-[0_12px_56px_0_rgba(255,186,116,0.09)]"
              >
                <img
                  src={mentor.image || AVATAR_FALLBACK}
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow mb-4"
                  onError={e => { e.target.onerror = null; e.target.src = AVATAR_FALLBACK; }}
                  style={{
                    boxShadow: "0 8px 36px 0 rgba(87,165,247,0.07), 0 1px 0 rgba(255,186,116,0.11)",
                  }}
                />
                <h2 className="text-2xl font-bold text-orange-600 mb-1 font-manrope">
                  {mentor.name || "Mentor"}
                </h2>
                <p className="text-base text-gray-600 mb-1 font-semibold">{mentor.title || "Mentor"}</p>
                <p className="text-base text-gray-500 italic mb-4">"{mentor.bio}"</p>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {mentor.specialties?.map((topic) => (
                    <button
                      key={topic}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-orange-200 transition"
                      onClick={() => window.location.href = `/mentors?topic=${encodeURIComponent(topic)}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                <Link
                  to={`/mentors/${mentor.id}`}
                  className="inline-block px-6 py-3 bg-orange-600 text-white rounded-xl font-bold text-base hover:bg-orange-700 shadow transition-all mt-auto"
                  style={{ alignSelf: "center" }}
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
