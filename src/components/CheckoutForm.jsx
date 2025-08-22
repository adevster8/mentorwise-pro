import { useEffect, useMemo, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { stripePromise } from "../lib/stripe";

const PLAN_COPY = {
  "pay-in-full-basic": { label: "Pay in Full • Basic", amount: 24900, currency: "USD" },
  "milestones-starter": { label: "Milestones • Starter", amount: 9900, currency: "USD", note: "per milestone" },
  "retainer-standard": { label: "Monthly Retainer • Standard", amount: 49900, currency: "USD" },
  "time-pack-5h": { label: "Time Pack • 5 Hours", amount: 39000, currency: "USD" },
};

function currency(amount) {
  return (amount / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function InnerCheckoutForm({ planKey = "pay-in-full-basic", quantity = 1, customerEmail = "" }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const plan = PLAN_COPY[planKey] || PLAN_COPY["pay-in-full-basic"];
  const displayTotal = useMemo(() => currency((plan?.amount || 0) * Number(quantity || 1)), [plan, quantity]);

  useEffect(() => {
    let mounted = true;
    setMsg("");
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planKey, quantity, customerEmail }),
        });
        const data = await res.json();
        if (mounted) {
          if (data.clientSecret) setClientSecret(data.clientSecret);
          else setMsg(data.error || "Failed to initialize checkout.");
        }
      } catch {
        if (mounted) setMsg("Network error. Please try again.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [planKey, quantity, customerEmail]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    setMsg("");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/checkout/success" },
    });
    if (error) setMsg(error.message || "Payment failed.");
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative max-w-xl mx-auto"
    >
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />
      <div className="rounded-[28px] overflow-hidden">
        <div className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/25 ring-1 ring-inset ring-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900/90">
                  Secure Checkout
                </h2>
                <p className="text-sm text-gray-700/80">Powered by Stripe</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-100 text-gray-900 font-medium">
                {plan.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="sm:col-span-2 rounded-2xl border border-white/30 bg-white/40 backdrop-blur p-4">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm text-gray-700/80">Total</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{displayTotal}</div>
                </div>
                {plan.note && <div className="mt-1 text-xs text-gray-700/70">{plan.note}</div>}
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/40 backdrop-blur p-4">
                <div className="text-xs text-gray-700/80">Quantity</div>
                <div className="text-lg font-semibold text-gray-900">{quantity}</div>
              </div>
            </div>

            {!clientSecret && (
              <div className="rounded-xl bg-white/60 backdrop-blur p-4 text-sm text-gray-800">
                Initializing checkout…
              </div>
            )}

            {clientSecret && (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur p-4">
                  <PaymentElement />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 22px rgba(0,0,0,.18)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!stripe || loading}
                  className="w-full rounded-2xl bg-blue-100 hover:bg-blue-200 text-gray-900 px-8 py-4 text-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60"
                >
                  {loading ? "Processing…" : "Pay Now"}
                </motion.button>

                {msg && <p className="text-sm text-red-600">{msg}</p>}

                <p className="text-[11px] leading-4 text-gray-600/90 text-center">
                  By confirming, you agree to the Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CheckoutForm(props) {
  const appearance = useMemo(
    () => ({
      theme: "stripe",
      variables: {
        colorPrimary: "#111827",
        colorBackground: "rgba(255,255,255,0.6)",
        colorText: "#0f172a",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        borderRadius: "14px",
      },
      rules: {
        ".Input": { backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" },
        ".Label": { color: "rgba(15,23,42,0.8)", fontWeight: "600" },
        ".Tab": { borderRadius: "12px" },
      },
    }),
    []
  );

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <InnerCheckoutForm {...props} />
    </Elements>
  );
}
