// src/pages/Home.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

// Child Components (unchanged content/animations)
import ModernDropdown from "../components/ModernDropdown";
import ParallaxCardSection from "../components/ParallaxCardSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import HeroSlideshow from "../components/HeroSlideshow";


import {
  BoltIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  HeartIcon,
  MapIcon as HeroMapIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon as HeroSparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import {
  CalendarCheck,
  GraduationCap,
  Map,
  MessageSquare,
  Rocket,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

// Consolidated into 4 columns (~15 each + "Other")
const CATEGORY_OPTIONS = {
  career: {
    label: "Career & Business",
    options: [
      "Resume Building",
      "Interview Prep",
      "Freelancing",
      "Side Hustles",
      "Entrepreneurship",
      "Leadership",
      "Public Speaking",
      "Networking",
      "Time Management",
      "Career Pivot",
      "Negotiation",
      "Team Building",
      "Corporate Strategy",
      "Remote Work",
      "Other",
    ],
  },
  tech: {
    label: "Tech & AI",
    options: [
      "Web Development",
      "App Development",
      "AI Tools",
      "Machine Learning",
      "Data Science",
      "Cloud Computing",
      "Cybersecurity",
      "No-Code Tools",
      "Automation",
      "Tech Careers",
      "AR/VR",
      "Blockchain",
      "Crypto",
      "Quantum Computing",
      "Other",
    ],
  },
  wellness: {
    label: "Health & Wellness",
    options: [
      "Fitness Training",
      "At-Home Workouts",
      "Nutrition & Diet",
      "Mental Health",
      "Stress Relief",
      "Anxiety Support",
      "Mobility & Flexibility",
      "Cardio & Endurance",
      "Holistic Health",
      "Family & Kids",
      "Men’s Health",
      "Women’s Health",
      "Sleep Optimization",
      "Burnout Recovery",
      "Other",
    ],
  },
  hobbies: {
    label: "Skills & Hobbies",
    options: [
      "Cooking",
      "Photography",
      "Creative Writing",
      "Music",
      "Art",
      "Design",
      "Gaming",
      "Sports Coaching",
      "DIY Projects",
      "Travel Planning",
      "Language Learning",
      "Financial Literacy",
      "Content Creation",
      "Podcasting",
      "Other",
    ],
  },
};

const HOW_IT_WORKS_STEPS = [
  {
    emoji: "🔍",
    title: "Find Your Project Mentor",
    description:
      "Search for experts based on the project you want to accomplish, like 'Land a Tech Job' or 'Launch a Podcast.'",
  },
  {
    emoji: "🎯",
    title: "Define Your Goal",
    description:
      "In a free initial chat, work with your mentor to set clear goals, a timeline, and what you'll achieve together. Agree on a fixed project price.",
  },
  {
    emoji: "🚀",
    title: "Launch Your Project",
    description:
      "Start your mentorship with a clear plan and a dedicated partner. No surprise fees or monthly subscriptions, just focused guidance.",
  },
  {
    emoji: "💬",
    title: "Get Ongoing Guidance",
    description:
      "Receive regular check-ins, feedback on your work, and expert advice via chat and video calls to keep your momentum going.",
  },
  {
    emoji: "🏆",
    title: "Achieve Your Outcome",
    description:
      "Finish your project with a real result—a completed website, a new job offer, a launched business, or a mastered skill.",
  },
  {
    emoji: "🌱",
    title: "Own Your New Skills",
    description:
      "The skills and confidence you gain are yours forever. You're not just done with a project; you're ready for your next big step.",
  },
];

const WHY_MENTORWISE_FEATURES = [
  {
    icon: GlobeAltIcon,
    title: "Global Community",
    description:
      "Connect with a diverse network of mentors and mentees from around the world.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Vetted Experts",
    description:
      "Every mentor is reviewed for real-world experience and a passion for teaching.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Project-Based",
    description:
      "Tangible outcomes with clear goals and timelines, not just counting minutes.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Transparent Pricing",
    description:
      "Agree on a fixed project price upfront. No subscriptions, no hidden fees, just results.",
  },
  {
    icon: UserGroupIcon,
    title: "Private & Secure",
    description:
      "All your interactions and data are kept confidential and protected on our platform.",
  },
];

const VALUE_PROPOSITION_FEATURES = [
  {
    icon: HeroSparklesIcon,
    title: "Personalized Insight",
    description:
      "Get tailored advice from someone who has already walked the path you're on.",
  },
  {
    icon: HeroMapIcon,
    title: "Clear Direction",
    description:
      "Cut through the noise and get an actionable plan without the overwhelm or fluff.",
  },
  {
    icon: BoltIcon,
    title: "Lasting Momentum",
    description:
      "Build habits and gain insights that actually last, long after your session ends.",
  },
];

/* -------------------------
   Sections (UNCHANGED UI)
-------------------------- */

const CategorySection = React.memo(function CategorySection() {
  const navigate = useNavigate();

  const handleSelect = (label) => (value) => {
    if (!value) return;
    if (value === "Other") {
      navigate("/mentors");
    } else {
      navigate(
        `/mentors?topic=${encodeURIComponent(value)}&category=${encodeURIComponent(label)}`
      );
    }
  };

  return (
    <section
      id="browse"
      aria-label="Browse mentors by category"
      className="bg-orange-100 py-20 px-4 sm:px-6 lg:px-8 relative z-30"
    >
      <div className="max-w-screen-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-4 font-manrope"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          What Do You Want to Accomplish?
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-lato"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Select a topic below to instantly explore mentors specialized in that area.
        </motion.p>

        {/* 4 columns, centered labels + buttons, comfortable spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16 place-items-center">
          <div className="w-full max-w-[22rem]">
            <ModernDropdown
              label={CATEGORY_OPTIONS.career.label}
              options={CATEGORY_OPTIONS.career.options}
              onSelect={handleSelect(CATEGORY_OPTIONS.career.label)}
              placeholder="Explore"
            />
          </div>

          <div className="w-full max-w-[22rem]">
            <ModernDropdown
              label={CATEGORY_OPTIONS.tech.label}
              options={CATEGORY_OPTIONS.tech.options}
              onSelect={handleSelect(CATEGORY_OPTIONS.tech.label)}
              placeholder="Explore"
            />
          </div>

          <div className="w-full max-w-[22rem]">
            <ModernDropdown
              label={CATEGORY_OPTIONS.wellness.label}
              options={CATEGORY_OPTIONS.wellness.options}
              onSelect={handleSelect(CATEGORY_OPTIONS.wellness.label)}
              placeholder="Explore"
            />
          </div>

          <div className="w-full max-w-[22rem]">
            <ModernDropdown
              label={CATEGORY_OPTIONS.hobbies.label}
              options={CATEGORY_OPTIONS.hobbies.options}
              onSelect={handleSelect(CATEGORY_OPTIONS.hobbies.label)}
              placeholder="Explore"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

const HowItWorksSection = React.memo(() => (
  <section
    aria-label="How MentorWise works"
    className="relative pt-60 pb-4 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    style={{ background: "linear-gradient(0deg, #fff7eecc 65%, #e6eef7cc 100%)" }}
  >
    <img
      src="/background-waves.png"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none opacity-70"
      loading="lazy"
      decoding="async"
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-white/75 z-10 pointer-events-none" />
    <div className="max-w-screen-xl mx-auto text-center relative z-20">
      <motion.h2
        className="text-3xl sm:text-5xl font-extrabold text-orange-600 mb-20 font-manrope"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <motion.div
            key={index}
            className="relative bg-orange-100/90 p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-orange-200 transition-all hover:scale-105 hover:shadow-2xl hover:bg-orange-200/80 cursor-pointer"
            whileHover={{ scale: 1.07 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-3 right-5 text-6xl font-black text-orange-600 opacity-10">
              {index + 1}
            </div>
            <div className="text-5xl mb-4 drop-shadow">{step.emoji}</div>
            <h3 className="text-xl font-extrabold font-manrope mb-3 text-orange-700">
              {step.title}
            </h3>
            <p className="text-base leading-relaxed text-gray-700 font-lato">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const WhyMentorWiseSection = React.memo(function WhyMentorWiseSection() {
  const displayFeatures = React.useMemo(
    () =>
      WHY_MENTORWISE_FEATURES
        .filter((f) => f.title !== "Private & Secure")
        .map((f) =>
          f.title === "Project-Based"
            ? {
                ...f,
                title: "Project & Learning-Based",
                description:
                  "Focus on tangible outcomes and clear goals while building durable skills through guided learning.",
              }
            : f
        ),
    []
  );

  return (
    <section aria-label="Why choose MentorWise" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-manrope">
          Why Choose MentorWise?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 font-lato">
          We're different. We're built for focus, clarity, and real-world results.
        </p>

        {/* 2 columns on mobile (→ two rows), 4 columns on desktop with wider gaps */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-24 xl:gap-32">
          {displayFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="px-2"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-5">
                <item.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-manrope">{item.title}</h3>
              <p className="mt-2 text-slate-600 font-lato">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

const ActionChoiceSection = React.memo(() => (
  <section
    aria-label="Choose an action"
    className="w-full bg-gradient-to-b from-orange-50 to-white py-16"
  >
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Find a Mentor */}
        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mb-6">
              <Rocket className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#181C2A] mb-4">
              I want to achieve a goal.
            </h2>
            <p className="text-gray-600 mb-7 max-w-2xl">
              Find a vetted expert to help you master a skill, complete a
              project, or launch your next big idea.
            </p>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Get a Step-by-Step Roadmap
                  </p>
                  <p className="text-gray-600">
                    Follow a clear plan with milestones tailored to your
                    specific goal.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Master Skills with 1-on-1 Guidance
                  </p>
                  <p className="text-gray-600">
                    Receive personalized feedback and support from a true
                    expert.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Build Confidence & Get Results
                  </p>
                  <p className="text-gray-600">
                    Move forward faster with a partner dedicated to your
                    success.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              to="/mentors"
              aria-label="Find your mentor"
              className="inline-flex items-center justify-center w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              Find Your Mentor →
            </Link>
          </div>
        </div>

        {/* Become a Coach */}
        <div className="bg-slate-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mb-6">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#181C2A] mb-4">
              I want to share my expertise.
            </h2>
            <p className="text-gray-600 mb-7 max-w-2xl">
              Turn your skills into a sustainable business with low fees,
              flexible offer types, and high-quality clients.
            </p>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Monetize with Low 12% Fees
                  </p>
                  <p className="text-gray-600">
                    Keep more of what you earn compared to other platforms.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Offer Flexible Plans & Retainers
                  </p>
                  <p className="text-gray-600">
                    Sell your expertise your way — not just as one-off gigs.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 text-orange-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#181C2A]">
                    Grow with High-Quality Clients
                  </p>
                  <p className="text-gray-600">
                    Connect with users who are invested in achieving real
                    outcomes.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              to="/become-a-mentor"
              aria-label="Become a coach"
              className="inline-flex items-center justify-center w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              Become a Coach →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
));

// === Video (Impact-style reveal to full-bleed at mid-screen) ===
const VideoBannerSection = React.memo(() => {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 50%"],
  });

  const CM = 38;

  const scale = useTransform(scrollYProgress, [0, 0.48, 1], [0.82, 1.0, 1.0]);
  const radius = useTransform(scrollYProgress, [0, 0.32, 0.48, 1], [22, 12, 0, 0]);
  const overlayOp = useTransform(scrollYProgress, [0, 1], [0.45, 0.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.65, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const padX = useTransform(scrollYProgress, [0, 0.5, 1], [CM, 0, 0]);
  const padY = useTransform(scrollYProgress, [0, 0.5, 1], [CM, 0, 0]);
  const stickyTop = useTransform(scrollYProgress, [0, 0.5, 1], [96, 0, 0]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.48, 1],
    ["0 20px 50px rgba(0,0,0,0.25)", "0 6px 18px rgba(0,0,0,0.10)", "0 0 0 rgba(0,0,0,0)"]
  );

  return (
    <section
      ref={ref}
      aria-label="Mentor success video"
      className="relative overflow-x-clip"
      style={{ paddingTop: padY, paddingBottom: padY }}
    >
      <motion.div className="sticky" style={{ top: stickyTop }}>
        <motion.div className="w-screen" style={{ paddingLeft: padX, paddingRight: padX }}>
          <motion.div
            className="relative w-full aspect-[16/9] overflow-hidden will-change-transform"
            style={{
              scale,
              borderRadius: radius,
              boxShadow,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <video
              src="/lifecoach-vid.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center top" }}
            />

            <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOp }} aria-hidden />

            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-snug">
                Unlock Your Potential with the Right Mentor
              </h2>
              <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-2xl">
                Our mentors have helped thousands reach their personal and professional goals.
              </p>
              <Link
                to="/mentors"
                className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg text-lg"
                aria-label="Find your mentor"
              >
                Find Your Mentor
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

const CommunitySection = React.memo(() => (
  <section aria-label="RealTalk community" className="w-full bg-sky-50 py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="/hero-illustration.png"
          alt="Illustration of people connecting and chatting online"
          className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-manrope leading-tight">
          Join the Conversation in <br />{" "}
          <span className="text-orange-600">RealTalk</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 font-lato">
          Our community forum is a safe space to ask questions, share
          experiences, and get advice from peers and mentors who've been there.
          It's the heart of our community.
        </p>
        <Link
          to="/realtalk"
          className="mt-8 inline-block bg-slate-900 hover:bg-blue-300 text-white font-bold px-8 md:px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          aria-label="Visit RealTalk"
        >
          Visit RealTalk
        </Link>
      </motion.div>
    </div>
  </section>
));

const ValuePropositionSection = React.memo(() => (
  <section aria-label="Value proposition" className="w-full bg-white py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-manrope leading-tight">
          Expert mentors. <br /> <span className="text-orange-600">Real results.</span> One
          platform.
        </h2>
        <p className="mt-4 text-lg text-slate-600 font-lato">
          Mentorship bridges the gap between where you are and where you want to
          be. It’s not a course; it’s a partnership focused on your specific
          goals.
        </p>
        <ul className="mt-8 space-y-5 text-slate-700">
          {VALUE_PROPOSITION_FEATURES.map((feature) => (
            <li key={feature.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
                <feature.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/mentors"
          className="mt-10 inline-block bg-orange-500 hover:bg-orange-700 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          aria-label="Find your mentor"
        >
          Find Your Mentor
        </Link>
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="/why-coaching.jpg"
          alt="A mentor at their desk during a video call"
          className="w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-orange-100"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </motion.div>
    </div>
  </section>
));

/* -------------------------
   Page (UNCHANGED ORDER)
-------------------------- */

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "MentorWise",
        url: "https://mentorwise.pro",
        logo: "https://mentorwise.pro/logo.png",
      },
      {
        "@type": "WebSite",
        name: "MentorWise",
        url: "https://mentorwise.pro",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://mentorwise.pro/search?q={query}",
          "query-input": "required name=query",
        },
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen bg-orange-50 text-gray-800 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <a
        href="#browse"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-[100] bg-slate-900 text-white px-3 py-2 rounded"
      >
        Skip to main content
      </a>

      <Helmet>
        <title>Mentorship & Coaching That Moves You Forward | MentorWise</title>
        <meta
          name="description"
          content="Get matched with experienced mentors and coaches in skills, finance, and emotional support. Accelerate your growth with 1-on-1 online guidance—no subscriptions or contracts."
        />
        <link rel="canonical" href="https://mentorwise.pro/" />
        <meta
          property="og:title"
          content="Mentorship & Coaching That Moves You Forward | MentorWise"
        />
        <meta
          property="og:description"
          content="Work 1-on-1 with vetted mentors. Programs, projects, and retainers—clear outcomes, no fluff."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mentorwise.pro/" />
        <meta property="og:image" content="https://mentorwise.pro/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MentorWise — Find a Mentor, Get Real Results"
        />
        <meta
          name="twitter:description"
          content="A human-first marketplace for mentorship and expert help."
        />
        <meta name="twitter:image" content="https://mentorwise.pro/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main role="main" id="main">
        {/* ORDER & CONTENT UNCHANGED */}
        <HeroSlideshow />
        <CategorySection />
        <TestimonialsCarousel />
        <HowItWorksSection />
        <WhyMentorWiseSection />
        <ActionChoiceSection />
        <VideoBannerSection />
        <CommunitySection />
        <ValuePropositionSection />
        <ParallaxCardSection />
      </main>
    </motion.div>
  );
}
