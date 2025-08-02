// src/pages/MessageAMentor.jsx

import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function MessageAMentor() {
  const { id: mentorId } = useParams(); // mentor's ID from URL
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

    const mentee = auth.currentUser;

    if (!mentee) {
      alert("You must be logged in to send a message.");
      return;
    }

    const menteeId = mentee.uid;

    // Consistent thread ID no matter who starts
    const threadId = mentorId < menteeId ? `${mentorId}_${menteeId}` : `${menteeId}_${mentorId}`;

    try {
      // Set or update thread info
      await setDoc(doc(db, "threads", threadId), {
        participants: [mentorId, menteeId],
        lastUpdated: serverTimestamp(),
      });

      // Add message to subcollection
      await addDoc(collection(db, "threads", threadId, "messages"), {
        text: message,
        senderId: menteeId,
        recipientId: mentorId,
        timestamp: serverTimestamp(),
      });

      setMessage("");
      navigate("/messages");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Send a Message</h2>
      <form onSubmit={handleSend}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="w-full p-4 border rounded mb-4"
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
