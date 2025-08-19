import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon, UserGroupIcon, FlagIcon, SparklesIcon,
  AcademicCapIcon, BanknotesIcon,
} from "@heroicons/react/24/outline";

// --- Data Constants (Single Source of Truth) ---
// Moving static data outside the component prevents re-creation on every render.
const LEARNER_STEPS = [
  { icon: FlagIcon, title: "State Your Goal", description: "Tell us what you want to achieve—launch a podcast, learn to code, change careers, etc." },
  { icon: RocketLaunchIcon, title: "Partner with an Expert", description: "We'll match you with a vetted mentor who has the exact experience you need." },
  { icon: SparklesIcon, title: "Achieve Your Outcome", description: "Work together through a clear, step-by-step plan to get real, tangible results." },
];

const EXPERT_STEPS = [
  { icon: AcademicCapIcon, title: "Offer Your Expertise", description: "Package your skills into flexible offers like goal-based plans, retainers, or one-time gigs." },
  { icon: UserGroupIcon, title: "Connect with Clients", description: "Get matched with motivated learners who are ready to invest in achieving their goals." },
  { icon: BanknotesIcon, title: "Grow Your Business", description: "Build a sustainable coaching business with low fees and tools designed for long-term success." },
];

// --- Animation Helper ---
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay },
});

// --- Section Components (Componentization & Readability) ---
const HeroSection = () => (
  <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto text-center">
      <motion.p {...fadeUp(0)} className="text-base font-semibold text-orange-600 uppercase tracking-wider">Our Mission</motion.p>
      <motion.h1 {...fadeUp(0.1)} className="mt-4 text-4xl md:text-6xl font-extrabold text-slate-800 font-manrope leading-tight">
        Guidance shouldn't be a <br className="hidden md:inline" /> luxury. It should be a given.
      </motion.h1>
      <motion.p {...fadeUp(0.2)} className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
        We built MentorWise because we believe everyone deserves a clear path forward. Life doesn't hand out roadmaps, so we decided to create them, connecting people who have the knowledge with those who seek it.
      </motion.p>
    </div>
  </section>
);

const WhyWeBuiltSection = () => (
  <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <motion.div className="lg:w-1/2" {...fadeUp(0)}>
        <img src="/about-photo.jpg" alt="Two people collaborating on a project" className="w-full h-auto object-cover rounded-3xl shadow-2xl border-2 border-white" />
      </motion.div>
      <motion.div className="lg:w-1/2" {...fadeUp(0.2)}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-manrope">Why We Built MentorWise</h2>
        <div className="mt-6 space-y-5 text-base md:text-lg text-slate-600 leading-relaxed">
          <p>Each of us remembers the turning points in our own lives—those pivotal moments when the right conversation at the right time shifted everything, opening doors we didn't even know existed.</p>
          <p>Maybe you're feeling trapped in a job that drains you, overwhelmed by choices, or yearning for genuine advice from someone who's walked your path already. Whatever your story, MentorWise is here to connect you with people who get it.</p>
          <p>This isn't just a website; it's a community built on the power of sharing experience, lifting each other up, and moving forward, together.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const HowItWorksSection = ({ learnerSteps, expertSteps }) => (
  <section className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-orange-200/60">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 {...fadeUp(0)} className="text-4xl md:text-5xl font-extrabold text-slate-800 font-manrope">A Platform for Progress</motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
          We provide a clear, structured path to success for both learners seeking guidance and experts ready to share their knowledge.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* For Learners */}
        <motion.div {...fadeUp(0.2)}>
          <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-200/80 h-full">
            <h3 className="text-2xl font-bold text-orange-600 font-manrope mb-6">For Learners</h3>
            <ul className="space-y-6">
              {learnerSteps.map((step) => (
                <li key={step.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md ring-1 ring-orange-200">
                    <step.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{step.title}</h4>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        {/* For Experts */}
        <motion.div {...fadeUp(0.3)}>
          <div className="p-8 bg-slate-800 rounded-3xl h-full">
            <h3 className="text-2xl font-bold text-white font-manrope mb-6">For Experts</h3>
            <ul className="space-y-6">
              {expertSteps.map((step) => (
                <li key={step.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-700 rounded-xl shadow-md ring-1 ring-slate-600">
                    <step.icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{step.title}</h4>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="py-24 px-6 text-center">
    <motion.div {...fadeUp(0)}>
      <h2 className="font-heading text-4xl font-bold text-slate-800">Everyone deserves a guide.</h2>
      <p className="font-body text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto mt-4">
        You don’t need to have all the answers. You just need the willingness to begin.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/mentors" className="inline-block w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-xl hover:bg-orange-700 transition text-lg font-semibold font-heading shadow-lg hover:shadow-xl">
          Find Your Mentor
        </Link>
        <Link to="/how-it-works-coaches" className="inline-block w-full sm:w-auto bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-100/50 transition text-lg font-semibold font-heading border border-orange-300 shadow-lg hover:shadow-xl">
          Become an Expert
        </Link>
      </div>
    </motion.div>
  </section>
);


// --- Main Page Component (Orchestrator) ---
export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-orange-50/70 text-slate-700 overflow-x-hidden font-lato"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Helmet>
        <title>About Us | The MentorWise Mission</title>
        <meta name="description" content="Learn why we built MentorWise—a platform dedicated to connecting learners with expert mentors to build skills and achieve real-world goals." />
      </Helmet>

      <main role="main">
        <HeroSection />
        <WhyWeBuiltSection />
        <HowItWorksSection learnerSteps={LEARNER_STEPS} expertSteps={EXPERT_STEPS} />
        <FinalCtaSection />
      </main>
    </motion.div>
  );
}