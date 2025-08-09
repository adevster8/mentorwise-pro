// src/pages/MentorProfile.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { mentors as mockMentors } from "../data/mentorsData";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const AVATAR_FALLBACK = "/default-avatar.png";

export default function MentorProfile() {
  const { id } = useParams(); // route like /mentor/:id
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let alive = true;

    async function fetchMentor() {
      setIsLoading(true);

      // 1) Try Firestore: /users/{id}
      try {
        const ref = doc(db, "users", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const d = snap.data();
          if (!alive) return;
          // Normalize to fields this page uses
          setMentor({
            uid: snap.id,
            id: snap.id,
            name: d.displayName || d.name || "Mentor",
            title: d.headline || d.title || "",
            image: d.photoURL || AVATAR_FALLBACK,
            bio: d.bio || "",
            fullBio: d.fullBio || d.longBio || "",
            specialties: d.specialties || d.tags || [],
            portfolio: d.portfolio || "",
            successStories: d.successStories || "",
            otherSubjects: d.otherSubjects || "",
            rating: d.rating ?? 5.0,
            sessions: d.sessions ?? 23,
            verified: true,
          });
          setIsLoading(false);
          return;
        }
      } catch (_) {
        // fall through to mock
      }

      // 2) Fallback to mock data
      const m =
        mockMentors.find((x) => x.id === id || x.uid === id) || null;

      if (alive) {
        if (m) {
          setMentor({
            uid: m.uid || m.id,
            id: m.id,
            name: m.name || m.displayName || "Mentor",
            title: m.title || m.headline || "",
            image: m.photo || m.photoURL || AVATAR_FALLBACK,
            bio: m.bio || "",
            fullBio: m.fullBio || "",
            specialties: m.specialties || m.tags || [],
            portfolio: m.portfolio || "",
            successStories: m.successStories || "",
            otherSubjects: m.otherSubjects || "",
            rating: m.rating ?? 5.0,
            sessions: m.sessions ?? 23,
            verified: true,
          });
        }
        setIsLoading(false);
      }
    }

    fetchMentor();
    return () => {
      alive = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 font-semibold">Mentor not found.</p>
      </div>
    );
  }

  const isOwnProfile = user?.uid === mentor.uid;

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Profile Header */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 via-blue-50 to-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={mentor.image || AVATAR_FALLBACK}
                alt={mentor.name}
                className="w-32 h-32 rounded-2xl object-cover border border-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = AVATAR_FALLBACK;
                }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#181C2A] font-manrope">
                  {mentor.name || "Mentor"}
                </h1>
                <p className="text-lg text-orange-600 font-semibold mt-1">
                  {mentor.title || "Mentor"}
                </p>
                {mentor.bio && (
                  <p className="text-slate-600 mt-3 text-base">{mentor.bio}</p>
                )}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5 bg-white/70 border border-slate-200 px-3 py-1 rounded-full">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    {(mentor.rating ?? 5.0).toFixed ? (mentor.rating).toFixed(1) : mentor.rating} · {mentor.sessions ?? 0} sessions
                  </span>
                  {mentor.verified && (
                    <span className="inline-flex items-center gap-1.5 bg-white/70 border border-slate-200 px-3 py-1 rounded-full">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                      Vetted Mentor
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-10">
            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <Link
  to={`/message-mentor?mentorId=${mentor.uid}`}
  className="w-full text-center bg-blue-100 hover:bg-blue-200 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
>
  <ChatBubbleLeftRightIcon className="w-5 h-5" />
  Send Message
</Link>
                <Link
                  to={`/schedule-call?mentorId=${mentor.uid}`}
                  className="w-full text-center bg-slate-900 hover:bg-slate-900/90 text-white font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                  Book Zoom Call
                </Link>
              </div>
            )}

            {/* About Section */}
            {mentor.fullBio && (
              <div>
                <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">
                  About {mentor.name}
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {mentor.fullBio}
                </p>
              </div>
            )}

            {/* Specialties */}
            {mentor.specialties?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {typeof s === "string" ? s : s?.name || ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {mentor.portfolio && (
              <div>
                <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Portfolio</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{mentor.portfolio}</p>
              </div>
            )}

            {/* Success Stories */}
            {mentor.successStories && (
              <div>
                <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Success Stories</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{mentor.successStories}</p>
              </div>
            )}

            {/* Other Subjects */}
            {mentor.otherSubjects && (
              <div>
                <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">
                  Other Topics I Can Help With
                </h2>
                <p className="text-slate-700 whitespace-pre-wrap">{mentor.otherSubjects}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
