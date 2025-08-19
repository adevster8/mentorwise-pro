import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// ✅ import analytics helpers
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD79XlcemG8PE-Upr3i5NrkwvjB3jvfyh0",
  authDomain: "mentorwise-app.firebaseapp.com",
  projectId: "mentorwise-app",
  storageBucket: "mentorwise-app.firebasestorage.app",
  messagingSenderId: "401056955437",
  appId: "1:401056955437:web:4adf84e3900b0e0a76cca4",
  measurementId: "G-FGYHB8K84Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ only initialize analytics in the browser if supported
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  });
}