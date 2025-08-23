// src/components/TestimonialsCarousel.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  { name: "Jenny",  img: "https://randomuser.me/api/portraits/women/65.jpg", quote: "MentorWise gave me the confidence to switch careers. My mentor’s guidance was priceless.", age: "28", location: "Nashville, TN" },
  { name: "Mark",   img: "https://randomuser.me/api/portraits/men/32.jpg",   quote: "This platform saved me from wasting thousands on courses. Real advice, real growth.", age: "35", location: "Denver, CO" },
  { name: "Alicia", img: "https://randomuser.me/api/portraits/women/44.jpg", quote: "I found a mentor who really understood my challenges. I’m on a whole new path now.", age: "31", location: "Portland, OR" },
  { name: "Evan",   img: "https://randomuser.me/api/portraits/men/22.jpg",   quote: "The support here is real. Every call has made a difference.", age: "42", location: "San Diego, CA" },
  { name: "Priya",  img: "https://randomuser.me/api/portraits/women/50.jpg", quote: "I never thought I'd actually look forward to coaching sessions. But this is different.", age: "33", location: "Chicago, IL" },
  { name: "Mateo",  img: "https://randomuser.me/api/portraits/men/18.jpg",   quote: "Helped me get unstuck in my career and feel good about my next steps.", age: "29", location: "Austin, TX" },
];

// Card width + the horizontal gap between cards (px)
const CARD_WIDTH = 320;
const CARD_GAP   = 32;
const CARD_WIDTH_WITH_GAP = CARD_WIDTH + CARD_GAP;

// Responsive visible count
function useVisibleCount() {
  const [w, setW] = useState(() => (typeof window === "undefined" ? 1536 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 1 on mobile, 2 on md, 3 on lg, 4 on xl, 5 on ≥1280 (desktop) — exactly 5 on desktop
  if (w >= 1280) return 5;  // desktop request
  if (w >= 1024) return 4;
  if (w >= 768)  return 3;
  if (w >= 640)  return 2;
  return 1;
}

export default function TestimonialsCarousel() {
  const visible = useVisibleCount();

  // Build clones for infinite loop
  const data = useMemo(
    () => [
      ...testimonials.slice(-visible),
      ...testimonials,
      ...testimonials.slice(0, visible),
    ],
    [visible]
  );

  // Index inside the cloned array; start on first "real" card
  const [index, setIndex] = useState(visible);
  const [animKey, setAnimKey] = useState(0); // force re-animate when visible changes

  // When visible changes (resize), reset position cleanly
  useEffect(() => {
    setIndex(visible);
    setAnimKey((k) => k + 1);
  }, [visible]);

  const lastBound = testimonials.length + visible; // when we pass this, snap back

  const handleNext = () => setIndex((i) => i + 1);
  const handlePrev = () => setIndex((i) => i - 1);

  // Snap without animation when we hit a clone boundary
  const transition =
    index === 0 || index === lastBound
      ? { duration: 0 } // instant snap
      : { type: "spring", stiffness: 300, damping: 38, duration: 0.55 };

  const handleTransitionEnd = () => {
    if (index === 0) {
      setIndex(testimonials.length);
      setAnimKey((k) => k + 1);
    } else if (index === lastBound) {
      setIndex(visible);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <section className="w-full bg-slate-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-[2000px] mx-auto text-center px-4 sm:px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-12 md:mb-16 font-manrope"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          What People Are Saying
        </motion.h2>

        <div className="relative flex items-center justify-center">
          {/* Viewport for the track — perfectly centered on all sizes */}
          <div
            className="w-full overflow-hidden mx-auto"
            style={{
              maxWidth: `${CARD_WIDTH_WITH_GAP * visible}px`,
              // symmetric padding keeps the single card centered on mobile
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <motion.div
              key={animKey}
              className="flex"
              style={{ gap: `${CARD_GAP}px` }}
              animate={{ x: `-${index * CARD_WIDTH_WITH_GAP}px` }}
              transition={transition}
              onAnimationComplete={handleTransitionEnd}
            >
              {data.map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-300 w-[320px] flex-shrink-0"
                  style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mx-auto mb-5 border-4 border-white shadow-md"
                  />
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="italic text-slate-600 leading-relaxed font-lato text-center">
                    “{t.quote}”
                  </p>
                  <p className="mt-5 font-lato font-bold text-slate-800 text-center">
                    {t.name}, {t.age} — {t.location}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100 rounded-full shadow-md p-3 z-10 border border-slate-200 transition"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="h-6 w-6 text-slate-600" />
          </button>
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100 rounded-full shadow-md p-3 z-10 border border-slate-200 transition"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
