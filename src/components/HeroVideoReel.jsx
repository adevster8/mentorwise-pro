// src/components/HeroVideoReel.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FILL_AT = 0.66;     // when the video finishes “filling”
const START_SCALE = 1.02; // slight edge visible at start
const FULL_SCALE = 1.28;  // enough to kill corner gaps on ultra-wide

export default function HeroVideoReel() {
  const trackRef = useRef(null);

  // Horizontal (or any) scroll container that drives progress.
  // If you don’t have a horizontal scroller, you can change "container" → "target" with offsets.
  const { scrollXProgress } = useScroll({
    container: trackRef, // if you’re not using a horizontal scroller, remove this and use target instead
  });

  // If you’re not using scrollXProgress (no horizontal scroller),
  // uncomment the vertical variant below and comment the lines above:
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 50%"] });

  const scale = useTransform(
    scrollXProgress,
    [0, FILL_AT, 1],
    [START_SCALE, FULL_SCALE, FULL_SCALE]
  );

  return (
    <section className="relative w-full">
      {/* If you need vertical scroll instead, add ref={ref} on the outermost section */}
      <div className="relative mx-auto max-w-[1400px]">
        <div className="relative h-[72vh] overflow-hidden rounded-2xl bg-black">
          <motion.video
            src="/lifecoach-vid.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale }}
            transition={{ type: "tween" }}
          />
          <div className="relative z-10 flex h-full items-end p-6 md:p-10">
            {/* optional overlay content */}
          </div>
        </div>
      </div>

      {/* If you actually have a horizontal scroller that should drive the fill,
          keep this container and populate it with your cards; otherwise remove. */}
      <div
        ref={trackRef}
        className="
          mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8
          [scrollbar-width:none] [-ms-overflow-style:none]
        "
        style={{ scrollBehavior: "smooth" }}
        aria-label="Video scroller driver"
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {/* placeholder slides (safe to replace with your real cards) */}
        {[1,2,3].map((n) => (
          <article
            key={n}
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw]
                       relative overflow-hidden rounded-2xl border border-white/10
                       bg-white/5 backdrop-blur"
          >
            <div className="h-[56vh] w-full bg-black/10" />
          </article>
        ))}
      </div>
    </section>
  );
}
