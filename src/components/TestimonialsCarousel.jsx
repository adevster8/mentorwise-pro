import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
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
const CARD_WIDTH = 290 + 32; // 290px card + 32px gap

export default function TestimonialsCarousel() {
  // Add clones at start and end for infinite loop
  const cardsWithClones = [
    ...testimonials.slice(-CARDS_SHOWN),
    ...testimonials,
    ...testimonials.slice(0, CARDS_SHOWN)
  ];

  // Centered index starts at CARDS_SHOWN
  const [index, setIndex] = useState(CARDS_SHOWN);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle left/right clicks
  function handleNext() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 400);
  }
  function handlePrev() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 400);
  }

  // Instantly jump (without animation) when wrapping around clones
  if (index === cardsWithClones.length - CARDS_SHOWN) {
    setTimeout(() => setIndex(CARDS_SHOWN), 50);
  }
  if (index === 0) {
    setTimeout(() => setIndex(cardsWithClones.length - CARDS_SHOWN * 2), 50);
  }

  return (
    <section className="bg-orange-50 pt-20 pb-40 px-6 relative z-20 overflow-visible">

      <div className="max-w-7xl mx-auto text-center relative z-20">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-14 font-manrope"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          What People Are Saying
        </motion.h2>
        <div className="relative flex items-center justify-center w-full">
          {/* Left Arrow */}
          <button
            className="absolute -left-8 sm:-left-12 lg:-left-24 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-orange-100 rounded-full shadow-lg p-3 z-20 border-2 border-orange-200 transition"
            onClick={handlePrev}
            aria-label="Previous"
            tabIndex={0}
            disabled={isAnimating}
          >
            <FaChevronLeft className="text-orange-400 text-2xl" />
          </button>

          {/* Carousel viewport */}
         <div
  className="overflow-x-hidden w-full"
  style={{
    maxWidth: `${CARD_WIDTH * CARDS_SHOWN}px`,
    margin: "0 auto",
    paddingBottom: "2.5rem" // adds extra bottom space inside the scroll area
  }}
>
            <motion.div
              className="flex gap-8"
              style={{
                x: `-${index * CARD_WIDTH}px`,
                width: `${cardsWithClones.length * CARD_WIDTH}px`,
                transition: isAnimating
                  ? "all 0.38s cubic-bezier(.6,.05,.27,.99)"
                  : "none"
              }}
            >
              {cardsWithClones.map((t, idx) => (
                <div
                  key={t.name + t.location + idx}
                  className="bg-white/95 p-8 rounded-3xl shadow-xl border-t-4 border-orange-100 min-w-[260px] max-w-[290px] flex-1 transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ width: "290px", flex: "0 0 auto" }}
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-200 shadow"
                  />
                  <p className="text-orange-500 text-lg font-lato mb-1">★★★★★</p>
                  <p className="italic text-gray-700 mt-2 leading-relaxed font-lato">
                    “{t.quote}”
                  </p>
                  <p className="mt-4 font-lato font-bold text-gray-900">
                    {t.name}, {t.age} — {t.location}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            className="absolute -right-8 sm:-right-12 lg:-right-24 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-orange-100 rounded-full shadow-lg p-3 z-20 border-2 border-orange-200 transition"
            onClick={handleNext}
            aria-label="Next"
            tabIndex={0}
            disabled={isAnimating}
          >
            <FaChevronRight className="text-orange-400 text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
