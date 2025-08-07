import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// THE FIX: Import data from the single source of truth.
import { megaMenuData } from "../../data/megaMenuData.js";

export default function RealTalkNewPost() {
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // THE FIX: Dynamically find available subtopics based on the selected main category.
  const availableSubtopics = useMemo(() => {
    if (!selectedCategoryName) return [];
    const category = megaMenuData.find(c => c.name === selectedCategoryName);
    return category ? category.topics.flatMap(t => t.subtopics) : [];
  }, [selectedCategoryName]);

  const handleCategoryChange = (e) => {
    setSelectedCategoryName(e.target.value);
    setSelectedSubtopic(""); // Reset subtopic when main category changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategoryName || !selectedSubtopic || !title.trim() || !body.trim()) return;
    setSubmitting(true);

    // In a real app, you would send this data to Firebase.
    console.log({
      category: selectedCategoryName,
      subtopic: selectedSubtopic,
      title,
      body,
    });

    // Simulate post, then redirect to the subtopic's category page
    setTimeout(() => {
      setSubmitting(false);
      // Find the path for the selected subtopic to redirect correctly
      const subtopicData = availableSubtopics.find(s => s.name === selectedSubtopic);
      if (subtopicData) {
        navigate(subtopicData.path);
      } else {
        navigate("/realtalk"); // Fallback
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-900">
      <Helmet>
        <title>Start a New Conversation | RealTalk</title>
      </Helmet>

      <main className="max-w-xl mx-auto pt-16 px-4 pb-20">
        <motion.div
          className="bg-white p-10 rounded-2xl shadow-2xl border-2 border-orange-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-8 text-center">
            Start a New Conversation
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Category Dropdown */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Main Topic</label>
              <select
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                value={selectedCategoryName}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a main topic...</option>
                {megaMenuData.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Subtopic Dropdown */}
            {selectedCategoryName && (
              <div>
                <label className="block text-orange-700 font-semibold mb-1">Subtopic</label>
                <select
                  className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                  value={selectedSubtopic}
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                  required
                >
                  <option value="">Select a specific subtopic...</option>
                  {availableSubtopics.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Title Input */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />
            </div>
            
            {/* Body Textarea */}
            <div>
              <label className="block text-orange-700 font-semibold mb-1">Details</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                placeholder="Share your thoughts, situation, or question..."
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={2000}
                required
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-lg font-bold shadow-md transition ${
                submitting || !selectedSubtopic
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-orange-500 text-white"
              }`}
              disabled={submitting || !selectedSubtopic}
            >
              {submitting ? "Posting..." : "Start Conversation"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}