// src/services/chatService.js
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

/** Deterministic 1:1 thread id (sorted uids) */
export function makeThreadId(a, b) {
  return [a, b].filter(Boolean).sort().join("_");
}

/**
 * Ensure a thread exists between currentUser and otherUser.
 * Write-first (merge) so it passes rules even if the doc doesn't exist yet.
 * Returns { threadId, threadRef }.
 */
export async function ensureThread(currentUser, otherUser) {
  if (!currentUser?.uid || !otherUser?.uid) {
    throw new Error("ensureThread: both users must have a uid");
  }

  const threadId = makeThreadId(currentUser.uid, otherUser.uid);
  const threadRef = doc(db, "threads", threadId);

  await setDoc(
    threadRef,
    {
      participants: [currentUser.uid, otherUser.uid],
      participantMeta: {
        [currentUser.uid]: {
          name: currentUser.displayName || "You",
          photoURL: currentUser.photoURL || "/default-avatar.png",
          role: "user",
        },
        [otherUser.uid]: {
          name: otherUser.displayName || "Mentor",
          photoURL: otherUser.photoURL || "/default-avatar.png",
          role: otherUser.role || "mentor",
        },
      },
      lastMessage: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true } // create if missing, update if exists
  );

  return { threadId, threadRef };
}

/** Send a message to threads/{threadId}/messages and update thread summary */
export async function sendMessage(threadId, { text, senderId }) {
  const clean = String(text || "").trim();
  if (!threadId || !senderId || !clean) return;

  const msgsRef = collection(db, "threads", threadId, "messages");

  const added = await addDoc(msgsRef, {
    text: clean,
    senderId,
    createdAt: serverTimestamp(),
    readBy: [senderId],
  });

  await updateDoc(doc(db, "threads", threadId), {
    lastMessage: { text: clean, senderId, createdAt: serverTimestamp() },
    updatedAt: serverTimestamp(),
  });

  return added;
}

/** Subscribe to the caller's threads (sorted by updatedAt desc) */
export function onThreads(userUid, cb) {
  if (!userUid) return () => {};

  const threadsRef = collection(db, "threads");
  const qy = query(threadsRef, where("participants", "array-contains", userUid));

  return onSnapshot(qy, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    items.sort((a, b) => {
      const aTs = a.updatedAt?.toMillis?.() ?? 0;
      const bTs = b.updatedAt?.toMillis?.() ?? 0;
      return bTs - aTs;
    });
    cb(items);
  });
}

/** Subscribe to messages for a thread (ascending by createdAt) */
export function onMessages(threadId, cb, max = 200) {
  if (!threadId) return () => {};

  const msgsRef = collection(db, "threads", threadId, "messages");
  const qy = query(msgsRef, orderBy("createdAt", "asc"), limit(max));

  return onSnapshot(qy, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
}
