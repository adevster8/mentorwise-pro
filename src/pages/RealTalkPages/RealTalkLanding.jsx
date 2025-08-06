import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function RealTalkLanding() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>RealTalk – Anonymous Peer Support | MentorWise</title>
        <meta
          name="description"
          content="Sometimes you just need to talk to someone who gets it. Instantly connect for anonymous, judgment-free voice chats or peer chat support based on how you feel."
        />
      </Helmet>

      <motion.div
        className="bg-white/80 rounded-3xl shadow-2xl border-2 border-orange-200 max-w-2xl w-full text-center py-16 px-8 mb-10"
        initial={{ scale: 0.97, opacity: 0.95 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-5 text-center font-manrope drop-shadow"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          🫂 RealTalk
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-800 max-w-2xl mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Not everyone needs a mentor. Sometimes you just need to talk.<br />
          <span className="text-orange-700 font-semibold">
            Instantly connect for anonymous, judgment-free peer support — no pressure, no profiles, no cost.
          </span>
        </motion.p>

        <motion.div
          className="bg-orange-50 p-8 rounded-2xl shadow-md border border-orange-200 max-w-lg w-full text-center mx-auto"
          initial={{ scale: 0.96, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <p className="mb-3 font-semibold text-gray-800 text-lg">How are you feeling?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Lonely",
              "Frustrated",
              "Anxious",
              "Heartbroken",
              "Overwhelmed",
              "Just need to talk",
              "Isolated",
              "Curious",
              "Bored",
              "Inspired"
            ].map((emotion) => (
              <button
                key={emotion}
                className="bg-orange-100 hover:bg-orange-300 text-orange-700 px-4 py-2 rounded-full font-bold shadow transition"
                // onClick={() => ...future: route to mood-based match UI
                disabled
              >
                {emotion}
              </button>
            ))}
          </div>
          <p className="mt-7 text-sm text-gray-500 italic">Voice chat & instant peer matching coming soon. No login needed.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
