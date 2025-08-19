import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, onSnapshot, Timestamp } from "firebase/firestore";

import { auth, db } from "../../firebase";
import { CalendarDays, Clock } from "lucide-react";
import { motion } from "framer-motion";


export default function Availability() {
  const [slots, setSlots] = useState([]);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "availability"),
      where("mentorId", "==", userId)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setSlots(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [userId]);

  async function handleAddSlot(e) {
    e.preventDefault();
    if (!date || !time || !userId) return;
    const dateTime = new Date(`${date}T${time}:00`);
    await addDoc(collection(db, "availability"), {
      mentorId: userId,
      date,
      time,
      timestamp: Timestamp.fromDate(dateTime),
      booked: false,
    });
    setDate("");
    setTime("");
  }

  return (
    <motion.div
      className="min-h-screen bg-blue-50 px-6 py-12 font-manrope"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Set Your Availability
        </h1>

        <form
          onSubmit={handleAddSlot}
          className="bg-white shadow-lg rounded-2xl p-8 mb-10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <CalendarDays className="w-5 h-5 text-orange-500" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Select Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
            >
              Add Availability Slot
            </button>
          </div>
        </form>

        {/* Visual Calendar Display */}
        {slots.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 mb-10">
            <h2 className="text-xl font-semibold text-orange-600 mb-4">
              Your Scheduled Availability
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <li
                  key={slot.id}
                  className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    📅 {slot.date}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ⏰ {slot.time}{" "}
                    {slot.booked ? (
                      <span className="text-red-500 font-medium">(Booked)</span>
                    ) : (
                      <span className="text-green-600 font-medium">(Open)</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional Calendar Visual Placeholder (Future Upgrade Option) */}

      </div>
    </motion.div>
  );
}
