import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase"; // ← from /src/pages -> ../firebase


export default function SignUpMentor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentor");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        email,
        role,
        createdAt: new Date(),
        name: email.split('@')[0],
        title: "Life & Career Coach",
        bio: "Helping people find purpose and direction.",
        fullBio: "This is a sample full biography. Edit your profile to update your experience and approach to mentoring.",
        image: "/default-avatar.png",
        specialties: ["Career Clarity", "Confidence Building", "Life Planning"],
        exampleProjects: [
          {
            title: "Career Change Roadmap",
            duration: "4 Weeks",
            description: "A structured plan to identify your next career, update your resume, and start applying with confidence."
          },
          {
            title: "Launch Your Side Hustle",
            duration: "6 Weeks",
            description: "From idea to first customer. We'll validate your concept, build a simple launch plan, and get you started."
          },
          {
            title: "Public Speaking Confidence",
            duration: "3 Sessions",
            description: "Practice your delivery, refine your key messages, and overcome stage fright with personalized feedback."
          }
        ]
      });
      navigate("/mentor-setup");
    } catch (err) {
      setError(err.message.replace("Firebase:", "").replace("auth/", "").replace(/-/g, " ").trim());
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <img src="/hero-illustration.png" alt="MentorWise Illustration" className="w-full max-w-md mx-auto" />
          <h1 className="mt-8 text-3xl font-bold text-orange-700 font-manrope">Become a Mentor</h1>
          <p className="mt-2 text-orange-600/80 font-lato">Share your expertise and guide others on their path.</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <form onSubmit={handleSignUp} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200/50">
            <h2 className="text-3xl font-extrabold mb-6 text-slate-800 font-manrope">Create Your Mentor Account</h2>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">{error}</p>}
            
            <div className="space-y-5">
              <div>
                <label className="block mb-1.5 font-semibold text-sm text-slate-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
              </div>
              <div>
                <label className="block mb-1.5 font-semibold text-sm text-slate-700">Password</label>
                <input type="password" placeholder="6+ characters" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md font-bold transition-all transform hover:-translate-y-0.5 disabled:bg-orange-300">
              {isLoading ? "Creating Account..." : "Sign Up as Mentor"}
            </button>
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-orange-600 hover:underline">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
