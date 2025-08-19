import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CheckCircleIcon,
  UserPlusIcon,
  LightBulbIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// --- Custom Hooks for Logic ---
const useApplicationForm = () => {
  const [formState, setFormState] = useState({ name: "", email: "", expertise: "", bio: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, an API call would go here.
    setIsSubmitted(true);
  };

  return { formState, isSubmitted, handleChange, handleSubmit };
};

const useZoomTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLink, setZoomLink] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

  const handleCreateZoom = async () => {
    setIsLoading(true);
    setZoomLink("");
    try {
      const response = await fetch(`${API_BASE}/api/create-meeting`, { method: "POST" });
      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
      const data = await response.json();
      if (data?.join_url) {
        setZoomLink(data.join_url);
        window.open(data.join_url, "_blank", "noopener,noreferrer");
      } else {
        throw new Error("No join_url returned from the server.");
      }
    } catch (error) {
      alert(`Error creating Zoom meeting: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, zoomLink, handleCreateZoom };
};

// --- Data Constants ---
const BENEFITS_DATA = [
  { icon: LightBulbIcon, title: "Share Your Wisdom", description: "Make a real impact by guiding others with your unique experience and skills." },
  { icon: BanknotesIcon, title: "Earn on Your Terms", description: "Set your own rates for project-based mentorships and get paid securely." },
  { icon: ClockIcon, title: "Flexible Schedule", description: "Offer mentorship that fits your life. No required hours, just meaningful connections." },
];

// --- UI Components ---
const ApplicationForm = ({ formState, onChange, onSubmit }) => (
  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="text-center mb-8">
      <UserPlusIcon className="w-12 h-12 mx-auto text-orange-500" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4">Become a Mentor</h1>
      <p className="text-slate-600 mt-2">Join our community of experts and start making a difference.</p>
    </div>
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block mb-1.5 font-semibold text-sm text-slate-700">Full Name</label>
        <input id="name" type="text" name="name" value={formState.name} onChange={onChange} required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1.5 font-semibold text-sm text-slate-700">Email</label>
        <input id="email" type="email" name="email" value={formState.email} onChange={onChange} required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
      </div>
      <div>
        <label htmlFor="expertise" className="block mb-1.5 font-semibold text-sm text-slate-700">Primary Area of Expertise</label>
        <input id="expertise" type="text" name="expertise" value={formState.expertise} onChange={onChange} required placeholder="e.g., Career Coaching, Web Development" className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
      </div>
      <div>
        <label htmlFor="bio" className="block mb-1.5 font-semibold text-sm text-slate-700">Short Bio</label>
        <textarea id="bio" name="bio" value={formState.bio} onChange={onChange} rows={4} required placeholder="Tell us a bit about your experience and mentorship style." className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
      </div>
      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg font-bold transition-all transform hover:-translate-y-0.5">
        Apply Now
      </button>
    </form>
  </motion.div>
);

const SuccessMessage = () => (
  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center py-10">
    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
    <h2 className="text-2xl font-bold text-slate-800 mt-4">Thank You!</h2>
    <p className="text-slate-600 mt-2">We've received your application and will be in touch soon.</p>
  </motion.div>
);

const CtaBannerSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={targetRef} className="relative h-[650px] overflow-hidden">
      <motion.img
        src="/find-clients.png"
        alt="A person working on a laptop"
        className="absolute top-0 left-0 w-full h-[140%] object-cover"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tighter drop-shadow-md">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md">
            Join a community dedicated to growth and share your expertise with mentees who are eager to learn from the best.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
export default function BecomeMentor() {
  const { formState, isSubmitted, handleChange, handleSubmit } = useApplicationForm();
  
  return (
    <div className="min-h-screen w-full bg-slate-50 font-manrope">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
          <motion.div
            className="w-full max-w-lg bg-white/60 backdrop-blur-sm border-t-4 border-blue-300 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? <SuccessMessage /> : <ApplicationForm formState={formState} onChange={handleChange} onSubmit={handleSubmit} />}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="hidden lg:block w-full h-full">
          <motion.img
            src="/Become-a-Mentor.jpg"
            alt="A mentor guiding a student"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* FIX: Polished this section with better fonts and spacing */}
      <section className="w-full py-24 sm:py-32 px-4 sm:px-6 bg-white font-manrope">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Why Mentor with MentorWise?</h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">We handle the logistics so you can focus on what you do best—sharing your knowledge and making an impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
            {BENEFITS_DATA.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-8">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{benefit.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBannerSection />
    </div>
  );
}