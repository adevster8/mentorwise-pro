// src/pages/Locals.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, Clock, Handshake, HeartHandshake,
  MapPin, MessageCircle, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, Users
} from "lucide-react";
import { megaMenuData } from "../data/megaMenuData";

// --- Data Constants & Helpers ---
// Externalizing data prevents re-creation on every render and simplifies updates.

const MENU = Array.isArray(megaMenuData) ? megaMenuData : [];
const getLabel = (obj) => obj?.title ?? obj?.name ?? obj?.label ?? obj?.category ?? "";
const findCategory = (label) => MENU.find((c) => getLabel(c)?.toLowerCase() === label?.toLowerCase());
const findTopic = (catObj, label) => (catObj?.topics || []).find((t) => getLabel(t)?.toLowerCase() === label?.toLowerCase());

const FILTER_OPTIONS = {
  distance: ["5 miles", "10 miles", "25 miles", "50+ miles"],
  ageGroup: ["Teens", "20s", "30s", "40+", "All Ages"],
  goals: ["Make Friends", "Hire a Coach", "Accountability", "Study Together"],
};

const HOW_IT_WORKS_STEPS = [
  { icon: Search, title: "1) Set Your Filters", desc: "Pick distance, category, and goals. We’ll show nearby mentors and peers who match." },
  { icon: MessageCircle, title: "2) Say Hello", desc: "Open a chat to share context and decide if you want to meet or hop on a Zoom." },
  { icon: Handshake, title: "3) Meet Safely", desc: "Choose a public spot or stay online. Build real momentum with local accountability." },
];

const LOCALS_BENEFITS = [
  { icon: HeartHandshake, title: "Real Accountability", desc: "Meet people who show up. Weekly check-ins, co-working, study sessions, gym meetups." },
  { icon: Star, title: "Mentors & Peers", desc: "Get guidance from seasoned mentors or pair up with peers at the same stage." },
  { icon: Clock, title: "Faster Progress", desc: "Local support makes habits stick. Momentum compounds when someone’s nearby." },
  { icon: ShieldCheck, title: "Safety Controls", desc: "No exact GPS by default, verified accounts, and reporting tools if anything feels off." },
  { icon: Sparkles, title: "Modern, Polished UX", desc: "Clean, calm design with animations and an interface that’s actually pleasant to use." },
  { icon: CheckCircle2, title: "Flexible & Free to Start", desc: "Browse for free. Book paid 1-on-1 coaching only when you’re ready." },
];

const TRUST_AND_SAFETY_FEATURES = [
  { icon: ShieldCheck, title: "Private & Encrypted", desc: "Chats are protected. Your exact location is never shared without consent." },
  { icon: Users, title: "Meet Real People", desc: "All members are part of the MentorWise platform. No anonymous profiles." },
  { icon: MapPin, title: "Meet Safely in Public", desc: "Pick verified public spots to meet. Trust your instincts and report issues quickly." },
];

const SAFETY_PLAYBOOK_TIPS = [
  "Keep chats on-platform until you’re comfortable.",
  "Choose public locations with good lighting and people around.",
  "Share your plans with a friend and enable check-ins.",
  "Trust your instincts and leave anytime — no explanations needed.",
];

const USE_CASES = [
  { title: "Accountability Pods", desc: "Weekly goal check-ins with 2–4 people. Short, structured, and motivating." },
  { title: "Co-Working & Study", desc: "Meet at a café for 2 focused hours. Pomodoro timers, no distractions." },
  { title: "Skill-Swap Sessions", desc: "I help you with YouTube thumbnails, you help me with editing or analytics." },
  { title: "Fitness Meetups", desc: "Gym partners, running groups, beginner classes, or outdoor hikes." },
  { title: "Creator Collabs", desc: "Record together, batch short-form content, or plan a local workshop." },
  { title: "Mentor Office Hours", desc: "Local mentors host drop-in Q&A blocks — get guidance before booking 1-on-1." },
];

const FAQ_ITEMS = [
  { q: "Do I have to share my exact location?", a: "No. By default we only show an approximate area. You choose when and if to share specifics." },
  { q: "Is this for paid coaching or free meetups?", a: "Both. Browse and chat for free. You can book paid 1-on-1 sessions with mentors when you’re ready." },
  { q: "Can I use Locals just to make friends?", a: "Absolutely. Many people use Locals for accountability partners, study buddies, and gym meetups." },
  { q: "How are people verified?", a: "Accounts are tied to platform identities. Report tools and verification checks help keep things safe." },
];

