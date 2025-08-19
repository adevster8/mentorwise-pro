// src/pages/UserDashboard/MessageThread.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function MessageThread() {
  const { threadId } = useParams();

  const [uid, setUid] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [messages, setMessages] = useState([]);
  const [listenError, setListenError] = useState("");
  const [sending, setSending] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);
  const mounted = useRef(true);

  // track mount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // auth gate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid || null);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  // guard: invalid route
  if (!threadId) {
    return <div className="p-8 text-slate-700">Invalid thread.</div>;
  }

  // subscribe to messages
  useEffect(() => {
    setListenError("");
    const q = query(
      collection(db, "threads", threadId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        try {
          const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          if (mounted.current) setMessages(arr);
        } catch (e) {
          if (mounted.current) setListenError("Failed to load messages.");
          console.error("messages onSnapshot parse error:", e);
        }
      },
      (err) => {
        if (mounted.current) setListenError(err.message || "Listener error.");
        console.error("messages onSnapshot error:", err);
      }
    );

    return () => unsub();
  }, [threadId]);

  // autoscroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // send handler
  const handleSend = async (e) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || !uid || !threadId || sending) return;

    setSending(true);
    try {
      await addDoc(collection(db, "threads", threadId, "messages"), {
        text: clean,
        senderId: uid,
        createdAt: serverTimestamp(),
        readBy: [uid],
      });

      await updateDoc(doc(db, "threads", threadId), {
        lastMessage: { text: clean, senderId: uid, createdAt: serverTimestamp() },
        updatedAt: serverTimestamp(),
      });

      if (mounted.current) setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
      // optional: toast/alert here
    } finally {
      if (mounted.current) setSending(false);
    }
  };

  // require auth to view
  if (authChecked && !uid) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 flex flex-col min-h-[520px]">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Conversation</h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {listenError && (
            <div className="text-sm text-red-600">{listenError}</div>
          )}

          {messages.length === 0 && !listenError ? (
            <div className="text-slate-400">No messages yet. Say hi!</div>
          ) : (
            messages.map((m) => {
              const mine = m.senderId === uid;
              const ts =
                m.createdAt?.toDate?.() ??
                (typeof m.createdAt?.seconds === "number"
                  ? new Date(m.createdAt.seconds * 1000)
                  : null);
              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl shadow text-base max-w-[75%] break-words ${
                      mine
                        ? "bg-orange-100 text-orange-900"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {m.text}
                    <div className="text-[11px] text-slate-400 mt-1 text-right">
                      {ts
                        ? ts.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div ref={endRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-orange-400"
            placeholder="Type your message…"
            autoFocus
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!text.trim() || !uid || sending}
            className={`px-6 py-2 rounded-xl font-semibold text-white shadow transition
              ${
                !text.trim() || !uid || sending
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
