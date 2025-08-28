import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AcademicCapIcon, ArrowPathIcon, ArrowRightIcon, BoltIcon, CalendarDaysIcon, ChartBarIcon,
  ChatBubbleLeftRightIcon, ClockIcon, CreditCardIcon, FlagIcon, PlayCircleIcon, RocketLaunchIcon,
  ShieldCheckIcon, SparklesIcon, StarIcon, UserGroupIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/* DATA CONSTANTS                                                             */
/* -------------------------------------------------------------------------- */

const SUB_NAV_LINKS = [
  { href: "#overview", label: "Overview" }, { href: "#paths", label: "Coaching Paths" },
  { href: "#flow", label: "From Chat → Plan" }, { href: "#compare", label: "Compare" },
  { href: "#ui", label: "What You Get" }, { href: "#faq", label: "FAQ" }, { href: "#cta", label: "Get Started" },
];

const COACHING_PATHS = [
  { icon: FlagIcon, title: "Goal-Based Coaching", description: "Commit to a clear outcome with milestones and weekly check-ins.", features: ["Example: Play 3 full songs in 4 weeks.", "Weekly milestones + homework + feedback.", "Pay once or per-milestone."] },
  { icon: ArrowPathIcon, title: "Retainer Coaching", description: "Ongoing support with a monthly package—perfect for accountability.", features: ["4 calls / month + priority chat Q&A.", "Pause, resume, or upgrade anytime.", "Optional rollover of unused time."] },
  { icon: AcademicCapIcon, title: "Learning-Based Coaching", description: "Skill-first with a flexible pace. Mix live sessions with resources.", features: ["Curriculum + live practice sessions.", "Add sessions when you need them.", "Bundle with courses/templates."] },
];

const WORKFLOW_STEPS = [
  { icon: ChatBubbleLeftRightIcon, title: "Start Free Chat", body: "Explain your goal and availability. Share links, clips, or context.", pill: "No commitment" },
  { icon: FlagIcon, title: "Get a Plan Card", body: "Your mentor composes a clear plan with scope, schedule options, and price.", pill: "Tailored" },
  { icon: CreditCardIcon, title: "Secure Checkout", body: "Stripe-powered payments. Split pay or milestone options where offered.", pill: "Protected" },
  { icon: CalendarDaysIcon, title: "Instant Scheduling", body: "Auto-sync sessions to calendars. Reschedule rules are transparent.", pill: "Flexible" },
  { icon: ChartBarIcon, title: "Track Progress", body: "Session notes, homework, and a visual progress bar keep you accountable.", pill: "Motivating" },
];

const PATH_COMPARISONS = [
  { name: "Goal-Based", points: ["Clear milestones & timelines", "One-time or milestone payments", "Great for deadlines and launches"], badge: "Great for outcomes" },
  { name: "Retainer", points: ["Monthly package (e.g., 4 calls + Q&A)", "Priority access and continuity", "Pause / resume any month"], badge: "Great for accountability" },
  { name: "Learning-Based", points: ["Curriculum + live practice", "Flexible pace and add-on sessions", "Perfect for skills & creativity"], badge: "Great for mastery" },
];

const UI_FEATURES = [
  { icon: BoltIcon, title: "Fiverr-style Inbox", body: "Left column of conversations, right panel for chat + plan cards, with reactions and file drops." },
  { icon: PlayCircleIcon, title: "Zoom-ready Sessions", body: "Checkout → auto-create Zoom links → calendar sync → session notes." },
  { icon: StarIcon, title: "Trust Signals", body: "Verified badges, response time, session counts, and reviews to build confidence." },
  { icon: UserGroupIcon, title: "RealTalk Community", body: "Topic-based discussions that feed discovery and warm leads for mentors." },
  { icon: ClockIcon, title: "Smart Scheduling", body: "Offer recurring slots (Mon/Thu 5–6pm) or fixed dates; reschedule rules are clear." },
  { icon: CreditCardIcon, title: "Flexible Payments", body: "One-time, milestone, or monthly retainers. Protected by Stripe." },
];

const SOCIAL_PROOF_STATS = [
  { n: "4.9/5", l: "Avg. coach rating" }, { n: "12k+", l: "Sessions booked" }, { n: "60+", l: "Topics & categories" },
];

const FAQ_ITEMS = [
  { q: "What if I don’t hit my goal?", a: "Coaching is effort-based. Your plan includes milestones, homework, and feedback. If you fall behind, you can extend or convert to a retainer at a reduced rate." },
  { q: "Can I reschedule sessions?", a: "Yes—each offer clearly lists reschedule rules (e.g., 24-hour notice, 2 make-ups per plan). Retainers can carry over unused time at mentor discretion." },
  { q: "Do you take a cut?", a: "We charge a small platform fee that’s shown at checkout. Mentors keep the majority using secure Stripe payouts." },
  { q: "Can mentors sell courses or resources?", a: "Yes—mentors can bundle sessions with courses, templates, or recordings for hybrid learning." },
];