// --- Helper Components ---
// Reusable component to keep the FilterSidebar DRY.
const FilterSelect = React.memo(({ label, value, onChange, options, disabled = false, placeholder, disabledPlaceholder }) => (
  <div>
    <label className="block font-semibold text-sm mb-1 text-gray-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-lg border border-orange-200 py-2 px-3 text-sm bg-orange-50 text-gray-800 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option value="">{disabled ? disabledPlaceholder : placeholder}</option>
      {options.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
    </select>
  </div>
));

// --- Section Components ---
// Breaking the page into smaller, memoized components for performance and readability.

const HeroSection = React.memo(() => (
  <div className="relative w-full">
    <img src="/locals-image1.jpg" alt="Locals Map Visual" className="w-full max-h-[600px] object-cover rounded-b-3xl shadow-md" />
    <motion.div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="max-w-3xl text-white">
        <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          Connect with Mentors and Friends Near You
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-orange-200 font-medium">Explore, chat, and meet — locally and safely.</p>
        <motion.div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
          <a href="#locals-search" className="inline-flex items-center gap-2 bg-white/90 text-[#181C2A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-white"><Search size={18} /> Search Nearby</a>
          <a href="/signin" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-700"><MessageCircle size={18} /> Start a Conversation</a>
          <a href="#how-it-works-locals" className="inline-flex items-center gap-2 bg-white/90 text-[#181C2A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-white"><CalendarDays size={18} /> How It Works</a>
        </motion.div>
      </div>
    </motion.div>
  </div>
));

const FilterSidebar = React.memo(({ filters, onFilterChange, options }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-orange-100">
    <h2 className="text-xl font-bold text-orange-700 flex items-center gap-2"><SlidersHorizontal size={22} /> Search Nearby</h2>
    <FilterSelect label="Distance" value={filters.distance} onChange={(e) => onFilterChange('distance', e.target.value)} options={FILTER_OPTIONS.distance} placeholder="Select Distance" />
    <FilterSelect label="Category" value={filters.category} onChange={(e) => onFilterChange('category', e.target.value)} options={options.category} placeholder="Select Category" />
    <FilterSelect label="Topic" value={filters.topic} onChange={(e) => onFilterChange('topic', e.target.value)} options={options.topic} disabled={!filters.category} placeholder="Select Topic" disabledPlaceholder="Choose category first" />
    <FilterSelect label="Subtopic" value={filters.subtopic} onChange={(e) => onFilterChange('subtopic', e.target.value)} options={options.subtopic} disabled={!filters.topic} placeholder="Select Subtopic" disabledPlaceholder="Choose topic first" />
    <FilterSelect label="Age Group" value={filters.ageGroup} onChange={(e) => onFilterChange('ageGroup', e.target.value)} options={FILTER_OPTIONS.ageGroup} placeholder="Select Age Group" />
    <FilterSelect label="Goals" value={filters.goals} onChange={(e) => onFilterChange('goals', e.target.value)} options={FILTER_OPTIONS.goals} placeholder="Select Goals" />
    <button className="w-full flex items-center justify-center gap-2 text-white font-bold bg-orange-600 hover:bg-orange-700 py-3 rounded-lg transition-all mt-4"><Search size={18} /> Find Matches</button>
    <div className="pt-2 text-xs text-gray-500 flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5" /> Location is approximate unless both sides confirm a meetup.</div>
  </div>
));

const MainContentSection = React.memo(() => (
  <div className="grid md:grid-cols-2 gap-8">
    <motion.div className="bg-white rounded-3xl shadow-xl p-8" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2"><MapPin size={24} /> Live Local Map</h2>
      <p className="text-gray-700 mb-4">See who’s nearby and available to chat, collaborate, or mentor. The map auto-updates with real-time presence of users who’ve opted in.</p>
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm">🔒 Map Placeholder (Connects to location API in future)</div>
    </motion.div>
    <motion.div className="bg-white rounded-3xl shadow-xl p-8" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
      <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2"><MessageCircle size={24} /> Instant Messaging</h2>
      <p className="text-gray-700 mb-4">Start conversations instantly with users on the map. Safe, private, and moderated chat with built-in location awareness (no exact GPS sharing).</p>
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm">💬 Chat Preview Area (Live UI in dev)</div>
    </motion.div>
  </div>
));

const HowItWorksSection = React.memo(({ steps }) => (
  <section id="how-it-works-locals" className="px-6 md:px-20 pb-6 -mt-4">
    <div className="bg-white rounded-3xl border border-orange-100 shadow-xl p-6 md:p-10">
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-10">How Locals Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div key={i} className="rounded-2xl p-6 bg-orange-50 border border-orange-100" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
            <div className="flex items-center gap-3 text-orange-700 mb-3"><step.icon size={28} /><h3 className="font-extrabold">{step.title}</h3></div>
            <p className="text-gray-700 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <a href="#locals-search" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-orange-700">Start Finding People <ArrowRight size={18} /></a>
        <a href="/signin" className="inline-flex items-center gap-2 bg-white text-[#181C2A] px-6 py-3 rounded-xl font-semibold shadow border border-orange-200 hover:bg-orange-50">Create Your Profile <BadgeCheck size={18} /></a>
      </div>
    </div>
  </section>
));

const BenefitsSection = React.memo(({ benefits }) => (
  <section className="px-6 md:px-20 py-16">
    <h2 className="text-3xl font-bold text-center text-orange-700 mb-10">Why Use MentorWise Locals</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {benefits.map((b, i) => (
        <motion.div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg border border-orange-100 transition" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.45 }}>
          <div className="mb-3"><b.icon className="text-orange-600" size={28} /></div>
          <h3 className="font-bold text-lg mb-1">{b.title}</h3>
          <p className="text-sm text-gray-700">{b.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
));

const TrustAndSafetySection = React.memo(({ features, tips }) => (
    <section className="bg-orange-100 py-20 px-6 md:px-20">
        <motion.h2 className="text-3xl font-bold text-center text-orange-700 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            Built with Trust & Safety in Mind
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
                <motion.div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.2, duration: 0.5 }}>
                    <div className="mb-4"><feature.icon className="text-orange-600" size={32} /></div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
            ))}
        </div>
        <div className="max-w-4xl mx-auto mt-10 bg-white/70 backdrop-blur rounded-2xl border border-orange-200 p-6">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2"><ShieldCheck size={22} /> Your Safety Playbook</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 size={18} className="mt-0.5 text-orange-600" />{tip}</li>
                ))}
            </ul>
        </div>
    </section>
));

