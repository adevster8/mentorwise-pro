// src/pages/UserDashboard/Messages.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  collection, query, where, onSnapshot, orderBy, doc, getDoc,
  addDoc, updateDoc, serverTimestamp
} from "firebase/firestore";

const AVATAR = "/default-avatar.png";

// cache /users/{uid} for names/avatars
const cache = new Map();
async function getProfile(uid) {
  if (!uid) return { uid, name: "User", photoURL: AVATAR };
  if (cache.has(uid)) return cache.get(uid);
  const snap = await getDoc(doc(db, "users", uid));
  const d = snap.exists() ? snap.data() : {};
  const prof = {
    uid,
    name: d.name || d.displayName || "User",
    photoURL: d.photoURL || AVATAR,
  };
  cache.set(uid, prof);
  return prof;
}

export default function UserMessages() {
  const [me, setMe] = useState(null);

  // left list
  const [threads, setThreads] = useState([]);
  const [people, setPeople] = useState({}); // uid -> profile
  const [filter, setFilter] = useState("");
  const [activeId, setActiveId] = useState(null);

  // right chat
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  // auth
  useEffect(() => onAuthStateChanged(auth, (u) => setMe(u || null)), []);

  // subscribe to my threads (left pane)
  useEffect(() => {
    if (!me?.uid) return;
    const qy = query(collection(db, "threads"), where("participants", "array-contains", me.uid));
    const unsub = onSnapshot(qy, async (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      items.sort((a, b) => (b.updatedAt?.toMillis?.() ?? 0) - (a.updatedAt?.toMillis?.() ?? 0));
      setThreads(items);

      // prefetch other profiles
      const need = {};
      await Promise.all(
        items.map(async (t) => {
          const other = t.participants?.find((p) => p !== me.uid);
          if (other && !people[other]) need[other] = await getProfile(other);
        })
      );
      if (Object.keys(need).length) setPeople((p) => ({ ...p, ...need }));

      if (!activeId && items.length) setActiveId(items[0].id);
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.uid]);

  // subscribe to active thread messages (right pane)
  useEffect(() => {
    if (!activeId) { setMsgs([]); return; }
    const qy = query(collection(db, "threads", activeId, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(qy, (snap) => setMsgs(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
    return unsub;
  }, [activeId]);

  // autoscroll
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const activeMeta = useMemo(() => {
    const t = threads.find((x) => x.id === activeId);
    if (!t) return { name: "Conversation", photoURL: AVATAR };
    const other = t.participants?.find((p) => p !== me?.uid);
    const prof = people[other];
    return { name: prof?.name || other || "Conversation", photoURL: prof?.photoURL || AVATAR };
  }, [activeId, threads, people, me?.uid]);

  async function send(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || !me?.uid || !activeId) return;

    await addDoc(collection(db, "threads", activeId, "messages"), {
      text: clean,
      senderId: me.uid,
      createdAt: serverTimestamp(),
      readBy: [me.uid],
    });

    await updateDoc(doc(db, "threads", activeId), {
      lastMessage: { text: clean, senderId: me.uid, createdAt: serverTimestamp() },
      updatedAt: serverTimestamp(),
    });

    setText("");
  }

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

  if (!me?.uid) {
    return (
      <div className="min-h-screen bg-orange-50 p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Messages</h1>
        <p>Please sign in to view your conversations.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-2">Messages</h1>
      <p className="mb-6 text-slate-600">Chat with mentors and keep everything in one place.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: conversations */}
        <aside className="md:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search conversations…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
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
                const when = t.updatedAt?.toDate ? t.updatedAt.toDate().toLocaleString() : "";
                const active = t.id === activeId;

                return (
                  <li
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-orange-50 ${active ? "bg-orange-50" : ""}`}
                  >
                    <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 truncate">{name}</div>
                      <div className="text-sm text-slate-600 truncate">{preview}</div>
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
            <img src={activeMeta.photoURL} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="font-semibold text-slate-900">{activeMeta.name}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {msgs.length === 0 ? (
              <div className="text-slate-400">No messages yet. Say hi!</div>
            ) : (
              msgs.map((m) => {
                const mine = m.senderId === me?.uid;
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[72%] px-4 py-2 rounded-2xl shadow
                        ${mine ? "bg-orange-100 text-orange-900" : "bg-slate-100 text-slate-800"}`}
                    >
                      {m.text}
                      <div className="text-[11px] text-slate-400 mt-1 text-right">
                        {m.createdAt?.toDate
                          ? m.createdAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
