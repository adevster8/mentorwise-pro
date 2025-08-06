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
      {/* Top Section: Form + Image */}
<motion.div
  className="w-full flex flex-col md:flex-row gap-10 items-stretch px-0"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  style={{ maxWidth: "100%" }} // ENSURE no artificial constraint!
>
  {/* Left: Form, true left edge */}
  <div className="w-full md:w-[60%] bg-white p-10 rounded-2xl shadow-xl flex flex-col justify-between">
    <h1 className="text-3xl font-bold mb-6 text-orange-600">Become a Mentor</h1>
    <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
      <div>
        <label className="block mb-2 font-medium">Full Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full p-3 mb-4 border border-gray-300 rounded" />

        <label className="block mb-2 font-medium">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full p-3 mb-4 border border-gray-300 rounded" />

        <label className="block mb-2 font-medium">Expertise</label>
        <input type="text" name="expertise" value={form.expertise} onChange={handleChange} required className="w-full p-3 mb-4 border border-gray-300 rounded" />

        <label className="block mb-2 font-medium">Bio</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows="6" required className="w-full p-3 mb-6 border border-gray-300 rounded" />
      </div>
      <button className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition">Learn More</button>
    </form>
  </div>

  {/* Right: Photo, true right edge */}
  <motion.div
    className="w-full md:w-[40%] flex items-center justify-center"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    style={{ minWidth: 0 }} // Prevent image shrinking!
  >
    <img
      src="/Become-a-Mentor.jpg"
      alt="Become a Mentor"
      className="w-full h-full max-h-[700px] object-cover rounded-2xl shadow-md"
      style={{ objectPosition: "center" }}
    />
  </motion.div>
</motion.div>



      {/* New Full-Width Section Below */}
<section className="relative h-[500px] md:h-[600px] mt-20 overflow-hidden rounded-2xl shadow-2xl">
  {/* Background Image */}
  <img
    src="/find-clients.png"
    alt="Find Clients"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Slightly lighter overlay */}
  <div className="absolute inset-0 bg-black/40 transition-all duration-500" />

  {/* Centered bottom text box */}
  <div className="relative z-10 h-full flex items-end justify-center px-6 pb-14 text-center">
    <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl max-w-2xl transition-all duration-500">
      <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 mb-4 leading-snug font-heading tracking-tight">
        Attract Clients, Structure Long-Term Growth
      </h2>
      <p className="text-gray-800 text-base md:text-lg font-body leading-relaxed">
        Learn how to design flexible coaching offers — from one-off strategy calls to structured 12-week transformations. Our platform helps you match with clients seeking everything from quick clarity to deep change.
      </p>
    </div>
  </div>
</section>

    </div>
  );
}
