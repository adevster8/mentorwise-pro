import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with Firebase Auth
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Get the user profile from Firestore
      const userDocRef = doc(db, "users", userCred.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Redirect based on role
        if (userData.role === "mentor") {
          navigate("/mentor-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Fallback: Go to general dashboard if no user doc found
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">
      <form onSubmit={handleSignIn} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600">
          Sign In
        </button>
      </form>
    </div>
  );
}