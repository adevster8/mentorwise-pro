// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD79XlcemG8PE-Upr3i5NrkwvjB3jvfyh0",
  authDomain: "mentorwise-app.firebaseapp.com",
  projectId: "mentorwise-app",
  storageBucket: "mentorwise-app.appspot.com", // <-- fixed here!
  messagingSenderId: "401056955437",
  appId: "1:401056955437:web:4adf84e3900b0e0a76cca4"
  // measurementId is optional
};

// 🔌 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Firebase Authentication
export const auth = getAuth(app);

// 🗂️ Firestore Database
export const db = getFirestore(app);