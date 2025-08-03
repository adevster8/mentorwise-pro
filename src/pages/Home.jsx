import { useState } from "react";
import { motion } from "framer-motion";
import ModernDropdown from "../components/ModernDropdown";
import IconPic from "../components/IconPic";
import Footer from "../components/Footer";
import ParallaxCardSection from "../components/ParallaxCardSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

export default function Home() {
  // Modern dropdowns controlled state
  const [selectedSkills, setSelectedSkills] = useState("");
  const [selectedFinance, setSelectedFinance] = useState("");
  const [selectedSupport, setSelectedSupport] = useState("");

  const skillsOptions = [
    "Cooking", "Photography", "Creative Writing", "Public Speaking", "Gaming",
    "Drawing", "Language Learning", "Gardening", "Woodworking", "Sewing",
    "Knitting", "Dancing", "Singing", "Acting", "Podcasting",
    "DJing", "Filmmaking", "Baking", "DIY Crafts", "Chess",
    "Magic Tricks", "Makeup", "Origami", "Interior Design", "Fashion Styling",
    "Yoga", "Pilates", "Calligraphy", "Archery", "Other"
  ];
  const financeOptions = [
    "Investing", "Budgeting", "Resume Building", "Freelancing", "Side Hustles",
    "Digital Marketing", "Career Switching", "Entrepreneurship", "Affiliate Marketing", "Negotiation",
    "Public Relations", "Real Estate", "Copywriting", "Tech Jobs", "Product Management",
    "Customer Success", "Leadership", "Business Development", "Remote Work", "Networking",
    "E-commerce", "Business Planning", "Sales Funnels", "Accounting", "Data Analysis",
    "UX/UI Design", "Job Interviews", "Startup Strategy", "Pitching Ideas", "Other"
  ];
  const supportOptions = [
    "Stress Relief", "Anxiety Support", "Life Purpose", "Burnout Recovery", "Loneliness",
    "Relationship Advice", "Self-Esteem", "Mindfulness", "Productivity", "Overthinking",
    "Confidence Building", "Emotional Resilience", "Conflict Resolution", "Anger Management", "Grief",
    "Time Management", "Goal Setting", "Trauma Healing", "Depression Support", "Family Issues",
    "Motivation", "Boundaries", "Addiction Recovery", "Self-Awareness", "Life Balance",
    "Parenting", "Self-Love", "Decision Making", "Fear of Failure", "Other"
  ];

  return (
    <motion.div
      className="min-h-screen bg-orange-50 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Hero Section */}
   <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-20 md:gap-20 lg:gap-32 xl:gap-40">
  {/* Left Text Block */}
  <motion.div
    className="md:w-[65%] lg:w-[60%] xl:w-[55%] ml-[-80px]"
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
  <motion.h1
  className="font-heading text-5xl md:text-6xl xl:text-[4.4rem] font-extrabold text-orange-600 mb-10 leading-tight tracking-wider"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  style={{
    textShadow: `
      0 4px 32px rgba(253,186,116,0.34),     /* Peachy glow below */
      0 2px 8px rgba(32,41,79,0.22),         /* Subtle navy for depth */
      0 1px 0 rgba(255,255,255,0.34)         /* Soft white highlight on top */
    `
  }}
>
  Mentorship & Coaching That Moves you Forward
</motion.h1>
    <motion.p
      className="font-body text-gray-700 text-xl md:text-2xl mb-10 leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      Growth can feel lonely — until now. Get matched with experienced mentors and take your goals further, faster.
    </motion.p>
    <motion.a
      href="/mentors"
      className="bg-blue-100 hover:bg-blue-200 hover:shadow-xl text-gray-900 px-8 py-4 rounded-lg transition text-lg font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-heading"
      whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(0,80,200,0.16)" }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
    >
      Browse Mentors
    </motion.a>
  </motion.div>

        {/* Right Image */}
<motion.div
  className="md:w-[55%] relative flex items-center justify-center"
  initial={{ opacity: 0, x: 70, scale: 0.97 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 1.1, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <motion.img
    src="/hero-illustration.png"
    alt="Mentorship"
    className="w-[600px] md:w-[700px] lg:w-[900px] max-w-none object-contain rounded-3xl border-4 border-orange-100"
    initial={{ scale: 0.96, opacity: 0.7 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.3, ease: "easeOut" }}
    loading="eager"
    style={{
      boxShadow: `
        24px 32px 64px 0 rgba(32, 41, 79, 0.17),
        0 16px 40px 0 rgba(255,186,116,0.21),
        0 1.5px 3.5px 0 rgba(80, 160, 255, 0.08)
      `
    }}
  />
  {/* Animated underglow */}
  <motion.div
    className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] w-[70%] h-[90px] z-[-1] pointer-events-none"
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 0.45, scale: 1 }}
    transition={{ duration: 1.2, delay: 0.3 }}
    style={{
      filter: "blur(16px)",
      background: `
        radial-gradient(ellipse at center, 
          rgba(253,186,116,0.13) 0%, 
          rgba(87,165,247,0.09) 65%, 
          transparent 100%)
      `
    }}
  />
</motion.div>
      </section>

      {/* Category Dropdowns - MODERN CUSTOM */}
      <section className="bg-orange-100 py-20 px-6 relative overflow-visible z-30">
        {/* Animated blurred gradient */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.7, delay: 0.4 }}
          style={{
            background:
              "radial-gradient(circle at 70% 0%, #fed7aa 0%, transparent 60%), radial-gradient(circle at 15% 100%, #fbbf24 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h2
            className="text-4xl font-bold text-orange-600 mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Are You Looking For?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <ModernDropdown
              label="Skills & Hobbies"
              options={skillsOptions}
              value={selectedSkills}
              setValue={setSelectedSkills}
            />
            <ModernDropdown
              label="Finance & Career"
              options={financeOptions}
              value={selectedFinance}
              setValue={setSelectedFinance}
            />
            <ModernDropdown
              label="Emotional Support & Advice"
              options={supportOptions}
              value={selectedSupport}
              setValue={setSelectedSupport}
            />
          </div>
        </div>
      </section>


   {/* How It Works Section */}
  <section
  className="relative py-24 px-6 overflow-hidden"
  style={{
    background: "linear-gradient(0deg, #fff7eecc 65%, #e6eef7cc 100%)",
  }}
>
  {/* Decorative BG image */}
  <img
    src="/background-waves.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none opacity-70"
  />
  {/* White overlay for readability */}
  <div className="absolute inset-0 bg-white/75 z-10 pointer-events-none" />
  <div className="max-w-screen-xl mx-auto text-center relative z-20">
    <motion.h2
      className="text-5xl font-extrabold text-orange-600 mb-20"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      How It Works
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-2">
      {[
        "🔍 Explore Mentors",
        "📅 Book a Session",
        "💬 Talk It Out",
        "📈 Get Actionable Steps",
        "💸 Save Big",
        "🌱 Grow for Life"
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-orange-100/90 p-6 md:p-8 rounded-2xl shadow-xl h-full border-t-4 border-orange-200 transition-all hover:scale-105 hover:shadow-2xl hover:bg-orange-200/80 cursor-pointer glassmorphism"
          whileHover={{ scale: 1.07, y: -6, boxShadow: "0 10px 48px 0 #fdba7455" }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 80,
            duration: 0.3,
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4 drop-shadow">{item.split(" ")[0]}</div>
          <h3 className="text-xl font-bold mb-3">{item.split(" ").slice(1).join(" ")}</h3>
          <p className="text-base leading-relaxed text-gray-700">
            {index === 0 && "Browse profiles in finance, life skills, wellness, and more. Use filters to find your perfect match."}
            {index === 1 && "Choose your mentor and time. Meet virtually without needing subscriptions or contracts."}
            {index === 2 && "Get real-time, human advice from someone who gets it. Be heard, supported, and directed."}
            {index === 3 && "Leave every session with clear next steps, tools, or mental shifts you can use right away."}
            {index === 4 && "Why waste time or thousands on coaches or courses? Get support at a fraction of the price."}
            {index === 5 && "The tools and insights you gain here stick with you. Come back as life evolves."}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Parallax Coaching Section */}
<section className="relative h-[450px] md:h-[650px] overflow-hidden">
  {/* Background Image with Parallax Effect - NO animation */}
  <div
    className="absolute inset-0 bg-fixed bg-center bg-cover"
    style={{ backgroundImage: "url('/Coaching.jpg')" }}
  />
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>
  {/* Centered Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
    <motion.h2
      className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      1-on-1 Coaching That Actually Works
    </motion.h2>
    <motion.p
      className="text-lg md:text-2xl mb-8 max-w-3xl leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      viewport={{ once: true }}
    >
      Get matched with coaches who’ve walked the path you’re on. Real conversations, real strategies, and personalized support...without the overpriced fluff.
    </motion.p>
    <motion.a
      href="/mentors"
      className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all hover:scale-105"
      whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 #4f8cff44" }}
      whileTap={{ scale: 0.98 }}
    >
      Find Your Coach
    </motion.a>
  </div>
</section>
      {/* Full-width Large Image Footer */}
      <IconPic />
      
<TestimonialsCarousel />


      {/* Video Coaching Highlight Section */}
      <section className="relative h-[600px] md:h-[800px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
      
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
          src="/lifecoach-vid.mp4"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-55 z-0"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h2
            className="text-5xl font-bold mb-6 drop-shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: true }}
          >
            Skip the Course. Sell Your Experience.
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            viewport={{ once: true }}
          >
            See what 1-on-1 mentorship really looks like. This isn't advice from strangers — it's life experience tailored to your journey.
          </motion.p>
          <motion.button
            className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileHover={{ scale: 1.07, boxShadow: "0 6px 32px 0 #4f8cff66" }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </div>
      </section>

      {/* Why Coaching Works Section */}
<section className="bg-orange-100 py-24 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
    {/* Text Content */}
    <motion.div
      className="md:w-1/2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6">
        The Shortcut to Self-Mastery
      </h2>
      <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
        Coaching bridges the gap between where you are and where you want to be. It’s not therapy, and it’s not a course. It’s a conversation that unlocks action.
      </p>
      {/* Checkmark List */}
      <ul className="space-y-4 text-gray-700 text-base md:text-lg mb-8">
        {[
          "Personalized insight from someone who's done it before",
          "Clear direction without overwhelm or fluff",
          "Momentum that actually lasts beyond one session"
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green-500 mt-1 text-xl">✔️</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <motion.a
        href="/mentors"
        className="inline-block bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-lg transition text-lg font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 #fdba7488" }}
        whileTap={{ scale: 0.98 }}
      >
        Find Your Coach
      </motion.a>
    </motion.div>
    {/* Image */}
    <motion.div
      className="md:w-1/2 ml-auto md:mr-[-150px]"  // <-- move farther right
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <img
        src="/why-coaching.jpg"
        alt="Why Coaching Works"
        className="w-full max-w-7xl rounded-3xl shadow-2xl border-2 border-orange-200"
      />
    </motion.div>
  </div>
</section>

      
<ParallaxCardSection />

      {/* Newsletter Signup */}
      <section className="bg-blue-100 py-24 px-6 -mb-1">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-orange-600 mb-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Stay in the Loop
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-10"
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
              className="p-3 rounded-md border w-full sm:w-[300px] shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/90 transition placeholder:text-orange-400"
            />
            <motion.button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
              whileHover={{ scale: 1.06, boxShadow: "0 6px 32px 0 #fdba74aa" }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </section>
<section
  className="w-full overflow-hidden z-30"
  style={{ background: "#fff7ee" }}
>
<img
  src="/bottom-panel.png"
  alt="Decorative panel"
  className="w-full h-[64px] md:h-[74px] object-cover"
  style={{
    display: "block",
    margin: 0,
    padding: 0,
    userSelect: "none",
    pointerEvents: "none",
    imageRendering: "crisp-edges" // Try this for PNG/SVG
  }}
  loading="lazy"
  draggable="false"
/>
</section>

    </motion.div>
  );
}
