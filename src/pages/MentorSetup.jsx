import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MentorSetup() {
    console.log("MentorSetup rendered. Current user:", auth.currentUser);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [image, setImage] = useState(""); // just store filename, e.g. "/default-avatar.png"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle specialties as tags
  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };
  const removeSpecialty = (t) => setSpecialties(specialties.filter((s) => s !== t));

  // Optional: handle file upload (for MVP, just store "/default-avatar.png")
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For real uploads, you'd integrate Firebase Storage. For now:
      setImage(URL.createObjectURL(file)); // Preview only, not persistent!
      // In production: upload to storage, get public URL, save in Firestore.
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
    <div className="min-h-screen flex justify-center items-center bg-orange-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">Complete Your Mentor Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Title (e.g. Career Coach, Business Mentor)"
          className="w-full mb-4 p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short bio (show your style, personality, experience!)"
          className="w-full mb-4 p-3 border rounded"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label className="block font-semibold mb-2">Specialties (add a few):</label>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l"
            placeholder="e.g. Career Clarity"
            value={specialtyInput}
            onChange={(e) => setSpecialtyInput(e.target.value)}
            onKeyDown={e => (e.key === "Enter" ? (e.preventDefault(), addSpecialty()) : null)}
          />
          <button type="button" onClick={addSpecialty} className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600">
            Add
          </button>
        </div>
        <div className="flex flex-wrap mb-4 gap-2">
          {specialties.map((t, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
              {t}
              <button type="button" onClick={() => removeSpecialty(t)} className="ml-2 text-red-500">x</button>
            </span>
          ))}
        </div>
        <label className="block font-semibold mb-2">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Preview" className="w-24 h-24 rounded-full mb-4 object-cover" />
        )}
        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 font-bold text-lg">
          Complete Signup
        </button>
      </form>
    </div>
  );
}
