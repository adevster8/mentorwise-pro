import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, UserPlusIcon, LightBulbIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function BecomeMentor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server.
    // For now, we'll just show a success message.
    console.log("Form submitted:", form);
    setSubmitted(true);
  };
  
  // A simple list of benefits for the new section
  const benefits = [
    {
      icon: LightBulbIcon,
      title: "Share Your Wisdom",
      description: "Make a real impact by guiding others with your unique experience and skills."
    },
    {
      icon: BanknotesIcon,
      title: "Earn on Your Terms",
      description: "Set your own rates for project-based mentorships and get paid securely."
    },
    {
      icon: ClockIcon,
      title: "Flexible Schedule",
      description: "Offer mentorship that fits your life. No required hours, just meaningful connections."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50">
      
      {/* === HERO SECTION: FORM + IMAGE === */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* --- Left Side: Form --- */}
        <div className="flex items-center justify-center p-6 md:p-12 lg:p-16">
          <motion.div 
            className="w-full max-w-lg bg-white/60 backdrop-blur-sm border-t-4 border-blue-300 rounded-2xl shadow-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10"
                >
                  <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
                  <h2 className="text-2xl font-bold text-slate-800 mt-4 font-manrope">Thank You!</h2>
                  <p className="text-slate-600 mt-2 font-lato">We've received your application and will be in touch soon.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center mb-8">
                    <UserPlusIcon className="w-12 h-12 mx-auto text-orange-500" />
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4 font-manrope">Become a Mentor</h1>
                    <p className="text-slate-600 mt-2 font-lato">Join our community of experts and start making a difference.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block mb-1.5 font-semibold text-sm text-slate-700">Full Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
                    </div>
                    <div>
                      <label className="block mb-1.5 font-semibold text-sm text-slate-700">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" />
                    </div>
                    <div>
                      <label className="block mb-1.5 font-semibold text-sm text-slate-700">Primary Area of Expertise</label>
                      <input type="text" name="expertise" value={form.expertise} onChange={handleChange} required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" placeholder="e.g., Career Coaching, Web Development" />
                    </div>
                    <div>
                      <label className="block mb-1.5 font-semibold text-sm text-slate-700">Short Bio</label>
                      <textarea name="bio" value={form.bio} onChange={handleChange} rows="4" required className="w-full p-3 rounded-lg border border-slate-300/70 focus:ring-2 focus:ring-orange-400 shadow-sm transition" placeholder="Tell us a bit about your experience and mentorship style." />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg font-bold transition-all transform hover:-translate-y-0.5">
                      Apply Now
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- Right Side: Image --- */}
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

      {/* === NEW: WHY MENTOR WITH US? SECTION === */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-manrope">Why Mentor with MentorWise?</h2>
            <p className="mt-3 text-lg text-slate-600 font-lato">We handle the logistics so you can focus on what you do best.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-5">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 font-manrope">{benefit.title}</h3>
                <p className="mt-2 text-slate-600 font-lato">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA SECTION === */}
      <section className="relative h-[500px] mt-12 md:mt-20 overflow-hidden">
        <img
          src="/find-clients.png"
          alt="A person working on a laptop in a creative space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-snug font-manrope tracking-tight">
              Ready to Make an Impact?
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-lato leading-relaxed">
              Join a community dedicated to growth and share your expertise with mentees who are eager to learn from the best.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
