// src/components/Footer.jsx
import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

// Data for navigation links
const HOW_IT_WORKS_LINKS = [
  { label: "For Clients", path: "/how-it-works/clients" },
  { label: "For Mentors", path: "/how-it-works/coaches" },
  { label: "Pricing", path: "/pricing" },
  { label: "Programs vs. Projects", path: "/how-it-works/programs-vs-projects" },
];

const COMPANY_LINKS = [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "Blog", path: "/blog" },
];

const RESOURCES_LINKS = [
  { label: "Find a Mentor", path: "/mentors" },
  { label: "Become a Mentor", path: "/become-a-mentor" },
  { label: "Get Matched", path: "/schedule-a-call" },
  { label: "Support", path: "/support" },
  { label: "Trust & Safety", path: "/payment-protection" },
];

const COMMUNITY_LINKS = [
    { label: "Locals", path: "/locals" },
];


export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px 0px -80px 0px" });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MentorWise",
    url: "https://mentorwise.example.com",
    logo: "https://mentorwise.example.com/logo-mentorwise.png",
    sameAs: [
      "https://instagram.com/mentorwise",
      "https://facebook.com/mentorwise",
      "https://youtube.com/@mentorwise",
      "https://tiktok.com/@mentorwise",
    ],
  };

  return (
    <footer
      ref={ref}
      aria-labelledby="footer-heading"
      className="bg-slate-900 text-gray-300"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        
        {/* Top section: Logo and Links */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
                <img
                  src="/logo-mentorwise.png"
                  alt="MentorWise"
                  className="w-32"
                  width={128}
                  height={32}
                  loading="lazy"
                />
                <p className="text-sm text-slate-400 max-w-xs">
                  Your journey, your growth—guided by real people who’ve done it before.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">How It Works</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {HOW_IT_WORKS_LINKS.map((item) => (
                                <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 md:mt-0">
                        <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {RESOURCES_LINKS.map((item) => (
                                <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {COMPANY_LINKS.map((item) => (
                                <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 md:mt-0">
                        <h3 className="text-sm font-semibold leading-6 text-white">Community</h3>
                        <ul role="list" className="mt-4 space-y-3">
                            {COMMUNITY_LINKS.map((item) => (
                                <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                            ))}
                            <li>
                                <Link to="/realtalk" onClick={scrollToTop} className="text-sm leading-6 hover:text-white font-bold">🫂 RealTalk</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom section: Copyright and Socials */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex items-center justify-between">
            <p className="text-xs leading-5 text-slate-400">&copy; {new Date().getFullYear()} MentorWise. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="https://instagram.com/mentorwise" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white"><FaInstagram className="h-6 w-6" /></a>
                <a href="https://facebook.com/mentorwise" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-white"><FaFacebook className="h-6 w-6" /></a>
                <a href="https://youtube.com/@mentorwise" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-white"><FaYoutube className="h-6 w-6" /></a>
                <a href="https://tiktok.com/@mentorwise" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-400 hover:text-white"><FaTiktok className="h-6 w-6" /></a>
            </div>
        </div>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}