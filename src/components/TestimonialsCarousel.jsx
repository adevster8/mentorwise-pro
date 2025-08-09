import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

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
];
const CARD_WIDTH_WITH_GAP = 320 + 32;
const VISIBLE_CARDS = 5.5;

export default function TestimonialsCarousel() {
  const cardsWithClones = [
    ...testimonials.slice(-Math.floor(VISIBLE_CARDS)),
    ...testimonials,
    ...testimonials.slice(0, Math.floor(VISIBLE_CARDS))
  ];
  const [index, setIndex] = useState(Math.floor(VISIBLE_CARDS));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (index === 0) {
      setIndex(testimonials.length);
    } else if (index === testimonials.length + Math.floor(VISIBLE_CARDS)) {
      setIndex(Math.floor(VISIBLE_CARDS));
    }
  };

return (
  <section className="w-full bg-sky-50 py-20 md:py-28 overflow-hidden">
    <div className="max-w-[2000px] mx-auto text-center px-2">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-16 font-manrope"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        What People Are Saying
      </motion.h2>

      <div className="relative flex items-center justify-center">
        {/* Balanced left/right padding for even cutoffs */}
     <div
  className="w-full overflow-hidden pl-20 pr-10" // <-- wider left, normal right
  style={{
    maxWidth: `${CARD_WIDTH_WITH_GAP * VISIBLE_CARDS}px`,
  }}
>
          <motion.div
            className="flex gap-8"
            animate={{ x: `-${index * CARD_WIDTH_WITH_GAP}px` }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 40,
              duration: index === 0 || index === cardsWithClones.length - Math.floor(VISIBLE_CARDS) ? 0 : 0.6
            }}
            onAnimationComplete={handleTransitionEnd}
          >
            {cardsWithClones.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-300 w-[320px] flex-shrink-0"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
                }}
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
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100 rounded-full shadow-md p-3 z-10 border border-slate-200 transition"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="h-6 w-6 text-slate-600" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100 rounded-full shadow-md p-3 z-10 border border-slate-200 transition"
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