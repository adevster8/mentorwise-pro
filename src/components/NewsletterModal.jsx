import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DELAY_MS = 25000; // 25s

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const submit = (e) => {
    e.preventDefault();
    // TODO: hook to ESP
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110]" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {/* Card */}
            <motion.div
              className="
                w-full max-w-[920px] bg-white rounded-3xl shadow-2xl ring-1 ring-slate-900/10 overflow-hidden
                grid grid-cols-1 md:grid-cols-2 md:min-h-[560px]
              "
              initial={{ x: -36, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -36, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* MOBILE IMAGE — show entire wide image, no crop */}
              <div className="md:hidden">
                <img
                  src="/popup-photo.jpg"
                  alt="Mentorwise newsletter"
                  className="block w-full h-auto object-contain bg-white"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              {/* DESKTOP IMAGE — fills column height (matches newsletter panel) */}
              <div className="hidden md:block relative h-full">
                <img
                  src="/newsletter-pic.jpg"
                  alt="Mentor at desk"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              {/* CONTENT */}
              <div className="relative p-6 sm:p-8 flex flex-col h-full">
                {/* Close */}
                <button
                  onClick={close}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                <div className="grow">
                  <h2 className="font-manrope text-[28px] md:text-[30px] font-extrabold leading-tight text-slate-900">
                    Level up with mentor-grade insights — in your inbox.
                  </h2>

                  {/* Mobile: shorter copy */}
                  <p className="mt-3 font-lato text-[15px] leading-7 text-slate-600 md:hidden">
                    One ultra-practical tip each week — quick, no fluff.
                  </p>

                  {/* Desktop: full copy */}
                  <p className="mt-3 font-lato text-[15px] leading-7 text-slate-600 hidden md:block">
                    Join <span className="font-semibold text-slate-800">MentorWise Insider</span> for one ultra-practical
                    tip each week. Learn how top mentors plan, execute, and make decisions — in minutes, not hours.
                  </p>

                  <ul className="mt-4 space-y-2 font-lato text-[14px] text-slate-600">
                    <li>• Actionable frameworks you can apply the same day</li>
                    <li>• Signals to cut noise and move faster</li>
                    <li>• No fluff, no spam — ever</li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="mt-5 flex flex-col md:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="md:flex-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-lato text-slate-800 shadow-sm outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-200"
                    aria-label="Email address"
                  />
                  {/* NAVY BUTTON (matches header) */}
                  <button
                    type="submit"
                    className="w-full md:w-auto rounded-xl bg-[#0b1f32] px-6 py-3 font-manrope font-bold text-white shadow-md transition hover:bg-[#0f2740] focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Get the Weekly Tip
                  </button>
                </form>

                <p className="mt-2 text-xs text-slate-500">1 email/week. Unsubscribe anytime.</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
