import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


export default function MessageThread() {
  const { threadId } = useParams(); // URL param for thread
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  });
  return () => unsubscribe();
}, []);

// 2. Listen for real-time messages for this thread
useEffect(() => {
  if (!threadId) return; // Don't run if there's no thread
  const q = query(
    collection(db, "messages"),
    where("threadId", "==", threadId),
    orderBy("timestamp")
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, [threadId]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !userId) return;
    await addDoc(collection(db, "messages"), {
      threadId,
      senderId: userId,
      text: message,
      timestamp: Date.now(),
      read: false, // mark as unread for recipient
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
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow text-base max-w-xs ${
                    msg.senderId === userId
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : ""}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Message send box */}
        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-orange-400"
            placeholder="Type your message…"
            autoFocus
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
