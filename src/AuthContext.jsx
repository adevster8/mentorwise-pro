// src/AuthContext.jsx (Polished & Enhanced)
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase"; // ← AuthContext is in /src, so "./firebase"


const AuthContext = createContext();

/**
 * Provides authentication state and user profile data to the entire application.
 * It handles the loading state and fetches user-specific data from Firestore.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // For Firestore profile data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch their profile from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        setUser(firebaseUser);
        if (userDoc.exists()) {
          setUserData({ id: userDoc.id, ...userDoc.data() });
        } else {
          // Handle case where user exists in Auth but not Firestore
          console.warn("User document not found in Firestore for UID:", firebaseUser.uid);
          setUserData(null);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // useMemo prevents unnecessary re-renders of consuming components
  const value = useMemo(
    () => ({ user, userData, loading }),
    [user, userData, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to easily access the authentication context.
 * Provides the Firebase auth user, Firestore user profile data, and loading state.
 * @returns {{user: import("firebase/auth").User | null, userData: object | null, loading: boolean}}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}