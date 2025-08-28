// src/pages/HowItWorksProgramsVsProjects.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CreditCardIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
  PencilSquareIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/* DATA CONSTANTS                                                             */
/* -------------------------------------------------------------------------- */

const SUB_NAV = [
  { href: "#overview", label: "Overview" },
  { href: "#glance", label: "At a Glance" },
  { href: "#clients", label: "For Clients" },
  { href: "#mentors", label: "For Mentors" },
  { href: "#compare", label: "Compare" },
  { href: "#examples", label: "Examples" },
  { href: "#faq", label: "FAQ" },
  { href: "#cta", label: "Get Started" },
];

const QUICK_COMPARE = [
  { name: "Where it appears", programs: "Mentor profile + shareable link (public checkout page).", projects: "Private proposal shared in chat; shows in both dashboards." },
  { name: "Scope", programs: "Pre-defined package (fixed inclusions).", projects: "Custom scope (milestones, tasks, links)." },
  { name: "Pricing / checkout", programs: "Instant checkout (one-time, milestone, or monthly).", projects: "Accept & pay from a plan card the mentor sends." },
  { name: "Best for", programs: "Common needs you repeat often.", projects: "Unique goals, complex work, or bespoke coaching." },
  { name: "Time to start", programs: "Fast — buy now.", projects: "Short chat → tailored plan → pay." },
];

/* -------------------------------------------------------------------------- */
/* HELPER & UI COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    {eyebrow && <motion.div {...fadeUp(0)} className="text-xs tracking-widest uppercase font-semibold text-orange-600/90">{eyebrow}</motion.div>}
    {title && <motion.h2 {...fadeUp(0.05)} className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">{title}</motion.h2>}
    {subtitle && <motion.p {...fadeUp(0.1)} className="mt-3 text-base md:text-lg text-slate-600 max-w-3xl">{subtitle}</motion.p>}
    <div className="mt-8">{children}</div>
  </section>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const Pill = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 backdrop-blur px-3 py-1 text-sm text-slate-700 shadow-sm">
    {Icon && <Icon className="h-4 w-4 text-orange-600" />} {children}
  </span>
);

const Check = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">✓</span>
);

/* -------------------------------------------------------------------------- */
/* MEMOIZED SECTION COMPONENTS                                                */
/* -------------------------------------------------------------------------- */

