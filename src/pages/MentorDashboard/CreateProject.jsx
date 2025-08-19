// src/pages/MentorDashboard/CreateProject.jsx
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "../../firebase";   // ✅ add storage
import { megaMenuData } from "../../data/megaMenuData";

import {
  Image as ImageIcon,
  Video,
  Calendar,
  Plus,
  X,
  Loader2,
  FileText,
  Link2,
  Hash,
  Shield,
  Save,
  Rocket,
  BadgeDollarSign,
  Clock,
} from "lucide-react";

// --- helpers ---------------------------------------------------
const slugify = (t) =>
  t
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

const currency = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
    Number(n || 0)
  );

const MAX_IMAGES = 5;
const MAX_VIDEO_MB = 300; // keep generous; adjust if you like

// --- form state ------------------------------------------------
const initial = {
  title: "",
  tagline: "",
  category: "",
  topic: "",
  subtopic: "",
  pricingType: "fixed", // "fixed" | "hourly"
  budget: "",
  durationValue: "",
  durationUnit: "weeks", // days | weeks | months
  startDate: "",
  deadline: "",

  // content
  description: "",
  outcomes: "",
  deliverables: [""],

  // dynamic lists
  milestones: [{ title: "", due: "", required: true }],
  tasks: [{ text: "", required: true }],
  links: [{ label: "", url: "" }],
  collaborators: "", // comma-separated
  tags: [], // chips

  // media
  images: [], // File[]
  video: null, // File | null

  // meta
  agreeGuidelines: false,
  agreeTerms: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, [action.key]: action.value };
    case "PUSH":
      return { ...state, [action.key]: [...state[action.key], action.value] };
    case "REMOVE":
      return {
        ...state,
        [action.key]: state[action.key].filter((_, i) => i !== action.index),
      };
    case "UPDATE_IN_ARRAY":
      return {
        ...state,
        [action.key]: state[action.key].map((item, i) =>
          i === action.index ? { ...item, ...action.value } : item
        ),
      };
    case "RESET_TOPIC_CHAIN":
      return { ...state, topic: "", subtopic: "" };
    case "RESET_SUBTOPIC":
      return { ...state, subtopic: "" };
    case "RESET_ALL":
      return initial;
    default:
      return state;
  }
}

