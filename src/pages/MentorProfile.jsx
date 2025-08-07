// src/pages/MentorProfile.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { mentors as mockMentors } from "../data/mentorsData";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { ShieldCheckIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline';

const AVATAR_FALLBACK = "/default-avatar.png";

// Mock data for the new "Example Projects" section
const exampleProjects = [
  { title: "Career Change Roadmap", duration: "4 Weeks", description: "A structured plan to identify your next career, update your resume, and start applying with confidence." },
  { title: "Launch Your Side Hustle", duration: "6 Weeks", description: "From idea to first customer. We'll validate your concept, build a simple launch plan, and get you started." },
  { title: "Public Speaking Confidence", duration: "3 Sessions", description: "Practice your delivery, refine your key messages, and overcome stage fright with personalized feedback." }
];

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);

useEffect(() => {
  let isMounted = true; // Safety for React state
  async function fetchMentor() {
    setIsLoading(true);
    try {
      // Try Firestore first
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (isMounted) setMentor({ id: docSnap.id, ...docSnap.data() });
        if (isMounted) setIsLoading(false);  // <-- MAKE SURE THIS RUNS!
        return;
      }
    } catch (e) {
      // Ignore and try fallback
    }
    // Try Mock fallback
    const foundMock = mockMentors.find((m) => m.id === id);
    if (foundMock) {
      if (isMounted) setMentor(foundMock);
    }
    if (isMounted) setIsLoading(false); // <-- MAKE SURE THIS ALWAYS RUNS!
  }
  fetchMentor();
  return () => { isMounted = false; }; // Prevents state update after unmount
}, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">Loading profile...</p></div>;
  }

  if (!mentor) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-600 font-semibold">Mentor not found.</p></div>;
  }

  const isOwnProfile = user?.uid === mentor.id;

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* --- Profile Header --- */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 to-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={mentor.image || AVATAR_FALLBACK}
                alt={mentor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
                onError={e => { e.target.onerror = null; e.target.src = AVATAR_FALLBACK; }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-manrope">{mentor.name || "Mentor"}</h1>
                <p className="text-lg text-orange-600 font-semibold mt-1">{mentor.title || "Mentor"}</p>
                <p className="text-slate-600 mt-3 text-base">{mentor.bio || "A new MentorWise coach."}</p>
                {/* Credibility Header */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><ShieldCheckIcon className="w-4 h-4 text-green-500" /> Vetted Mentor</span>
                  <span className="flex items-center gap-1.5"><StarIcon className="w-4 h-4 text-yellow-500" /> 5.0 (23 Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* --- Action Buttons --- */}
            {!isOwnProfile && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <Link to={`/message/${mentor.id}`} className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" /> Send Message
                </Link>
                <Link to={`/schedule-call?mentor=${mentor.id}`} className="w-full text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5" /> View Availability
                </Link>
              </div>
            )}

            {/* --- About Section --- */}
            {mentor.fullBio && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-3 font-manrope">About {mentor.name}</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{mentor.fullBio}</p>
              </div>
            )}
            
            {/* --- Example Projects Section --- */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-manrope">Example Projects I Can Help With</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exampleProjects.map(project => (
                  <div key={project.title} className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-4">
                    <p className="font-bold text-slate-700">{project.title}</p>
                    <p className="text-xs font-semibold text-orange-600 uppercase mt-1 mb-2">{project.duration}</p>
                    <p className="text-sm text-slate-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Specialties --- */}
            {mentor.specialties && mentor.specialties.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3 font-manrope">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((s) => (
                    <span key={s} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}