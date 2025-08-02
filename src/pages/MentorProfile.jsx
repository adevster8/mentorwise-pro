import { useParams, Link } from "react-router-dom";
import { mentors } from "../data/mentorsData"; // ✅ pulls real data
import axios from "axios";
import { useEffect, useState } from "react";

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const selectedMentor = mentors.find((m) => m.id === id);
    setMentor(selectedMentor);
  }, [id]);

  const handleBookZoom = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/create-meeting", {
        topic: `Mentorship Session with ${mentor.name}`,
        startTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      });

      const { join_url } = res.data;
      window.open(join_url, "_blank");
    } catch (err) {
      console.error("Failed to book Zoom meeting:", err);
      alert("Something went wrong booking the meeting.");
    }
  };

  if (!mentor) return <p className="p-10 text-center">Mentor not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center text-orange-600">{mentor.name}</h2>
        <p className="text-center text-gray-600">{mentor.title}</p>
        {mentor.bio && (
          <p className="mt-2 text-center italic text-gray-500">"{mentor.bio}"</p>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to={`/message/${mentor.id}`}
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Send Message
          </Link>
          <button
            onClick={handleBookZoom}
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Book Zoom Session
          </button>
        </div>

        {mentor.fullBio && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              About {mentor.name}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{mentor.fullBio}</p>
          </div>
        )}

        {mentor.specialties && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-2">Specialties</h4>
            <ul className="list-disc list-inside text-gray-700">
              {mentor.specialties.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {mentor.successStories && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-2">Success Stories</h4>
            <ul className="list-disc list-inside text-gray-700">
              {mentor.successStories.map((story, index) => (
                <li key={index}>{story}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
