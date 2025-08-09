// src/pages/FAQ.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clientFAQs = [
  { q: "How does MentorWise work?", a: "We match you with vetted mentors based on your goals, schedule, and budget. You can browse profiles, read reviews, and instantly book sessions." },
  { q: "Do I need an account to book a mentor?", a: "Yes, creating an account lets you track your bookings, messages, and session history securely." },
  { q: "How much does it cost?", a: "Mentors set their own rates, so prices vary. You’ll see the full cost before booking." },
  { q: "Can I meet my mentor in person?", a: "Most sessions are online via Zoom for convenience and safety, but some mentors may offer in-person options." },
  { q: "What if my mentor cancels?", a: "You’ll receive an automatic refund or the option to reschedule with the same mentor." },
  { q: "Do you offer subscription plans?", a: "Some mentors offer packages or monthly plans at discounted rates." },
  { q: "Can I try different mentors?", a: "Yes, you can work with as many mentors as you’d like until you find the best fit." },
  { q: "Is my payment secure?", a: "Yes. We use encrypted payment processors that keep your data safe." },
  { q: "Do I need special equipment?", a: "Just a device with a camera, microphone, and a stable internet connection." },
  { q: "Can I message my mentor before booking?", a: "Yes, you can send questions through our secure in-app messaging system." },
  { q: "Do mentors have verified experience?", a: "All mentors go through a vetting process to verify their skills and experience." },
  { q: "How do I leave a review?", a: "After each session, you’ll be prompted to rate your mentor and leave feedback." },
  { q: "What happens if I miss my session?", a: "If you cancel in advance, you may get a refund. No-shows are non-refundable." },
  { q: "Do you have group mentorship?", a: "Yes, some mentors offer group sessions at reduced rates." },
  { q: "Can I favorite a mentor for later?", a: "Yes, you can save mentors to your favorites list for easy access." },
  { q: "Do you offer discounts for students?", a: "Some mentors offer special pricing for students — check their profiles." },
  { q: "Is there an app?", a: "A mobile app is in development, but you can use MentorWise on any device." },
  { q: "What’s the refund policy?", a: "Refunds are available for missed sessions or poor service — contact support." },
  { q: "How do I update my profile?", a: "Log into your account and go to Settings → Profile to make changes." },
  { q: "How quickly can I book?", a: "Many mentors have same-day availability." }
];

const mentorFAQs = [
  { q: "How do I become a mentor?", a: "Click 'Become a Mentor', fill out your profile, and submit your application. Our team will review it within 48 hours." },
  { q: "Do I need coaching certification?", a: "Not necessarily. We value experience, results, and verifiable skills — certifications are a plus but not required." },
  { q: "Can I set my own rates?", a: "Yes, you control your pricing, packages, and availability." },
  { q: "How does payment work?", a: "We handle secure transactions and transfer your earnings to your bank account after each session." },
  { q: "What percentage does MentorWise take?", a: "We charge a flat 13% service fee — lower than most platforms." },
  { q: "Can I work with multiple clients?", a: "Yes, you can manage unlimited clients through your dashboard." },
  { q: "How do I get more bookings?", a: "Maintain an up-to-date profile, collect reviews, and offer introductory rates." },
  { q: "Do I need to provide video conferencing?", a: "No — we integrate with Zoom automatically." },
  { q: "Can I offer free intro sessions?", a: "Yes, you can set session cost to $0 for first-time clients." },
  { q: "Do you offer marketing help?", a: "We promote top-rated mentors in our search results and newsletters." },
  { q: "Can I pause my availability?", a: "Yes, toggle your availability in your dashboard anytime." },
  { q: "How do I handle no-shows?", a: "You’ll still get paid unless you choose to reschedule for free." },
  { q: "Do I need to sign a contract?", a: "You agree to our terms of service, but there’s no long-term contract." },
  { q: "How are reviews managed?", a: "Clients leave ratings after sessions; you can respond publicly." },
  { q: "Can I offer group coaching?", a: "Yes, you can set a session as group format and adjust pricing." },
  { q: "Is my profile visible to everyone?", a: "Yes, but you can hide it anytime." },
  { q: "Do I get notified of new messages?", a: "Yes, via email and in-app notifications." },
  { q: "Can I link to my website?", a: "Yes, as long as it complies with our guidelines." },
  { q: "Do you offer training for mentors?", a: "Yes, we provide resources and webinars to help you succeed." },
  { q: "When do I get paid?", a: "Payments are processed within 48 hours after your session." }
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-900 hover:text-orange-600"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="ml-4">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-gray-600 overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-8 font-manrope">
      <h1 className="text-4xl font-bold text-orange-600 mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">For Clients</h2>
        <div className="space-y-4">
          {clientFAQs.map((f, i) => <FAQItem key={`c-${i}`} q={f.q} a={f.a} />)}
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">For Mentors</h2>
        <div className="space-y-4">
          {mentorFAQs.map((f, i) => <FAQItem key={`m-${i}`} q={f.q} a={f.a} />)}
        </div>
      </section>
    </div>
  );
}
