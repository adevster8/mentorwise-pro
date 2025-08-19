// src/pages/UserDashboard/Messages.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const AVATAR = "/default-avatar.png";

// ---------- lightweight /users cache ----------
const profileCache = new Map();
async function getProfile(uid) {
  if (!uid) return { uid, name: "User", photoURL: AVATAR };
  if (profileCache.has(uid)) return profileCache.get(uid);
  try {
    const snap = await getDoc(doc(db, "users", uid));
    const d = snap.exists() ? snap.data() : {};
    const prof = {
      uid,
      name: d.name || d.displayName || "User",
      photoURL: d.photoURL || AVATAR,
    };
    profileCache.set(uid, prof);
    return prof;
  } catch {
    const prof = { uid, name: "User", photoURL: AVATAR };
    profileCache.set(uid, prof);
    return prof;
  }
}

export default function UserMessages() {
  const [me, setMe] = useState(null);

  // left pane (threads)
  const [threads, setThreads] = useState([]);
  const [people, setPeople] = useState({}); // uid -> profile
  const [filter, setFilter] = useState("");
  const [activeId, setActiveId] = useState(null);

  // right pane (messages)
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [leftError, setLeftError] = useState("");
  const [rightError, setRightError] = useState("");
  const endRef = useRef(null);

  // track mount to avoid state updates after unmount
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // --- auth gate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setMe(u || null));
    return () => unsub();
  }, []);

  // --- subscribe to my threads (left)
  useEffect(() => {
    if (!me?.uid) {
      setThreads([]);
      setActiveId(null);
      return;
    }

    setLeftError("");
    const qy = query(
      collection(db, "threads"),
      where("participants", "array-contains", me.uid)
    );

    const unsub = onSnapshot(
      qy,
      async (snap) => {
        try {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          items.sort(
            (a, b) =>
              (b.updatedAt?.toMillis?.() ?? 0) - (a.updatedAt?.toMillis?.() ?? 0)
          );

          if (!mounted.current) return;
          setThreads(items);

          // prefetch “other” user profiles best-effort
          const neededUids = new Set();
          items.forEach((t) => {
            const other = t.participants?.find((p) => p !== me.uid);
            if (other && !people[other]) neededUids.add(other);
          });

          if (neededUids.size) {
            const entries = await Promise.all(
              [...neededUids].map(async (uid) => [uid, await getProfile(uid)])
            );
            if (mounted.current) {
              setPeople((prev) => ({
                ...prev,
                ...Object.fromEntries(entries),
              }));
            }
          }

          // default select newest if none selected
          if (!activeId && items.length && mounted.current) {
            setActiveId(items[0].id);
          }
        } catch (e) {
          if (mounted.current) setLeftError("Failed to load conversations.");
          console.error("Threads snapshot error:", e);
        }
      },
      (err) => {
        if (mounted.current) setLeftError(err.message || "Listener error.");
        console.error("Threads onSnapshot error:", err);
      }
    );

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.uid]);

  // --- subscribe to active thread messages (right)
  useEffect(() => {
    if (!activeId) {
      setMsgs([]);
      return;
    }
    setRightError("");

    const qy = query(
      collection(db, "threads", activeId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(
      qy,
      (snap) => {
        try {
          const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          if (mounted.current) setMsgs(arr);
        } catch (e) {
          if (mounted.current) setRightError("Failed to load messages.");
          console.error("Messages snapshot error:", e);
        }
      },
      (err) => {
        if (mounted.current) setRightError(err.message || "Listener error.");
        console.error("Messages onSnapshot error:", err);
      }
    );

    return () => unsub();
  }, [activeId]);

  // autoscroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // active conversation header meta
  const activeMeta = useMemo(() => {
    const t = threads.find((x) => x.id === activeId);
    if (!t) return { name: "Conversation", photoURL: AVATAR };
    const other = t.participants?.find((p) => p !== me?.uid);
    const prof = (other && people[other]) || null;
    return {
      name: prof?.name || other || "Conversation",
      photoURL: prof?.photoURL || AVATAR,
    };
  }, [activeId, threads, people, me?.uid]);

  // send message
  async function send(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || !me?.uid || !activeId) return;

    try {
      await addDoc(collection(db, "threads", activeId, "messages"), {
        text: clean,
        senderId: me.uid,
        createdAt: serverTimestamp(),
        readBy: [me.uid],
      });

      await updateDoc(doc(db, "threads", activeId), {
        lastMessage: {
          text: clean,
          senderId: me.uid,
          createdAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      });

      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
      // optional UI toast could go here
    }
  }

  // filter left pane
  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return threads;
    return threads.filter((t) => {
      const other = t.participants?.find((p) => p !== me?.uid);
      const name = (people[other]?.name || "").toLowerCase();
      const last = (t.lastMessage?.text || "").toLowerCase();
      return name.includes(f) || last.includes(f);
    });
  }, [threads, people, filter, me?.uid]);

  // --- UI ---
  if (!me?.uid) {
    return (
      <div className="min-h-screen bg-orange-50 p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Messages</h1>
        <p className="text-slate-700">Please sign in to view your conversations.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-2">Messages</h1>
      <p className="mb-6 text-slate-600">
        Chat with mentors and keep everything in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: conversations */}
        <aside className="md:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search conversations…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Search conversations"
            />
            {leftError && (
              <div className="mt-2 text-xs text-red-600">{leftError}</div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="p-4 text-slate-500">No conversations yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {filtered.map((t) => {
                const other = t.participants?.find((p) => p !== me.uid);
                const prof = people[other];
                const name = prof?.name || other || "User";
                const avatar = prof?.photoURL || AVATAR;
                const preview = t.lastMessage?.text || "No messages yet.";
                const when = t.updatedAt?.toDate
                  ? t.updatedAt.toDate().toLocaleString()
                  : "";
                const active = t.id === activeId;

                return (
                  <li
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-orange-50 ${
                      active ? "bg-orange-50" : ""
                    }`}
                  >
                    <img
                      src={avatar}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 truncate">
                        {name}
                      </div>
                      <div className="text-sm text-slate-600 truncate">
                        {preview}
                      </div>
                      <div className="text-[11px] text-slate-400">{when}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* RIGHT: active conversation */}
        <section className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[65vh]">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-3">
            <img
              src={activeMeta.photoURL}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="font-semibold text-slate-900">{activeMeta.name}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {rightError && (
              <div className="text-sm text-red-600 mb-2">{rightError}</div>
            )}
            {msgs.length === 0 ? (
              <div className="text-slate-400">No messages yet. Say hi!</div>
            ) : (
              msgs.map((m) => {
                const mine = m.senderId === me?.uid;
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[72%] px-4 py-2 rounded-2xl shadow ${
                        mine
                          ? "bg-orange-100 text-orange-900"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {m.text}
                      <div className="text-[11px] text-slate-400 mt-1 text-right">
                        {m.createdAt?.toDate
                          ? m.createdAt
                              .toDate()
                              .toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="p-3 border-t border-slate-200 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Type a message"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow transition"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
