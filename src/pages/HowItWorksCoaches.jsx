import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AcademicCapIcon, ArrowPathIcon, ArrowRightIcon, ArrowTrendingUpIcon, BanknotesIcon, BoltIcon,
  CalendarDaysIcon, ChartBarIcon, ChatBubbleLeftRightIcon, ClockIcon, CreditCardIcon, FlagIcon,
  PlayCircleIcon, RocketLaunchIcon, ShieldCheckIcon, SparklesIcon, StarIcon, UserGroupIcon
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/* DATA CONSTANTS                                                             */
/* -------------------------------------------------------------------------- */

const SUB_NAV_LINKS = [
  { href: "#overview", label: "Overview" }, { href: "#earn", label: "Ways to Earn" },
  { href: "#flow", label: "Sales Flow" }, { href: "#fees", label: "Fees & Payouts" },
  { href: "#tools", label: "Tools" }, { href: "#faq", label: "FAQ" }, { href: "#cta", label: "Apply" },
];

const HERO_STATS = [
  { n: "12%", l: "Platform fee" }, { n: "4.9/5", l: "Avg. rating" }, { n: "68%", l: "Repeat rate" },
];

const EARNING_METHODS = [
  { icon: FlagIcon, title: "Goal-Based Plans", points: ["Outcome + milestones (no unrealistic guarantees)", "Weekly check-ins and homework", "Charge once or per-milestone"] },
  { icon: ArrowPathIcon, title: "Monthly Retainers", points: ["e.g., 4 calls/mo + priority DM", "Stable recurring revenue", "Rollover rules optional"] },
  { icon: ClockIcon, title: "Time-Based Packages", points: ["You sell time, not promises", "30/45/60 min sessions", "Use-by date & reschedule rules"] },
  { icon: AcademicCapIcon, title: "Courses & Templates", points: ["Sell digital products alongside coaching", "Licensing options (personal/commercial)", "Great for upsells after sessions"] },
  { icon: PlayCircleIcon, title: "Bundles", points: ["Live calls + course + PDFs", "Proven for skills like fitness or music", "Higher perceived value"] },
  { icon: CreditCardIcon, title: "One-Time Gigs", points: ["Resume audit, workout plan, channel review", "Set delivery time & revisions", "Familiar ‘Fiverr-style’ option"] },
  { icon: BanknotesIcon, title: "Token Packs", points: ["Prepaid credits (e.g., 5×30-min)", "Redeem anytime within 6 months", "Perfect for on-demand support"] },
];

const SALES_FLOW_STEPS = [
  { icon: ChatBubbleLeftRightIcon, title: "Warm Chat", body: "Qualify the client, ask for context, and share examples.", pill: "No pressure" },
  { icon: RocketLaunchIcon, title: "Plan Card", body: "Compose a clear plan with scope, schedule windows, and price.", pill: "Polished" },
  { icon: CreditCardIcon, title: "Checkout", body: "Stripe-powered. One-time, milestones, or monthly.", pill: "Protected" },
  { icon: CalendarDaysIcon, title: "Auto-Schedule", body: "Instant calendar sync. Clear reschedule rules.", pill: "Instant" },
  { icon: ChartBarIcon, title: "Track & Upsell", body: "Session notes, homework, and smart upsells to bundles/products.", pill: "Sticky" },
];

const FEES_FEATURES = [
  { icon: BoltIcon, label: "Fast setup" }, { icon: ChatBubbleLeftRightIcon, label: "DM → Plan" },
  { icon: CalendarDaysIcon, label: "Auto scheduling" }, { icon: CreditCardIcon, label: "Secure payouts" },
];

const COACH_TOOLS = [
  { icon: StarIcon, title: "Trust & Reviews", body: "Verified badges, response time, and session counts help you stand out." },
  { icon: UserGroupIcon, title: "RealTalk Community", body: "Share advice, run AMAs, and turn helpful posts into warm leads." },
  { icon: PlayCircleIcon, title: "Zoom-ready Sessions", body: "Checkout auto-creates links and syncs to calendars. Notes after each call." },
  { icon: ArrowTrendingUpIcon, title: "Upsells & Bundles", body: "Offer product add-ons and turn custom plans into public listings." },
  { icon: ClockIcon, title: "Smart Availability", body: "Offer recurring windows or ad-hoc slots. Clear reschedule rules." },
  { icon: CreditCardIcon, title: "Flexible Payments", body: "One-time, milestone, or monthly retainers. Stripe protection built-in." },
];

