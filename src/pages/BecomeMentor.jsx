import { useState } from "react";
import { motion } from "framer-motion";

export default function BecomeMentor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name}! We'll review your application soon.`);
    setForm({ name: "", email: "", expertise: "", bio: "" });
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12 text-gray-800">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Form */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-xl shadow-lg flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-6 text-orange-600">
            Become a Mentor
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />

              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />

              <label className="block mb-2 font-medium">Expertise</label>
              <input
                type="text"
                name="expertise"
                value={form.expertise}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />

              <label className="block mb-2 font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="6"
                required
                className="w-full p-3 mb-6 border border-gray-300 rounded"
              />
            </div>

            <button className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition">
  Learn More
</button>
          </form>
        </div>

        {/* Right: Image */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/Become-a-Mentor.png"
            alt="Become a Mentor"
            className="w-full h-full max-h-[700px] object-cover rounded-xl shadow-md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
