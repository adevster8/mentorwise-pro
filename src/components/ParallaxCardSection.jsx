// src/components/ParallaxCardSection.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClockIcon, UsersIcon, MapPinIcon } from "@heroicons/react/24/outline";

// Tweak these if you want slightly more/less overlap & spacing on mobile
const MOBILE_OVERLAP = "-mt-16"; // e.g. "-mt-20" for more overlap
const MOBILE_BOTTOM_MARGIN = "mb-12"; // bottom spacing below the card

function CardInner() {
  return (
    <>
      <h2
        id="life-heading"
        className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-6 text-center font-manrope"
      >
        Mentorship That Fits Your Life
      </h2>

      <p className="text-center text-slate-600 text-lg mb-8 font-lato">
        We built MentorWise to adapt to your schedule and goals, not the other way around.
      </p>

      <ul className="space-y-5 text-slate-700">
        <li className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
            <ClockIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Flexible Scheduling</h3>
            <p className="text-slate-600 text-sm">
              Book one-off sessions or set up a recurring plan that flexes with your busy calendar.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
            <UsersIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Long-Term Partnerships</h3>
            <p className="text-slate-600 text-sm">
              Build a deep, trusting relationship with a mentor who understands your journey.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
            <MapPinIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Local & Remote Options</h3>
            <p className="text-slate-600 text-sm">
              Connect with mentors online from anywhere in the world, or find experts right in your community.
            </p>
          </div>
        </li>
      </ul>

      <div className="text-center mt-10">
        <Link
          to="/mentors"
          className="inline-block bg-slate-900 hover:bg-blue-300 text-white font-bold text-lg px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          Explore Mentors
        </Link>
      </div>
    </>
  );
}

export default function ParallaxCardSection() {
  return (
    <section aria-labelledby="life-heading" className="relative w-full">
      {/* ======= Mobile (no parallax) ======= */}
      <div className="md:hidden">
        {/* Photo */}
        <div
          className="relative h-[52vh] min-h-[360px] w-full bg-center bg-cover"
          style={{ backgroundImage: "url('/your-life.jpg')" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
        </div>

        {/* Overlapping card with bottom margin */}
        <motion.div
          className={`relative ${MOBILE_OVERLAP} ${MOBILE_BOTTOM_MARGIN} px-4`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ring-1 ring-black/5 p-6 sm:p-8">
            <CardInner />
          </div>
        </motion.div>
      </div>

{/* ======= Tablet / Desktop (with parallax) ======= */}
<div className="hidden md:block relative h-[750px] overflow-hidden">
  {/* Parallax background: ONLY fixed on md+ */}
  <div
    className="absolute inset-0 bg-cover md:bg-fixed"
    style={{
      backgroundImage: "url('/your-life.jpg')",
      // TUNE THIS: bigger % => image starts LOWER
      backgroundPosition: "center 36%",
      backgroundRepeat: "no-repeat",
    }}
    aria-hidden="true"
  />

  {/* Contrast overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 pointer-events-none" />

  {/* Right-aligned card */}
  <div className="relative z-10 h-full flex items-center justify-end px-12 lg:px-20">
 <motion.div
  className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/30 max-w-xl w-full p-10 md:-translate-y-1 lg:-translate-y-4"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <CardInner />
</motion.div>
  </div>
</div>
    </section>
  );
}
