// src/pages/UserDashboard/Projects.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, CalendarDays, DollarSign, Link as LinkIcon,
  Circle, CheckCircle2, BarChart3, Users, ChevronRight
} from "lucide-react";

/* ------------------------------ helpers ---------------------------------- */
const currency = (n) =>
  n === "" || n == null || isNaN(Number(n))
    ? "$0"
    : Number(n).toLocaleString(undefined, { style: "currency", currency: "USD" });

const StatusChip = ({ value }) => {
  const map = {
    Planning: "bg-sky-50 text-sky-700",
    "In Progress": "bg-emerald-50 text-emerald-700",
    "On Hold": "bg-amber-50 text-amber-700",
    Complete: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[value] || "bg-orange-50 text-orange-700"}`}>
      {value}
    </span>
  );
};

const ProgressBar = ({ percent }) => {
  const p = Math.max(0, Math.min(100, Math.round(percent || 0)));
  return (
    <div className="w-full h-2.5 bg-orange-100 rounded-full overflow-hidden">
      <div className="h-2.5 bg-orange-500" style={{ width: `${p}%` }} />
    </div>
  );
};

/* --------------------------- editor/drawer UI ----------------------------- */
function Drawer({ open, onClose, children, title }) {
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
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- page ---------------------------------- */
export default function Projects({ mode = "user" }) {
  // Separate storage for user vs mentor
  const STORAGE_KEY = useMemo(
    () => (mode === "mentor" ? "mw_projects_mentor_v2" : "mw_projects_user_v2"),
    [mode]
  );

  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [detailId, setDetailId] = useState(null);
  const [editing, setEditing] = useState(null); // null | {id? ...fields}

  // load/save localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setProjects(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STORAGE_KEY]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, STORAGE_KEY]);

  // initial demo (if empty)
  useEffect(() => {
    if (projects.length) return;
    const sample = [
      {
        id: crypto.randomUUID(),
        title: "Beginner Guitar — Month 1",
        summary: "Foundations: chords, strumming, 2–3 full songs.",
        status: "In Progress",
        budget: "300",
        spent: "120",
        due: "",
        collaborators: ["Alex (Mentor)"],
        links: [{ label: "Practice Folder", url: "https://example.com" }],
        milestones: [
          { title: "Learn G, C, D chords", due: "", done: true },
          { title: "Strumming patterns 1–2", due: "", done: false },
          { title: "Play first full song", due: "", done: false },
        ],
        tasks: [
          { title: "Daily 20-min practice", done: true },
          { title: "Record weekly progress", done: false }
        ],
        notes: "Focus on relaxed wrist; down-up consistency.",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
    setProjects(sample);
  }, [projects.length]);

  const percent = (p) => {
    const total = (p.tasks?.length || 0) + (p.milestones?.length || 0);
    const done =
      (p.tasks?.filter((t) => t.done).length || 0) + (p.milestones?.filter((m) => m.done).length || 0);
    return total ? (done / total) * 100 : 0;
  };

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  const openNew = () =>
    setEditing({
      title: "",
      summary: "",
      status: "Planning",
      budget: "",
      spent: "",
      due: "",
      collaborators: [],
      links: [{ label: "", url: "" }],
      milestones: [{ title: "", due: "", done: false }],
      tasks: [{ title: "", done: false }],
      notes: "",
    });

  const startEdit = (p) => setEditing({ ...p });

  const saveEdit = () => {
    if (!editing?.title?.trim()) return;
    const base = {
      ...editing,
      id: editing.id || crypto.randomUUID(),
      links: (editing.links || []).filter((l) => l.label || l.url),
      milestones: (editing.milestones || []).filter((m) => m.title),
      tasks: (editing.tasks || []).filter((t) => t.title),
      updatedAt: Date.now(),
      createdAt: editing.id ? editing.createdAt : Date.now(),
    };
    setProjects((arr) => {
      const exists = arr.some((x) => x.id === base.id);
      return exists ? arr.map((x) => (x.id === base.id ? base : x)) : [base, ...arr];
    });
    setEditing(null);
  };

  const removeProject = (id) => {
    if (!confirm("Delete this project?")) return;
    setProjects((arr) => arr.filter((x) => x.id !== id));
    if (detailId === id) setDetailId(null);
  };

  // Only mentors can toggle tasks/milestones
  const toggleTask = (pid, idx) => {
    if (mode !== "mentor") return;
    setProjects((arr) =>
      arr.map((p) =>
        p.id === pid
          ? { ...p, tasks: p.tasks.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)), updatedAt: Date.now() }
          : p
      )
    );
  };
  const toggleMilestone = (pid, idx) => {
    if (mode !== "mentor") return;
    setProjects((arr) =>
      arr.map((p) =>
        p.id === pid
          ? { ...p, milestones: p.milestones.map((m, i) => (i === idx ? { ...m, done: !m.done } : m)), updatedAt: Date.now() }
          : p
      )
    );
  };

  const current = useMemo(() => projects.find((p) => p.id === detailId) || null, [projects, detailId]);

  /* -------------------------------- render -------------------------------- */

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-orange-600">
          {mode === "mentor" ? "Manage Projects" : "Your Projects"}
        </h1>
        <p className="text-gray-600 mt-2">
          Track scope, budget, tasks, milestones, collaborators, and links — with instant progress.
        </p>
      </motion.div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Planning", "In Progress", "On Hold", "Complete"].map((s) => (
            <button
              key={s}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                filter === s ? "bg-orange-600 text-white border-orange-600" : "border-orange-200 text-orange-700"
              }`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {mode === "mentor" && (
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-700"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        )}
      </div>

      {/* List */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No projects match this filter.</div>
        ) : (
          filtered.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold text-gray-900">{p.title}</div>
                  <div className="text-gray-600">{p.summary}</div>
                </div>

                {mode === "mentor" && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-orange-50" title="Edit">
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={() => removeProject(p.id)} className="p-2 rounded-lg hover:bg-orange-50" title="Delete">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="bg-orange-50 rounded-xl px-3 py-2">
                  <div className="text-gray-500">Status</div>
                  <div className="font-semibold"><StatusChip value={p.status} /></div>
                </div>
                <div className="bg-orange-50 rounded-xl px-3 py-2">
                  <div className="text-gray-500">Budget</div>
                  <div className="font-semibold">{currency(p.budget)}</div>
                </div>
                <div className="bg-orange-50 rounded-xl px-3 py-2">
                  <div className="text-gray-500">Spent</div>
                  <div className="font-semibold">{currency(p.spent)}</div>
                </div>
                <div className="bg-orange-50 rounded-xl px-3 py-2">
                  <div className="text-gray-500">Due</div>
                  <div className="font-semibold">{p.due ? new Date(p.due).toLocaleDateString() : "—"}</div>
                </div>
              </div>

              <div className="mt-4">
                <ProgressBar percent={percent(p)} />
                <div className="text-xs text-gray-500 mt-1">{Math.round(percent(p))}% complete</div>
              </div>

              {p.collaborators?.length ? (
                <div className="mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Users className="w-4 h-4" /> Collaborators
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.collaborators.map((c, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-4">
                <button
                  onClick={() => setDetailId(p.id)}
                  className="inline-flex items-center gap-2 text-orange-700 font-semibold hover:underline"
                >
                  View details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ------------------------------ Detail Drawer ------------------------------ */}
      <Drawer open={!!current} onClose={() => setDetailId(null)} title={current?.title || "Project"}>
        {current && (
          <div className="space-y-6">
            <div className="text-gray-700">{current.summary}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="bg-orange-50 rounded-xl px-3 py-2">
                <div className="text-gray-500">Status</div>
                <div className="font-semibold"><StatusChip value={current.status} /></div>
              </div>
              <div className="bg-orange-50 rounded-xl px-3 py-2">
                <div className="text-gray-500">Budget</div>
                <div className="font-semibold">{currency(current.budget)}</div>
              </div>
              <div className="bg-orange-50 rounded-xl px-3 py-2">
                <div className="text-gray-500">Spent</div>
                <div className="font-semibold">{currency(current.spent)}</div>
              </div>
              <div className="bg-orange-50 rounded-xl px-3 py-2">
                <div className="text-gray-500">Due</div>
                <div className="font-semibold">
                  {current.due ? new Date(current.due).toLocaleDateString() : "—"}
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Progress
              </div>
              <ProgressBar percent={percent(current)} />
              <div className="text-xs text-gray-500 mt-1">{Math.round(percent(current))}% complete</div>
            </div>

            {current.links?.length ? (
              <div>
                <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Links
                </div>
                <ul className="space-y-1">
                  {current.links.map((l, i) =>
                    l.url ? (
                      <li key={i}>
                        <a className="text-orange-700 hover:underline break-all" href={l.url} target="_blank" rel="noreferrer">
                          {l.label || l.url}
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            ) : null}

            {current.tasks?.length ? (
              <div>
                <div className="font-semibold text-gray-800 mb-2">Tasks</div>
                <ul className="space-y-2">
                  {current.tasks.map((t, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {mode === "mentor" ? (
                        <button
                          onClick={() => toggleTask(current.id, i)}
                          className="p-1 rounded hover:bg-orange-50"
                          aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                        >
                          {t.done ? <CheckCircle2 className="w-5 h-5 text-orange-500" /> : <Circle className="w-5 h-5 text-orange-500" />}
                        </button>
                      ) : (
                        t.done ? <CheckCircle2 className="w-5 h-5 text-orange-500" /> : <Circle className="w-5 h-5 text-orange-500" />
                      )}
                      <span className={t.done ? "line-through text-gray-400" : "text-gray-800"}>{t.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {current.milestones?.length ? (
              <div>
                <div className="font-semibold text-gray-800 mb-2">Milestones</div>
                <ul className="space-y-2">
                  {current.milestones.map((m, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {mode === "mentor" ? (
                          <button
                            onClick={() => toggleMilestone(current.id, i)}
                            className="p-1 rounded hover:bg-orange-50"
                            aria-label={m.done ? "Mark incomplete" : "Mark complete"}
                          >
                            {m.done ? <CheckCircle2 className="w-5 h-5 text-orange-500" /> : <Circle className="w-5 h-5 text-orange-500" />}
                          </button>
                        ) : (
                          m.done ? <CheckCircle2 className="w-5 h-5 text-orange-500" /> : <Circle className="w-5 h-5 text-orange-500" />
                        )}
                        <span className={m.done ? "line-through text-gray-400" : "text-gray-800"}>{m.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{m.due ? new Date(m.due).toLocaleDateString() : "—"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {current.collaborators?.length ? (
              <div>
                <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Collaborators
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.collaborators.map((c, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {current.notes ? (
              <div>
                <div className="font-semibold text-gray-800 mb-2">Notes</div>
                <div className="text-gray-700 whitespace-pre-wrap">{current.notes}</div>
              </div>
            ) : null}
          </div>
        )}
      </Drawer>

      {/* ------------------------------ Editor Drawer (mentor-only) ------------------------------ */}
      {mode === "mentor" && (
        <Drawer open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Project" : "New Project"}>
          {editing && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <input
                className="md:col-span-6 rounded-xl border border-orange-200 px-4 py-3"
                placeholder="Project title"
                value={editing.title}
                onChange={(e) => setEditing((d) => ({ ...d, title: e.target.value }))}
                autoFocus
              />
              <input
                className="md:col-span-6 rounded-xl border border-orange-200 px-4 py-3"
                placeholder="Short summary"
                value={editing.summary}
                onChange={(e) => setEditing((d) => ({ ...d, summary: e.target.value }))}
              />
              <div className="md:col-span-3 relative">
                <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-9 rounded-xl border border-orange-200 px-3 py-3"
                  placeholder="Budget (USD)"
                  value={editing.budget}
                  onChange={(e) => setEditing((d) => ({ ...d, budget: e.target.value }))}
                />
              </div>
              <div className="md:col-span-3 relative">
                <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-9 rounded-xl border border-orange-200 px-3 py-3"
                  placeholder="Spent (USD)"
                  value={editing.spent}
                  onChange={(e) => setEditing((d) => ({ ...d, spent: e.target.value }))}
                />
              </div>
              <div className="md:col-span-3">
                <select
                  className="w-full rounded-xl border border-orange-200 px-3 py-3"
                  value={editing.status}
                  onChange={(e) => setEditing((d) => ({ ...d, status: e.target.value }))}
                >
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Complete</option>
                </select>
              </div>
              <div className="md:col-span-3 relative">
                <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 rounded-xl border border-orange-200 px-3 py-3"
                  value={editing.due || ""}
                  onChange={(e) => setEditing((d) => ({ ...d, due: e.target.value }))}
                />
              </div>

              {/* Collaborators */}
              <div className="md:col-span-12">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Collaborators (comma-separated)</label>
                <input
                  className="w-full rounded-xl border border-orange-200 px-3 py-2"
                  placeholder="e.g., Alex (Mentor), Sam (Designer)"
                  value={editing.collaborators?.join(", ") || ""}
                  onChange={(e) =>
                    setEditing((d) => ({
                      ...d,
                      collaborators: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                />
              </div>

              {/* Links */}
              <div className="md:col-span-12">
                <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Links
                </div>
                {editing.links.map((l, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                    <input
                      className="rounded-xl border border-orange-200 px-3 py-2"
                      placeholder="Label (e.g., Drive folder)"
                      value={l.label}
                      onChange={(e) => {
                        const next = [...editing.links];
                        next[i] = { ...next[i], label: e.target.value };
                        setEditing((d) => ({ ...d, links: next }));
                      }}
                    />
                    <input
                      className="rounded-xl border border-orange-200 px-3 py-2"
                      placeholder="URL"
                      value={l.url}
                      onChange={(e) => {
                        const next = [...editing.links];
                        next[i] = { ...next[i], url: e.target.value };
                        setEditing((d) => ({ ...d, links: next }));
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => setEditing((d) => ({ ...d, links: [...d.links, { label: "", url: "" }] }))}
                  className="text-sm text-orange-700 font-semibold hover:underline"
                >
                  + Add link
                </button>
              </div>

              {/* Milestones */}
              <div className="md:col-span-12">
                <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Milestones
                </div>
                {editing.milestones.map((m, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
                    <input
                      className="md:col-span-8 rounded-xl border border-orange-200 px-3 py-2"
                      placeholder="Milestone title"
                      value={m.title}
                      onChange={(e) => {
                        const next = [...editing.milestones];
                        next[i] = { ...next[i], title: e.target.value };
                        setEditing((d) => ({ ...d, milestones: next }));
                      }}
                    />
                    <input
                      type="date"
                      className="md:col-span-3 rounded-xl border border-orange-200 px-3 py-2"
                      value={m.due || ""}
                      onChange={(e) => {
                        const next = [...editing.milestones];
                        next[i] = { ...next[i], due: e.target.value };
                        setEditing((d) => ({ ...d, milestones: next }));
                      }}
                    />
                    <div className="md:col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={!!m.done}
                        onChange={() => {
                          const next = [...editing.milestones];
                          next[i] = { ...next[i], done: !next[i].done };
                          setEditing((d) => ({ ...d, milestones: next }));
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setEditing((d) => ({ ...d, milestones: [...d.milestones, { title: "", due: "", done: false }] }))
                  }
                  className="text-sm text-orange-700 font-semibold hover:underline"
                >
                  + Add milestone
                </button>
              </div>

              {/* Tasks */}
              <div className="md:col-span-12">
                <div className="font-semibold text-gray-800 mb-2">Tasks</div>
                {editing.tasks.map((t, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
                    <input
                      className="md:col-span-11 rounded-xl border border-orange-200 px-3 py-2"
                      placeholder="Task title"
                      value={t.title}
                      onChange={(e) => {
                        const next = [...editing.tasks];
                        next[i] = { ...next[i], title: e.target.value };
                        setEditing((d) => ({ ...d, tasks: next }));
                      }}
                    />
                    <div className="md:col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={!!t.done}
                        onChange={() => {
                          const next = [...editing.tasks];
                          next[i] = { ...next[i], done: !next[i].done };
                          setEditing((d) => ({ ...d, tasks: next }));
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setEditing((d) => ({ ...d, tasks: [...d.tasks, { title: "", done: false }] }))}
                  className="text-sm text-orange-700 font-semibold hover:underline"
                >
                  + Add task
                </button>
              </div>

              {/* Notes */}
              <textarea
                className="md:col-span-12 rounded-xl border border-orange-200 px-3 py-3"
                rows={4}
                placeholder="Notes (scope details, decisions, etc.)"
                value={editing.notes}
                onChange={(e) => setEditing((d) => ({ ...d, notes: e.target.value }))}
              />

              <div className="md:col-span-12 flex gap-3 justify-end">
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-orange-200">
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700"
                >
                  Save Project
                </button>
              </div>
            </div>
          )}
        </Drawer>
      )}
    </div>
  );
}
