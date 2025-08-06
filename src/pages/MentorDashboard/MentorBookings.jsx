import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MentorBookings() {
  const [bookings, setBookings] = useState([]);
  const [mentorId, setMentorId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) setMentorId(user.uid);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!mentorId) return;
    const q = query(
      collection(db, "bookings"),
      where("mentorId", "==", mentorId)
    );
    const unsub = onSnapshot(q, snapshot => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [mentorId]);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Your Upcoming Bookings</h1>
      <ul>
        {bookings.length === 0 && (
          <li className="text-gray-500">No upcoming bookings.</li>
        )}
        {bookings.map(b => (
          <li key={b.id} className="mb-2 bg-white rounded shadow p-4">
            <div>
              <strong>Date:</strong> {b.date} <strong>Time:</strong> {b.time}
            </div>
            <div>
              <strong>User:</strong> {b.userId}
            </div>
            {b.zoomLink && (
              <div>
                <a
                  href={b.zoomLink}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zoom Link
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