// --- main component --------------------------------------------
export default function CreateProject() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [uid, setUid] = useState(null);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState({ images: 0, video: 0 });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // auth gate (reuses your pattern)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    return () => unsub();
  }, []);

  // derived lists from megaMenuData
  const categories = useMemo(() => megaMenuData.map((c) => c.name), []);
  const topics = useMemo(() => {
    const cat = megaMenuData.find((c) => c.name === state.category);
    return cat ? cat.topics.map((t) => t.title) : [];
  }, [state.category]);
  const subtopics = useMemo(() => {
    const cat = megaMenuData.find((c) => c.name === state.category);
    const top = cat?.topics.find((t) => t.title === state.topic);
    return top ? top.subtopics.map((s) => s.name) : [];
  }, [state.category, state.topic]);

  // basic validation
  const validate = () => {
    const e = {};
    if (!state.title.trim()) e.title = "Title is required.";
    if (!state.category) e.category = "Select a category.";
    if (!state.topic) e.topic = "Select a topic.";
    if (!state.subtopic) e.subtopic = "Select a subtopic.";
    if (!state.description.trim())
      e.description = "Describe what you’ll do and how you’ll work.";
    if (!state.agreeGuidelines) e.guidelines = "Please confirm the guidelines.";
    if (!state.agreeTerms) e.terms = "Please accept the terms.";
    // basic price/time
    if (!state.budget || Number(state.budget) <= 0)
      e.budget = "Enter a valid budget.";
    if (!state.durationValue) e.duration = "Provide an estimated duration.";
    // media sanity
    if (state.images.length > MAX_IMAGES)
      e.images = `Limit ${MAX_IMAGES} images.`;
    if (state.video && state.video.size / (1024 * 1024) > MAX_VIDEO_MB)
      e.video = `Video must be under ${MAX_VIDEO_MB}MB.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // image & video previews
  const imagePreviews = useMemo(
    () => state.images.map((f) => URL.createObjectURL(f)),
    [state.images]
  );
  const videoPreview = useMemo(
    () => (state.video ? URL.createObjectURL(state.video) : null),
    [state.video]
  );

  // handlers -----------------------------------------------------
  const handleAddTag = (val) => {
    const t = val.trim();
    if (!t) return;
    if (state.tags.length >= 12) return;
    if (state.tags.includes(t)) return;
    dispatch({ type: "SET", key: "tags", value: [...state.tags, t] });
  };

  const handleRemoveTag = (i) =>
    dispatch({
      type: "SET",
      key: "tags",
      value: state.tags.filter((_, idx) => idx !== i),
    });

  const onSelectCategory = (v) => {
    dispatch({ type: "SET", key: "category", value: v });
    dispatch({ type: "RESET_TOPIC_CHAIN" });
  };
  const onSelectTopic = (v) => {
    dispatch({ type: "SET", key: "topic", value: v });
    dispatch({ type: "RESET_SUBTOPIC" });
  };

  const onImagePick = (files) => {
    const list = Array.from(files || []);
    const filtered = list
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, MAX_IMAGES - state.images.length);
    dispatch({
      type: "SET",
      key: "images",
      value: [...state.images, ...filtered],
    });
  };
  const onVideoPick = (file) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) return;
    dispatch({ type: "SET", key: "video", value: file });
  };

  // upload helpers ----------------------------------------------
  const uploadFile = async (file, destPath, kind) => {
    const r = ref(storage, destPath);
    const snap = await uploadBytes(r, file);
    const url = await getDownloadURL(snap.ref);
    // lightweight progress simulate: count items uploaded
    setProgress((p) => ({ ...p, [kind]: p[kind] + 1 }));
    return url;
  };

  const handleSubmit = async (publish = false) => {
    if (!uid) {
      alert("Please sign in to create a project.");
      return;
    }
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSaving(true);
    setProgress({ images: 0, video: 0 });

    try {
      const slug = `${slugify(state.title)}-${Date.now().toString(36)}`;
      const base = `projects/${uid}/${slug}`;

      // upload media
      const imageUrls = [];
      for (let i = 0; i < state.images.length; i++) {
        const url = await uploadFile(state.images[i], `${base}/images/${i}`, "images");
        imageUrls.push(url);
      }
      let videoUrl = "";
      if (state.video) {
        videoUrl = await uploadFile(state.video, `${base}/video/main`, "video");
      }

      const payload = {
        uid,
        slug,
        title: state.title.trim(),
        tagline: state.tagline.trim(),
        category: state.category,
        topic: state.topic,
        subtopic: state.subtopic,
        pricingType: state.pricingType,
        budget: Number(state.budget),
        duration: {
          value: Number(state.durationValue),
          unit: state.durationUnit,
        },
        startDate: state.startDate || null,
        deadline: state.deadline || null,
        description: state.description.trim(),
        outcomes: state.outcomes.trim(),
        deliverables: state.deliverables.filter((d) => d.trim()),
        milestones: state.milestones
          .filter((m) => m.title.trim())
          .map((m) => ({ ...m, title: m.title.trim() })),
        tasks: state.tasks
          .filter((t) => t.text.trim())
          .map((t) => ({ ...t, text: t.text.trim() })),
        links: state.links
          .filter((l) => l.url.trim() || l.label.trim())
          .map((l) => ({ label: l.label.trim(), url: l.url.trim() })),
        collaborators: state.collaborators
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        tags: state.tags,
        images: imageUrls,
        video: videoUrl || null,
        status: publish ? "published" : "draft",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        seo: {
          metaDescription:
            state.tagline?.trim() ||
            `Mentor project: ${state.title} in ${state.category} → ${state.subtopic}`,
          keywords: state.tags,
        },
      };

      await addDoc(collection(db, "projects"), payload);

      // done
      navigate("/mentor-dashboard/projects");
    } catch (err) {
      console.error(err);
      alert("There was an error saving your project. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  // --- UI bits -------------------------------------------------
  const Section = ({ icon, title, children, desc }) => (
    <section className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-1">{icon}</div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
          {desc && <p className="text-sm text-slate-600 mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );

  const Field = ({ label, error, children }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-800 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );

  if (!uid) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <div className="rounded-xl border border-orange-200 bg-white p-8 text-center">
          <p className="text-slate-700">
            Please sign in to create a project. Once you’re in, this page becomes your full
            builder with uploads, milestones, and more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {/* header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Create a New Project
        </h1>
        <p className="text-slate-600 mt-2">
          Make a polished, search-optimized project that clients can understand at a glance.
        </p>
      </div>

      {/* grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left: main form */}
        <div className="lg:col-span-2 space-y-6">
          <Section
            icon={<FileText className="w-5 h-5 text-orange-500" />}
            title="Basics"
            desc="Clear title and overview help clients find you."
          >
            <Field label="Project Title" error={errors.title}>
              <input
                type="text"
                className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g., Launch a Personal Portfolio Website"
                value={state.title}
                onChange={(e) => dispatch({ type: "SET", key: "title", value: e.target.value })}
                maxLength={90}
              />
              <div className="text-xs text-slate-500 mt-1">
                {state.title.length}/90 • Slug: {slugify(state.title) || "—"}
              </div>
            </Field>

            <Field label="Short Tagline (shows in cards)">
              <input
                type="text"
                className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Design and publish a clean, responsive portfolio in two weeks"
                value={state.tagline}
                onChange={(e) => dispatch({ type: "SET", key: "tagline", value: e.target.value })}
                maxLength={140}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Category" error={errors.category}>
                <select
                  value={state.category}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 bg-white focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select…</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Topic" error={errors.topic}>
                <select
                  value={state.topic}
                  onChange={(e) => onSelectTopic(e.target.value)}
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 bg-white focus:ring-2 focus:ring-orange-400"
                  disabled={!topics.length}
                >
                  <option value="">Select…</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Subtopic" error={errors.subtopic}>
                <select
                  value={state.subtopic}
                  onChange={(e) =>
                    dispatch({ type: "SET", key: "subtopic", value: e.target.value })
                  }
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 bg-white focus:ring-2 focus:ring-orange-400"
                  disabled={!subtopics.length}
                >
                  <option value="">Select…</option>
                  {subtopics.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          <Section
            icon={<BadgeDollarSign className="w-5 h-5 text-orange-500" />}
            title="Pricing & Timeline"
            desc="Be realistic and set expectations."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Pricing Type">
                <div className="flex gap-2">
                  {["fixed", "hourly"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => dispatch({ type: "SET", key: "pricingType", value: t })}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        state.pricingType === t
                          ? "bg-orange-100 border-orange-300 text-orange-800"
                          : "bg-white border-orange-200 text-slate-700"
                      }`}
                    >
                      {t === "fixed" ? "Fixed Price" : "Hourly"}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Budget" error={errors.budget}>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                  placeholder="e.g., 500"
                  value={state.budget}
                  onChange={(e) => dispatch({ type: "SET", key: "budget", value: e.target.value })}
                />
                {state.budget && (
                  <div className="text-xs text-slate-500 mt-1">
                    Approx: {currency(state.budget)}
                  </div>
                )}
              </Field>

              <Field label="Duration" error={errors.duration}>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    className="w-24 rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                    placeholder="2"
                    value={state.durationValue}
                    onChange={(e) =>
                      dispatch({ type: "SET", key: "durationValue", value: e.target.value })
                    }
                  />
                  <select
                    className="rounded-xl border border-orange-200 px-3 py-2.5 bg-white focus:ring-2 focus:ring-orange-400"
                    value={state.durationUnit}
                    onChange={(e) =>
                      dispatch({ type: "SET", key: "durationUnit", value: e.target.value })
                    }
                  >
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                  </select>
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <Field label="Start Date">
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    className="w-full rounded-xl border border-orange-200 pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                    value={state.startDate}
                    onChange={(e) =>
                      dispatch({ type: "SET", key: "startDate", value: e.target.value })
                    }
                  />
                </div>
              </Field>
              <Field label="Deadline">
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    className="w-full rounded-xl border border-orange-200 pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                    value={state.deadline}
                    onChange={(e) =>
                      dispatch({ type: "SET", key: "deadline", value: e.target.value })
                    }
                  />
                </div>
              </Field>
            </div>
          </Section>

          <Section
            icon={<FileText className="w-5 h-5 text-orange-500" />}
            title="Scope & Details"
            desc="Write clearly. Clients skim on mobile."
          >
            <Field label="Detailed Description" error={errors.description}>
              <textarea
                rows={7}
                className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                placeholder="What exactly will you do? How will you communicate? What tools or frameworks do you use? What the client must provide..."
                value={state.description}
                onChange={(e) =>
                  dispatch({ type: "SET", key: "description", value: e.target.value })
                }
              />
            </Field>

            <Field label="Intended Outcomes (client-facing)">
              <textarea
                rows={4}
                className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                placeholder="Ex: Launch a mobile-friendly portfolio, improve lighthouse score >90, set up analytics & SEO basics..."
                value={state.outcomes}
                onChange={(e) =>
                  dispatch({ type: "SET", key: "outcomes", value: e.target.value })
                }
              />
            </Field>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Deliverables
              </label>
              <div className="space-y-2">
                {state.deliverables.map((d, i) => (
                  <div className="flex gap-2" key={i}>
                    <input
                      type="text"
                      className="flex-1 rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      placeholder={`Deliverable ${i + 1}`}
                      value={d}
                      onChange={(e) =>
                        dispatch({
                          type: "SET",
                          key: "deliverables",
                          value: state.deliverables.map((x, idx) =>
                            idx === i ? e.target.value : x
                          ),
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "REMOVE", key: "deliverables", index: i })
                      }
                      className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50"
                      aria-label="Remove deliverable"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => dispatch({ type: "PUSH", key: "deliverables", value: "" })}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  <Plus className="w-4 h-4" /> Add deliverable
                </button>
              </div>
            </div>
          </Section>

          <Section
            icon={<Calendar className="w-5 h-5 text-orange-500" />}
            title="Milestones & Tasks"
            desc="Break work into steps. Clients love clarity."
          >
            {/* Milestones */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-700 mb-2">Milestones</div>
              <div className="space-y-2">
                {state.milestones.map((m, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Milestone title"
                      className="rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      value={m.title}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_IN_ARRAY",
                          key: "milestones",
                          index: i,
                          value: { title: e.target.value },
                        })
                      }
                    />
                    <input
                      type="date"
                      className="rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      value={m.due}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_IN_ARRAY",
                          key: "milestones",
                          index: i,
                          value: { due: e.target.value },
                        })
                      }
                    />
                    <div className="flex items-center justify-between gap-2">
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={m.required}
                          onChange={(e) =>
                            dispatch({
                              type: "UPDATE_IN_ARRAY",
                              key: "milestones",
                              index: i,
                              value: { required: e.target.checked },
                            })
                          }
                        />
                        Required
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "REMOVE", key: "milestones", index: i })
                        }
                        className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "PUSH",
                      key: "milestones",
                      value: { title: "", due: "", required: true },
                    })
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  <Plus className="w-4 h-4" /> Add milestone
                </button>
              </div>
            </div>

            {/* Tasks */}
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">Tasks</div>
              <div className="space-y-2">
                {state.tasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Task description"
                      className="flex-1 rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      value={t.text}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_IN_ARRAY",
                          key: "tasks",
                          index: i,
                          value: { text: e.target.value },
                        })
                      }
                    />
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={t.required}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_IN_ARRAY",
                            key: "tasks",
                            index: i,
                            value: { required: e.target.checked },
                          })
                        }
                      />
                      Required
                    </label>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "REMOVE", key: "tasks", index: i })}
                      className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "PUSH", key: "tasks", value: { text: "", required: true } })
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  <Plus className="w-4 h-4" /> Add task
                </button>
              </div>
            </div>
          </Section>

          <Section
            icon={<Link2 className="w-5 h-5 text-orange-500" />}
            title="Resources & Collaborators"
          >
  <Field label="Collaborators (comma-separated)">
  <input
    type="text"
    className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
    placeholder="Alex Mentor, Jamie Designer"
    value={state.collaborators}
    onChange={(e) =>
      dispatch({ type: "SET", key: "collaborators", value: e.target.value })
    }
  />
