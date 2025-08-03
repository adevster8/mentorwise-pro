import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  // ...same 8 testimonials as before...
  {
    name: "Jenny",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "MentorWise gave me the confidence to switch careers. My mentor’s guidance was priceless.",
    age: "28",
    location: "Nashville, TN"
  },
  {
    name: "Mark",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "This platform saved me from wasting thousands on courses. Real advice, real growth.",
    age: "35",
    location: "Denver, CO"
  },
  {
    name: "Alicia",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "I found a mentor who really understood my challenges. I’m on a whole new path now.",
    age: "31",
    location: "Portland, OR"
  },
  {
    name: "Evan",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "The support here is real. Every call has made a difference.",
    age: "42",
    location: "San Diego, CA"
  },
  {
    name: "Priya",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
    quote: "I never thought I'd actually look forward to coaching sessions. But this is different.",
    age: "33",
    location: "Chicago, IL"
  },
  {
    name: "Mateo",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    quote: "Helped me get unstuck in my career and feel good about my next steps.",
    age: "29",
    location: "Austin, TX"
  },
  {
    name: "Grace",
    img: "https://randomuser.me/api/portraits/women/23.jpg",
    quote: "My mentor listened, understood, and actually gave me advice I could use right away.",
    age: "40",
    location: "Seattle, WA"
  },
  {
    name: "Isaac",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
    quote: "No hype, just honest support. This is the real deal.",
    age: "36",
    location: "Boston, MA"
  }
];

const CARDS_SHOWN = 4;

export default function TestimonialsCarousel() {
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState(0); // for animation direction

  // Next and Prev with looping
  function next() {
    setDirection(1);
    setStart((s) => (s + 1) % testimonials.length);
  }
  function prev() {
    setDirection(-1);
    setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
  }

  // Get visible cards in looping fashion
  const visible = [];
  for (let i = 0; i < CARDS_SHOWN; i++) {
    visible.push(testimonials[(start + i) % testimonials.length]);
  }

  // For sliding animation
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      position: "absolute"
    }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit: (dir) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      position: "absolute"
    }),
  };

  return (
    <section className="bg-orange-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center relative">
        <motion.h2
          className="text-3xl font-bold text-orange-600 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          What People Are Saying
        </motion.h2>
        <div className="relative flex items-center justify-center w-full">
          {/* Left arrow - use lg:-left-20 for large screens, closer for mobile */}
          <button
            className="absolute -left-16 lg:-left-24 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-orange-100 rounded-full shadow-lg p-3 z-10 border-2 border-orange-300 transition"
            onClick={prev}
            aria-label="Previous"
            tabIndex={0}
            style={{ outline: "none" }}
          >
            <FaChevronLeft className="text-orange-400 text-2xl" />
          </button>
          {/* Cards */}
          <div className="w-full flex justify-center overflow-hidden relative min-h-[410px]">
            <motion.div
              key={start}
              className="flex gap-8 w-full justify-center"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 370, damping: 35 },
                opacity: { duration: 0.15 },
              }}
            >
              {visible.map((t, idx) => (
                <div
                  key={t.name}
                  className="bg-white/95 p-8 rounded-3xl shadow-xl border-t-4 border-orange-100 min-w-[260px] max-w-[290px] flex-1"
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-200 shadow"
                  />
                  <p className="text-orange-500 text-lg">★★★★★</p>
                  <p className="italic text-gray-700 mt-2 leading-relaxed">
                    “{t.quote}”
                  </p>
                  <p className="mt-4 font-semibold text-gray-900">
                    {t.name}, {t.age} — {t.location}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Right arrow */}
          <button
            className="absolute -right-16 lg:-right-24 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-orange-100 rounded-full shadow-lg p-3 z-10 border-2 border-orange-300 transition"
            onClick={next}
            aria-label="Next"
            tabIndex={0}
            style={{ outline: "none" }}
          >
            <FaChevronRight className="text-orange-400 text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
