// src/pages/MentorProfile.jsx (Polished & Optimized Version)
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { db, auth } from "../firebase";
import { mentors as mockMentors } from "../data/mentorsData";
import {
  CalendarDaysIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, StarIcon,
} from "@heroicons/react/24/outline";

const AVATAR_FALLBACK = "/default-avatar.png";

// --- Custom Hooks (Separating Logic from UI) ---
/**
 * Fetches and normalizes a mentor's profile data from Firestore with a mock data fallback.
 * @param {string} mentorId - The ID of the mentor to fetch.
 */
const useMentorProfile = (mentorId) => {
  const [mentor, setMentor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mentorId) {
      setIsLoading(false);
      setMentor(null);
      return;
    }

    const fetchMentor = async () => {
      setIsLoading(true);

      // 1. Attempt to fetch from Firestore
      try {
        const docRef = doc(db, "users", mentorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const d = docSnap.data();
          // Normalize Firestore data into a consistent shape
          setMentor({
            id: docSnap.id,
            name: d.displayName || d.name || "Mentor",
            title: d.headline || d.title || "",
            image: d.photoURL || d.image || AVATAR_FALLBACK,
            bio: d.bio || "",
            fullBio: d.fullBio || d.longBio || "",
            specialties: d.specialties || d.tags || [],
            portfolio: d.portfolio || "",
            successStories: d.successStories || "",
            otherSubjects: d.otherSubjects || "",
            rating: d.rating ?? 5.0,
            sessions: d.sessions ?? 0,
            verified: d.verified ?? true,
          });
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error fetching mentor from Firestore:", error);
        // Fall through to mock data on error
      }

      // 2. Fallback to mock data if not found in Firestore
      const mockMentor = mockMentors.find(m => m.id === mentorId);
      if (mockMentor) {
        setMentor({ ...mockMentor, image: mockMentor.image || AVATAR_FALLBACK });
      } else {
        setMentor(null);
      }
      setIsLoading(false);
    };

    fetchMentor();
  }, [mentorId]);

  return { mentor, isLoading };
};


// --- UI Components (Componentization & Readability) ---
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <p className="text-slate-500 animate-pulse">Loading profile...</p>
  </div>
);

const NotFoundState = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-slate-700">Mentor Not Found</h1>
      <p className="text-slate-500 mt-2">We couldn't find the profile you were looking for.</p>
      <Link to="/mentors" className="mt-4 inline-block bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-600">
        Back to Mentors
      </Link>
    </div>
  </div>
);

