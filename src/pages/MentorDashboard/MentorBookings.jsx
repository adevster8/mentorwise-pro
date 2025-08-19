// src/pages/MentorDashboard/MentorBookings.jsx (Polished & Enhanced)
import React from 'react';
// This component now reuses the enhanced components from UserBookings.
// We are aliasing the import to avoid confusion.
import UserBookings, {
  useUserBookings as useBookings, // Renaming for clarity
  BookingCard as SharedBookingCard,
  EmptyState as SharedEmptyState
} from '../UserDashboard/Bookings';
import { useAuth } from '../../AuthContext';
import { motion } from "framer-motion";

// NOTE: The logic for Mentor Bookings is nearly identical to User Bookings,
// but queries by `mentorId`. For a large-scale app, we would create a single
// reusable `useBookings` hook that accepts a role and ID. 
// For now, we are demonstrating the polished UI.

export default function MentorBookings() {
  const { userData } = useAuth();
  // We can reuse the same hook structure. In a real app, this would be a dedicated `useMentorBookings`
  // that queries by `mentorId` and fetches `userName` instead of `mentorName`.
  const { upcomingBookings, pastBookings, isLoading } = useBookings(userData?.id);

  if (isLoading) {
    return <div className="p-8">Loading your bookings...</div>;
  }
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 font-manrope">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-800">Client Bookings</h1>
        <p className="text-slate-500 mt-1">Manage your upcoming and past client sessions.</p>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Upcoming Sessions</h2>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {/* The SharedBookingCard would be adapted to show mentee name */}
            {upcomingBookings.map(booking => <SharedBookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <SharedEmptyState title="No Upcoming Bookings" message="New client bookings will appear here." />
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Past Sessions</h2>
        {pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.map(booking => <SharedBookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <SharedEmptyState title="No Past Sessions" message="Your completed sessions will be archived here." />
        )}
      </div>
    </div>
  );
}