const UseCasesSection = React.memo(({ cases }) => (
  <section className="px-6 md:px-20 py-16">
    <h2 className="text-3xl font-bold text-center text-orange-700 mb-10">What People Do with Locals</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {cases.map((c, i) => (
        <motion.div key={i} className="bg-white rounded-2xl p-6 border border-orange-100 shadow hover:shadow-lg transition" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.45 }}>
          <h3 className="font-bold text-lg mb-2">{c.title}</h3>
          <p className="text-sm text-gray-700">{c.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
));

const FaqSection = React.memo(({ items }) => (
  <section className="px-6 md:px-20 pb-12">
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-8">Locals — Frequently Asked</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} className="group rounded-2xl border border-orange-100 p-4 open:bg-orange-50">
            <summary className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold">{item.q}</span>
              <span className="ml-4 shrink-0 group-open:rotate-180 transition"><ArrowRight size={18} /></span>
            </summary>
            <p className="text-sm text-gray-700 mt-3">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
));

const FinalCtaSection = React.memo(() => (
  <motion.div className="bg-gradient-to-r from-orange-100 to-orange-200 py-16 px-6 md:px-20 text-center rounded-t-3xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
    <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-4">Ready to Connect with Locals?</h2>
    <p className="text-gray-700 mb-6">Find support, conversation, and opportunity — all within reach.</p>
    <motion.a href="/signin" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-orange-700 transition inline-flex items-center gap-2">
      Create Your Free Account <BadgeCheck size={18} />
    </motion.a>
  </motion.div>
));

// --- Main Page Component ---
// The Locals component is now a "smart" container, managing state and composing the "dumb" section components.

export default function Locals() {
  const [filters, setFilters] = useState({
    distance: "10 miles", category: "", topic: "", subtopic: "", ageGroup: "", goals: "",
  });

  // Memoized options prevent recalculation on every render
  const derivedOptions = useMemo(() => {
    const categoryOptions = MENU.map(getLabel).filter(Boolean);
    const catObj = findCategory(filters.category);
    const topicOptions = (catObj?.topics || []).map(getLabel).filter(Boolean);
    const topicObj = findTopic(catObj, filters.topic);
    const subtopicOptions = (topicObj?.subtopics || []).map(s => s?.name || getLabel(s)).filter(Boolean);
    return { category: categoryOptions, topic: topicOptions, subtopic: subtopicOptions };
  }, [filters.category, filters.topic]);

  // Unified handler for all filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      // Cascade reset when a parent filter changes
      if (key === 'category') {
        newFilters.topic = '';
        newFilters.subtopic = '';
      } else if (key === 'topic') {
        newFilters.subtopic = '';
      }
      return newFilters;
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#181C2A] font-manrope">
      <HeroSection />

      <div id="locals-search" className="grid md:grid-cols-[320px_1fr] gap-8 px-6 md:px-20 py-16">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} options={derivedOptions} />
        <MainContentSection />
      </div>

      <HowItWorksSection steps={HOW_IT_WORKS_STEPS} />
      <BenefitsSection benefits={LOCALS_BENEFITS} />
      <TrustAndSafetySection features={TRUST_AND_SAFETY_FEATURES} tips={SAFETY_PLAYBOOK_TIPS} />
      <UseCasesSection cases={USE_CASES} />
      <FaqSection items={FAQ_ITEMS} />
      <FinalCtaSection />
    </div>
  );
}