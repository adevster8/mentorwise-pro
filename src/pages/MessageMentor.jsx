import { useState } from "react";
import { useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import { addDoc, collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function MessageMentor() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mentorId = params.get("mentor") || "";

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // Feedback for the user

  // --- Helper to get or create a thread (all inline, no extra files needed) ---
  async function getOrCreateThread(currentUserId, mentorId) {
    // Always sort for consistent threadId (prevents duplicates)
    const participants = [currentUserId, mentorId].sort();
    const threadId = participants.join("_");
    const threadRef = doc(db, "threads", threadId);

    // Check if thread exists
    const threadSnap = await getDoc(threadRef);
    if (!threadSnap.exists()) {
      await setDoc(threadRef, {
        participants,
        lastMessage: "",
        lastTimestamp: serverTimestamp(),
      });
    }
    return threadRef;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!auth.currentUser) {
      setStatus("You must be signed in to send a message.");
      return;
    }

    const currentUserId = auth.currentUser.uid;

    try {
      // 1. Get or create thread
      const threadRef = await getOrCreateThread(currentUserId, mentorId);

      // 2. Add message to subcollection
      await addDoc(collection(threadRef, "messages"), {
        sender: currentUserId,
        recipient: mentorId,
        content: message,
        createdAt: serverTimestamp(),
      });

      // 3. Update thread metadata
      await setDoc(
        threadRef,
        {
          participants: [currentUserId, mentorId].sort(),
          lastMessage: message,
          lastTimestamp: Date.now(),
        },
        { merge: true }
      );

      setStatus("Message sent successfully!");
      setMessage("");
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e7f2fa] via-[#f4faff] to-[#e3e9f3] flex items-center justify-center py-20">
      <div className="bg-white/95 max-w-xl w-full p-10 rounded-3xl shadow-xl border-t-4 border-orange-100 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-orange-600 mb-6 text-center">Send a Message</h1>
        <form onSubmit={handleSend} className="w-full">
          <textarea
            className="w-full min-h-[120px] rounded-xl border border-gray-200 p-4 text-base mb-4 focus:ring-2 focus:ring-orange-200 transition"
            placeholder="Write your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow transition"
          >
            Send Message
          </button>
        </form>
        {status && (
          <div className="mt-6 text-center text-orange-500 font-semibold">{status}</div>
        )}
        <div className="w-full text-sm text-gray-400 mt-4 text-center">
          {mentorId ? `Message will be sent to mentor ID: ${mentorId}` : "No mentor selected."}
        </div>
      </div>
    </div>
  );
}