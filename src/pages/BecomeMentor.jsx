// src/pages/BecomeMentor.jsx (Polished & Optimized Version)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon, UserPlusIcon, LightBulbIcon, BanknotesIcon, ClockIcon,
} from "@heroicons/react/24/outline";

// --- Custom Hooks (Separating Logic from UI) ---
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

/**
 * Manages the state and submission logic for the application form.
 */
const useApplicationForm = () => {
  const [formState, setFormState] = useState({ name: "", email: "", expertise: "", bio: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, an API call to submit the form would go here.
    // For example: `await submitApplication(formState);`
    setIsSubmitted(true);
  };

  return { formState, isSubmitted, handleChange, handleSubmit };
};

/**
 * Manages the logic for the "Test Zoom Meeting" feature.
 */
const useZoomTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLink, setZoomLink] = useState("");

  const handleCreateZoom = async () => {
    setIsLoading(true);
    setZoomLink("");
    try {
      const response = await fetch(`${API_BASE}/api/create-meeting`, { method: "POST" });
      if (!response.ok) {
        throw new Error(`Server error (${response.status}): ${await response.text()}`);
      }
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


// --- Data Constants (Single Source of Truth) ---
const BENEFITS_DATA = [
  { icon: LightBulbIcon, title: "Share Your Wisdom", description: "Make a real impact by guiding others with your unique experience and skills." },
  { icon: BanknotesIcon, title: "Earn on Your Terms", description: "Set your own rates for project-based mentorships and get paid securely." },
  { icon: ClockIcon, title: "Flexible Schedule", description: "Offer mentorship that fits your life. No required hours, just meaningful connections." },
];


// --- UI Components (Componentization & Readability) ---
const ZoomTestButton = React.memo(({ isLoading, link, onCreate }) => (
  <div className="mb-6">
    <button type="button" onClick={onCreate} disabled={isLoading} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 hover:bg-slate-50 disabled:opacity-60 transition">
      {isLoading ? "Creating Zoom meeting…" : "Test Zoom Meeting"}
    </button>
    {link && (
      <p className="mt-2 text-sm text-slate-600 break-all">
        Zoom link created:{" "}
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link}</a>
      </p>
    )}
  </div>
));

const ApplicationForm = React.memo(({ formState, onChange, onSubmit }) => (
  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="text-center mb-8">
      <UserPlusIcon className="w-12 h-12 mx-auto text-orange-500" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4">Become a Mentor</h1>
      <p className="text-slate-600 mt-2">Join our community of experts and start making a difference.</p>
    </div>
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Form Fields */}
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
));

const SuccessMessage = React.memo(() => (
  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center py-10">
    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
    <h2 className="text-2xl font-bold text-slate-800 mt-4">Thank You!</h2>
    <p className="text-slate-600 mt-2">We've received your application and will be in touch soon.</p>
  </motion.div>
));

const HeroSection = () => {
  const { formState, isSubmitted, handleChange, handleSubmit } = useApplicationForm();
  const { isLoading: isZoomLoading, zoomLink, handleCreateZoom } = useZoomTest();
  
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
        <motion.div className="w-full max-w-lg bg-white/60 backdrop-blur-sm border-t-4 border-blue-300 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <SuccessMessage />
            ) : (
              // Use a fragment to group multiple elements for the animation key
              <motion.div key="form-view">
                <ZoomTestButton isLoading={isZoomLoading} link={zoomLink} onCreate={handleCreateZoom} />
                <ApplicationForm formState={formState} onChange={handleChange} onSubmit={handleSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="hidden lg:block w-full h-full">
        <motion.img src="/Become-a-Mentor.jpg" alt="A mentor guiding a student" className="w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
      </div>
    </div>
  );
};

const BenefitsSection = React.memo(({ benefits }) => (
  <section className="w-full py-20 px-4 sm:px-6 bg-white">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Why Mentor with MentorWise?</h2>
        <p className="mt-3 text-lg text-slate-600">We handle the logistics so you can focus on what you do best.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {benefits.map((benefit, i) => (
          <motion.div key={benefit.title} className="p-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-5">
              <benefit.icon className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{benefit.title}</h3>
            <p className="mt-2 text-slate-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const CtaBannerSection = React.memo(() => (
  <section className="relative h-[500px] mt-12 md:mt-20 overflow-hidden">
    <img src="/find-clients.png" alt="A person working on a laptop" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
      <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-snug tracking-tight">Ready to Make an Impact?</h2>
        <p className="text-white/90 text-lg md:text-xl leading-relaxed">Join a community dedicated to growth and share your expertise with mentees who are eager to learn from the best.</p>
      </motion.div>
    </div>
  </section>
));


// --- Main Page Component (Orchestrator) ---
export default function BecomeMentor() {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <HeroSection />
      <BenefitsSection benefits={BENEFITS_DATA} />
      <CtaBannerSection />
    </div>
  );
}