</Field>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Links (repo, folder, brief, etc.)
              </label>
              <div className="space-y-2">
                {state.links.map((l, i) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2" key={i}>
                    <input
                      type="text"
                      placeholder="Label"
                      className="rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      value={l.label}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_IN_ARRAY",
                          key: "links",
                          index: i,
                          value: { label: e.target.value },
                        })
                      }
                    />
                    <input
                      type="url"
                      placeholder="https://…"
                      className="md:col-span-2 rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                      value={l.url}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_IN_ARRAY",
                          key: "links",
                          index: i,
                          value: { url: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => dispatch({ type: "PUSH", key: "links", value: { label: "", url: "" } })}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  <Plus className="w-4 h-4" /> Add link
                </button>
              </div>
            </div>
          </Section>

          <Section
            icon={<ImageIcon className="w-5 h-5 text-orange-500" />}
            title="Media"
            desc="Add up to 5 images and 1 short video."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={`Images (${state.images.length}/${MAX_IMAGES})`} error={errors.images}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => onImagePick(e.target.files)}
                  className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border file:border-orange-200 file:bg-orange-50 file:px-3 file:py-2 file:text-slate-800 hover:file:bg-orange-100"
                />
                {!!imagePreviews.length && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative">
                        <img
                          src={src}
                          alt={`preview-${i}`}
                          className="w-full h-24 object-cover rounded-lg border border-orange-200"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({ type: "SET", key: "images", value: state.images.filter((_, idx) => idx !== i) })
                          }
                          className="absolute -top-2 -right-2 bg-white border border-orange-200 rounded-full p-1 shadow"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {saving && state.images.length > 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    Uploading images… {progress.images}/{state.images.length}
                  </div>
                )}
              </Field>

              <Field label="Video (1 max)" error={errors.video}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => onVideoPick(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border file:border-orange-200 file:bg-orange-50 file:px-3 file:py-2 file:text-slate-800 hover:file:bg-orange-100"
                />
                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="mt-3 w-full rounded-lg border border-orange-200"
                  />
                )}
                {saving && state.video && (
                  <div className="text-xs text-slate-500 mt-1">Uploading video…</div>
                )}
              </Field>
            </div>
          </Section>

          <Section icon={<Hash className="w-5 h-5 text-orange-500" />} title="SEO & Tags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Add a tag (press Enter)">
                <input
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  placeholder="web design, portfolio, seo…"
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.tags.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1"
                    >
                      {t}
                      <button onClick={() => handleRemoveTag(i)} aria-label="Remove tag">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </Field>

              <Field label="Meta Description (optional)">
                <input
                  type="text"
                  maxLength={160}
                  placeholder="One crisp sentence that would look great on Google."
                  className="w-full rounded-xl border border-orange-200 px-3 py-2.5 focus:ring-2 focus:ring-orange-400"
                  value={state.tagline}
                  onChange={(e) => dispatch({ type: "SET", key: "tagline", value: e.target.value })}
                />
                <div className="text-xs text-slate-500 mt-1">
                  {state.tagline?.length || 0}/160
                </div>
              </Field>
            </div>
          </Section>

          <Section icon={<Shield className="w-5 h-5 text-orange-500" />} title="Confirm">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={state.agreeGuidelines}
                  onChange={(e) =>
                    dispatch({ type: "SET", key: "agreeGuidelines", value: e.target.checked })
                  }
                />
                I will only upload media I have rights to and follow platform guidelines.
              </label>
              {errors.guidelines && <p className="text-xs text-red-600">{errors.guidelines}</p>}
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={state.agreeTerms}
                  onChange={(e) =>
                    dispatch({ type: "SET", key: "agreeTerms", value: e.target.checked })
                  }
                />
                I agree to the Terms of Service and understand this will be reviewed.
              </label>
              {errors.terms && <p className="text-xs text-red-600">{errors.terms}</p>}
            </div>
          </Section>

          {/* actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 font-bold text-slate-800 hover:bg-orange-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-bold text-white shadow hover:bg-orange-700"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              Publish Project
            </motion.button>
          </div>
        </div>

        {/* right: live summary card */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <div className="text-sm font-bold text-slate-900">Live Preview</div>
              <div className="mt-3">
                <div className="aspect-video w-full rounded-xl border border-orange-200 bg-orange-50 overflow-hidden grid place-items-center">
                  {imagePreviews[0] ? (
                    <img
                      src={imagePreviews[0]}
                      alt="cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-500 text-sm">Cover image preview</span>
                  )}
                </div>
                <div className="mt-3">
                  <div className="text-xs font-semibold text-orange-700">
                    {state.category || "Category"} / {state.subtopic || "Subtopic"}
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 mt-1">
                    {state.title || "Your project title"}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {state.tagline || "A crisp one-liner that sells the value."}
                  </div>
                  <div className="text-sm text-slate-700 mt-3 flex items-center gap-2">
                    <BadgeDollarSign className="w-4 h-4 text-orange-500" />
                    {state.budget ? currency(state.budget) : "$—"} ·{" "}
                    {state.durationValue
                      ? `${state.durationValue} ${state.durationUnit}`
                      : "— duration"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <div className="text-sm font-bold text-slate-900">Upload Status</div>
              <ul className="text-sm text-slate-600 mt-2 space-y-1">
                <li>
                  Images: {progress.images}/{state.images.length}
                </li>
                <li>Video: {state.video ? (progress.video ? "1/1" : "pending") : "—"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
