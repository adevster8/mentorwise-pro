// src/components/Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      {/* === MOBILE (< md) === */}
      <section className="md:hidden relative w-full h-[92svh] min-h-[520px] max-h-[900px] overflow-hidden bg-black">
        {/* Full-bleed photo — centered subject for phones */}
        <img
          src="/hero-image-left.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            objectPosition: "55% 50%",
            transform: "translate(0, 0) scale(1)",
            transformOrigin: "center",
          }}
          loading="eager"
          fetchpriority="high"
        />

        {/* Readability gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/65 via-black/50 to-transparent" />
        </div>

        {/* Card + CTA */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end px-4 pb-[calc(72px+env(safe-area-inset-bottom))] gap-5"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-5 shadow-xl ring-1 ring-black/10">
            <h1 className="text-[28px] leading-tight font-extrabold text-[#181C2A] text-center font-manrope">
              Mentorship That Moves
              <br />
              You <span className="text-orange-600">Forward</span>
            </h1>
            <p className="mt-3 text-[15px] leading-snug text-[#181C2A]/90 text-center font-lato">
              Get advice from experts and support from peers. All in one space
              built for your growth and success.
            </p>
          </div>

          <Link
            to="/mentors"
            className="w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base h-12 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            Find Your Mentor
          </Link>
        </motion.div>
      </section>

      {/* === DESKTOP / TABLET (≥ md) — hero matches image size exactly === */}
      <section
        className="hidden md:block relative w-full overflow-hidden bg-black"
        style={{ marginTop: "-100px" }}
      >
        {/* The image defines the height: width:100%, height:auto (no cropping, any aspect) */}
      <img
  src="/hero-final.png"
  alt=""
  className="block w-full h-auto will-change-transform"
  style={{
    transform: "translateY(69px)",  // ↓ moves image down
    transformOrigin: "center",
  }}
/>

        {/* Overlays pinned to the image box */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Text + CTA over the image */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 w-full max-w-screen-xl mx-auto px-6 md:px-8 pb-16 md:pb-20"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-3xl bg-white/95 rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-xl ring-1 ring-black/5 relative -translate-y-2 md:-translate-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#181C2A] text-center font-manrope">
              Mentorship That Moves <br />
              You <span className="text-orange-600">Forward</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#181C2A] text-center font-lato">
              Get advice from experts and support from peers. All in one space
              built for your growth and success.
            </p>
          </div>

          <div className="mt-3 flex justify-center">
            <Link
              to="/mentors"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Find Your Mentor
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
