import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthContext";
import { useBookings } from "../../hooks/useBookings"; // Correctly import the hook
import { Calendar, Video, Clock, User, AlertTriangle } from "lucide-react";

// --- UI Components ---
const BookingCard = ({ booking }) => {
  const when = booking._start;
  const isPast = !when || when < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start gap-4 ${isPast ? "opacity-70" : ""}`}
    >
      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-orange-600 uppercase">{when ? when.toLocaleString('default', { month: 'short' }) : "--"}</span>
            <span className="text-2xl font-extrabold text-orange-700">{when ? when.getDate() : "--"}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{booking.title || "Mentorship Session"}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1.5"><User size={14} /> With {booking.mentorName}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 pl-1">
          <span className="flex items-center gap-1.5"><Clock size={14} />{when ? when.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} />{when ? when.toLocaleDateString([], { weekday: 'long' }) : "—"}</span>
        </div>
      </div>
      {!isPast && booking.zoomLink && (
        <a href={booking.zoomLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700 transition shadow-sm">
          <Video size={16} /> Join Call
        </a>
      )}
    </motion.div>
  );
};

const EmptyState = ({ title, message }) => (
  <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-slate-300">
    <AlertTriangle size={40} className="mx-auto text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
    <p className="text-slate-500 mt-2">{message}</p>
    <Link to="/mentors" className="mt-4 inline-block bg-orange-100 text-orange-800 font-semibold px-5 py-2 rounded-lg hover:bg-orange-200 transition">
      Find a Mentor
    </Link>
  </div>
);

// --- Main Page Component ---
export default function UserBookings() {
  const { user, loading: authLoading } = useAuth();
  const { upcomingBookings, pastBookings, isLoading: bookingsLoading, error } = useBookings({ role: 'user', ownerId: user?.uid });

  if (authLoading || bookingsLoading) {
    return <div className="p-8 text-slate-500">Loading your bookings...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">Error: Could not load bookings. Please try again later.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-manrope">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-800">Your Bookings</h1>
        <p className="text-slate-500 mt-1">Manage your upcoming and past mentorship sessions.</p>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Upcoming Sessions</h2>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map((b) => <BookingCard key={b.id} booking={b} />)}
          </div>
        ) : (
          <EmptyState title="No Upcoming Sessions" message="Ready to book your next session?" />
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Past Sessions</h2>
        {pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.map((b) => <BookingCard key={b.id} booking={b} />)}
          </div>
        ) : (
          <EmptyState title="No Past Sessions" message="Your completed sessions will appear here." />
        )}
      </div>
    </div>
  );
}