const ProfileHeader = React.memo(({ mentor }) => (
  <div className="p-8 md:p-10 bg-gradient-to-br from-orange-50 via-blue-50 to-white">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-32 h-32 rounded-2xl object-cover border-2 border-white shadow-lg"
        onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
      />
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:4xl font-extrabold text-[#181C2A] font-manrope">{mentor.name}</h1>
        <p className="text-lg text-orange-600 font-semibold mt-1">{mentor.title}</p>
        {mentor.bio && <p className="text-slate-600 mt-3 text-base">{mentor.bio}</p>}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5 bg-white/70 border border-slate-200 px-3 py-1 rounded-full">
            <StarIcon className="w-4 h-4 text-amber-500" />
            {mentor.rating?.toFixed(1) ?? '5.0'} · {mentor.sessions} sessions
          </span>
          {mentor.verified && (
            <span className="inline-flex items-center gap-1.5 bg-white/70 border border-slate-200 px-3 py-1 rounded-full">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-600" /> Vetted Mentor
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
));

const ActionButtons = React.memo(({ mentorId, isOwnProfile }) => {
  if (isOwnProfile) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link to={`/message-mentor?mentorId=${mentorId}`} className="w-full text-center bg-blue-100 hover:bg-blue-200 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition">
        <ChatBubbleLeftRightIcon className="w-5 h-5" /> Send Message
      </Link>
      <Link to={`/schedule-call?mentorId=${mentorId}`} className="w-full text-center bg-slate-900 hover:bg-slate-900/90 text-white font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition">
        <CalendarDaysIcon className="w-5 h-5" /> Book Zoom Call
      </Link>
    </div>
  );
});

const ProfileSection = React.memo(({ title, content }) => {
  if (!content) return null;
  return (
    <div>
      <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">{title}</h2>
      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
});

const SpecialtiesSection = React.memo(({ specialties }) => {
  if (!specialties || specialties.length === 0) return null;
  return (
    <div>
      <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Specialties</h2>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty, idx) => (
          <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
});

/* --------------------- NEW: Programs Section (Published only) --------------------- */
const PRICE_HINT = {
  "pay-in-full-basic": "$249.00",
  "milestones-starter": "$99.00 per milestone",
  "retainer-standard": "$499.00",
  "time-pack-5h": "$390.00",
};

function ProgramsSection({ mentorId, isOwnProfile }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "programs"),
          where("mentorId", "==", mentorId),
          where("status", "==", "published")
        );
        const snap = await getDocs(q);
        const vals = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (alive) setRows(vals);
      } catch (e) {
        console.error("Programs load failed:", e);
        if (alive) setRows([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [mentorId]);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Programs</h2>
        <div className="text-slate-600">Loading programs…</div>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div>
        <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Programs</h2>
        {isOwnProfile ? (
          <p className="text-slate-600">
            You don’t have any <span className="font-semibold">published</span> programs yet.
            Create or publish one in{" "}
            <Link to="/mentor-dashboard/programs" className="text-orange-700 font-semibold underline">
              Mentor Dashboard → Programs
            </Link>.
          </p>
        ) : (
          <p className="text-slate-600">This mentor hasn’t published any programs yet.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#181C2A] mb-3 font-manrope">Programs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rows.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-slate-900">{p.title}</div>
                <div className="text-slate-700 mt-1">{p.blurb}</div>
                <div className="text-sm text-slate-600 mt-2">
                  {p.duration && <span className="mr-3"><span className="font-semibold">Duration:</span> {p.duration}</span>}
                  {p.level && <span><span className="font-semibold">Level:</span> {p.level}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Plan</div>
                <div className="text-sm font-semibold text-slate-800">{p.planKey}</div>
                {p.priceHint ? (
                  <div className="text-xs text-slate-500 mt-1">{p.priceHint}</div>
                ) : PRICE_HINT[p.planKey] ? (
                  <div className="text-xs text-slate-500 mt-1">from {PRICE_HINT[p.planKey]}</div>
                ) : null}
              </div>
            </div>
            <div className="mt-4">
              <Link
                to={`/program/${p.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 text-white font-bold px-4 py-2.5 hover:bg-orange-700 transition shadow-sm w-full sm:w-auto"
              >
                View & Purchase
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page Component (Orchestrator) ---
export default function MentorProfile() {
  const { id } = useParams();
  const { mentor, isLoading } = useMentorProfile(id);
  const [user] = useAuthState(auth);

  if (isLoading) return <LoadingState />;
  if (!mentor) return <NotFoundState />;

  const isOwnProfile = user?.uid === mentor.id;

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 md:py-20">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ProfileHeader mentor={mentor} />
          
          <div className="p-8 md:p-10 space-y-10">
            <ActionButtons mentorId={mentor.id} isOwnProfile={isOwnProfile} />
            {/* NEW: Published programs for this mentor */}
            <ProgramsSection mentorId={mentor.id} isOwnProfile={isOwnProfile} />
            <ProfileSection title={`About ${mentor.name}`} content={mentor.fullBio} />
            <SpecialtiesSection specialties={mentor.specialties} />
            <ProfileSection title="Portfolio" content={mentor.portfolio} />
            <ProfileSection title="Success Stories" content={mentor.successStories} />
            <ProfileSection title="Other Topics I Can Help With" content={mentor.otherSubjects} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
