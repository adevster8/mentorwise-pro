// src/pages/UserDashboard/Bookings.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { Calendar, Video, Clock, User, AlertTriangle } from "lucide-react";

// ---------- Date helpers ----------
const toJSDate = (val) => {
  if (!val) return null;

  // Firestore Timestamp
  if (typeof val === "object" && typeof val.toDate === "function") {
    try {
      return val.toDate();
    } catch {}
  }

  // Already JS Date
  if (val instanceof Date) return val;

  // ISO string "2025-08-18T15:00:00Z" or "2025-08-18"
  if (typeof val === "string") {
    // try parse ISO
    const d = new Date(val);
    if (!Number.isNaN(d.getTime())) return d;
    // if only date + separate time on the booking object
  }

  // Some schemas store { date: "YYYY-MM-DD", time: "HH:mm" }
  if (typeof val === "object" && (val.date || val.time)) {
    const ymd = typeof val.date === "string" ? val.date : "";
    const hm = typeof val.time === "string" ? val.time : "00:00";
    const d = new Date(`${ymd}T${hm}:00`);
    if (!Number.isNaN(d.getTime())) return d;
  }

  return null;
};

const toYMD = (d) => (d ? d.toISOString().slice(0, 10) : "");

// ---------- Data hook ----------
const useUserBookings = (userId) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRows([]);
      setLoading(false);
      return;
    }

    const qy = query(collection(db, "bookings"), where("userId", "==", userId));
    const unsub = onSnapshot(qy, async (snap) => {
      const list = await Promise.all(
        snap.docs.map(async (d) => {
          const raw = { id: d.id, ...d.data() };

          // normalize when: prefer `dateTime`, else {date,time}
          const jsDate =
            toJSDate(raw.dateTime) ??
            toJSDate({ date: raw.date, time: raw.time }); // supports either schema

          // fetch mentor display name if available
          let mentorName = raw.mentorName || "Unknown Mentor";
          if (!raw.mentorName && raw.mentorId) {
            try {
              const m = await getDoc(doc(db, "users", raw.mentorId));
              if (m.exists()) {
                const md = m.data();
                mentorName = md.name || md.displayName || mentorName;
              }
            } catch {}
          }

          return { ...raw, __when: jsDate, mentorName };
        })
      );

      // sort latest first, keeping nulls at bottom
      list.sort((a, b) => {
        const ta = a.__when?.getTime?.() ?? -Infinity;
        const tb = b.__when?.getTime?.() ?? -Infinity;
        return tb - ta;
      });

      setRows(list);
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  const now = new Date();

  const upcoming = useMemo(
    () => rows.filter((r) => r.__when && r.__when >= now),
    [rows]
  );
  const past = useMemo(
    () => rows.filter((r) => r.__when && r.__when < now),
    [rows]
  );

  return { upcoming, past, loading };
};

// ---------- UI ----------
const BookingCard = ({ booking }) => {
  const when = booking.__when;
  const isPast = !when || when < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start gap-4 ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg grid place-items-center">
            <div className="text-center leading-tight">
              <div className="text-[10px] font-bold text-orange-700 uppercase">
                {when ? when.toLocaleString("default", { month: "short" }) : "--"}
              </div>
              <div className="text-xl font-extrabold text-orange-700">
                {when ? when.getDate() : "--"}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {booking.title || "Mentorship Session"}
            </h3>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <User size={14} /> With {booking.mentorName}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 pl-1">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {when ? when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {when
              ? `${when.toLocaleDateString([], { weekday: "long" })} • ${toYMD(when)}`
              : "—"}
          </span>
        </div>
      </div>

      {!isPast && booking.zoomLink ? (
        <a
          href={booking.zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition shadow-sm"
        >
          <Video size={16} /> Join Call
        </a>
      ) : null}
    </motion.div>
  );
};

const EmptyState = ({ title, message }) => (
  <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-slate-300">
    <AlertTriangle size={40} className="mx-auto text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
    <p className="text-slate-500 mt-2">{message}</p>
    <Link
      to="/mentors"
      className="mt-4 inline-block bg-orange-100 text-orange-800 font-semibold px-5 py-2 rounded-lg hover:bg-orange-200 transition"
    >
      Find a Mentor
    </Link>
  </div>
);

// ---------- Page ----------
export default function UserBookings() {
  const { user, userData } = useAuth();
  const userId = userData?.uid || user?.uid || auth.currentUser?.uid || null;

  const { upcoming, past, loading } = useUserBookings(userId);

  if (loading) {
    return <div className="p-8">Loading your bookings...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-manrope">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-800">Your Bookings</h1>
        <p className="text-slate-500 mt-1">
          Manage your upcoming and past mentorship sessions.
        </p>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Upcoming Sessions</h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyState title="No Upcoming Sessions" message="Ready to book your next session?" />
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Past Sessions</h2>
        {past.length > 0 ? (
          <div className="space-y-4">
            {past.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Past Sessions"
            message="Your completed sessions will appear here."
          />
        )}
      </div>
    </div>
  );
}