const StickySubNav = React.memo(() => (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 py-3 overflow-x-auto">
                {SUB_NAV.map((l, i) => (
                    <React.Fragment key={l.href}>
                        <a href={l.href} className="text-sm font-semibold text-slate-800 hover:text-orange-600 whitespace-nowrap">{l.label}</a>
                        {i < SUB_NAV.length - 1 && <span className="text-slate-300">•</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
));

const HeroSection = React.memo(() => (
    <Section id="overview" eyebrow="How It Works" title="Programs vs. Projects" subtitle="Two complementary ways to work on MentorWise. Programs are ready-to-buy packages on a mentor’s profile. Projects are bespoke plans your mentor crafts for your specific goal.">
        <motion.div {...fadeUp(0.15)}>
            <GlassCard className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3"><Squares2X2Icon className="h-6 w-6 text-orange-600" /><h3 className="text-xl font-bold text-slate-900">Programs</h3></div>
                        <p className="text-slate-700">Curated, repeatable offerings with a clear price and what’s included. Great for common needs where you want to get started quickly.</p>
                        <div className="mt-3 flex flex-wrap gap-2"><Pill icon={CreditCardIcon}>Instant checkout</Pill><Pill icon={LinkIcon}>Public link</Pill><Pill icon={ShieldCheckIcon}>Stripe Protection</Pill></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-3"><PencilSquareIcon className="h-6 w-6 text-orange-600" /><h3 className="text-xl font-bold text-slate-900">Projects</h3></div>
                        <p className="text-slate-700">A tailor-made plan: milestones, tasks, budget, timing, and links. Ideal when your goal needs a custom approach or collaboration.</p>
                        <div className="mt-3 flex flex-wrap gap-2"><Pill icon={ChatBubbleLeftRightIcon}>Discuss in chat</Pill><Pill icon={ClipboardDocumentCheckIcon}>Plan card</Pill><Pill icon={CalendarDaysIcon}>Scheduling built-in</Pill></div>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    </Section>
));

const GlanceSection = React.memo(() => (
    <Section id="glance" eyebrow="At a Glance" title="See the difference in one view" subtitle="Both paths use the same secure payments and scheduling. Choose what fits your situation.">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)}>
                <GlassCard className="p-6 h-full">
                    <div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-slate-900">Programs (for Clients)</h3><Pill icon={BoltIcon}>Fastest</Pill></div>
                    <ul className="space-y-2 text-slate-700 text-sm">
                        <li className="flex items-start gap-2"><Check /> Browse on a mentor’s profile and buy immediately.</li>
                        <li className="flex items-start gap-2"><Check /> Fixed inclusions and price hint; mentor sets the plan on their side.</li>
                        <li className="flex items-start gap-2"><Check /> Great when your need matches a pre-made package.</li>
                    </ul>
                </GlassCard>
            </motion.div>
            <motion.div {...fadeUp(0.05)}>
                <GlassCard className="p-6 h-full">
                    <div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-slate-900">Projects (for Clients)</h3><Pill icon={SparklesIcon}>Tailored</Pill></div>
                    <ul className="space-y-2 text-slate-700 text-sm">
                        <li className="flex items-start gap-2"><Check /> Start with a free chat, explain your goal and constraints.</li>
                        <li className="flex items-start gap-2"><Check /> Mentor sends a plan card with milestones, budget, and dates.</li>
                        <li className="flex items-start gap-2"><Check /> Accept & pay inside the conversation; schedule instantly.</li>
                    </ul>
                </GlassCard>
            </motion.div>
        </div>
    </Section>
));

const ForClientsSection = React.memo(() => (
    <Section id="clients" eyebrow="For Clients" title="Pick the path that matches your goal" subtitle="Both give you structure, accountability, and secure checkout.">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)}>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-3"><Squares2X2Icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">When to choose Programs</h3></div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> You see a package that fits (e.g., “Career Reset Sprint”).</li>
                        <li className="flex items-start gap-2"><Check /> You want to start quickly without back-and-forth.</li>
                        <li className="flex items-start gap-2"><Check /> You prefer a clearly defined scope and price up front.</li>
                    </ul>
                </GlassCard>
            </motion.div>
            <motion.div {...fadeUp(0.05)}>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-3"><PencilSquareIcon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">When to choose Projects</h3></div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> Your situation is unique or multi-step (custom milestones).</li>
                        <li className="flex items-start gap-2"><Check /> You want to collaborate on scope, timing, and budget.</li>
                        <li className="flex items-start gap-2"><Check /> You may need links, repos, or shared docs inside the plan.</li>
                    </ul>
                </GlassCard>
            </motion.div>
        </div>
    </Section>
));

const ForMentorsSection = React.memo(() => (
    <Section id="mentors" eyebrow="For Mentors" title="When mentors use each" subtitle="Offer both and link them from your profile to capture different kinds of demand.">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)}>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-3"><Squares2X2Icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">Programs (mentor view)</h3></div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> Productize your common engagements (clear blurb, duration, level).</li>
                        <li className="flex items-start gap-2"><Check /> Share the public program link in chat or socials.</li>
                        <li className="flex items-start gap-2"><Check /> Manage and edit programs in your dashboard.</li>
                    </ul>
                </GlassCard>
            </motion.div>
            <motion.div {...fadeUp(0.05)}>
                <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-3"><PencilSquareIcon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">Projects (mentor view)</h3></div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> Compose a custom plan card from the Projects area.</li>
                        <li className="flex items-start gap-2"><Check /> Use milestones/tasks to set expectations and track work.</li>
                        <li className="flex items-start gap-2"><Check /> Send the plan in chat → client accepts → auto-schedule.</li>
                    </ul>
                </GlassCard>
            </motion.div>
        </div>
    </Section>
));

