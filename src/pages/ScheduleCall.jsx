import { useState } from "react";
import { motion } from "framer-motion";

export default function ScheduleCall() {
  const [form, setForm] = useState({ name: "", email: "", topic: "" });
  const [loading, setLoading] = useState(false);
  const [zoomLink, setZoomLink] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/schedule-zoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setZoomLink(data.zoomLink);
    } catch (err) {
      alert("Error creating Zoom call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-16 text-gray-800">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Form Section */}
        <div className="w-full md:w-2/5 bg-white p-8 rounded-xl shadow-lg h-[600px] flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">
            Schedule a Zoom Session
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
              <textarea
                name="topic"
                placeholder="What would you like to discuss?"
                value={form.topic}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-orange-500 text-white px-5 py-3 rounded hover:bg-orange-600 transition-colors duration-300 w-full"
                disabled={loading}
              >
                {loading ? "Scheduling..." : "Schedule Call"}
              </button>

              {zoomLink && (
                <div className="mt-4 bg-green-100 p-3 rounded text-green-700">
                  Zoom link created! 👉{" "}
                  <a
                    href={zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold"
                  >
                    Join Zoom Call
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-3/5 h-[600px] rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/schedule-zoom-pic.png"
            alt="Schedule a Zoom Call"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
