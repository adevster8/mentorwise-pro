import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center">
      {/* Top Section */}
      <motion.div
        className="bg-orange-50 w-full px-4 sm:px-8 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-24">
          {/* Text Box (left side now) */}
          <motion.div
            className="md:w-[52%] bg-blue-100/95 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col justify-center"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              minHeight: "860px", // 2 * image height + gap
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <h1 className="font-heading text-5xl font-extrabold text-orange-600 mb-5">
              Why We Built MentorWise
            </h1>
            <div className="space-y-5">
              <p className="font-body text-base md:text-lg leading-relaxed">
                Life doesn't hand out roadmaps. Most of us spend years wandering, unsure if we're headed in the right direction or even how to start finding our way. At MentorWise, we knew there had to be a better option than guessing our way forward. 
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed">
                We created this platform because each of us remembers the turning points in our own lives, those pivotal moments when the right conversation at the right time shifted everything, and opening doors we didn't even know existed, or simply giving us the confidence to walk through them.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed">
                Life doesn't hand out roadmaps. Most of us spend years wandering, unsure if we're headed in the right direction or even how to start finding our way. At MentorWise, we knew there had to be a better option than guessing our way forward. 
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed">
                Maybe you're feeling trapped in a job that drains you instead of filling you up, overwhelmed by choices that all seem confusing, or yearning for genuine advice from someone who's walked your path already. Whatever your story, MentorWise is here to connect you with people who get it, who have navigated similar waters, and who genuinely want to help.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed">
                So bring your challenges, your questions, your uncertainties. MentorWise isn't just a website; it's a thriving network of individuals who believe deeply in the power of sharing experiences, lifting each other up, and moving forward together. Welcome home.
              </p>
            </div>
          </motion.div>
          {/* Stacked Images (right side now) */}
          <div className="md:w-[48%] flex flex-col items-center gap-12">
            <img
              src="/about-photo.jpg"
              alt="Mentorship journey"
              className="w-full h-[420px] object-cover rounded-3xl shadow-2xl border-2 border-orange-100"
              style={{ maxWidth: "600px" }}
            />
            <img
              src="/about-2.jpg"
              alt="Mentorship real life"
              className="w-full h-[420px] object-cover rounded-3xl shadow-2xl border-2 border-orange-200"
              style={{ maxWidth: "600px" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Section with background tone */}
      <motion.div
        className="bg-orange-100 px-6 py-24 w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="font-heading text-4xl font-bold text-orange-500">
            Everyone deserves a mentor.
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed text-gray-700">
            You don’t need to “fix yourself” before you reach out. You don’t need all the answers. You just need the willingness to begin. And someone who gets it.
          </p>
          <motion.a
            href="/mentors"
            className="inline-block mt-8 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition text-lg font-semibold font-heading"
            whileHover={{ scale: 1.05 }}
          >
            Find Your Mentor
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