/* -------------------------------------------------------------------------- */
/* HELPER & UI COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6, ease: "easeOut", delay },
});

const Section = ({ id, eyebrow, title, subtitle, children, className = "" }) => (
  <section id={id} className={`scroll-mt-20 md:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-16 pb-12 md:pb-16 ${className}`}>
    {eyebrow && <motion.div {...fadeUp(0)} className="text-xs tracking-widest uppercase font-semibold text-orange-600/90">{eyebrow}</motion.div>}
    {title && <motion.h2 {...fadeUp(0.05)} className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">{title}</motion.h2>}
    {subtitle && <motion.p {...fadeUp(0.1)} className="mt-3 text-base md:text-lg text-slate-600 max-w-3xl">{subtitle}</motion.p>}
    <div className="mt-8">{children}</div>
  </section>
);

const Pill = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 backdrop-blur-md px-3 py-1 text-sm text-slate-700 shadow-sm">
    {Icon && <Icon className="h-4 w-4 text-orange-600" />} {children}
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl ${className}`}>{children}</div>
);

const Check = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">✓</span>
);

/* -------------------------------------------------------------------------- */
/* MEMOIZED SECTION COMPONENTS                                                */
/* -------------------------------------------------------------------------- */

const StickySubNav = React.memo(({ links }) => (
  <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 py-3 overflow-x-auto">
        {links.map((link, i) => (
          <React.Fragment key={link.href}>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600 whitespace-nowrap" href={link.href}>{link.label}</a>
            {i < links.length - 1 && <span className="text-slate-300">•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
));

const HeroSection = React.memo(() => (
  <Section id="overview" className="pt-0 md:pt-8" eyebrow="MentorWise" title="Tell us your goal. Get a custom plan from a real coach." subtitle="We blend the warmth of mentorship with the power of a marketplace. Chat free → receive a polished plan → pay securely → book instantly → track progress.">
    <motion.div {...fadeUp(0.15)}>
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill icon={RocketLaunchIcon}>Fast onboarding</Pill> <Pill icon={ShieldCheckIcon}>Vetted mentors</Pill>
              <Pill icon={CreditCardIcon}>Secure payments</Pill> <Pill icon={CalendarDaysIcon}>Instant scheduling</Pill>
            </div>
            <p className="text-slate-700 leading-relaxed">
              MentorWise is built for real growth: whether you're switching careers, learning guitar, launching a side hustle, or leveling up in fitness. Choose how you want to work—Goal-based, Retainer, or Learning-based—then collaborate in a modern, animated UI that feels as smooth as your favorite apps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white font-semibold shadow hover:bg-orange-600">
                Find a Coach <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/realtalk" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
                Ask the Community
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[420px]">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-orange-200 via-orange-100 to-blue-100 blur-xl opacity-70" />
              <GlassCard className="relative p-4 md:p-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="col-span-2 font-semibold text-slate-800 flex items-center gap-2"><SparklesIcon className="h-5 w-5 text-orange-600" /> Live demo of a Plan Card</div>
                  <div className="bg-white/70 rounded-xl p-3 border border-slate-200"><div className="text-xs text-slate-500">Type</div><div className="font-semibold">Goal-Based</div></div>
                  <div className="bg-white/70 rounded-xl p-3 border border-slate-200"><div className="text-xs text-slate-500">Price</div><div className="font-semibold">$199</div></div>
                  <div className="bg-white/70 rounded-xl p-3 border border-slate-200"><div className="text-xs text-slate-500">Sessions</div><div className="font-semibold">4 × 60 min</div></div>
                  <div className="bg-white/70 rounded-xl p-3 border border-slate-200"><div className="text-xs text-slate-500">Schedule</div><div className="font-semibold">Mon & Thu, 5–6pm</div></div>
                  <div className="col-span-2 flex flex-wrap items-center gap-2 text-xs text-slate-600"><Check /> Homework & feedback • <Check /> Progress tracking • <Check /> Session notes</div>
                  <div className="col-span-2"><button className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5">Accept & Pay</button></div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  </Section>
));

const CoachingPathsSection = React.memo(({ paths }) => (
  <Section id="paths" eyebrow="Paths" title="Three ways to work—pick your style" subtitle="These are built for flexibility and fairness. No unrealistic guarantees—just transparent plans and real accountability.">
    <div className="grid md:grid-cols-3 gap-6">
      {paths.map((path, i) => (
        <motion.div key={path.title} {...fadeUp(i * 0.05)}>
          <GlassCard className="h-full p-6">
            <div className="flex items-center gap-3 mb-3"><path.icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">{path.title}</h3></div>
            <p className="text-slate-600 mb-4">{path.description}</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {path.features.map((feature) => (<li key={feature} className="flex items-start gap-2"><Check /> {feature}</li>))}
            </ul>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const WorkflowSection = React.memo(({ steps }) => (
  <Section id="flow" eyebrow="Flow" title="From chat to growth in minutes" subtitle="A modern, frictionless path that feels as simple as texting—but with pro-grade structure behind the scenes.">
    <div className="grid md:grid-cols-5 gap-4">
      {steps.map((step, i) => (
        <motion.div key={step.title} {...fadeUp(i * 0.05)}>
          <GlassCard className="h-full p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><step.icon className="h-5 w-5 text-orange-600" /><h3 className="font-semibold text-slate-900">{step.title}</h3></div>
              <Pill>{step.pill}</Pill>
            </div>
            <p className="text-sm text-slate-600">{step.body}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
    <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
      <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow hover:bg-slate-800">
        Match with a Coach <ArrowRightIcon className="h-5 w-5" />
      </Link>
      <a href="#paths" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
        Explore paths
      </a>
    </motion.div>
  </Section>
));

const ComparisonSection = React.memo(({ comparisons }) => (
  <Section id="compare" eyebrow="Compare" title="Which path fits you best?">
    <div className="grid md:grid-cols-3 gap-6">
      {comparisons.map((col, i) => (
        <motion.div key={col.name} {...fadeUp(i * 0.05)}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-slate-900">{col.name}</h3><Pill>{col.badge}</Pill></div>
            <ul className="space-y-2 text-sm text-slate-700">
              {col.points.map((p) => (<li key={p} className="flex items-start gap-2"><Check /> {p}</li>))}
            </ul>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const FeaturesSection = React.memo(({ features }) => (
  <Section id="ui" eyebrow="Product" title="Polished, modern, and human-first" subtitle="Everything is designed to reduce friction and keep you focused on growth.">
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div key={feature.title} {...fadeUp(i * 0.04)}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center gap-3 mb-3"><feature.icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">{feature.title}</h3></div>
            <p className="text-slate-600 text-sm">{feature.body}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const SocialProofSection = React.memo(({ stats }) => (
  <Section id="proof" eyebrow="Trusted by learners & builders" title="A place where progress feels natural">
    <motion.div {...fadeUp(0)}>
      <GlassCard className="p-6 md:p-8">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.l} className="space-y-1">
              <div className="text-3xl font-extrabold text-slate-900">{stat.n}</div>
              <div className="text-slate-600">{stat.l}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  </Section>
));

const FaqSection = React.memo(({ items }) => (
  <Section id="faq" eyebrow="FAQ" title="Questions, answered">
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, i) => (
        <motion.div key={item.q} {...fadeUp(i * 0.05)}>
          <GlassCard className="p-6">
            <div className="font-semibold text-slate-900 mb-2">{item.q}</div>
            <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const CtaSection = React.memo(() => (
  <Section id="cta" eyebrow="Get started" title="Ready to see your plan?">
    <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-3">
      <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow hover:bg-orange-600">
        Start Free Chat <ArrowRightIcon className="h-5 w-5" />
      </Link>
      <Link to="/realtalk" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
        Ask the Community
      </Link>
    </motion.div>
  </Section>
));

const ImagePairSection = React.memo(() => (
  <section aria-label="MentorWise imagery" className="w-full px-10 md:px-10 pb-10">
    <motion.div {...fadeUp(0.05)} className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
      <img src="/chair-guy.jpg" alt="Client smiling in a studio after making progress with a mentor" loading="lazy" decoding="async" className="w-full h-[520px] md:h-[560px] object-cover rounded-2xl" />
      <img src="/drummer-pic.jpg" alt="Musician practicing drums as part of a coaching plan" loading="lazy" decoding="async" className="w-full h-[520px] md:h-[560px] object-cover rounded-2xl" style={{ objectPosition: "top center" }} />
    </motion.div>
  </section>
));

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function HowItWorksContent() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,theme(colors.orange.50)_10%,theme(colors.blue.50)_40%,theme(colors.orange.50)_70%)] font-manrope">
      <Helmet>
        <title>How It Works — MentorWise</title>
        <meta name="description" content="Goal-based, Retainer, and Learning-based coaching. Chat for free, get a polished plan, pay securely, schedule instantly, and track progress—MentorWise." />
        <meta property="og:title" content="How It Works — MentorWise" />
        <meta property="og:description" content="Chat free → Plan card → Secure checkout → Instant scheduling → Progress tracking." />
      </Helmet>

      <StickySubNav links={SUB_NAV_LINKS} />

      <main>
        <HeroSection />
        <CoachingPathsSection paths={COACHING_PATHS} />
        <WorkflowSection steps={WORKFLOW_STEPS} />
        <ComparisonSection comparisons={PATH_COMPARISONS} />
        <FeaturesSection features={UI_FEATURES} />
        <SocialProofSection stats={SOCIAL_PROOF_STATS} />
        <FaqSection items={FAQ_ITEMS} />
        <CtaSection />
        <ImagePairSection />
      </main>
    </div>
  );
}