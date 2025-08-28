// NewsletterModal.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const DELAY_MS = 25_000; // 25s

/* -------------------------------------------------------------------------- */
/* Session storage helpers (SSR safe)                                         */
/* -------------------------------------------------------------------------- */
const safeSession = {
  get(key) {
    try { return typeof window !== "undefined" ? window.sessionStorage.getItem(key) : null; }
    catch { return null; }
  },
  set(key, val) {
    try { if (typeof window !== "undefined") window.sessionStorage.setItem(key, val); }
    catch {}
  }
};

/* -------------------------------------------------------------------------- */
/* External modal state (immune to parent re-renders)                         */
/* -------------------------------------------------------------------------- */
const modalState = {
  isOpen: false,
  listeners: new Set(),
  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.listeners.forEach(l => l(true));
  },
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.listeners.forEach(l => l(false));
    safeSession.set("newsletterDismissed", "true");
  },
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

/* Initialize one-shot timer once per page load */
if (typeof window !== "undefined" && !window.__newsletterTimerInit) {
  window.__newsletterTimerInit = true;
  setTimeout(() => {
    if (!safeSession.get("newsletterDismissed")) modalState.open();
  }, DELAY_MS);
}

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */
const FeatureListItem = ({ children }) => (
  <li className="flex items-center gap-3">
    <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-orange-500" />
    <span className="text-slate-700">{children}</span>
  </li>
);

/* -------------------------------------------------------------------------- */
/* Modal content (button anchored to the panel)                               */
/* -------------------------------------------------------------------------- */
const ModalContent = ({ open, close, submit, emailRef }) => {
  const titleId = "newsletter-title";
  const descId  = "newsletter-desc";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId}>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={close}
          />

          {/* Centered panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              className="relative flex w-full max-w-4xl max-h-[90vh] flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Close button anchored to panel */}
              <motion.button
                type="button"
                onClick={close}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Close newsletter signup"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </motion.button>

              {/* Image */}
              <div className="relative w-full md:w-5/12 aspect-[4/3] md:aspect-auto">
                <img
                  src="/newsletter-pic.jpg"
                  alt="A smiling mentor working at a desk"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-7/12 flex flex-col p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-white to-slate-50 overflow-y-auto">
                <div className="flex-grow">
                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                    Weekly Insider
                  </p>
                  <h2 id={titleId} className="mt-2 font-manrope text-2xl md:text-3xl font-extrabold leading-tight text-slate-900">
                    Level up with mentor-grade insights.
                  </h2>
                  <p id={descId} className="mt-3 text-base leading-7 text-slate-600">
                    Join for one ultra-practical tip each week. Learn how top mentors plan, execute, and make decisions — in minutes, not hours.
                  </p>
                  <ul className="mt-5 space-y-2.5 text-[15px]">
                    <FeatureListItem>Actionable frameworks you can apply same-day</FeatureListItem>
                    <FeatureListItem>Signals to cut noise and move faster</FeatureListItem>
                    <FeatureListItem>No fluff, no spam — ever</FeatureListItem>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="mt-6">
                  <div className="relative flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                        aria-label="Email address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex-shrink-0 rounded-xl bg-[#0b1f32] px-6 py-3 font-manrope font-bold text-white shadow-md transition hover:bg-[#0f2740] focus:outline-none focus:ring-4 focus:ring-orange-500/30"
                    >
                      Get the Weekly Tip
                    </button>
                  </div>
                  <p className="mt-2 text-center sm:text-left text-xs text-slate-500">
                    1 email/week. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* Main component (portal + keyboard/scroll handling)                         */
/* -------------------------------------------------------------------------- */
export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(modalState.isOpen);
  const [isClient, setIsClient] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    const unsubscribe = modalState.subscribe(setIsOpen);

    // ESC to close
    const onKey = (e) => { if (e.key === "Escape") modalState.close(); };
    window.addEventListener("keydown", onKey);

    return () => {
      unsubscribe();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Optional: autofocus the email field when opened
  useEffect(() => {
    if (isOpen) emailRef.current?.focus();
  }, [isOpen]);

  const close  = useCallback(() => modalState.close(), []);
  const submit = useCallback((e) => {
    e.preventDefault();
    // TODO: wire up your submit
    // console.log("Form submitted with email:", e.target.email.value);
    modalState.close();
  }, []);

  if (!isClient) return null;

  return createPortal(
    <ModalContent open={isOpen} close={close} submit={submit} emailRef={emailRef} />,
    document.body
  );
}
