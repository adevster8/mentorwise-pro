// src/components/Footer.jsx
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
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
    <footer aria-labelledby="footer-heading" className="bg-slate-900 text-gray-300">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          
          {/* UPDATED: Increased the gap slightly to "nudge" the link columns to the right */}
          <div className="lg:flex lg:items-start lg:gap-x-16 xl:gap-x-24">
            
            {/* Left side: Logo and text block (Unchanged) */}
            <div className="flex-shrink-0 lg:w-80">
              <img
                src="/logo-mentorwise.png"
                alt="MentorWise"
                className="w-32"
                width={128}
                height={32}
                loading="lazy"
              />
              <p className="mt-4 text-sm text-slate-400 max-w-xs">
                Your journey, your growth—guided by real people who’ve done it before.
              </p>
            </div>

            {/* Right side: Link container (Unchanged internally, but gets pushed by the parent gap) */}
            <div className="mt-12 flex-1 flex flex-col gap-12 sm:flex-row sm:justify-between lg:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">How It Works</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {HOW_IT_WORKS_LINKS.map((item) => (
                    <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {RESOURCES_LINKS.map((item) => (
                    <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {COMPANY_LINKS.map((item) => (
                    <li key={item.label}><Link to={item.path} onClick={scrollToTop} className="text-sm leading-6 hover:text-white">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
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
        <div className="border-t border-white/10 py-8 flex items-center justify-between">
          <p className="text-xs leading-5 text-slate-400">&copy; {new Date().getFullYear()} MentorWise. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="https://instagram.com/mentorwise" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white"><FaInstagram className="h-6 w-6" /></a>
            <a href="https://facebook.com/mentorwise" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-white"><FaFacebook className="h-6 w-6" /></a>
            <a href="https://youtube.com/@mentorwise" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-white"><FaYoutube className="h-6 w-6" /></a>
            <a href="https://tiktok.com/@mentorwise" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-400 hover:text-white"><FaTiktok className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}