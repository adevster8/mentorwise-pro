// src/components/ParallaxCardSection.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Use Link for internal navigation
import { ClockIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ParallaxCardSection() {
  return (
    <section className="relative h-[650px] md:h-[750px] w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/your-life.jpg')",
          backgroundPosition: "center top"
        }}
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />

      {/* Card Content */}
      <div className="relative z-10 flex items-center justify-center md:justify-end h-full px-6 md:px-12 lg:px-20">
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-200/30 max-w-xl w-full p-8 md:p-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-6 text-center font-manrope">
            Mentorship That Fits Your Life
          </h2>
          
          <p className="text-center text-slate-600 text-lg mb-8 font-lato">
            We built MentorWise to adapt to your schedule and goals, not the other way around.
          </p>

          {/* New Icon-based feature list for uniformity */}
          <ul className="space-y-5 text-slate-700">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Flexible Scheduling</h3>
                <p className="text-slate-600 text-sm">Book one-off sessions or set up a recurring plan that flexes with your busy calendar.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Long-Term Partnerships</h3>
                <p className="text-slate-600 text-sm">Build a deep, trusting relationship with a mentor who understands your journey.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                <MapPinIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Local & Remote Options</h3>
                <p className="text-slate-600 text-sm">Connect with mentors online from anywhere in the world, or find experts right in your community.</p>
              </div>
            </li>
          </ul>

          {/* Improved, uniform CTA button */}
          <div className="text-center mt-10">
            <Link
              to="/mentors"
              className="inline-block bg-slate-900 hover:bg-blue-300  text-white font-bold text-lg px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Explore Mentors
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}