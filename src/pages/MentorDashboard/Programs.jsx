// src/pages/MentorDashboard/Programs.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Share2, Globe, Link as LinkIcon,
} from "lucide-react";

import { auth, db } from "../../firebase";
import {
  addDoc, collection, deleteDoc, doc, getDoc,
  onSnapshot, query, serverTimestamp, updateDoc, where,
} from "firebase/firestore";

/** Must match your server PRICE_CATALOG keys */
const PLAN_OPTIONS = [
  { key: "pay-in-full-basic",  label: "Pay in Full • Basic (ex: $249)" },
  { key: "milestones-starter", label: "Milestones • Starter (ex: $99 / milestone)" },
  { key: "retainer-standard",  label: "Monthly Retainer • Standard (ex: $499)" },
  { key: "time-pack-5h",       label: "Time Pack • 5 Hours (ex: $390)" },
];

const planLabel = (key) => PLAN_OPTIONS.find(p => p.key === key)?.label || key;

const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const StatusChip = ({ value }) => {
  const map = {
    draft: "bg-slate-100 text-slate-700",
    published: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[value] || map.draft}`}>
      {value === "published" ? "Published" : "Draft"}
    </span>
  );
};

function Drawer({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-50 shadow-2xl p-6 overflow-y-auto"
            initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function MentorPrograms() {
  const navigate = useNavigate();

  const [uid, setUid] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");

  // Auth
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  // Listen to this mentor's programs
  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "programs"), where("mentorId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      rows.sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0));
      setPrograms(rows);
    });
    return () => unsub();
  }, [uid]);

  // New -> go to full builder
  const openNew = () => navigate("/mentor-dashboard/programs/create");

  // Quick edit save (title/blurb/duration/etc.)
  const saveEdit = async () => {
    if (!uid || !editing?.title?.trim()) return;

    const payload = {
      title: editing.title.trim(),
      blurb: editing.blurb.trim(),
      duration: editing.duration.trim(),
      level: editing.level.trim(),
      planKey: editing.planKey,
      priceHint: editing.priceHint?.trim() || "",
      status: editing.status === "published" ? "published" : "draft",
      slug: editing.slug?.trim() ? slugify(editing.slug) : slugify(editing.title),
      mentorId: uid,
      updatedAt: serverTimestamp(),
      // createdAt set only when creating from scratch (kept here for safety)
      ...(editing.createdAt ? { createdAt: editing.createdAt } : {}),
    };

    if (editing.id) {
      await updateDoc(doc(db, "programs", editing.id), payload);
    } else {
      const ref = await addDoc(collection(db, "programs"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      const snap = await getDoc(ref);
      setPrograms((arr) => [{ id: ref.id, ...snap.data() }, ...arr]);
    }
    setEditing(null);
  };

  const togglePublish = async (id, next) => {
    await updateDoc(doc(db, "programs", id), { status: next, updatedAt: serverTimestamp() });
  };

  const removeProgram = async (id) => {
    if (!confirm("Delete this program?")) return;
    await deleteDoc(doc(db, "programs", id));
  };

  const copyLink = async (id) => {
    const url = `${window.location.origin}/program/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied to clipboard");
    } catch {
      setToast("Copy failed");
    } finally {
      setTimeout(() => setToast(""), 1400);
    }
  };

  if (!uid) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-slate-600">
        Sign in as a mentor to manage programs…
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-orange-50 via-blue-50 to-white rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Programs</h1>
              <p className="text-slate-600 mt-1">
                Create templates you can share on your profile or drop into chat. Checkout happens on the public page.
              </p>
            </div>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 font-bold text-white shadow-sm hover:bg-orange-700 transition"
            >
              <Plus className="w-5 h-5" />
              New Program
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {programs.length === 0 ? (
            <div className="text-slate-600">No programs yet. Click “New Program”.</div>
          ) : (
            programs.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-2xl bg-white/70 backdrop-blur border border-white shadow-md"
              >
                <div className="absolute -inset-px rounded-2xl pointer-events-none bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <StatusChip value={p.status} />
                  </div>

                  {p.blurb && <p className="text-slate-700">{p.blurb}</p>}

                  <div className="text-sm text-slate-700 space-y-0.5">
                    <div><span className="font-semibold">Duration:</span> {p.duration || "—"}</div>
                    <div><span className="font-semibold">Level:</span> {p.level || "—"}</div>
                    <div><span className="font-semibold">Plan:</span> {planLabel(p.planKey)}</div>
                    {p.priceHint && <div><span className="font-semibold">Price hint:</span> {p.priceHint}</div>}
                  </div>

                  <div className="pt-1 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setEditing({ id: p.id, ...p })}
                      className="rounded-lg border border-orange-200 py-2.5 font-semibold text-orange-700 hover:bg-orange-50 flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>

                    <button
                      onClick={() => copyLink(p.id)}
                      className="rounded-lg border border-orange-200 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Copy Link
                    </button>

                    {p.status === "published" ? (
                      <button
                        onClick={() => togglePublish(p.id, "draft")}
                        className="rounded-lg bg-slate-100 py-2.5 font-semibold text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" /> Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => togglePublish(p.id, "published")}
                        className="rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" /> Publish
                      </button>
                    )}

                    <button
                      onClick={() => removeProgram(p.id)}
                      className="rounded-lg bg-red-50 py-2.5 font-semibold text-red-600 hover:bg-red-100 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5" />
                    Share URL:
                    <span className="truncate">{`${window.location.origin}/program/${p.id}`}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Quick Edit Drawer (for small tweaks) */}
      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit Program" : "New Program"}
      >
        {editing && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <input
              className="md:col-span-12 rounded-xl border border-orange-200 px-4 py-3"
              placeholder="Program title"
              value={editing.title}
              onChange={(e) => setEditing((d) => ({ ...d, title: e.target.value }))}
              autoFocus
            />
            <textarea
              className="md:col-span-12 rounded-xl border border-orange-200 px-4 py-3"
              rows={3}
              placeholder="Short blurb (what's included, outcomes)"
              value={editing.blurb}
              onChange={(e) => setEditing((d) => ({ ...d, blurb: e.target.value }))}
            />
            <input
              className="md:col-span-6 rounded-xl border border-orange-200 px-4 py-3"
              placeholder="Duration (e.g., 4 weeks)"
              value={editing.duration}
              onChange={(e) => setEditing((d) => ({ ...d, duration: e.target.value }))}
            />
            <input
              className="md:col-span-6 rounded-xl border border-orange-200 px-4 py-3"
              placeholder="Level (e.g., All levels, Founders)"
              value={editing.level}
              onChange={(e) => setEditing((d) => ({ ...d, level: e.target.value }))}
            />

            <div className="md:col-span-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Stripe plan</label>
              <select
                className="w-full rounded-xl border border-orange-200 px-3 py-3"
                value={editing.planKey}
                onChange={(e) => setEditing((d) => ({ ...d, planKey: e.target.value }))}
              >
                {PLAN_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            </div>

            <input
              className="md:col-span-6 rounded-xl border border-orange-200 px-4 py-3"
              placeholder="Price hint (only shown here)"
              value={editing.priceHint}
              onChange={(e) => setEditing((d) => ({ ...d, priceHint: e.target.value }))}
            />

            <input
              className="md:col-span-12 rounded-xl border border-orange-200 px-4 py-3"
              placeholder="Custom slug (optional, auto from title)"
              value={editing.slug || ""}
              onChange={(e) => setEditing((d) => ({ ...d, slug: e.target.value }))}
            />

            <div className="md:col-span-12 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-orange-200">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Tiny toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
