// src/components/ImpactReveal.jsx
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";

/**
 * Impact-style scroll reveal (sticky card that grows + drifts).
 * - Default drift NW → SE (x: -40→90, y: -10→40).
 * - Headline fades in, overlay fades out, border radius relaxes to 0.
 *
 * TUNE via props:
 *  - offsets:        ["start 85%", "end 15%"]
 *  - drift:          { x: [-40, 90], y: [-10, 40] }            // px
 *  - scaleRange:     [0.72, 1.0]
 *  - radiusRange:    [24, 0]                                   // px
 *  - zoomRange:      [1.05, 1.18]
 *  - overlayRange:   [0.55, 0.15]  // dark → light
 *
 * Pass image OR video:
 *  - imageSrc="/your-life.jpg"
 *  - videoSrc="/banner.mp4" (with optional poster="/banner.jpg")
 */
export default function ImpactReveal({
  imageSrc = "/your-life.jpg",
  videoSrc,            // optional: if provided, used instead of image
  poster,              // optional video poster
  title = "Mentorship That Fits Your Life",
  subtitle = "",
  alt = "",            // alt for image (ignored for video)
  // Behavior / tuning props
  offsets = ["start 85%", "end 15%"],
  drift = { x: [-40, 90], y: [-10, 40] },
  scaleRange = [0.72, 1.0],
  radiusRange = [24, 0],
  zoomRange = [1.05, 1.18],
  overlayRange = [0.55, 0.15],
  textFadeStops = [0, 0.25, 0.6],
  stickyTop = { base: "top-24", md: "md:top-28" },
  className = "",      // extra classes for outer <section>
  children,            // optional custom overlay content
}) {
  const root = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: root,
    offset: offsets,
  });

  // When reduced motion is preferred, keep minimum movement for readability.
  const [scaleFrom, scaleTo] = prefersReduced ? [1, 1] : scaleRange;
  const [xFrom, xTo]         = prefersReduced ? [0, 0] : drift.x;
  const [yFrom, yTo]         = prefersReduced ? [0, 0] : drift.y;
  const [radFrom, radTo]     = prefersReduced ? [12, 12] : radiusRange;
  const [zoomFrom, zoomTo]   = prefersReduced ? [1, 1] : zoomRange;

  const scale       = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const x           = useTransform(scrollYProgress, [0, 1], [xFrom, xTo]);
  const y           = useTransform(scrollYProgress, [0, 1], [yFrom, yTo]);
  const radius      = useTransform(scrollYProgress, [0, 1], [radFrom, radTo]);
  const imgScale    = useTransform(scrollYProgress, [0, 1], [zoomFrom, zoomTo]);
  const overlayOp   = useTransform(scrollYProgress, [0, 1], overlayRange);
  const textOpacity = useTransform(scrollYProgress, textFadeStops, [0, 0.65, 1]);
  const textY       = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [26, 0]);

  const stickyClass = useMemo(
    () => `sticky ${stickyTop.base} ${stickyTop.md}`,
    [stickyTop]
  );

  return (
    <section ref={root} className={`relative py-24 md:py-40 overflow-hidden ${className}`}>
      {/* Sticky viewport stage keeps a single card “there” while the page scrolls */}
      <div className={stickyClass}>
        <motion.div
          className="relative mx-auto w-[90vw] md:w-[74vw] max-w-[1000px] aspect-[16/9] bg-black/5 overflow-hidden will-change-transform"
          style={{ scale, x, y, borderRadius: radius }}
        >
          {/* Media (video preferred if provided) */}
          {videoSrc ? (
            <motion.video
              src={videoSrc}
              poster={poster}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ scale: imgScale }}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <motion.img
              src={imageSrc}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ scale: imgScale }}
              loading="lazy"
            />
          )}

          {/* Soft dark overlay that fades away */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOp }}
            aria-hidden="true"
          />

          {/* Content overlay (defaults to title/subtitle if no children passed) */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 grid place-items-center px-6 text-center"
          >
            {children ? (
              children
            ) : (
              <>
                <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold font-manrope leading-tight">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-3 text-white/85 text-lg md:text-2xl font-lato">
                    {subtitle}
                  </p>
                ) : null}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
