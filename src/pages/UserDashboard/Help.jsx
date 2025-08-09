import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, FileQuestion, Mail, Shield, BookOpen } from "lucide-react";

export default function Help() {
  const quick = [
    {
      title: "Message Support",
      desc: "Chat with our team about billing, bookings, or account issues.",
      to: "/dashboard/messages",
      icon: <MessageCircle className="w-6 h-6 text-orange-500" />,
      cta: "Open Messages",
    },
    {
      title: "Browse FAQs",
      desc: "Find answers to the most common questions from learners.",
      to: "/faq",
      icon: <FileQuestion className="w-6 h-6 text-orange-500" />,
      cta: "View FAQs",
    },
    {
      title: "Email Us",
      desc: "Can’t find it? Send a detailed note and we’ll follow up fast.",
      to: "/support",
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      cta: "Contact Support",
    },
  ];

  const resources = [
    { label: "Safety & Refunds", to: "/terms" , icon: <Shield className="w-4 h-4" /> },
    { label: "Community Guidelines", to: "/privacy", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-orange-50 font-manrope">
      <div className="px-6 py-8 md:px-12">
        <div className="mb-8 flex items-center gap-3">
          <HelpCircle className="w-7 h-7 text-orange-600" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Help Center</h1>
        </div>
        <p className="text-slate-600 mb-8 max-w-2xl">
          We’re here to help. Try the quick actions below or jump into detailed resources.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {quick.map((q) => (
            <motion.div
              key={q.title}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-2xl bg-white/80 backdrop-blur border border-orange-100 shadow-md p-6 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-900 font-semibold text-lg">{q.title}</div>
                {q.icon}
              </div>
              <p className="text-sm text-slate-600 mb-4">{q.desc}</p>
              <Link
                to={q.to}
                className="inline-flex items-center rounded-lg border border-orange-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-white hover:shadow transition"
              >
                {q.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 rounded-2xl bg-white/70 backdrop-blur border border-orange-100 p-6">
          <div className="text-slate-900 font-semibold mb-3">Helpful Resources</div>
          <div className="flex flex-wrap gap-3">
            {resources.map((r) => (
              <Link
                key={r.label}
                to={r.to}
                className="inline-flex items-center gap-2 rounded-lg border border-orange-100 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-white hover:shadow transition"
              >
                {r.icon}
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
