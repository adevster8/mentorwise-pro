import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
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
import { onAuthStateChanged } from "firebase/auth";

export default function MessageThread() {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUserId(user?.uid || null));
    return unsub;
  }, []);

  // listen to /threads/{threadId}/messages
  useEffect(() => {
    if (!threadId) return;
    const q = query(
      collection(db, "threads", threadId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [threadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !userId || !threadId) return;

    // write message to subcollection
    await addDoc(collection(db, "threads", threadId, "messages"), {
      text: message.trim(),
      senderId: userId,
      createdAt: serverTimestamp(),
      readBy: [userId],
    });

    // update thread summary
    await updateDoc(doc(db, "threads", threadId), {
      lastMessage: { text: message.trim(), senderId: userId, createdAt: serverTimestamp() },
      updatedAt: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 flex flex-col min-h-[500px]">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Conversation</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.length === 0 ? (
            <div className="text-gray-400">No messages yet. Say hi!</div>
          ) : (
            messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow text-base max-w-xs ${
                    msg.senderId === userId ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-orange-400"
            placeholder="Type your message…"
            autoFocus
          />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
