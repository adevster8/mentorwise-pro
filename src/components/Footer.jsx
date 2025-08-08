import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
return (
<footer className="bg-gray-900 text-gray-200 px-4 sm:px-6 pt-16 pb-14">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start">
{/* Logo + blurb */}
<div className="flex flex-col items-start">
<img src="/logo-mentorwise.png" alt="MentorWise Logo" className="w-[140px] mb-3" />
<p className="text-xs text-gray-400 max-w-xs">
Your journey, your growth — guided by real people who’ve done it before.
</p>
</div>

{/* Quick Links */}
<div className="flex flex-col gap-2">
<h4 className="text-lg font-semibold mb-2">Quick Links</h4>
<Link to="/about" className="hover:underline">About</Link>
<Link to="/contact" className="hover:underline">Contact</Link>
<Link to="/faqs" className="hover:underline">FAQs</Link>
<Link to="/terms" className="hover:underline">Terms of Service</Link>
<Link to="/privacy" className="hover:underline">Privacy Policy</Link>
</div>

{/* Other Resources */}
<div className="flex flex-col gap-2">
<h4 className="text-lg font-semibold mb-2">Support & Resources</h4>
<Link to="/mentors" className="hover:underline">Find a Mentor</Link>
<Link to="/become-a-mentor" className="hover:underline">Become a Mentor</Link>
<Link to="/blog" className="hover:underline">Blog</Link>
<Link to="/support" className="hover:underline">Support</Link>
</div>
</div>

{/* Social */}
<div className="max-w-7xl mx-auto flex justify-end mt-10 gap-6 text-blue-300 text-2xl">
<a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
<a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
<a href="#" aria-label="YouTube" className="hover:text-white"><FaYoutube /></a>
<a href="#" aria-label="TikTok" className="hover:text-white"><FaTiktok /></a>
</div>

<div className="text-sm text-center text-gray-500 mt-12">
© {new Date().getFullYear()} MentorWise. All rights reserved.
</div>
</footer>
);
}