import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

// --- Custom Hook for Sign-In Logic ---
// Encapsulates all state and Firebase logic for signing in a user.
const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", userCred.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().role === "mentor") {
        navigate("/mentor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Clean up Firebase error messages for better user experience
      const friendlyMessage = err.message
        .replace("Firebase: ", "")
        .replace("Error ", "")
        .replace(/\(auth\/.*\)\.?/, "")
        .trim();
      setError(friendlyMessage || "An unknown error occurred.");
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isLoading, handleSignIn };
};

// --- Subcomponents for Readability ---

const BrandingPanel = () => (
  <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-12">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      {/* UPDATE: Image changed as requested */}
      <img src="/sign-up-pic.jpg" alt="MentorWise Illustration" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" />
      <h1 className="mt-8 text-3xl font-bold text-orange-800 font-manrope">Welcome Back to MentorWise</h1>
      <p className="mt-2 text-orange-700/80 font-lato">Your journey to growth continues here.</p>
    </motion.div>
  </div>
);

const SignInForm = () => {
  const { email, setEmail, password, setPassword, error, isLoading, handleSignIn } = useSignIn();

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      <form onSubmit={handleSignIn} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200/80">
        <div className="flex items-center gap-3 mb-6">
            <LogIn className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-extrabold text-slate-800 font-manrope">Sign In</h2>
        </div>
        
        {error && <p className="bg-orange-500 text-orage-500 p-3 rounded-lg text-sm mb-4 animate-pulse">{error}</p>}
        
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1.5 font-semibold text-sm text-slate-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1.5 font-semibold text-sm text-slate-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md font-bold transition-all transform hover:-translate-y-0.5 disabled:bg-orange-300 disabled:cursor-not-allowed">
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-orange-600 hover:underline">Sign Up</Link>
        </p>
      </form>
    </motion.div>
  );
};


// --- Main Page Component ---
export default function SignIn() {
  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <BrandingPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <SignInForm />
      </div>
    </div>
  );
}