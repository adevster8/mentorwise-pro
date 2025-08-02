// src/pages/UserDashboard/Billing.jsx

export default function Billing() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Billing</h1>
      <p className="mb-4">
        View your payment history, update your payment methods, and manage your active subscriptions.
      </p>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
        <p className="text-sm text-gray-600 mb-4">
          You currently have a Visa card ending in **** 4242 on file.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
          Update Payment Method
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Subscription Plan</h2>
        <p className="text-sm text-gray-600 mb-4">
          You are on the <strong>MentorWise Pro</strong> plan — $29/month.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Cancel Subscription
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Billing History</h2>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>July 1, 2025 — $29.00</li>
          <li>June 1, 2025 — $29.00</li>
          <li>May 1, 2025 — $29.00</li>
        </ul>
      </div>
    </div>
  );
}
