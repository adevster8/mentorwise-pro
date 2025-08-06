import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Get logged in user ID
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
    });
    return unsub;
  }, []);

  // Load bookings for this user
  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId)
    );
    const unsub = onSnapshot(q, snapshot => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [userId]);

  // Format for calendar highlighting
  const appointmentDates = bookings.map(b => b.date);

  const selectedISO = selectedDate.toISOString().split("T")[0];
  const todayAppointments = bookings.filter((a) => a.date === selectedISO);

  return (
    <div className="min-h-screen bg-orange-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Your Schedule</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {
              const d = date.toISOString().split("T")[0];
              return appointmentDates.includes(d)
                ? "bg-orange-200 font-semibold"
                : "";
            }}
            className="w-full text-sm rounded-md"
          />
        </motion.div>

        {/* Appointment Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          {todayAppointments.length > 0 ? (
            todayAppointments.map((appt) => (
              <div key={appt.id} className="mb-6">
                <h2 className="text-xl font-bold text-orange-600 mb-2">
                  {appt.title || "Mentor Session"}
                </h2>
                <p className="text-gray-800 mb-1">
                  <strong>Date:</strong> {selectedDate.toDateString()}
                </p>
                <p className="text-gray-800 mb-3">
                  <strong>Time:</strong> {appt.time}
                </p>
                <p className="text-gray-600">
                  Mentor: {appt.mentorId}
                </p>
                {/* If you store a Zoom link, show it here */}
                {appt.zoomLink && (
                  <a
                    href={appt.zoomLink}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Zoom Call
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No appointments on this date.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}