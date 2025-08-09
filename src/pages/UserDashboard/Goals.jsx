// src/pages/UserDashboard/Goals.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays, Edit3 } from "lucide-react";

export default function Goals() {
  const STORAGE_KEY = "mw_goals";
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: "", notes: "", due: "" });
  const [editingId, setEditingId] = useState(null);

  // Load & persist
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setGoals(saved);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    const t = form.title.trim();
    if (!t) return;
    const newGoal = {
      id: crypto.randomUUID(),
      title: t,
      notes: form.notes.trim(),
      due: form.due || "",
      done: false,
      createdAt: Date.now(),
    };
    setGoals((g) => [newGoal, ...g]);
    setForm({ title: "", notes: "", due: "" });
  };

  const toggleDone = (id) =>
    setGoals((g) => g.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  const removeGoal = (id) => setGoals((g) => g.filter((it) => it.id !== id));
  const startEdit = (id) => setEditingId(id);
  const saveEdit = (id, patch) =>
    setGoals((g) => g.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const active = useMemo(() => goals.filter((g) => !g.done), [goals]);
  const completed = useMemo(() => goals.filter((g) => g.done), [goals]);

  return (
    <section className="mt-2">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="text-3xl font-extrabold text-orange-600 tracking-tight">Your Mentorship Goals</h2>
        <p className="text-gray-600 mt-2">
          Write clear goals, add notes and an optional due date, and check them off as you progress.
          (Everything saves automatically on this device.)
        </p>
      </motion.div>

      {/* Add Goal */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <input
            className="md:col-span-5 rounded-xl border border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Goal title (e.g., Learn 3 songs on guitar)"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
          />
          <input
            className="md:col-span-5 rounded-xl border border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
          />
          <div className="md:col-span-2 flex gap-2">
            <div className="relative flex-1">
              <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 rounded-xl border border-orange-200 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.due}
                onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))}
              />
            </div>
            <button
              onClick={addGoal}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-orange-700 active:scale-[0.99] transition"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active & Completed */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active */}
        <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-3">In Progress</h3>
          {active.length === 0 ? (
            <p className="text-gray-500">No active goals yet. Add one above.</p>
          ) : (
            <ul className="space-y-3">
              {active.map((g) => (
                <li key={g.id} className="group flex items-start gap-3 p-4 rounded-xl border border-orange-100 hover:shadow-sm">
                  <button onClick={() => toggleDone(g.id)} className="mt-0.5 shrink-0" aria-label="Mark complete">
                    <Circle className="w-5 h-5 text-orange-500 group-hover:scale-110 transition" />
                  </button>
                  <div className="flex-1">
                    {editingId === g.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full rounded-lg border border-orange-200 px-3 py-2"
                          defaultValue={g.title}
                          onBlur={(e) => { saveEdit(g.id, { title: e.target.value }); setEditingId(null); }}
                          autoFocus
                        />
                        <textarea
                          className="w-full rounded-lg border border-orange-200 px-3 py-2"
                          defaultValue={g.notes}
                          onBlur={(e) => { saveEdit(g.id, { notes: e.target.value }); setEditingId(null); }}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="font-semibold text-gray-900 cursor-text" onDoubleClick={() => setEditingId(g.id)} title="Double-click to edit">
                          {g.title}
                        </div>
                        {g.notes && (
                          <div className="text-gray-600 text-sm mt-1 cursor-text" onDoubleClick={() => setEditingId(g.id)}>
                            {g.notes}
                          </div>
                        )}
                        {g.due && (
                          <div className="text-xs mt-2 text-orange-600 font-medium">
                            Due {new Date(g.due).toLocaleDateString()}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingId(g.id)} className="p-2 rounded-lg hover:bg-orange-50" title="Edit">
                      <Edit3 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => removeGoal(g.id)} className="p-2 rounded-lg hover:bg-orange-50" title="Delete">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Completed</h3>
          {completed.length === 0 ? (
            <p className="text-gray-500">Nothing completed yet.</p>
          ) : (
            <ul className="space-y-3">
              {completed.map((g) => (
                <li key={g.id} className="group flex items-start gap-3 p-4 rounded-xl border border-orange-100 bg-orange-50/40">
                  <button onClick={() => toggleDone(g.id)} className="mt-0.5 shrink-0" aria-label="Mark incomplete">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  </button>
                  <div className="flex-1">
                    <div className="font-semibold line-through text-gray-500">{g.title}</div>
                    {g.notes && <div className="text-gray-500 text-sm">{g.notes}</div>}
                    {g.due && <div className="text-xs mt-2 text-gray-500">Due {new Date(g.due).toLocaleDateString()}</div>}
                  </div>
                  <button onClick={() => removeGoal(g.id)} className="p-2 rounded-lg hover:bg-orange-100" title="Delete">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
