// src/pages/Support.jsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import ModernDropdown from "../components/ModernDropdown";
import { motion } from "framer-motion";

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay: d },
});

const Section = ({ children }) => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
    {children}
  </section>
);

export default function Support() {
  // --- form state ---
  const [topic, setTopic] = useState(null);
  const [area, setArea] = useState(null);
  const [urgency, setUrgency] = useState("Normal");
  const [account, setAccount] = useState(null);
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // --- dropdown options (stable via useMemo) ---
  const topicOptions = useMemo(
    () => [
      "Technical Issue",
      "Mentors & Programs",
      "Projects & Offers",
      "Scheduling",
      "Billing & Payments",
      "RealTalk Community",
      "Other / General",
    ],
    []
  );

  const areaOptions = useMemo(
    () => [
      "Sign in / Auth",
      "Mentor Dashboard",
      "User Dashboard",
      "Programs",
      "Messaging",
      "Checkout",
      "Reviews",
      "Website / SEO",
    ],
    []
  );

  const urgencyOptions = ["Low", "Normal", "High", "Critical"];
  const accountOptions = ["Client", "Mentor", "Not sure / browsing"];

  // --- basic validation + submit stub ---
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!topic) return setError("Please choose a topic.");
    if (!area) return setError("Please choose which part of the app.");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    if (!details || details.trim().length < 10) return setError("Please include a few details (10+ chars).");

    setSubmitting(true);
    try {
      // TODO: wire up to Firestore/Email provider
      console.log("Support ticket", {
        topic,
        area,
        urgency,
        account,
        email,
        details,
      });
      alert("Thanks! Your message was sent. We’ll get back within 24–48 hours.");
      // reset
      setTopic(null);
      setArea(null);
      setUrgency("Normal");
      setAccount(null);
      setEmail("");
      setDetails("");
    } catch (err) {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-white font-manrope">
      <Helmet>
        <title>Support — MentorWise</title>
        <meta
          name="description"
          content="Need help with MentorWise? Tell us your topic, area of the app, urgency, and details. We typically respond within 24–48 hours."
        />
      </Helmet>

      <main>
        <Section>
          <motion.div {...fadeUp(0)}>
            <div className="text-xs tracking-widest uppercase font-semibold text-orange-600/90">Support</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">Support</h1>
            <p className="mt-2 text-slate-600">
              Tell us what you need help with and we’ll get back within 24–48 hours.
            </p>
          </motion.div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {/* Topic / Area */}
            <motion.div {...fadeUp(0.05)} className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-center font-semibold text-slate-800">Topic</div>
                <ModernDropdown
                  placeholder="Choose a topic"
                  options={topicOptions}
                  onSelect={setTopic}
                  containerClassName="z-auto"
                  buttonClassName="w-full"
                  navOffset={152}
                />
              </div>

              <div>
                <div className="mb-2 text-center font-semibold text-slate-800">Area</div>
                <ModernDropdown
                  placeholder="Which part of the app?"
                  options={areaOptions}
                  onSelect={setArea}
                  containerClassName="z-auto"
                  buttonClassName="w-full"
                  navOffset={152}
                />
              </div>
            </motion.div>

            {/* Urgency / Account tabs */}
            <motion.div {...fadeUp(0.1)} className="rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200/60 shadow-xl p-4">
              <div className="flex items-center gap-6">
                <div className="font-semibold text-slate-900">Urgency</div>
                <div className="flex gap-2 flex-wrap">
                  {urgencyOptions.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUrgency(u)}
                      className={[
                        "px-3 py-1.5 rounded-xl text-sm border transition",
                        urgency === u
                          ? "bg-orange-100 text-orange-700 border-orange-300"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="font-semibold text-slate-900">Account</div>
                <div className="flex gap-2 flex-wrap">
                  {accountOptions.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAccount(a)}
                      className={[
                        "px-3 py-1.5 rounded-xl text-sm border transition",
                        account === a
                          ? "bg-orange-100 text-orange-700 border-orange-300"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div {...fadeUp(0.15)}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 shadow-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            </motion.div>

            {/* Details */}
            <motion.div {...fadeUp(0.2)}>
              <label className="block mb-2 font-semibold text-slate-900">Details</label>
              <textarea
                rows={8}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue, steps to reproduce, expected vs. actual behavior, and any relevant URLs."
                className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 shadow-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <p className="mt-2 text-xs text-slate-500">
                Please don’t include passwords or sensitive payment details.
              </p>
            </motion.div>

            {error && (
              <motion.div {...fadeUp(0.25)} className="text-sm text-red-600">
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.div {...fadeUp(0.25)} className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white font-semibold shadow hover:bg-orange-600 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send to Support"}
              </button>
              <span className="text-sm text-slate-500">Response time: 24–48 hours</span>
            </motion.div>
          </form>
        </Section>
      </main>
    </div>
  );
}
