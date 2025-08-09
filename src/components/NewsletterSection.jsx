// src/components/NewsletterSection.jsx
import { motion } from "framer-motion";

export default function NewsletterSection() {
  return (
    <section className="bg-sky-50 py-24 px-6 -mb-1">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-orange-600 mb-6 font-manrope"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Stay in the Loop
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 mb-10 font-lato"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
        >
          Sign up to get updates, tips, and mentor highlights delivered straight to your inbox.
        </motion.p>
        <motion.form
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded-md border w-full sm:w-[300px] shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/90 transition placeholder:text-orange-400 font-lato"
          />
          <motion.button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 font-lato font-bold"
            whileHover={{ scale: 1.06, boxShadow: "0 6px 32px 0 #fdba74aa" }}
            whileTap={{ scale: 0.97 }}
          >
            Subscribe
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
