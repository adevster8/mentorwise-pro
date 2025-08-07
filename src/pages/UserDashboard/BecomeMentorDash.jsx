import React from "react";
import { motion } from "framer-motion";

export default function BecomeMentorDash() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-100">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <motion.h1
          className="text-4xl font-extrabold font-manrope text-orange-600 mb-7 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Become a Mentor
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8 text-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Share your expertise and make a meaningful impact. MentorWise gives you the power to connect and support those who need your wisdom — while building your brand.
        </motion.p>

        {/* Why Mentor */}
        <motion.div
          className="bg-white/90 shadow-xl rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-3 font-manrope">Why Mentor with Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base font-lato">
            <li>Set your own rates and availability</li>
            <li>Help others avoid costly mistakes</li>
            <li>Build your personal brand and influence</li>
            <li>Make a real difference — and earn income</li>
          </ul>
        </motion.div>

        {/* How to Get Started */}
        <motion.div
          className="bg-white/90 shadow-xl rounded-2xl p-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-3 font-manrope">How to Get Started</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base font-lato">
            <li>Fill out your mentor profile</li>
            <li>Set your rates and hours</li>
            <li>Submit for review</li>
            <li>Start accepting mentees</li>
          </ol>
          <button className="mt-7 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl font-bold text-lg shadow-md transition-all">
            Apply to Become a Mentor
          </button>
        </motion.div>
      </div>

      {/* Visual CTA */}
      <section className="relative h-[380px] md:h-[520px] mt-12 overflow-hidden flex items-end">
        <img
          src="/find-clients.png"
          alt="Find Clients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 w-full flex items-center justify-center pb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-md px-8 py-7 rounded-2xl shadow-2xl text-center max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 mb-3 font-manrope">
              Attract Clients, Grow Long-Term
            </h2>
            <p className="text-gray-800 text-lg font-lato">
              Flexible offers, real connections. Our platform helps you build everything from quick-win calls to deep-dive coaching journeys.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
