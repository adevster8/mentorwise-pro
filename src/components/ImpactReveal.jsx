// === Video (Impact-style reveal; stays small longer, fills at mid-viewport) ===
const VideoBannerSection = React.memo(() => {
  const ref = React.useRef(null);

  // Scroll segment: start just before it enters; end just after center passes.
  // This gives us a long runway to "hold small" before the grow.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 45%"], // later start, earlier end -> longer small phase
  });

  // Tunables
  const HOLD_UNTIL = 0.55; // keep the card small up to ~55% of the segment
  const FILL_AT    = 0.88; // finish scaling by ~88% of the segment (≈ mid-viewport)
  const PAD_CM     = 36;   // side/top padding (px) while small

  // Piecewise transforms: [start, hold, fill, end]
  const scale = useTransform(
    scrollYProgress,
    [0.0, HOLD_UNTIL, FILL_AT, 1.0],
    [0.82, 0.82, 1.0, 1.0]
  );
  const radius = useTransform(
    scrollYProgress,
    [0.0, HOLD_UNTIL, FILL_AT, 1.0],
    [22, 22, 0, 0]
  );
  const overlayOp = useTransform(
    scrollYProgress,
    [0.0, 0.45, HOLD_UNTIL, FILL_AT, 1.0],
    [0.48, 0.40, 0.28, 0.20, 0.18]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.55, FILL_AT],
    [0, 0.65, 1]
  );
  const textY = useTransform(scrollYProgress, [0, 1], [18, 0]);

  // While small, add generous page padding and a higher sticky top so the card
  // sits lower in the viewport. Remove both as it fills.
  const padX = useTransform(scrollYProgress, [0.0, HOLD_UNTIL, FILL_AT, 1.0], [PAD_CM, PAD_CM, 0, 0]);
  const padY = useTransform(scrollYProgress, [0.0, HOLD_UNTIL, FILL_AT, 1.0], [PAD_CM, PAD_CM, 0, 0]);
  const stickyTop = useTransform(scrollYProgress, [0.0, HOLD_UNTIL, FILL_AT, 1.0], [96, 96, 0, 0]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0.0, HOLD_UNTIL, FILL_AT, 1.0],
    [
      "0 20px 50px rgba(0,0,0,0.25)",
      "0 20px 50px rgba(0,0,0,0.25)",
      "0 6px 18px rgba(0,0,0,0.10)",
      "0 0 0 rgba(0,0,0,0)"
    ]
  );

  // Heights: keep your proportions; adjust if you want it even smaller initially.
  const heightClasses = "h-[72vh] sm:h-[66vh] lg:h-[60vh]";
  const objectPos = "center 35%";

  return (
    <section
      ref={ref}
      aria-label="Mentor success video"
      className="relative overflow-x-clip"
      style={{ paddingTop: padY, paddingBottom: padY }}
    >
      <motion.div className="sticky" style={{ top: stickyTop }}>
        <motion.div className="w-screen" style={{ paddingLeft: padX, paddingRight: padX }}>
          <motion.div
            className={`relative w-full ${heightClasses} overflow-hidden will-change-transform`}
            style={{
              scale,
              borderRadius: radius,
              boxShadow,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <video
              src="/lifecoach-vid.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: objectPos }}
            />

            {/* Soft dark overlay that lightens as you scroll */}
            <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOp }} aria-hidden />

            {/* Copy */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="absolute inset-0 grid place-items-center text-center"
            >
              <div className="w-[320px] sm:w-[560px] lg:w-[820px] px-4 mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  Unlock Your Potential with the Right Mentor
                </h2>
                <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-200">
                  Our mentors have helped thousands reach their personal and professional goals.
                </p>
                <Link
                  to="/mentors"
                  className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-7 sm:px-9 py-3.5 rounded-lg font-semibold shadow-lg text-lg sm:text-xl inline-block"
                  aria-label="Find your mentor"
                >
                  Find Your Mentor
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});
