// src/pages/ProgramPublic.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import CheckoutForm from "../components/CheckoutForm";

function currencyUSD(cents) {
  return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

// Optional price hints (UI only; real prices enforced on server)
const PRICE_HINT = {
  "pay-in-full-basic": currencyUSD(24900),
  "milestones-starter": currencyUSD(9900) + " per milestone",
  "retainer-standard": currencyUSD(49900),
  "time-pack-5h": currencyUSD(39000),
};

export default function ProgramPublic() {
  const { id } = useParams(); // Firestore doc id
  const [user] = useAuthState(auth);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const isOwner = user && program && user.uid === program.mentorId;

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "programs", id));
        if (alive) setProgram(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch {
        if (alive) setProgram(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-slate-50">
        <div className="text-slate-600">Loading program…</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Program not found</h1>
          <p className="text-slate-600 mt-2">The link may be invalid or the program was removed.</p>
          <Link to="/mentors" className="mt-4 inline-block bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-700">
            Browse Mentors
          </Link>
        </div>
      </div>
    );
  }

  // If not published, only owner can preview
  if (program.status !== "published" && !isOwner) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">This program isn’t published</h1>
          <p className="text-slate-600 mt-2">Ask the mentor to publish it before purchasing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-white py-10">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden"
        >
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{program.title}</h1>
                <p className="text-slate-700 mt-2">{program.blurb}</p>
                <div className="mt-3 text-sm text-slate-700/90">
                  {program.duration && <span className="mr-4"><span className="font-semibold">Duration:</span> {program.duration}</span>}
                  {program.level && <span><span className="font-semibold">Level:</span> {program.level}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Plan</div>
                <div className="text-sm font-semibold text-slate-800">{program.planKey}</div>
                {PRICE_HINT[program.planKey] && (
                  <div className="text-xs text-slate-500 mt-1">from {PRICE_HINT[program.planKey]}</div>
                )}
              </div>
            </div>

            {/* Owner preview banner */}
            {isOwner && (
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3">
                You’re viewing your own program. Checkout is disabled for mentors.
                Manage this program in{" "}
                <Link to="/mentor-dashboard/programs" className="underline font-semibold">
                  Mentor Dashboard → Programs
                </Link>.
              </div>
            )}

            {/* Checkout / Preview */}
            <div className="mt-8">
              {isOwner ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
                  Checkout hidden in mentor preview. Use this link as a mentee to purchase.
                </div>
              ) : (
                <CheckoutForm
                  planKey={program.planKey}
                  quantity={1}
                  customerEmail={auth.currentUser?.email || ""}
                />
              )}
              <p className="mt-3 text-xs text-slate-500 text-center">Payments are securely processed by Stripe.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
