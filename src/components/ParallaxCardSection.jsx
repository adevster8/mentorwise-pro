import { motion } from "framer-motion";

export default function ParallaxCardSection() {
  return (
    <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
      {/* Parallax Background - NO animation */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/your-life.jpg')",
          backgroundPosition: "center top"
        }}
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Card Content */}
      <div className="relative z-10 flex items-center justify-end h-full px-4">
        <motion.div
          className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_4px_32px_0_rgba(253,186,116,0.08),0_2px_8px_0_rgba(87,165,247,0.06)] border-2 border-orange-200 max-w-xl w-full md:mr-48 p-10"
          style={{
            boxShadow: "0 6px 32px 0 rgba(253,186,116,0.08), 0 2px 8px 0 rgba(87,165,247,0.06)",
            backdropFilter: "blur(6px)"
          }}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -4, scale: 1.015, boxShadow: "0 10px 40px 0 #fdba7433" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-7 text-center drop-shadow">
            Your Mentorship, Your Schedule.
          </h2>
          <div className="text-center mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              We built MentorWise to fit into your life, not the other way around. Choose exactly when and how you meet with your mentor...weekly sessions that flex with your busy calendar, a consistent long-term partnership with someone you trust, or even in-person meetings with local mentors right in your community.
            </p>
            <p className="mt-6">
              Whether you're craving flexibility week-to-week or looking to build lasting relationships, MentorWise empowers you to shape your mentorship experience on your terms.
            </p>
          </div>
          {/* Learn More Button */}
          <motion.a
            href="/mentors"
            className="block mx-auto mt-8 bg-blue-100 hover:bg-blue-200 text-orange-600 font-semibold px-8 py-3 rounded-xl shadow transition-all duration-200 text-lg w-fit"
            whileHover={{ scale: 1.04, boxShadow: "0 4px 18px 0 #4f8cff22" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            tabIndex={0}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
