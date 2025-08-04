// src/pages/UserDashboard/Schedule.jsx

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      date: "2025-08-06",
      time: "3:00 PM – 4:00 PM",
      title: "Zoom Coaching with Mia Chen",
      description: "Website strategy + landing page funnel improvements.",
    },
    {
      date: "2025-08-10",
      time: "1:00 PM – 1:45 PM",
      title: "Career Pivot Call with Chris",
      description: "Discussing move from marketing to product management.",
    },
  ];

  const selectedISO = selectedDate.toISOString().split("T")[0];
  const todayAppointment = appointments.find((a) => a.date === selectedISO);

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
              return appointments.some((a) => a.date === d)
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
          {todayAppointment ? (
            <>
              <h2 className="text-xl font-bold text-orange-600 mb-2">
                {todayAppointment.title}
              </h2>
              <p className="text-gray-800 mb-1">
                <strong>Date:</strong> {selectedDate.toDateString()}
              </p>
              <p className="text-gray-800 mb-3">
                <strong>Time:</strong> {todayAppointment.time}
              </p>
              <p className="text-gray-600">{todayAppointment.description}</p>
            </>
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


