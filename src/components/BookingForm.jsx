import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BookingForm({ mentorName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to backend here in the future
    console.log("Booking submitted:", form);
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Book a session with {mentorName}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Your full name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
}
