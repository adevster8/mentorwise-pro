import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Slides setup: full path and all slides included!
const slides = [
  {
    img: "/slide-show1.png",
    title: "Expert Mentors. Real People. One Platform.",
    caption: "Get advice from experts and support from peers.  All in one space built for your growth.",
    textPosition: "bottom-center", // bottom-center
  },
  {
    img: "/slide-show2.png",
    title: "Upgrade Your Mind and Heart",
    caption: "Develop clarity, confidence and emotional strength with the right coach.",
    textPosition: "bottom-right", // bottom-right
  },
];

// Helper: placement for each slide
const getTextBoxStyles = (position) => {
  switch (position) {
    case "bottom-right":
      return "right-14 bottom-14 md:right-24 md:bottom-20 items-end";
case "bottom-center":
  return "left-1/2 bottom-24 md:bottom-28 -translate-x-1/2 items-center text-center";
    case "center":
    default:
      return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center";
  }
};

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // **Fast, smooth, sliding animation for the whole block**
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 1100 : -1100, // start just outside viewport
      opacity: 0,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative"
    },
    exit: (dir) => ({
      x: dir > 0 ? -1100 : 1100, // exit just outside viewport
      opacity: 0,
      position: "absolute"
    })
  };

  const goToSlide = (newIdx) => {
    setDirection(newIdx > index ? 1 : -1);
    setIndex((newIdx + slides.length) % slides.length);
  };

  const slide = slides[index];
return (
  <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#FFF5EA] overflow-hidden">
    {/* Arrows */}
    <button
      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-orange-100 border-2 border-orange-200 rounded-full p-4 shadow-xl transition"
      onClick={() => goToSlide(index - 1)}
      aria-label="Previous"
    >
      <FaChevronLeft className="text-orange-400 text-3xl" />
    </button>
    <button
      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-orange-100 border-2 border-orange-200 rounded-full p-4 shadow-xl transition"
      onClick={() => goToSlide(index + 1)}
      aria-label="Next"
    >
      <FaChevronRight className="text-orange-400 text-3xl" />
    </button>

    {/* Slide block (this is the important part) */}
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={index}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 140, damping: 21 },
          opacity: { duration: 0.13 },
        }}
        className="w-full h-[80vh] flex items-center justify-center absolute top-0 left-0"
        style={{
          backgroundImage: `url(${slide.img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-[#FFF5EA]/10"></div>

        {/* Floating text box */}
        <div className={`absolute flex flex-col max-w-2xl min-w-[320px] bg-white/90 rounded-3xl shadow-2xl px-8 py-7 ${getTextBoxStyles(slide.textPosition)} z-10`}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-orange-600 mb-5 font-manrope drop-shadow-xl leading-tight">
            {slide.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-900 mb-8 font-lato drop-shadow-sm">
            {slide.caption}
          </p>
          <motion.a
            href="#"
            className="inline-block bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-lg text-lg md:text-xl font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            whileHover={{ scale: 1.08, boxShadow: "0 8px 32px 0 #fdba7488" }}
            whileTap={{ scale: 0.97 }}
          >
            Join The Family
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  </section>
);
}
