// src/hooks/useBookings.js
import {
  collection, query, where, onSnapshot, doc, getDoc,
  updateDoc, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useMemo, useState } from "react";

// ---- date helpers ----
const toJSDate = (val) => {
  if (!val) return null;
  if (typeof val === "object" && typeof val.toDate === "function") {
    try { return val.toDate(); } catch { return null; }
  }
  if (val instanceof Date) return val;
  if (typeof val === "string") {
    const d = new Date(val);
    if (!Number.isNaN(d.getTime())) return d;
  }
  if (typeof val === "object" && (val.date || val.time)) {
    const ymd = typeof val.date === "string" ? val.date : "";
    const hm = typeof val.time === "string" ? val.time : "00:00";
    const d = new Date(`${ymd}T${hm}:00`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
};

// ---- main hook ----
export function useBookings({ role, ownerId, field } = {}) {
  const [rows, setRows] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // default field names
  const effectiveField = field || (role === "mentor" ? "mentorId" : "userId");

  useEffect(() => {
    if (!ownerId) { setRows([]); setLoading(false); return; }

    try {
      const qy = query(
        collection(db, "bookings"),
        where(effectiveField, "==", ownerId)
      );

      const unsub = onSnapshot(qy, async (snap) => {
        try {
          const list = await Promise.all(
            snap.docs.map(async (d) => {
              const raw = { id: d.id, ...d.data() };

              // normalize times (support several schemas)
              const start =
                toJSDate(raw.startTime) ??
                toJSDate(raw.dateTime) ??
                toJSDate({ date: raw.date, time: raw.time });

              const end = toJSDate(raw.endTime) ?? null;

              // friendly names
              let mentorName = raw.mentorName || null;
              let clientName = raw.clientName || raw.userName || null;

              if (!mentorName && raw.mentorId) {
                try {
                  const md = await getDoc(doc(db, "users", raw.mentorId));
                  if (md.exists()) mentorName = md.data().name || md.data().displayName || null;
                } catch {}
              }
              if (!clientName && raw.userId) {
                try {
                  const ud = await getDoc(doc(db, "users", raw.userId));
                  if (ud.exists()) clientName = ud.data().name || ud.data().displayName || null;
                } catch {}
              }

              return {
                ...raw,
                _start: start ? start.getTime() : null,
                _end:   end   ? end.getTime()   : null,
                mentorName,
                clientName,
              };
            })
          );

          // newest first; nulls at end
          list.sort((a,b) => (b._start ?? -Infinity) - (a._start ?? -Infinity));
          setRows(list);
          setLoading(false);
          setError(null);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      }, (e) => { setError(e); setLoading(false); });

      return () => unsub();
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, [ownerId, effectiveField, role]);

  const now = Date.now();
  const upcomingBookings = useMemo(() => rows.filter(r => r._start && r._start >= now), [rows, now]);
  const pastBookings     = useMemo(() => rows.filter(r => r._start && r._start <  now), [rows, now]);

  // ---- update helpers (align with rules) ----
  // notes: role = "client" | "mentor"
  const updateNotes = async (bookingId, notes, who = "client") => {
    const payload = {
      [who === "mentor" ? "mentorNotes" : "clientNotes"]: notes ?? "",
      updatedAt: serverTimestamp(),
    };
    await updateDoc(doc(db, "bookings", bookingId), payload);
  };

  // patch a few mentor-editable fields (title, zoomLink)
  const updateBooking = async (bookingId, patch = {}) => {
    const allowed = {};
    if (typeof patch.title === "string")    allowed.title = patch.title;
    if (typeof patch.zoomLink === "string") allowed.zoomLink = patch.zoomLink;
    if (Object.keys(allowed).length === 0) return;
    allowed.updatedAt = serverTimestamp();
    await updateDoc(doc(db, "bookings", bookingId), allowed);
  };

  const reschedule = async (bookingId, newStart, newEnd) => {
    const payload = {
      startTime: newStart,
      ...(newEnd ? { endTime: newEnd } : {}),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(doc(db, "bookings", bookingId), payload);
  };

  const setStatus = async (bookingId, status) => {
    await updateDoc(doc(db, "bookings", bookingId), {
      status,
      updatedAt: serverTimestamp(),
    });
  };

  return {
    upcomingBookings,
    pastBookings,
    isLoading,
    error,
    updateNotes,
    updateBooking,
    reschedule,
    setStatus,
  };
}
