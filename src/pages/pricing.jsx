// src/pages/Pricing.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BanknotesIcon, CalendarDaysIcon, CreditCardIcon, ShieldCheckIcon, Cog6ToothIcon, ArrowRightIcon,
  CheckBadgeIcon, ClockIcon, Bars3BottomLeftIcon, ChartBarIcon, ChatBubbleLeftRightIcon,
  ArrowPathIcon, GiftTopIcon, InformationCircleIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/* DATA CONSTANTS                                                             */
/* -------------------------------------------------------------------------- */

const MODELS = [
  { key: "pay-in-full", title: "Pay in Full", icon: CreditCardIcon, ideal: "Best for short projects & one-off gigs", bullets: ["Single payment before work begins", "Fastest start; no invoices later", "Refund & reschedule rules shown at checkout"], notes: "Popular for resume reviews, portfolio audits, workout plans, or one-session consults." },
  { key: "milestones", title: "Milestone Schedule", icon: Bars3BottomLeftIcon, ideal: "Best for goal-based plans with clear phases", bullets: ["Split price across milestones", "Release on approval of each phase", "Keeps both sides aligned on scope"], notes: "Great for outcomes like “Launch my portfolio site” or “Pass Data Analyst interview in 8 weeks.”" },
  { key: "retainer", title: "Monthly Retainer", icon: ArrowPathIcon, ideal: "Best for ongoing guidance & accountability", bullets: ["Auto-billing monthly via Stripe", "Includes a defined bundle (e.g., 4 calls + DM)", "Pause/cancel under clear policy"], notes: "Perfect for continuous skills coaching, founders, fitness habit work, and content creation pipelines." },
  { key: "time-pack", title: "Time Pack (Prepaid)", icon: ClockIcon, ideal: "Best for flexible on-demand support", bullets: ["Buy credits (e.g., 5 × 30-min)", "Redeem within a set window (e.g., 6 months)", "Works well for quick help spikes"], notes: "Common for code reviews, vocal check-ins, or ad-hoc career questions." },
];

const FEES = [
  { icon: BanknotesIcon, label: "Platform fee 12%" },
  { icon: CreditCardIcon, label: "Stripe processing (region dependent)" },
  { icon: ShieldCheckIcon, label: "Dispute & escrow-like protections" },
  { icon: CalendarDaysIcon, label: "Scheduling + policy enforcement" },
];

const FLOW = [
  { n: 1, title: "Describe your goal", body: "Client shares context in chat or a short form. Mentors review fit, timing, and scope.", icon: ChatBubbleLeftRightIcon },
  { n: 2, title: "Choose a pricing model", body: "Mentor proposes Pay-in-Full, Milestones, Retainer, or a Time Pack—whichever fits the project.", icon: Cog6ToothIcon },
  { n: 3, title: "Accept a Plan Card", body: "A polished plan summarizes deliverables, schedule windows, and the exact price.", icon: CheckBadgeIcon },
  { n: 4, title: "Checkout securely", body: "Stripe powers payments. Taxes and fees are shown before you pay. Receipts are automatic.", icon: CreditCardIcon },
  { n: 5, title: "Auto-schedule", body: "Booking windows appear instantly. Your reschedule/cancellation rules are applied automatically.", icon: CalendarDaysIcon },
  { n: 6, title: "Track & iterate", body: "After each session: notes, homework, and progress markers. Upgrade to bundles or retainers anytime.", icon: ChartBarIcon },
];

const FAQ = [
  { q: "Who sets the price?", a: "Mentors set list rates and can tailor custom Plan Cards per client. Clients always see the full price and any schedule before paying." },
  { q: "What happens on refunds or reschedules?", a: "Each plan shows clear policies. Requests route through MentorWise so outcomes follow the policy agreed at checkout." },
  { q: "How do retainers renew?", a: "By default monthly on the same day. Mentors define what’s included (e.g., calls + DM). You can pause or cancel per policy." },
  { q: "Do mentors get paid per milestone?", a: "Yes—milestone funds are captured on schedule/approval. Payout timing follows Stripe and your country’s banking rails." },
];

