import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import ModernDropdown from "../components/ModernDropdown";
import ParallaxCardSection from "../components/ParallaxCardSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import HeroSlideshow from "../components/HeroSlideshow";

import {
PaintBrushIcon,
BriefcaseIcon,
HeartIcon,
ShieldCheckIcon,
RocketLaunchIcon,
CurrencyDollarIcon,
SparklesIcon,
MapIcon,
BoltIcon,
UserGroupIcon,
GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
const skillsOptions = ["Cooking", "Photography", "Creative Writing", "Public Speaking", "Gaming", "Other"];
const financeOptions = ["Investing", "Budgeting", "Resume Building", "Freelancing", "Side Hustles", "Other"];
const supportOptions = ["Stress Relief", "Anxiety Support", "Life Purpose", "Burnout Recovery", "Loneliness", "Other"];

const whyMentorWise = [
{ icon: GlobeAltIcon, title: "Global Community", description: "Connect with a diverse network of mentors and mentees from around the world." },
{ icon: ShieldCheckIcon, title: "Vetted Experts", description: "Every mentor is reviewed for real-world experience and a passion for teaching." },
{ icon: RocketLaunchIcon, title: "Project-Based", description: "Focus on tangible outcomes with clear goals and timelines, not just counting minutes." },
{ icon: CurrencyDollarIcon, title: "Transparent Pricing", description: "Agree on a fixed project price upfront. No subscriptions, no hidden fees, just results." },
{ icon: UserGroupIcon, title: "Private & Secure", description: "All your interactions and data are kept confidential and protected on our platform." },
];

return (
<motion.div
className="min-h-screen bg-orange-50 text-gray-800 overflow-x-hidden"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1, ease: "easeInOut" }}
>
<Helmet>
<title>Mentorship & Coaching That Moves You Forward | MentorWise</title>
<meta
name="description"
content="Get matched with experienced mentors and coaches in skills, finance, and emotional support. Accelerate your growth with 1-on-1 online guidance—no subscriptions or contracts."
/>
</Helmet>

<main role="main">
{/* 1) Hero */}
<HeroSlideshow />

{/* 2) Category Dropdowns */}
<section className="bg-orange-100 py-20 px-4 sm:px-6 lg:px-8 relative z-30">
<div className="max-w-7xl mx-auto text-center">
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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
<ModernDropdown label="Skills & Hobbies" options={skillsOptions} icon={PaintBrushIcon} />
<ModernDropdown label="Finance & Career" options={financeOptions} icon={BriefcaseIcon} />
<ModernDropdown label="Emotional Support" options={supportOptions} icon={HeartIcon} />
</div>
</div>
</section>

{/* 3) Testimonials */}
<TestimonialsCarousel />

{/* 4) How It Works */}
<section
className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
style={{ background: "linear-gradient(0deg, #fff7eecc 65%, #e6eef7cc 100%)" }}
>
<img
src="/background-waves.png"
alt=""
aria-hidden="true"
className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none opacity-70"
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
{[
"🔍 Find Your Project Mentor",
"🎯 Define Your Goal",
"🚀 Launch Your Project",
"💬 Get Ongoing Guidance",
"🏆 Achieve Your Outcome",
"🌱 Own Your New Skills",
].map((item, index) => (
<motion.div
key={index}
className="relative bg-orange-100/90 p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-orange-200 transition-all hover:scale-105 hover:shadow-2xl hover:bg-orange-200/80 cursor-pointer"
whileHover={{ scale: 1.07 }}
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
>
<div className="absolute top-3 right-5 text-6xl font-black text-orange-600 opacity-10">{index + 1}</div>
<div className="text-5xl mb-4 drop-shadow">{item.split(" ")[0]}</div>
<h3 className="text-xl font-extrabold font-manrope mb-3 text-orange-700">
{item.split(" ").slice(1).join(" ")}
</h3>
<p className="text-base leading-relaxed text-gray-700 font-lato">
{index === 0 &&
"Search for experts based on the project you want to accomplish, like 'Land a Tech Job' or 'Launch a Podcast.'"}
{index === 1 &&
"In a free initial chat, work with your mentor to set clear goals, a timeline, and what you'll achieve together. Agree on a fixed project price."}
{index === 2 &&
"Start your mentorship with a clear plan and a dedicated partner. No surprise fees or monthly subscriptions, just focused guidance."}
{index === 3 &&
"Receive regular check-ins, feedback on your work, and expert advice via chat and video calls to keep your momentum going."}
{index === 4 &&
"Finish your project with a real result—a completed website, a new job offer, a launched business, or a mastered skill."}
{index === 5 &&
"The skills and confidence you gain are yours forever. You're not just done with a project; you're ready for your next big step."}
</p>
</motion.div>
))}
</div>
</div>
</section>

