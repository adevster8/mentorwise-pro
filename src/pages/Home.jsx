import { motion } from "framer-motion";
import IconPic from "../components/IconPic";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      
      {/* Hero Section */}
      <section 
        className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-20 md:gap-20 lg:gap-32 xl:gap-40"
      >
        {/* Left Text Block */}
        <motion.div
          className="md:w-[65%] lg:w-[60%] xl:w-[55%] ml-[-80px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl xl:text-[4.4rem] font-extrabold text-orange-600 mb-6 leading-tight">
            (Coming Soon)Mentorship & Coaching That Moves you Forward
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl mb-6 leading-relaxed">
            Growth can feel lonely — until now. Get matched with experienced mentors and take your goals further, faster.
          </p>
          <a
            href="/mentors"
            className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded transition text-lg font-medium"
          >
            Browse Mentors
          </a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-[55%]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/hero-illustration.png"
            alt="Mentorship"
            className="w-[600px] md:w-[800px] lg:w-[900px] max-w-none object-contain"
          />
        </motion.div>
      </section>


      {/* Category Dropdowns */}
      <section className="bg-orange-100 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-12">What Are You Looking For?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              {
                label: "Skills & Hobbies",
                options: [
                  "Cooking", "Photography", "Creative Writing", "Public Speaking", "Gaming",
                  "Drawing", "Language Learning", "Gardening", "Woodworking", "Sewing",
                  "Knitting", "Dancing", "Singing", "Acting", "Podcasting",
                  "DJing", "Filmmaking", "Baking", "DIY Crafts", "Chess",
                  "Magic Tricks", "Makeup", "Origami", "Interior Design", "Fashion Styling",
                  "Yoga", "Pilates", "Calligraphy", "Archery", "Other"
                ]
              },
              {
                label: "Finance & Career",
                options: [
                  "Investing", "Budgeting", "Resume Building", "Freelancing", "Side Hustles",
                  "Digital Marketing", "Career Switching", "Entrepreneurship", "Affiliate Marketing", "Negotiation",
                  "Public Relations", "Real Estate", "Copywriting", "Tech Jobs", "Product Management",
                  "Customer Success", "Leadership", "Business Development", "Remote Work", "Networking",
                  "E-commerce", "Business Planning", "Sales Funnels", "Accounting", "Data Analysis",
                  "UX/UI Design", "Job Interviews", "Startup Strategy", "Pitching Ideas", "Other"
                ]
              },
              {
                label: "Emotional Support & Advice",
                options: [
                  "Stress Relief", "Anxiety Support", "Life Purpose", "Burnout Recovery", "Loneliness",
                  "Relationship Advice", "Self-Esteem", "Mindfulness", "Productivity", "Overthinking",
                  "Confidence Building", "Emotional Resilience", "Conflict Resolution", "Anger Management", "Grief",
                  "Time Management", "Goal Setting", "Trauma Healing", "Depression Support", "Family Issues",
                  "Motivation", "Boundaries", "Addiction Recovery", "Self-Awareness", "Life Balance",
                  "Parenting", "Self-Love", "Decision Making", "Fear of Failure", "Other"
                ]
              }
            ].map(({ label, options }) => (
              <div key={label}>
                <label className="block mb-2 font-semibold text-lg">{label}</label>
                <select className="w-full p-3 rounded border" defaultValue="Choose a topic">
                  <option disabled>Choose a topic</option>
                  {options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
   <section className="bg-orange-50 py-24 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-orange-600 mb-20">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-2">
            {["🔍 Explore Mentors", "📅 Book a Session", "💬 Talk It Out", "📈 Get Actionable Steps", "💸 Save Big", "🌱 Grow for Life"].map((item, index) => (
              <motion.div
                key={index}
                className="bg-orange-100 p-6 md:p-8 rounded-2xl shadow-xl h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-5xl mb-4">{item.split(" ")[0]}</div>
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
  {/* Background Image with Parallax Effect */}
  <div
    className="absolute inset-0 bg-fixed bg-center bg-cover"
    style={{ backgroundImage: "url('/Coaching.jpg')" }}
  ></div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-60"></div>

  {/* Centered Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
      1-on-1 Coaching That Actually Works
    </h2>
    <p className="text-lg md:text-2xl mb-8 max-w-3xl leading-relaxed">
      Get matched with coaches who’ve walked the path you’re on. Real conversations, real strategies, and personalized support—without the overpriced fluff.
    </p>
  <a
  loading="lazy"
  href="/mentors"
  className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded text-lg font-medium transition"
>
  Find Your Coach
</a>

  </div>
</section>


      {/* Full-width Large Image Footer */}
      <IconPic />

     {/* Testimonials Section */}
<section className="bg-orange-50 py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    <motion.h2 
      className="text-3xl font-bold text-orange-600 mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      What People Are Saying
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        {
          name: "Jenny",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
          quote: "MentorWise gave me the confidence to switch careers. My mentor’s guidance was priceless.",
          age: "28",
          location: "Nashville, TN"
        },
        {
          name: "Mark",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
          quote: "This platform saved me from wasting thousands on courses. Real advice, real growth.",
          age: "35",
          location: "Denver, CO"
        },
        {
          name: "Alicia",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
          quote: "I found a mentor who really understood my challenges. I’m on a whole new path now.",
          age: "31",
          location: "Portland, OR"
        }
      ].map(({ name, img, quote, age, location }, index) => (
        <motion.div
          key={name}
          className="bg-white p-8 rounded-3xl shadow-xl transition-transform hover:scale-[1.025] hover:shadow-2xl duration-300 border-t-4 border-orange-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src={img}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-200 shadow"
          />
          <p className="text-orange-500 text-lg">★★★★★</p>
          <p className="italic text-gray-700 mt-2 leading-relaxed">“{quote}”</p>
          <p className="mt-4 font-semibold text-gray-900">
            {name}, {age} — {location}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* Video Coaching Highlight Section */}
<section className="relative h-[600px] md:h-[800px] overflow-hidden">
  {/* Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="none"
  loading="lazy"
    className="absolute inset-0 w-full h-full object-cover object-top z-0"
    src="/lifecoach-vid.mp4"
  />

  {/* Slightly Stronger Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-55 z-0"></div>

  {/* Centered Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
    <h2 className="text-5xl font-bold mb-6">Skip the Course. Sell Your Experience.</h2>
    <p className="text-xl mb-8 max-w-3xl leading-relaxed">
      See what 1-on-1 mentorship really looks like. This isn't advice from strangers — it's life experience tailored to your journey.
    </p>
   <button className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition">
  Learn More
</button>
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

<a
  href="/mentors"
  className="inline-block bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 rounded transition text-lg font-medium"
>
  Find Your Coach
</a>

    </motion.div>

    {/* Image */}
    <motion.div 
      className="md:w-1/2"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <img 
        src="/why-coaching.jpg" 
        alt="Why Coaching Works" 
        className="w-full max-w-2xl rounded-xl shadow-xl"
      />
    </motion.div>
  </div>
</section>
{/* Newsletter Signup */}
<section className="bg-blue-100 py-24 px-6 -mb-1">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-orange-600 mb-6">Stay in the Loop</h2>
    <p className="text-lg text-gray-700 mb-10">
      Sign up to get updates, tips, and mentor highlights delivered straight to your inbox.
    </p>
    <form className="flex flex-col sm:flex-row justify-center gap-4">
      <input
        type="email"
        placeholder="Your email address"
        className="p-3 rounded-md border w-full sm:w-[300px]"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>


    </div>
  );
}
