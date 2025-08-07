import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Swap this to match your exact footer/navy color if needed!
const NAVY = "#19253B"; // Example: deep navy blue

export default function HeroSlideshow() {
  const heroImage = "/slide-show1.png";

  return (
 <section 
  className="relative w-full h-[80vh] min-h-[600px] flex items-end justify-center bg-slate-200 text-center overflow-hidden pb-20 md:pb-24"
  style={{ marginTop: "-100px" }} // Increase the negative value to crop more
>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />

      {/* Centered Text Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center max-w-3xl px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="w-full md:w-auto bg-white/75 backdrop-blur-md rounded-3xl px-6 py-8 md:px-12 md:py-10 shadow-xl mb-6 transition-all">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#181C2A] drop-shadow-lg font-manrope leading-tight text-center">
            Mentorship That Moves <br /> You <span className="text-orange-600">Forward</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#181C2A] drop-shadow-md font-lato max-w-2xl mx-auto text-center">
            Get advice from experts and support from peers. All in one space built for your growth and success.
          </p>
        </div>
        <Link
          to="/mentors"
          className="mt-2 inline-block bg-orange-500 hover:bg-orange-700  text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Find Your Mentor
        </Link>
      </motion.div>
    </section>
  );
}
