import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, query, where, onSnapshot, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Availability() {
  const [slots, setSlots] = useState([]);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Get logged in mentor's ID
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
    });
    return unsub;
  }, []);

  // Load existing availability slots for this mentor
  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "availability"),
      where("mentorId", "==", userId)
    );
    const unsub = onSnapshot(q, snapshot => {
      setSlots(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [userId]);

  // Add new slot
  async function handleAddSlot(e) {
    e.preventDefault();
    if (!date || !time || !userId) return;
    const dateTime = new Date(`${date}T${time}:00`);
    await addDoc(collection(db, "availability"), {
      mentorId: userId,
      date: date,
      time: time,
      timestamp: Timestamp.fromDate(dateTime),
      booked: false,
    });
    setDate("");
    setTime("");
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Set Your Availability</h1>
      <form onSubmit={handleAddSlot} className="flex gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="rounded px-3 py-2 border"
          required
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="rounded px-3 py-2 border"
          required
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded" type="submit">
          Add Slot
        </button>
      </form>
      <div>
        <h2 className="font-bold mb-2">Your Available Slots</h2>
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {slot.date} at {slot.time} {slot.booked ? "(Booked)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