/* -------------------------------------------------------------------------- */
/* HELPER & UI COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut", delay: d },
});

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    {eyebrow && <motion.div {...fadeUp(0)} className="text-xs tracking-widest uppercase font-semibold text-orange-600/90">{eyebrow}</motion.div>}
    {title && <motion.h2 {...fadeUp(0.05)} className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">{title}</motion.h2>}
    {subtitle && <motion.p {...fadeUp(0.1)} className="mt-3 text-base md:text-lg text-slate-600 max-w-3xl">{subtitle}</motion.p>}
    <div className="mt-8">{children}</div>
  </section>
);

const GlassCard = ({ className = "", children }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const Badge = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 backdrop-blur px-3 py-1 text-sm text-slate-700 shadow-sm">
    {Icon && <Icon className="h-4 w-4 text-orange-600" />}
    {children}
  </span>
);

const Check = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">✓</span>
);

/* -------------------------------------------------------------------------- */
/* MEMOIZED SECTION COMPONENTS                                                */
/* -------------------------------------------------------------------------- */

const HeroSection = React.memo(() => (
  <Section id="overview" eyebrow="Pricing & Payments" title="Simple, flexible pricing — built for clarity." subtitle="Pick the model that fits the work. Pay securely. Schedule instantly. Policies are visible before checkout so there are no surprises.">
    <motion.div {...fadeUp(0.15)}>
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge icon={ShieldCheckIcon}>Secure Stripe checkout</Badge>
              <Badge icon={CalendarDaysIcon}>Instant scheduling</Badge>
              <Badge icon={BanknotesIcon}>Transparent fees</Badge>
            </div>
            <p className="text-slate-700 leading-relaxed">
              MentorWise supports pay-in-full, milestone schedules, monthly retainers, and prepaid time packs. Whether you’re a <b>client</b> buying clarity or a <b>mentor</b> packaging your expertise, the flow is the same: agree on the plan → pay → schedule → track.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow hover:bg-slate-800">
                Find a Coach <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
                Become a Mentor
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[420px]">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-orange-200 via-orange-100 to-blue-100 blur-xl opacity-70" />
              <GlassCard className="relative p-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><ShieldCheckIcon className="h-5 w-5 text-orange-600" />Buyer protection</div>
                  <div className="flex items-center gap-2"><BanknotesIcon className="h-5 w-5 text-orange-600" />Clear fees</div>
                  <div className="flex items-center gap-2"><CalendarDaysIcon className="h-5 w-5 text-orange-600" />Auto-booking</div>
                  <div className="flex items-center gap-2"><CreditCardIcon className="h-5 w-5 text-orange-600" />Stripe payouts</div>
                </div>
                <div className="mt-3 text-xs text-slate-500">Numbers shown at checkout. Taxes vary by location.</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  </Section>
));

