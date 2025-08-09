// src/components/HowItWorksContent.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  AcademicCapIcon,
  ClockIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  BoltIcon,
  UserGroupIcon,
  StarIcon,
  ArrowPathIcon, // replaces RepeatIcon
  FlagIcon,      // replaces TargetIcon
} from "@heroicons/react/24/outline";

// ---------- Helpers ----------
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    {eyebrow && (
      <motion.div {...fadeUp(0)} className="text-xs tracking-widest uppercase font-semibold text-orange-600/90">
        {eyebrow}
      </motion.div>
    )}
    {title && (
      <motion.h2 {...fadeUp(0.05)} className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
        {title}
      </motion.h2>
    )}
    {subtitle && (
      <motion.p {...fadeUp(0.1)} className="mt-3 text-base md:text-lg text-slate-600 max-w-3xl">
        {subtitle}
      </motion.p>
    )}
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
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
    ✓
  </span>
);

// ---------- Component (DEFAULT EXPORT) ----------
export default function HowItWorksContent() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-white font-manrope">
      <Helmet>
        <title>How It Works — MentorWise</title>
        <meta
          name="description"
          content="Goal-based, Retainer, and Learning-based coaching. Chat for free, get a polished plan, pay securely, schedule instantly, and track progress—MentorWise."
        />
      </Helmet>

      {/* Sticky Subnav */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto">
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#overview">Overview</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#paths">Coaching Paths</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#flow">From Chat → Plan</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#compare">Compare</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#ui">What You Get</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#faq">FAQ</a>
            <span className="text-slate-300">•</span>
            <a className="text-sm font-semibold text-slate-800 hover:text-orange-600" href="#cta">Get Started</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <Section
        id="overview"
        eyebrow="MentorWise"
        title="Tell us your goal. Get a custom plan from a real coach."
        subtitle="We blend the warmth of mentorship with the power of a marketplace. Chat free → receive a polished plan → pay securely → book instantly → track progress."
      >
        <motion.div {...fadeUp(0.15)}>
          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Pill icon={RocketLaunchIcon}>Fast onboarding</Pill>
                  <Pill icon={ShieldCheckIcon}>Vetted mentors</Pill>
                  <Pill icon={CreditCardIcon}>Secure payments</Pill>
                  <Pill icon={CalendarDaysIcon}>Instant scheduling</Pill>
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
                      <div className="col-span-2 font-semibold text-slate-800 flex items-center gap-2">
                        <SparklesIcon className="h-5 w-5 text-orange-600" /> Live demo of a Plan Card
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 border border-slate-200">
                        <div className="text-xs text-slate-500">Type</div>
                        <div className="font-semibold">Goal-Based</div>
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 border border-slate-200">
                        <div className="text-xs text-slate-500">Price</div>
                        <div className="font-semibold">$199</div>
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 border border-slate-200">
                        <div className="text-xs text-slate-500">Sessions</div>
                        <div className="font-semibold">4 × 60 min</div>
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 border border-slate-200">
                        <div className="text-xs text-slate-500">Schedule</div>
                        <div className="font-semibold">Mon & Thu, 5–6pm</div>
                      </div>
                      <div className="col-span-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <Check /> Homework & feedback • <Check /> Progress tracking • <Check /> Session notes
                      </div>
                      <div className="col-span-2">
                        <button className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5">Accept & Pay</button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* Coaching Paths */}
      <Section
        id="paths"
        eyebrow="Paths"
        title="Three ways to work—pick your style"
        subtitle="These are built for flexibility and fairness. No unrealistic guarantees—just transparent plans and real accountability."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {/* Goal-Based */}
          <motion.div {...fadeUp(0)}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-3 mb-3">
                <FlagIcon className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-bold text-slate-900">Goal-Based Coaching</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Commit to a clear outcome with milestones and weekly check-ins.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><Check /> Example: Play 3 full songs in 4 weeks.</li>
                <li className="flex items-start gap-2"><Check /> Weekly milestones + homework + feedback.</li>
                <li className="flex items-start gap-2"><Check /> Pay once or per-milestone.</li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* Retainer */}
          <motion.div {...fadeUp(0.05)}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-3 mb-3">
                <ArrowPathIcon className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-bold text-slate-900">Retainer Coaching</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Ongoing support with a monthly package—perfect for accountability.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><Check /> 4 calls / month + priority chat Q&amp;A.</li>
                <li className="flex items-start gap-2"><Check /> Pause, resume, or upgrade anytime.</li>
                <li className="flex items-start gap-2"><Check /> Optional rollover of unused time.</li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* Learning-Based */}
          <motion.div {...fadeUp(0.1)}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-3 mb-3">
                <AcademicCapIcon className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-bold text-slate-900">Learning-Based Coaching</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Skill-first with a flexible pace. Mix live sessions with resources.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2"><Check /> Curriculum + live practice sessions.</li>
                <li className="flex items-start gap-2"><Check /> Add sessions when you need them.</li>
                <li className="flex items-start gap-2"><Check /> Bundle with courses/templates.</li>
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      {/* Flow: Chat → Plan → Pay → Schedule → Track */}
      <Section id="flow" eyebrow="Flow" title="From chat to growth in minutes" subtitle="A modern, frictionless path that feels as simple as texting—but with pro-grade structure behind the scenes.">
        <div className="grid md:grid-cols-5 gap-4">
          {[
            {
              icon: ChatBubbleLeftRightIcon,
              title: "Start Free Chat",
              body: "Explain your goal and availability. Share links, clips, or context.",
              pill: "No commitment",
            },
            {
              icon: FlagIcon,
              title: "Get a Plan Card",
              body: "Your mentor composes a clear plan with scope, schedule options, and price.",
              pill: "Tailored",
            },
            {
              icon: CreditCardIcon,
              title: "Secure Checkout",
              body: "Stripe-powered payments. Split pay or milestone options where offered.",
              pill: "Protected",
            },
            {
              icon: CalendarDaysIcon,
              title: "Instant Scheduling",
              body: "Auto-sync sessions to calendars. Reschedule rules are transparent.",
              pill: "Flexible",
            },
            {
              icon: ChartBarIcon,
              title: "Track Progress",
              body: "Session notes, homework, and a visual progress bar keep you accountable.",
              pill: "Motivating",
            },
          ].map((s, i) => (
            <motion.div key={s.title} {...fadeUp(0.05 * i)}>
              <GlassCard className="h-full p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  </div>
                  <Pill>{s.pill}</Pill>
                </div>
                <p className="text-sm text-slate-600">{s.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* micro-cta row */}
        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow hover:bg-slate-800">
            Match with a Coach <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link to="/how-it-works#paths" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
            Explore paths
          </Link>
        </motion.div>
      </Section>

      {/* Comparison grid */}
      <Section id="compare" eyebrow="Compare" title="Which path fits you best?">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Goal-Based",
              points: [
                "Clear milestones & timelines",
                "One-time or milestone payments",
                "Great for deadlines and launches",
              ],
              badge: "Great for outcomes",
            },
            {
              name: "Retainer",
              points: [
                "Monthly package (e.g., 4 calls + Q&A)",
                "Priority access and continuity",
                "Pause / resume any month",
              ],
              badge: "Great for accountability",
            },
            {
              name: "Learning-Based",
              points: [
                "Curriculum + live practice",
                "Flexible pace and add-on sessions",
                "Perfect for skills & creativity",
              ],
              badge: "Great for mastery",
            },
          ].map((col, i) => (
            <motion.div key={col.name} {...fadeUp(0.05 * i)}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{col.name}</h3>
                  <Pill>{col.badge}</Pill>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {col.points.map((p) => (
                    <li key={p} className="flex items-start gap-2"><Check /> {p}</li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What you get (UI features) */}
      <Section
        id="ui"
        eyebrow="Product"
        title="Polished, modern, and human-first"
        subtitle="Everything is designed to reduce friction and keep you focused on growth."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: BoltIcon,
              title: "Fiverr-style Inbox",
              body: "Left column of conversations, right panel for chat + plan cards, with reactions and file drops.",
            },
            {
              icon: PlayCircleIcon,
              title: "Zoom-ready Sessions",
              body: "Checkout → auto-create Zoom links → calendar sync → session notes.",
            },
            {
              icon: StarIcon,
              title: "Trust Signals",
              body: "Verified badges, response time, session counts, and reviews to build confidence.",
            },
            {
              icon: UserGroupIcon,
              title: "RealTalk Community",
              body: "Topic-based discussions that feed discovery and warm leads for mentors.",
            },
            {
              icon: ClockIcon,
              title: "Smart Scheduling",
              body: "Offer recurring slots (Mon/Thu 5–6pm) or fixed dates; reschedule rules are clear.",
            },
            {
              icon: CreditCardIcon,
              title: "Flexible Payments",
              body: "One-time, milestone, or monthly retainers. Protected by Stripe.",
            },
          ].map((f, i) => (
            <motion.div key={f.title} {...fadeUp(0.04 * i)}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <f.icon className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                </div>
                <p className="text-slate-600 text-sm">{f.body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Social proof / mini band */}
      <Section id="proof" eyebrow="Trusted by learners & builders" title="A place where progress feels natural">
        <motion.div {...fadeUp(0)}>
          <GlassCard className="p-6 md:p-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { n: "4.9/5", l: "Avg. coach rating" },
                { n: "12k+", l: "Sessions booked" },
                { n: "60+", l: "Topics & categories" },
              ].map((s) => (
                <div key={s.l} className="space-y-1">
                  <div className="text-3xl font-extrabold text-slate-900">{s.n}</div>
                  <div className="text-slate-600">{s.l}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions, answered">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "What if I don’t hit my goal?",
              a: "Coaching is effort-based. Your plan includes milestones, homework, and feedback. If you fall behind, you can extend or convert to a retainer at a reduced rate.",
            },
            {
              q: "Can I reschedule sessions?",
              a: "Yes—each offer clearly lists reschedule rules (e.g., 24-hour notice, 2 make-ups per plan). Retainers can carry over unused time at mentor discretion.",
            },
            {
              q: "Do you take a cut?",
              a: "We charge a small platform fee that’s shown at checkout. Mentors keep the majority using secure Stripe payouts.",
            },
            {
              q: "Can mentors sell courses or resources?",
              a: "Yes—mentors can bundle sessions with courses, templates, or recordings for hybrid learning.",
            },
          ].map((f, i) => (
            <motion.div key={f.q} {...fadeUp(0.05 * i)}>
              <GlassCard className="p-6">
                <div className="font-semibold text-slate-900 mb-2">{f.q}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
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
    </div>
  );
}
