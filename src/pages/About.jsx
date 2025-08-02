import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Top Section */}
      <motion.div
        className="bg-orange-50 px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold text-orange-600">
              Why We Built MentorWise
            </h1>
            <p className="text-lg leading-relaxed">
              Most people wander through life without a map, guessing their way forward. At MentorWise, we believe your journey should feel supported, not solo. We started this platform because every one of us has had moments where a conversation with the right person changed everything — gave us clarity, direction, or the courage to move forward.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you're stuck in a career that doesn’t fit, overwhelmed by decisions, or just craving real perspective from someone who's been there — this is where you come to find guidance without gimmicks. It’s mentorship made human again.
            </p>
            <p className="text-lg leading-relaxed">
              MentorWise isn’t just a site. It’s a living network of real people who believe in the power of listening, sharing, and lifting each other up. No subscriptions. No fluff. Just one-on-one support that meets you where you are, and helps you move toward where you’re meant to be.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/about-photo.jpg"
              alt="Mentorship journey"
              className="w-full max-w-xl rounded-xl shadow-xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Section with background tone */}
      <motion.div
        className="bg-orange-100 px-6 py-24"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-orange-500">
            Everyone deserves a mentor.
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            You don’t need to “fix yourself” before you reach out. You don’t need all the answers. You just need the willingness to begin. And someone who gets it.
          </p>
          <motion.a
            href="/mentors"
            className="inline-block mt-8 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Find Your Mentor
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
