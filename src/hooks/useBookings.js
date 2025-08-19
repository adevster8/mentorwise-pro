import { useEffect, useMemo, useState } from "react";
import {
  collection, query, where, onSnapshot, doc, getDoc,
  updateDoc, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

// --- Date Normalization Helper ---
// This robustly converts Firestore Timestamps, ISO strings, or date/time objects into JS Dates.
const toJSDate = (val) => {
  if (!val) return null;
  if (val.toDate) return val.toDate(); // Firestore Timestamp
  if (val instanceof Date) return val; // Already a Date
  if (typeof val === "string") {
    const d = new Date(val);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
};

// --- Main Reusable Hook ---
export function useBookings({ role, ownerId }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryField = useMemo(() => (role === "mentor" ? "mentorId" : "userId"), [role]);

  useEffect(() => {
    if (!ownerId) {
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "bookings"),
      where(queryField, "==", ownerId)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      setIsLoading(true);
      try {
        const bookingsData = await Promise.all(
          snapshot.docs.map(async (d) => {
            const rawData = { id: d.id, ...d.data() };
            
            // Fetch the name of the *other* person in the booking
            const otherPersonId = role === 'mentor' ? rawData.userId : rawData.mentorId;
            let otherPersonName = "Unknown";
            if (otherPersonId) {
              const userDoc = await getDoc(doc(db, "users", otherPersonId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                otherPersonName = userData.name || userData.displayName || "User";
              }
            }

            return {
              ...rawData,
              // Normalize date fields into consistent JS Date objects
              _start: toJSDate(rawData.dateTime || rawData.startTime),
              _end: toJSDate(rawData.endTime),
              // Add the fetched name for easy display
              clientName: role === 'mentor' ? otherPersonName : null,
              mentorName: role === 'user' ? otherPersonName : null,
            };
          })
        );
        
        // Sort by date, newest first
        bookingsData.sort((a, b) => (b._start?.getTime() || 0) - (a._start?.getTime() || 0));
        
        setBookings(bookingsData);
        setError(null);
      } catch (e) {
        console.error("Error processing bookings snapshot:", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }, (err) => {
      console.error("Firestore onSnapshot error:", err);
      setError(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [ownerId, queryField, role]);

  const now = useMemo(() => new Date(), []);
  const upcomingBookings = useMemo(() => bookings.filter(b => b._start && b._start >= now), [bookings, now]);
  const pastBookings = useMemo(() => bookings.filter(b => b._start && b._start < now), [bookings, now]);

  // --- Firestore Update Functions ---
  const updateBooking = async (bookingId, data) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to update booking:", e);
      // Optionally re-throw or handle error in UI
    }
  };

  return {
    upcomingBookings,
    pastBookings,
    isLoading,
    error,
    updateBooking,
  };
}