const ModelsSection = React.memo(() => (
  <Section id="models" eyebrow="Models" title="Four pricing options that cover every use-case" subtitle="Choose one or combine (e.g., pay-in-full for a starter audit, then switch to a monthly retainer).">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MODELS.map((m, i) => (
        <motion.div key={m.key} {...fadeUp(0.05 * i)}>
          <GlassCard className="h-full p-6">
            <div className="flex items-center gap-3 mb-2"><m.icon className="h-6 w-6 text-orange-600" /><h3 className="text-lg font-bold text-slate-900">{m.title}</h3></div>
            <div className="text-xs text-slate-500 mb-3">{m.ideal}</div>
            <ul className="space-y-2 text-sm text-slate-700">
              {m.bullets.map((b) => (<li key={b} className="flex items-start gap-2"><Check /> <span>{b}</span></li>))}
            </ul>
            <p className="text-xs text-slate-500 mt-3">{m.notes}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const FeesSection = React.memo(() => (
  <Section id="fees" eyebrow="Fees & Payouts" title="Transparent math for both sides" subtitle="Typical example (US card): $300 plan → platform 12% = $36; processing ~2.9% + $0.30 ≈ $9. Net to mentor ≈ $255.">
    <GlassCard className="p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">What’s included in fees</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {FEES.map((x) => (
              <div key={x.label} className="rounded-xl border border-slate-200 bg-white/70 p-4 flex items-center gap-3">
                <x.icon className="w-5 h-5 text-orange-600" />
                <div className="font-semibold text-slate-900 text-sm">{x.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-500 flex items-start gap-2">
            <InformationCircleIcon className="h-4 w-4 mt-0.5" />
            Exact processing varies by region/card type. All fees are displayed at checkout and in the earnings view.
          </div>
        </div>
        <div>
          <GlassCard className="p-5">
            <div className="font-semibold text-slate-900 mb-3">Example breakdown</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Client pays</span><span className="font-semibold">$300.00</span></div>
              <div className="flex justify-between text-slate-600"><span>Platform (12%)</span><span>− $36.00</span></div>
              <div className="flex justify-between text-slate-600"><span>Processing (~2.9% + $0.30)</span><span>− ~$9.00</span></div>
              <div className="border-t border-slate-200 my-2" />
              <div className="flex justify-between"><span className="font-semibold">Mentor receives</span><span className="font-extrabold text-slate-900">$255.00</span></div>
            </div>
          </GlassCard>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge icon={GiftTopIcon}>Coupons & bundles supported</Badge>
            <Badge icon={ArrowPathIcon}>Retainer renewals</Badge>
          </div>
        </div>
      </div>
    </GlassCard>
  </Section>
));

const FlowSection = React.memo(() => (
  <Section id="flow" eyebrow="Step-by-Step" title="From idea to paid plan in six clear steps" subtitle="This is the same whether you’re a client or a mentor—only the author of the Plan Card changes.">
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
      {FLOW.map((s, i) => (
        <motion.div key={s.n} {...fadeUp(0.04 * i)}>
          <GlassCard className="p-5 h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><s.icon className="h-5 w-5 text-orange-600" /><span className="font-semibold text-slate-900">{s.title}</span></div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-slate-200">{s.n}</span>
            </div>
            <p className="text-sm text-slate-600">{s.body}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  </Section>
));

const CompareSection = React.memo(() => (
  <Section id="compare" eyebrow="Compare" title="Which option should you pick?" subtitle="A quick decision guide for common scenarios.">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-2"><CreditCardIcon className="h-5 w-5 text-orange-600" /><div className="font-bold text-slate-900">Pay in Full</div></div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2 items-start"><Check /> Audit, review, single session</li>
          <li className="flex gap-2 items-start"><Check /> Need immediate start</li>
          <li className="flex gap-2 items-start"><Check /> Simple scope</li>
        </ul>
      </GlassCard>
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-2"><Bars3BottomLeftIcon className="h-5 w-5 text-orange-600" /><div className="font-bold text-slate-900">Milestones</div></div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2 items-start"><Check /> Multi-phase outcomes</li>
          <li className="flex gap-2 items-start"><Check /> Approval gates</li>
          <li className="flex gap-2 items-start"><Check /> Shared accountability</li>
        </ul>
      </GlassCard>
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-2"><ArrowPathIcon className="h-5 w-5 text-orange-600" /><div className="font-bold text-slate-900">Monthly Retainer</div></div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2 items-start"><Check /> Ongoing mentorship</li>
          <li className="flex gap-2 items-start"><Check /> Set bundle (e.g., 4 calls + DM)</li>
          <li className="flex gap-2 items-start"><Check /> Pause/cancel policy</li>
        </ul>
      </GlassCard>
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-2"><ClockIcon className="h-5 w-5 text-orange-600" /><div className="font-bold text-slate-900">Prepaid Time Pack</div></div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2 items-start"><Check /> Flexible scheduling</li>
          <li className="flex gap-2 items-start"><Check /> Redeem over months</li>
          <li className="flex gap-2 items-start"><Check /> Great for quick help</li>
        </ul>
      </GlassCard>
    </div>
  </Section>
));

const FaqSection = React.memo(() => (
  <Section id="faq" eyebrow="FAQ" title="Common questions">
    <div className="grid md:grid-cols-2 gap-6">
      {FAQ.map((f, i) => (
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
  <Section id="cta" eyebrow="Next" title="Ready to get started?">
    <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-3">
      <Link to="/mentors" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold shadow hover:bg-orange-600">
        Browse Mentors <ArrowRightIcon className="h-5 w-5" />
      </Link>
      <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-slate-900 font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
        Apply as a Mentor
      </Link>
    </motion.div>
  </Section>
));

/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT                                                        */
/* -------------------------------------------------------------------------- */

export default function Pricing() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,theme(colors.orange.50)_10%,theme(colors.blue.50)_40%,theme(colors.orange.50)_90%)] font-manrope">
      <Helmet>
        <title>Pricing & Payments — MentorWise</title>
        <meta name="description" content="Clear pricing models for clients and mentors: pay-in-full, milestones, monthly retainers, and prepaid time packs. Secure Stripe checkout, instant scheduling, and transparent fees." />
      </Helmet>

      <main>
        <HeroSection />
        <ModelsSection />
        <FeesSection />
        <FlowSection />
        <CompareSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  );
}
