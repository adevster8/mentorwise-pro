// src/pages/UserDashboard/Bookings.jsx

export default function Bookings() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Your Bookings</h1>

      <p className="text-gray-700 mb-6 max-w-2xl">
        View and manage your upcoming and past mentorship sessions. Here, you can track session dates,
        reschedule meetings, or cancel appointments when necessary.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold text-orange-700 mb-2">Upcoming Sessions</h2>
        <p className="text-gray-600">You have no upcoming sessions scheduled.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-orange-700 mb-2">Past Sessions</h2>
        <p className="text-gray-600">You have no past sessions yet. Once you start booking, they’ll appear here.</p>
      </div>
    </div>
  );
}
