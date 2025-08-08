// src/pages/MentorSetup.jsx

import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function MentorSetup() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const removeSpecialty = (t) => setSpecialties(specialties.filter((s) => s !== t));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      setError("Not logged in.");
      return;
    }
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: name || user.email,
        title: title || "Mentor",
        bio: bio || "A new MentorWise coach.",
        specialties,
        image: image || "/default-avatar.png",
      });
      navigate("/mentor-dashboard");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50 px-4 py-12">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-orange-600 font-manrope">
          Complete Your Mentor Profile
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Title (e.g. Career Coach, Business Mentor)"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short bio (show your style, personality, experience!)"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="block font-semibold mb-2 text-gray-700">Specialties (add a few):</label>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. Career Clarity"
            value={specialtyInput}
            onChange={(e) => setSpecialtyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
          />
          <button
            type="button"
            onClick={addSpecialty}
            className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600 font-bold"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((t, i) => (
            <span
              key={i}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"
            >
              {t}
              <button type="button" onClick={() => removeSpecialty(t)} className="text-red-500 font-bold">×</button>
            </span>
          ))}
        </div>

        <label className="block font-semibold mb-2 text-gray-700">Profile Photo</label>
        <input type="file" accept="image/*" className="mb-4" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" className="w-24 h-24 rounded-full mb-4 object-cover shadow-md" />}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-bold text-lg transition-all duration-300"
        >
          Complete Signup
        </button>
      </motion.form>
    </div>
  );
}
