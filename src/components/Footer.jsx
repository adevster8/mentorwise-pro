// src/components/Footer.jsx
import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px 0px -80px 0px" });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Staggered content animation (columns + social row)
  const parent = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 24, skewY: 3 },
    show: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // JSON-LD for SEO
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
      className="relative isolate overflow-hidden bg-gray-900 text-gray-200"
    >
      {/* ===== Scoped diagonal reveal (under footer only) ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          initial={{ x: "-25%" }}
          animate={inView ? { x: "115%" } : {}}
          transition={{ duration: 1.05, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full w-[140%] -rotate-[8deg] bg-gradient-to-r from-sky-400/25 via-sky-300/10 to-transparent"
        />
        <motion.div
          initial={{ x: "-30%" }}
          animate={inView ? { x: "120%" } : {}}
          transition={{ duration: 1.15, ease: "easeInOut", delay: 0.12 }}
          className="absolute top-0 left-0 h-full w-[150%] -rotate-[8deg] bg-gradient-to-r from-sky-200/12 via-transparent to-transparent"
        />
        <motion.div
          initial={{ x: "-35%" }}
          animate={inView ? { x: "130%" } : {}}
          transition={{ duration: 1.25, ease: "easeInOut", delay: 0.24 }}
          className="absolute top-0 left-0 h-full w-[160%] -rotate-[8deg] bg-gradient-to-r from-sky-100/12 via-transparent to-transparent"
        />
      </div>

      {/* ===== Real content (sits above the blades) ===== */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-14"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo + blurb */}
          <motion.div variants={child} className="flex flex-col items-start">
            <img
              src="/logo-mentorwise.png"
              alt="MentorWise"
              className="w-[140px] mb-3"
              width={140}
              height={40}
              loading="lazy"
            />
            <p className="text-xs text-gray-400 max-w-xs">
              Your journey, your growth — guided by real people who’ve done it
              before.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            variants={child}
            aria-label="Quick links"
            className="flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <Link to="/about" onClick={scrollToTop} className="hover:underline">
              About
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="hover:underline">
              Contact
            </Link>
            <Link to="/faq" onClick={scrollToTop} className="hover:underline">
              FAQ
            </Link>
            <Link to="/terms" onClick={scrollToTop} className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" onClick={scrollToTop} className="hover:underline">
              Privacy Policy
            </Link>
          </motion.nav>

          {/* Support & Resources */}
          <motion.nav
            variants={child}
            aria-label="Support and resources"
            className="flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold mb-2">Support & Resources</h3>
            <Link to="/mentors" onClick={scrollToTop} className="hover:underline">
              Find a Mentor
            </Link>
            <Link
              to="/become-a-mentor"
              onClick={scrollToTop}
              className="hover:underline"
            >
              Become a Mentor
            </Link>
            <Link to="/blog" onClick={scrollToTop} className="hover:underline">
              Blog
            </Link>
            <Link to="/support" onClick={scrollToTop} className="hover:underline">
              Support
            </Link>
          </motion.nav>
        </div>

        {/* Social */}
        <motion.div
          variants={child}
          className="flex justify-end mt-10 gap-6 text-blue-300 text-2xl"
          aria-label="Social media"
        >
          <a
            href="https://instagram.com/mentorwise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-transform hover:scale-110 hover:text-white"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/mentorwise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-transform hover:scale-110 hover:text-white"
          >
            <FaFacebook />
          </a>
          <a
            href="https://youtube.com/@mentorwise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="transition-transform hover:scale-110 hover:text-white"
          >
            <FaYoutube />
          </a>
          <a
            href="https://tiktok.com/@mentorwise"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="transition-transform hover:scale-110 hover:text-white"
          >
            <FaTiktok />
          </a>
        </motion.div>

        <motion.div variants={child} className="text-sm text-center text-gray-500 mt-12">
          © 2025 MentorWise. All rights reserved.
        </motion.div>
      </motion.div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}
