import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';

// This component is now self-contained and does not need to import category data.

export default function RealTalkStartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // In a real app, you might fetch categories here, but for now, we navigate to a general "new post" page.
  const handleStartConversation = () => {
    setIsOpen(false);
    navigate("/realtalk/new"); // Navigate to the page for creating a new post
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <PlusIcon className="w-5 h-5" />
        Start a Conversation
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-extrabold text-slate-800 font-manrope text-center mb-4">
                Start a New Conversation
              </h2>
              <p className="text-center text-slate-600 mb-6 font-lato">
                Ready to share something? Your post will be visible to the community.
              </p>

              {/* In a real app, you might have a form here. For now, it's a confirmation. */}
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-4">
                  You'll be taken to a new page to write your post.
                </p>
                <button
                  onClick={handleStartConversation}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Continue to Post Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}