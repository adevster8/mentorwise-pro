// src/pages/UserDashboard/Logout.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Optionally display error message to user
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <h1 className="text-xl text-orange-600 font-semibold">
        Logging you out...
      </h1>
    </div>
  );
}