const CompareSection = React.memo(() => (
    <Section id="compare" eyebrow="Compare" title="Key differences">
        <div className="grid md:grid-cols-2 gap-6">
            {QUICK_COMPARE.map((row, i) => (
                <motion.div key={row.name} {...fadeUp(i * 0.04)}>
                    <GlassCard className="p-6">
                        <div className="text-sm font-semibold text-slate-900 mb-2">{row.name}</div>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div><div className="font-bold text-slate-800 mb-1">Programs</div><p className="text-slate-700">{row.programs}</p></div>
                            <div><div className="font-bold text-slate-800 mb-1">Projects</div><p className="text-slate-700">{row.projects}</p></div>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    </Section>
));

const ExamplesSection = React.memo(() => (
    <Section id="examples" eyebrow="Examples" title="Concrete examples" subtitle="Here’s how clients typically engage.">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)}>
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><Squares2X2Icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">Programs</h3></div>
                        <Pill icon={CreditCardIcon}>Buy now</Pill>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> “Career Reset Sprint — 4 weeks”</li>
                        <li className="flex items-start gap-2"><Check /> “Startup Launch Milestones — Pay per milestone”</li>
                        <li className="flex items-start gap-2"><Check /> “Monthly Product Coaching — Retainer”</li>
                    </ul>
                </GlassCard>
            </motion.div>
            <motion.div {...fadeUp(0.05)}>
                <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><PencilSquareIcon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">Projects</h3></div>
                        <Pill icon={ClipboardDocumentCheckIcon}>Plan card</Pill>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2"><Check /> “Beginner Guitar — Month 1: chords, strumming, 4 songs”</li>
                        <li className="flex items-start gap-2"><Check /> “Portfolio Website — 3 milestones + SEO setup”</li>
                        <li className="flex items-start gap-2"><Check /> “PM Interview Prep — 6 sessions + homework + review”</li>
                    </ul>
                </GlassCard>
            </motion.div>
        </div>
    </Section>
));

const FaqSection = React.memo(() => (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered">
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0)}>
                <GlassCard className="p-6">
                    <div className="font-semibold text-slate-900 mb-2">Can I upgrade from a Program to a Project?</div>
                    <p className="text-sm text-slate-700">Yes. Start with a Program to get momentum, then ask your mentor to craft a Project plan if you need a deeper or longer engagement.</p>
                </GlassCard>
            </motion.div>
            <motion.div {...fadeUp(0.05)}>
                <GlassCard className="p-6">
                    <div className="font-semibold text-slate-900 mb-2">Are payments protected?</div>
                    <p className="text-sm text-slate-700">All checkouts run through Stripe with clear deliverables. Milestones and retainers make expectations transparent for both clients and mentors.</p>
                </GlassCard>
            </motion.div>
        </div>
    </Section>
));

const CtaSection = React.memo(() => (
    <Section id="cta" eyebrow="Get started" title="Pick a mentor and choose your path">
        <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-3">
            <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow hover:bg-orange-600"><RocketLaunchIcon className="h-5 w-5" /> Find a Mentor</Link>
            <Link to="/realtalk" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">Ask the Community</Link>
        </motion.div>
    </Section>
));


/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function HowItWorksProgramsVsProjects() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(150deg,theme(colors.orange.50),theme(colors.blue.50)_40%,theme(colors.orange.50)_80%)] font-manrope">
      <Helmet>
        <title>Programs vs. Projects — How It Works | MentorWise</title>
        <meta name="description" content="Understand the difference between Programs and Projects on MentorWise—for clients and mentors. See where each shows up, how checkout works, and when to use which." />
      </Helmet>

      <StickySubNav />

      <main>
        <HeroSection />
        <GlanceSection />
        <ForClientsSection />
        <ForMentorsSection />
        <CompareSection />
        <ExamplesSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  );
}