const FAQ_ITEMS = [
  { q: "What can I sell here?", a: "Live coaching (time-based, retainers, goals), one-time gigs, token packs, and digital products like courses, templates, or recordings. Bundles are encouraged." },
  { q: "Do you guarantee outcomes?", a: "No. Coaching is best-effort. Plans use milestones and accountability, but results depend on client participation and practice." },
  { q: "How do payouts work?", a: "Stripe powers checkout and payouts. Most bank accounts are supported. You’ll see net earnings after fees in your dashboard." },
  { q: "What about scheduling and reschedules?", a: "You control availability windows, buffers, and reschedule rules. Clients see the policy before paying." },
];

/* -------------------------------------------------------------------------- */
/* HELPER & UI COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6, ease: "easeOut", delay },
});

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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

const HeroSection = React.memo(({ stats }) => (
  <Section
    id="overview"
    eyebrow="For Coaches & Creators"
    title="Make more. Stress less. Keep up to 88%."
    subtitle="MentorWise helps you package your expertise, close sales from chat, and get paid fast. Flexible offer types, polished plan cards, instant scheduling, and Stripe-powered payouts — all with low platform fees."
  >
    <motion.div {...fadeUp(0.15)}>
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill icon={BanknotesIcon}>Low 12% fee</Pill>
              <Pill icon={CalendarDaysIcon}>Instant scheduling</Pill>
              <Pill icon={ShieldCheckIcon}>Verified trust signals</Pill>
              <Pill icon={CreditCardIcon}>Stripe payouts</Pill>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Sell coaching your way: one-time gigs, time-based packages, goal-based plans, monthly retainers, or hybrid bundles with courses and templates. Close warm leads directly from chat — then auto-schedule, track progress, and grow repeat business.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white font-semibold shadow hover:bg-orange-600">
                Become a Coach <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/how-it-works/clients" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
                See client experience
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[420px]">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-orange-200 via-orange-100 to-blue-100 blur-xl opacity-70" />
              <GlassCard className="relative p-4 md:p-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {stats.map((s) => (
                    <div key={s.l} className="space-y-1">
                      <div className="text-2xl font-extrabold text-slate-900">{s.n}</div>
                      <div className="text-slate-600 text-xs">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <Pill icon={ArrowTrendingUpIcon}>Recurring revenue</Pill>
                  <Pill icon={SparklesIcon}>Polished plan cards</Pill>
                </div>
              </GlassCard>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Metrics are illustrative; results vary by niche, pricing, and response time.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  </Section>
));

const EarningMethodsSection = React.memo(({ methods }) => (
  <Section
    id="earn"
    eyebrow="Monetization"
    title="Seven flexible ways to earn"
    subtitle="Pick one or stack them. Everything plays nicely with chat, scheduling, and payouts."
  >
    <div className="grid md:grid-cols-3 gap-6">
      {methods.map((card, i) => (
        <motion.div key={card.title} {...fadeUp(0.05 * i)}>
          <GlassCard className="h-full p-6">
            <div className="flex items-center gap-3 mb-3">
              <card.icon className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {card.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check /> {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const SalesFlowSection = React.memo(({ steps }) => (
  <Section
    id="flow"
    eyebrow="Flow"
    title="From DM to paid plan in minutes"
    subtitle="A frictionless path that feels like texting — with pro-grade scaffolding."
  >
    <div className="grid md:grid-cols-5 gap-4">
      {steps.map((s, i) => (
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
    <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
      <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow hover:bg-slate-800">
        Apply to Coach <ArrowRightIcon className="h-5 w-5" />
      </Link>
      <Link to="/how-it-works/clients#paths" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
        See client paths
      </Link>
    </motion.div>
  </Section>
));

const FeesAndPayoutsSection = React.memo(({ features }) => (
  <Section
    id="fees"
    eyebrow="Transparent"
    title="Lower fees, clearer math"
    subtitle="Keep up to 88% with our simple 12% platform fee. Many marketplaces charge ~20%+."
  >
    <GlassCard className="p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">What you keep</h3>
          <p className="text-slate-700 mt-2">
            Example: $300 package → 12% fee = $36. Payment processing (~2.9% + $0.30) ≈ $9.00. Net to you ≈ <b>$255</b>.
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Exact processor fees vary by region and card type. Fees are shown at checkout and in your earnings view.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Pill icon={BanknotesIcon}>Clear earnings</Pill>
            <Pill icon={ShieldCheckIcon}>Stripe protection</Pill>
            <Pill icon={ArrowTrendingUpIcon}>Recurring ready</Pill>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            {features.map((x) => (
              <div key={x.label} className="rounded-xl border border-slate-200 bg-white/70 p-4 flex items-center gap-3">
                <x.icon className="w-5 h-5 text-orange-600" />
                <div className="font-semibold text-slate-900 text-sm">{x.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white/70 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Client experience</span>
              <Link to="/how-it-works/clients" className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:text-orange-600">
                Preview <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-2 text-xs text-slate-500">See exactly how clients chat, accept plans, and book you.</div>
          </div>
        </div>
      </div>
    </GlassCard>
  </Section>
));

const ToolsSection = React.memo(({ tools }) => (
  <Section
    id="tools"
    eyebrow="Product"
    title="All the tools you need to grow"
    subtitle="A premium, human-first UI that keeps you booked and rebooked."
  >
    <div className="grid md:grid-cols-3 gap-6">
      {tools.map((f, i) => (
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
));

const FaqSection = React.memo(({ items }) => (
  <Section id="faq" eyebrow="FAQ" title="Coaching on MentorWise, explained">
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((f, i) => (
        <motion.div key={f.q} {...fadeUp(0.05 * i)}>
          <GlassCard className="p-6">
            <div className="font-semibold text-slate-900 mb-2">{f.q}</div>
            <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const CtaSection = React.memo(() => (
  <Section id="cta" eyebrow="Apply" title="Ready to start coaching?">
    <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-3">
      <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow hover:bg-orange-600">
        Become a Coach <ArrowRightIcon className="h-5 w-5" />
      </Link>
      <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
        Explore top coaches
      </Link>
    </motion.div>
  </Section>
));

const TeacherImageSection = React.memo(() => (
  <section aria-label="MentorWise coach imagery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <motion.div {...fadeUp(0.05)}>
      <img
        src="/teacher-photo.jpg"
        alt="Coach teaching and guiding students as part of a MentorWise plan"
        loading="lazy"
        decoding="async"
        className="w-full h-[480px] md:h-[560px] object-cover rounded-2xl"
        style={{ objectPosition: "center top" }}
      />
    </motion.div>
  </section>
));

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function HowItWorksCoaches() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,theme(colors.orange.50)_10%,theme(colors.blue.50)_40%,theme(colors.orange.50)_70%)] font-manrope">
      <Helmet>
        <title>How It Works for Coaches — MentorWise</title>
        <meta
          name="description"
          content="Turn your expertise into income with flexible offer types, low 12% fees, instant scheduling, and Stripe-powered payouts. Build recurring revenue with retainers, plans, and digital products."
        />
        <meta property="og:title" content="How It Works for Coaches — MentorWise" />
        <meta property="og:description" content="Package your expertise, close from chat, and get paid fast with low fees." />
      </Helmet>

      <StickySubNav links={SUB_NAV_LINKS} />

      <main>
        <HeroSection stats={HERO_STATS} />
        <EarningMethodsSection methods={EARNING_METHODS} />
        <SalesFlowSection steps={SALES_FLOW_STEPS} />
        <FeesAndPayoutsSection features={FEES_FEATURES} />
        <ToolsSection tools={COACH_TOOLS} />
        <FaqSection items={FAQ_ITEMS} />
        <CtaSection />
        <TeacherImageSection />
      </main>
    </div>
  );
}