import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AVATAR_FALLBACK = "/default-avatar.png";

export default function MentorCard({ mentor }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/30 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-orange-200/50 hover:-translate-y-2"
    >
      <img
        src={mentor.image || AVATAR_FALLBACK}
        alt={mentor.name}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
        onError={e => { e.target.onerror = null; e.target.src = AVATAR_FALLBACK; }}
      />
      <h2 className="text-xl font-bold text-gray-800 mb-1 font-manrope">
        {mentor.name || "Mentor"}
      </h2>
      <p className="text-sm text-orange-600 mb-3 font-semibold">{mentor.title || "Mentor"}</p>
      
      <div className="flex flex-wrap justify-center gap-1.5 mb-4 h-12 overflow-hidden">
        {mentor.specialties?.slice(0, 3).map((topic, idx) => (
          <span
            key={idx}
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {topic}
          </span>
        ))}
      </div>

      <Link
        to={`/mentors/${mentor.id}`}
        className="w-full text-center px-6 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 shadow-md hover:shadow-lg transition-all"
      >
        View Profile
      </Link>

      <Link
        to={`/message-mentor?mentorId=${mentor.uid || mentor.id}`}
        className="mt-3 w-full text-center px-6 py-2.5 bg-blue-100 text-gray-900 rounded-lg font-bold text-sm hover:bg-blue-200 shadow-md hover:shadow-lg transition-all flex justify-center items-center"
      >
        Send Message
      </Link>
    </motion.div>
  );
}
