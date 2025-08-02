import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { mentors } from "../data/mentorsData"; // ✅ Ensure this path matches casing exactly

export default function Mentors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTopic = queryParams.get("topic");

  const [filteredMentors, setFilteredMentors] = useState(mentors);

  useEffect(() => {
    if (selectedTopic) {
      const filtered = mentors.filter((mentor) =>
        mentor.specialties?.some((s) =>
          s.toLowerCase().includes(selectedTopic.toLowerCase())
        )
      );
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(mentors);
    }
  }, [selectedTopic]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Meet Our Mentors
      </h1>

      {selectedTopic && (
        <p className="text-center text-sm text-gray-600 mb-4">
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
              <Link
                to={`/mentors/${mentor.id}`} // ✅ Corrected route path
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
