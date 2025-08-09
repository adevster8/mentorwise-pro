import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
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

export default function MentorMessageThread() {
  const { threadId } = useParams();
  const [uid, setUid] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    return unsub;
  }, []);

  useEffect(() => {
    if (!threadId) return;
    const qy = query(
      collection(db, "threads", threadId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(qy, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(items);
    });
    return unsub;
  }, [threadId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || !uid || !threadId) return;

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

    setText("");
  };

  if (!uid) return <div className="p-6 text-slate-600">Sign in to reply.</div>;

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow p-5 min-h-[60vh] flex flex-col">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Conversation</h2>

        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.length === 0 ? (
            <div className="text-slate-400">No messages yet.</div>
          ) : (
            messages.map((m) => {
              const mine = m.senderId === uid;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-2 rounded-2xl shadow max-w-xs ${mine ? "bg-orange-100 text-orange-900" : "bg-slate-100 text-slate-800"}`}>
                    {m.text}
                    <div className="text-[11px] text-slate-400 mt-1 text-right">
                      {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message…"
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
