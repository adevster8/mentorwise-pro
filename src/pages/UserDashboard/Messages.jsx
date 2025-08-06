import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const [threads, setThreads] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get the current logged-in user's ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return unsubscribe;
  }, []);

  // Listen to all threads where user is a participant
  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "threads"),
      where("participants", "array-contains", userId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setThreads(
        snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0))
      );
    });
    return unsubscribe;
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen bg-orange-50 p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Messages</h1>
        <p>Please sign in to view your conversations.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Messages</h1>
      <p className="mb-8">View and manage your conversations with mentors here.</p>

      {threads.length === 0 ? (
        <div className="text-gray-500 mt-10">No conversations yet.</div>
      ) : (
        <ul className="space-y-4 max-w-xl">
          {threads.map(thread => {
            // Show the "other" participant (not the user)
            const otherParticipant = thread.participants.find(p => p !== userId);
            return (
              <li
                key={thread.id}
                className="bg-white rounded-xl shadow flex items-center px-6 py-4 cursor-pointer hover:bg-orange-100 transition"
                onClick={() => navigate(`/dashboard/messages/${thread.id}`)}
              >
                <div className="flex-1">
                  <div className="font-semibold text-lg text-orange-700">
                    {/* Optionally fetch/display mentor/user name */}
                    Chat with {otherParticipant}
                  </div>
                  <div className="text-gray-600 truncate">
                    {thread.lastMessage || "No messages yet."}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {thread.lastTimestamp
                      ? new Date(thread.lastTimestamp).toLocaleString()
                      : ""}
                  </div>
                </div>
                {/* Unread badge (optional, requires more logic) */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
