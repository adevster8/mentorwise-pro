// src/pages/UserDashboard/DashboardHome.jsx

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Welcome to Your Dashboard</h1>

      <p className="text-gray-700 mb-6 max-w-2xl">
        From here, you can manage every part of your mentorship experience. Review your upcoming
        sessions, send messages to mentors, adjust your schedule, and track your goals. This is your
        personalized space to stay on top of everything.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Upcoming Sessions</h2>
          <p className="text-gray-600">You have no upcoming sessions. Book one now to get started!</p>
        </li>
        <li className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Messages</h2>
          <p className="text-gray-600">Check in with your mentors or start a new conversation.</p>
        </li>
        <li className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Goals</h2>
          <p className="text-gray-600">Set goals for your learning journey and track your progress.</p>
        </li>
        <li className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Billing Info</h2>
          <p className="text-gray-600">Manage your payment methods and view past invoices.</p>
        </li>
      </ul>
    </div>
  );
}
