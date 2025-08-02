// src/pages/MentorDashboard/Earnings.jsx

export default function Earnings() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Earnings Overview</h1>
      <p className="mb-4">Track your income from mentorship sessions. This includes your payouts, pending transactions, and any tips you've received.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Monthly earnings breakdown</li>
        <li>Total sessions completed</li>
        <li>Upcoming payout dates</li>
      </ul>
    </div>
  );
}

