// src/pages/UserDashboard/Schedule.jsx
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

  // Highlight dates with appointments
  const appointmentDates = bookings.map(b => b.date);

  const selectedISO = selectedDate.toISOString().split("T")[0];
  const todayAppointments = bookings.filter((a) => a.date === selectedISO);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold text-orange-600 mb-10 text-center font-manrope"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Your Schedule
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Calendar Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 rounded-3xl shadow-2xl border-t-4 border-blue-100 p-8"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-5 font-manrope text-center">
              Select a Date
            </h2>
            <div className="flex justify-center">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date }) => {
                  const d = date.toISOString().split("T")[0];
                  return appointmentDates.includes(d)
                    ? "bg-orange-200 font-bold !rounded-xl"
                    : "";
                }}
                className="w-full text-sm rounded-2xl border-none shadow-none"
              />
            </div>
            <p className="mt-6 text-gray-500 text-center text-sm">
              Click any highlighted date to view your appointments.
            </p>
          </motion.div>

          {/* Appointment Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 rounded-3xl shadow-2xl border-t-4 border-orange-100 p-8 flex flex-col"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-5 font-manrope text-center">
              Appointments for <span className="text-orange-600">{selectedDate.toLocaleDateString()}</span>
            </h2>
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appt) => (
                <div key={appt.id} className="mb-8 bg-orange-50 rounded-xl shadow p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">
                    {appt.title || "Mentor Session"}
                  </h3>
                  <p className="text-gray-800 mb-1">
                    <strong>Date:</strong> {selectedDate.toDateString()}
                  </p>
                  <p className="text-gray-800 mb-2">
                    <strong>Time:</strong> {appt.time}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Mentor:</strong> {appt.mentorId}
                  </p>
                  {appt.zoomLink && (
                    <a
                      href={appt.zoomLink}
                      className="inline-block mt-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-6 py-2 rounded-lg shadow transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Zoom Call
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 italic text-lg text-center">
                  No appointments on this date.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
