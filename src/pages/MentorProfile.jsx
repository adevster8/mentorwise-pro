import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { mentors as mockMentors } from "../data/mentorsData";
import { useAuthState } from "react-firebase-hooks/auth";

const AVATAR_FALLBACK = "/default-avatar.png";

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchMentor() {
      // 1. Try Firestore first
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMentor({
            id: docSnap.id,
            name: data.name || data.email || "Mentor",
            title: data.title || "Mentor",
            image: data.image || AVATAR_FALLBACK,
            bio: data.bio || "A new MentorWise coach.",
            fullBio: data.fullBio || "",
            specialties: data.specialties || [],
            successStories: data.successStories || [],
            ...data,
          });
          setNotFound(false);
          return;
        }
      } catch (e) {
        // continue to fallback
      }

      // 2. Fall back to mock data
      const foundMock = mockMentors.find((m) => m.id === id);
      if (foundMock) {
        setMentor(foundMock);
        setNotFound(false);
      } else {
        setMentor(null);
        setNotFound(true);
      }
    }
    fetchMentor();
  }, [id]);

  if (notFound) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center bg-[#e7f2fa] text-lg text-gray-600 font-semibold">
        Mentor not found.
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center bg-[#e7f2fa]">
        <span className="text-gray-400 text-xl">Loading...</span>
      </div>
    );
  }

  // Only show the buttons if viewing someone else's profile
  const isOwnProfile = user?.uid === mentor.id;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#e7f2fa] via-[#f4faff] to-[#e3e9f3] py-16">
      <div className="max-w-3xl mx-auto bg-white/90 shadow-xl rounded-3xl p-10 flex flex-col items-center border-t-4 border-orange-100">
        <img
          src={mentor.image || AVATAR_FALLBACK}
          alt={mentor.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-orange-200 shadow mb-4"
          onError={e => { e.target.onerror = null; e.target.src = AVATAR_FALLBACK; }}
        />
        <h1 className="text-3xl font-bold text-orange-600 mb-2 font-manrope">{mentor.name}</h1>
        <p className="text-lg text-gray-700 mb-2 font-semibold">{mentor.title}</p>
        <p className="text-base text-gray-500 italic mb-6">{mentor.bio}</p>
        
        {/* ACTION BUTTONS */}
        {!isOwnProfile && (
          <div className="flex gap-4 mb-8">
            <a
              href={`/message/${mentor.id}`}
              className="bg-orange-100 text-orange-700 px-8 py-4 rounded-lg text-lg font-lato font-bold shadow-md hover:bg-orange-200 transition"
              style={{ minWidth: 150, textAlign: "center" }}
            >
              Send Message
            </a>
            <a
              href={`/schedule-call?mentor=${mentor.id}`}
              className="bg-blue-100 text-gray-900 px-8 py-4 rounded-lg text-lg font-lato font-bold shadow-md hover:bg-blue-200 transition"
              style={{ minWidth: 150, textAlign: "center" }}
            >
              View Availability
            </a>
          </div>
        )}

        <div className="w-full">
          {mentor.fullBio && (
            <>
              <h2 className="text-xl font-bold text-orange-500 mb-2">About</h2>
              <p className="text-gray-700 mb-4">{mentor.fullBio}</p>
            </>
          )}
          {mentor.specialties && mentor.specialties.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-orange-500 mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.specialties.map((s) => (
                  <span key={s} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
          {mentor.successStories && mentor.successStories.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-orange-500 mb-2">Success Stories</h2>
              <ul className="list-disc list-inside text-gray-700">
                {mentor.successStories.map((story, idx) => (
                  <li key={idx}>{story}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