{/* 5) Why Choose MentorWise */}
<section className="py-20 md:py-24 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-manrope">Why Choose MentorWise?</h2>
<p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 font-lato">
We're different. We're built for focus, clarity, and real-world results.
</p>
<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
{whyMentorWise.map((item, index) => (
<motion.div
key={item.title}
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.1 }}
viewport={{ once: true }}
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

{/* === Video Section === */}
<section className="relative w-full overflow-hidden">
<div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px]">
<video
src="/lifecoach-vid.mp4"
autoPlay
muted
loop
playsInline
className="absolute inset-0 w-full h-full object-cover"
style={{
objectPosition: "center top", // lifts framing so her head is visible
}}
/>
{/* Overlay */}
<div className="absolute inset-0 bg-black/40"></div>
{/* Text overlay */}
<div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-snug">
Unlock Your Potential with the Right Mentor
</h2>
<p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-2xl">
Our mentors have helped thousands reach their personal and professional goals.
</p>
<Link
to="/mentors"
className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg text-lg"
>
Find Your Mentor
</Link>
</div>
</div>
</section>

{/* 7) Join the Conversation (RealTalk) */}
<section className="w-full bg-slate-50 py-20 md:py-28">
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
/>
</motion.div>
<motion.div
initial={{ opacity: 0, x: 50 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
viewport={{ once: true }}
>
<h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 font-manrope leading-tight">
Join the Conversation in <br /> <span className="text-orange-600">RealTalk</span>
</h2>
<p className="mt-4 text-lg text-slate-600 font-lato">
Our community forum is a safe space to ask questions, share experiences, and get advice from peers and mentors
who've been there. It's the heart of our community.
</p>
<Link
to="/realtalk"
className="mt-8 inline-block bg-slate-900 hover:bg-blue-300 text-white font-bold px-8 md:px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
>
Visit RealTalk
</Link>
</motion.div>
</div>
</section>

{/* 8) Expert mentors. Real results. One platform. */}
<section className="w-full bg-white py-20 md:py-28">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
<motion.div
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.7, ease: "easeOut" }}
viewport={{ once: true }}
>
<h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-manrope leading-tight">
Expert mentors. <br /> <span className="text-orange-600">Real results.</span> One platform.
</h2>
<p className="mt-4 text-lg text-slate-600 font-lato">
Mentorship bridges the gap between where you are and where you want to be. It’s not a course; it’s a partnership
focused on your specific goals.
</p>
<ul className="mt-8 space-y-5 text-slate-700">
<li className="flex items-start gap-4">
<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
<SparklesIcon className="w-5 h-5 text-orange-600" />
</div>
<div>
<h3 className="font-bold text-slate-800">Personalized Insight</h3>
<p className="text-slate-600">Get tailored advice from someone who has already walked the path you're on.</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
<MapIcon className="w-5 h-5 text-orange-600" />
</div>
<div>
<h3 className="font-bold text-slate-800">Clear Direction</h3>
<p className="text-slate-600">Cut through the noise and get an actionable plan without the overwhelm or fluff.</p>
</div>
</li>
<li className="flex items-start gap-4">
<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full">
<BoltIcon className="w-5 h-5 text-orange-600" />
</div>
<div>
<h3 className="font-bold text-slate-800">Lasting Momentum</h3>
<p className="text-slate-600">Build habits and gain insights that actually last, long after your session ends.</p>
</div>
</li>
</ul>
<Link
to="/mentors"
className="mt-10 inline-block bg-orange-500 hover:bg-orange-700 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
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
/>
</motion.div>
</div>
</section>

{/* 9) Parallax */}
<ParallaxCardSection />
</main>
</motion.div>
);
}