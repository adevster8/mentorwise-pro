// src/pages/MessageMentor.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
// NOTE: make sure the path + casing matches your file: ../services/chatService
import { ensureThread, onMessages, sendMessage } from "../services/chatService.js";

export default function MessageMentor() {
  const [me, setMe] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [uiError, setUiError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mentorId = params.get("mentorId");

  // Redirect guard (avoid loops)
  const redirectedOnce = useRef(false);

  // Missing mentorId guard
  useEffect(() => {
    if (!mentorId) {
      setUiError("Missing mentorId in the URL. Use /message-mentor?mentorId=MENTOR_UID");
      setLoading(false);
    }
  }, [mentorId]);

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (!redirectedOnce.current) {
          redirectedOnce.current = true;
          navigate(
            "/signin?redirect=" + encodeURIComponent(location.pathname + location.search),
            { replace: true }
          );
        }
        return;
      }
      setMe(user);
    });
    return () => unsub();
  }, [auth, navigate, location.pathname, location.search]);

  // Load mentor profile (graceful fallback)
  useEffect(() => {
    if (!mentorId) return;

    let alive = true;
    setLoading(true);

    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", mentorId));
        if (!alive) return;

        if (snap.exists()) {
          const d = snap.data();
          setMentor({
            uid: mentorId,
            displayName: d.displayName || d.name || "Mentor",
            photoURL: d.photoURL || "/default-avatar.png",
          });
        } else {
          // allow chat even if profile doc is missing
          setMentor({
            uid: mentorId,
            displayName: "Mentor",
            photoURL: "/default-avatar.png",
          });
        }
      } catch (err) {
        console.error("Load mentor error:", err);
        if (alive) setUiError(err.message || "Failed to load mentor.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [mentorId]);

  // Ensure thread + subscribe to messages
  useEffect(() => {
    if (!me?.uid || !mentor?.uid) return;

    let unsubscribe = () => {};
    (async () => {
      try {
        const { threadId } = await ensureThread(
          { uid: me.uid, displayName: me.displayName, photoURL: me.photoURL },
          { uid: mentor.uid, displayName: mentor.displayName, photoURL: mentor.photoURL, role: "mentor" }
        );
        setThreadId(threadId);
        unsubscribe = onMessages(threadId, setMessages);
      } catch (err) {
        console.error("ensureThread/onMessages error:", err);
        setUiError(err.message || "Could not start chat.");
      }
    })();

    return () => unsubscribe();
  }, [me?.uid, mentor?.uid]);

  async function handleSend(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || !threadId || !me?.uid) return;

    try {
      await sendMessage(threadId, { text: clean, senderId: me.uid });
      setText("");
    } catch (err) {
      console.error("sendMessage error:", err);
      setUiError(err.message || "Failed to send message.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="animate-pulse text-slate-500">Loading…</div>
      </div>
    );
  }

  if (uiError) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="max-w-lg bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          <div className="font-semibold mb-1">Something went wrong</div>
          <div className="text-sm">{uiError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-white font-manrope">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100"
        >
          <header className="flex items-center gap-3 mb-6">
            <img
              src={mentor?.photoURL || "/default-avatar.png"}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Message {mentor?.displayName || "Mentor"}
              </h1>
              <p className="text-slate-500 text-sm">
                Start a conversation. Be specific about your goals.
              </p>
            </div>
          </header>

          <div className="h-[48vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 mb-4">
            {messages.length === 0 && (
              <div className="text-slate-400 text-sm text-center mt-6">
                Say hi and introduce yourself.
              </div>
            )}

            {messages.map((m) => {
              const mine = m.senderId === me?.uid;
              return (
                <div
                  key={m.id}
                  className={`mb-2 flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                      mine ? "bg-blue-100 text-slate-900" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition"
            >
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
