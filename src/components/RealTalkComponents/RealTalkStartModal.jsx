import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { realTalkCategories } from "../../data/realTalkCategories"; 

export default function RealTalkStartModal() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Find the current category object
  const currentCategoryObj = realTalkCategories.find(c => c.name === category);
  const subcategories = currentCategoryObj ? currentCategoryObj.subcategories : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !subcategory || !title.trim() || !body.trim()) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      navigate(`/realtalk/category/${encodeURIComponent(category)}`);
      setCategory("");
      setSubcategory("");
      setTitle("");
      setBody("");
    }, 900);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl px-6 py-3 shadow transition-all focus:ring-2 focus:ring-blue-300"
        type="button"
      >
        + Start Conversation
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 w-[95vw] max-w-xl mx-auto relative border-2 border-orange-200"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.23 }}
            >
              <button
                className="absolute top-4 right-4 text-2xl text-orange-400 hover:text-orange-700"
                onClick={() => setOpen(false)}
                type="button"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-blue-600 mb-5 text-center">
                Start a New Conversation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-orange-700 font-semibold mb-1">Category</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setSubcategory(""); }}
                    required
                  >
                    <option value="">Select a category...</option>
                    {realTalkCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {subcategories.length > 0 && (
                  <div>
                    <label className="block text-orange-700 font-semibold mb-1">Subcategory</label>
                    <select
                      className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                      value={subcategory}
                      onChange={e => setSubcategory(e.target.value)}
                      required
                    >
                      <option value="">Select a subcategory...</option>
                      {subcategories.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}
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
                <div>
                  <label className="block text-orange-700 font-semibold mb-1">Details</label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                    placeholder="Share your situation, story, or what you want to discuss..."
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    maxLength={2000}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-lg font-bold shadow-md transition
                    ${submitting
                      ? "bg-blue-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-orange-400 text-white"}`}
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Start Conversation"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  }