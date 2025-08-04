import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mentors } from "../data/mentorsData";

export default function Mentors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTopic = queryParams.get("topic"); // could be "AI", "Resume", etc.

  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [isRelated, setIsRelated] = useState(false);

  useEffect(() => {
    if (selectedTopic) {
      // Try exact match first
      let filtered = mentors.filter((mentor) =>
        mentor.specialties?.some(
          (s) => s.toLowerCase() === selectedTopic.toLowerCase()
        )
      );
      if (filtered.length === 0) {
        // If no exact match, do a partial match (for "related" results)
        filtered = mentors.filter((mentor) =>
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
      setFilteredMentors(mentors);
      setIsRelated(false);
    }
  }, [selectedTopic]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Meet Our Mentors
      </h1>
      {selectedTopic && (
        <p className="text-center text-sm text-gray-600 mb-4">
          {isRelated && <span>No exact matches. </span>}
          Showing mentors for:{" "}
          <span className="font-medium">{selectedTopic}</span>
        </p>
      )}
      {filteredMentors.length === 0 ? (
        <p className="text-center text-gray-500">
          No mentors found for this topic.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-orange-600">
                {mentor.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{mentor.title}</p>
              <p className="text-sm text-gray-600 italic mb-4">
                "{mentor.bio}"
              </p>
              {/* Show clickable specialties */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {mentor.specialties?.map((topic) => (
                  <button
                    key={topic}
                    className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs hover:bg-orange-200 transition"
                    onClick={() => window.location.href=`/mentors?topic=${encodeURIComponent(topic)}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <Link
                to={`/mentors/${mentor.id}`}
                className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
