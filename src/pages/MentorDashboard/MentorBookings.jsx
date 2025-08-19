import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthContext";
import { useBookings } from "../../hooks/useBookings"; // Correctly import the hook
import { AlertTriangle, Calendar, Clock, Video, User, Save } from "lucide-react";

// --- UI Components ---
const EmptyState = ({ title, message }) => (
  <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-slate-300">
    <AlertTriangle size={40} className="mx-auto text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
    <p className="text-slate-500 mt-2">{message}</p>
  </div>
);

const EditorRow = ({ label, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
    <label className="md:col-span-1 text-sm font-semibold text-slate-600">{label}</label>
    <div className="md:col-span-3">{children}</div>
  </div>
);

const MentorBookingCard = ({ booking, onUpdate }) => {
  const [notes, setNotes] = useState(booking.mentorNotes || "");
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => { setNotes(booking.mentorNotes || "") }, [booking.mentorNotes]);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(booking.id, { mentorNotes: notes });
    setIsSaving(false);
  };
  
  const start = booking._start;
  const isPast = !start || start < new Date();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${isPast ? "opacity-70" : ""}`}
    >
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{booking.title || "Coaching Session"}</h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
            <User size={14} /> Client: {booking.clientName || "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-orange-400"
            value={booking.status || "scheduled"}
            onChange={(e) => onUpdate(booking.id, { status: e.target.value })}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
          {booking.zoomLink && (
            <a href={booking.zoomLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700 transition">
              <Video size={14} /> Join Call
            </a>
          )}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <EditorRow label="Session Time">
          <div className="flex items-center gap-2 text-sm p-2 bg-slate-100 rounded-lg">
            <div className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-500" /> {start ? start.toLocaleDateString() : 'N/A'}</div>
            <div className="flex items-center gap-1.5"><Clock size={14} className="text-slate-500" /> {start ? start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div>
          </div>
        </EditorRow>
        <EditorRow label="Your Private Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400"
            placeholder="Prep, feedback, follow-ups…"
          />
        </EditorRow>
      </div>
      <div className="p-5 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60 transition inline-flex items-center gap-2"
        >
          <Save size={14} /> {isSaving ? "Saving..." : "Save Notes"}
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
export default function MentorBookings() {
  const { user, loading: authLoading } = useAuth();
  const {
    upcomingBookings,
    pastBookings,
    isLoading: bookingsLoading,
    error,
    updateBooking,
  } = useBookings({ role: "mentor", ownerId: user?.uid });

  if (authLoading || bookingsLoading) {
    return <div className="p-8 text-slate-500">Loading your bookings...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">Error: {error.message || "Failed to load bookings."}</div>;
  }
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 font-manrope">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-800">Client Bookings</h1>
        <p className="text-slate-500 mt-1">Manage session details and add your private notes.</p>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Upcoming Sessions</h2>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-6">
            {upcomingBookings.map((b) => <MentorBookingCard key={b.id} booking={b} onUpdate={updateBooking} />)}
          </div>
        ) : (
          <EmptyState title="No Upcoming Bookings" message="New client bookings will appear here." />
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Past Sessions</h2>
        {pastBookings.length > 0 ? (
          <div className="space-y-6">
            {pastBookings.map((b) => <MentorBookingCard key={b.id} booking={b} onUpdate={updateBooking} />)}
          </div>
        ) : (
          <EmptyState title="No Past Sessions" message="Completed sessions will be archived here." />
        )}
      </div>
    </div>
  );
}