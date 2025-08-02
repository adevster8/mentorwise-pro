import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const mentors = {
  "1": { name: "Alex Johnson", title: "Life & Career Coach", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  "2": { name: "Sara Kim", title: "Finance & Mindset Mentor", image: "https://randomuser.me/api/portraits/women/55.jpg" },
  // Add the rest if needed
};

export default function MentorProfile() {
  const { id } = useParams();
  const mentor = mentors[id];
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time) {
      navigate("/confirmation", {
        state: { name: mentor.name, date, time },
      });
    } else {
      alert("Please select a date and time.");
    }
  };

  if (!mentor) return <div className="p-6">Mentor not found.</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-orange-50 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full object-cover" />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-orange-600">{mentor.name}</h1>
            <p className="text-gray-600">{mentor.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="block">
            <span className="font-semibold">Choose a Date:</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border p-2 rounded"
              required
            />
          </label>

          <label className="block">
            <span className="font-semibold">Choose a Time:</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full border p-2 rounded"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
          >
            Book Session
          </button>
        </form>
      </div>
    </div>
  );
}
