import React from 'react';
import { motion } from 'framer-motion';

export default function ScheduleCall() {
  // Animation variants for staggering items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-[#fff7ee] to-slate-200 flex flex-col">
      
      {/* === HEADER === */}
      <div className="text-center py-12 bg-white border-b border-orange-200/60 shadow-sm">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold font-manrope text-center text-slate-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let Us Find <span className="text-orange-600">Your</span> Perfect Coach
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-600 font-lato"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tell us a bit about you — we’ll connect you with the perfect mentor.
        </motion.p>
      </div>

      {/* === MAIN CONTENT GRID === */}
      {/* This is the key change: The container is now full-width with padding, and the grid is defined with responsive Tailwind classes */}
      <div
        className="w-full flex-grow mx-auto px-6 md:px-8 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-start"
      >
        {/* === Left Form: Send a Message === */}
        <motion.div 
          className="bg-white/50 border-t-4 border-orange-300 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col p-8 md:p-10 h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center font-manrope">Send Us a Message</h2>
          <form className="space-y-5 text-sm text-slate-800 font-lato">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Full Name</label>
              <input type="text" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Email Address</label>
              <input type="email" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">What are you looking for?</label>
              <textarea rows="5" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="Describe your goals or what kind of coach you're looking for..." />
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-blue-300 text-white py-3 px-7 rounded-lg shadow-md hover:shadow-lg font-semibold transition-all hover:-translate-y-0.5 transform">
              Submit Request
            </button>
          </form>
        </motion.div>

        {/* === Center Image === */}
        <motion.div 
          className="hidden md:flex items-center justify-center pt-6" // pt-6 aligns it better vertically with the forms
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <img
            src="/laptop-photo.jpg"
            alt="Laptop Video Call"
            className="object-cover rounded-2xl shadow-2xl w-[360px] h-auto aspect-[3/4]"
          />
        </motion.div>

        {/* === Right Form: Request a Zoom Call === */}
        <motion.div 
          className="bg-white/50 border-t-4 border-blue-300 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col p-8 md:p-10 h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center font-manrope">Request a Zoom Call</h2>
          <form className="space-y-5 text-sm text-slate-800 font-lato">
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Full Name</label>
              <input type="text" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Email Address</label>
              <input type="email" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Preferred Times</label>
              <input type="text" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="e.g. Mornings, Weekends, etc." />
            </div>
            <div>
              <label className="block mb-1.5 font-semibold text-slate-700">Topic or Area of Coaching</label>
              <input type="text" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/80 transition duration-200" placeholder="Career, Mindset, Finance..." />
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-blue-300 text-white py-3 px-7 rounded-lg shadow-md hover:shadow-lg font-semibold transition-all hover:-translate-y-0.5 transform">
              Schedule Call
            </button>
          </form>
        </motion.div>
      </div>

      {/* === Parallax Section === */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden mt-auto">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/Coaching.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-xl font-manrope">
            1-on-1 Coaching That Actually Works
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed font-lato">
            Get matched with coaches who’ve walked the path you’re on. Real conversations, real strategies, and personalized support...without the overpriced fluff.
          </motion.p>
          <motion.button
            variants={itemVariants}
            onClick={() => window.location.href='/mentors'}
            className="bg-blue-100 hover:bg-blue-200 text-slate-900 px-10 py-4 rounded-xl text-lg font-lato font-bold shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Find Your Coach
          </motion.button>
        </motion.div>
      </section>
    </section>
  );
}