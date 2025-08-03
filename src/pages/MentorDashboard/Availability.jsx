export default function Availability() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Set Your Availability</h1>

      <p className="text-gray-700 mb-4">
        Let mentees know when you’re available for sessions. Set recurring time slots or update your availability week-by-week.
      </p>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Weekly Schedule Summary */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Weekly Schedule</h2>
          <p className="text-sm text-gray-600 mb-4">
            These are the days and time slots you're currently open for bookings:
          </p>
          <ul className="grid grid-cols-2 gap-3 text-gray-700 list-disc pl-5">
            <li>Monday: 10am – 2pm</li>
            <li>Tuesday: 4pm – 8pm</li>
            <li>Wednesday: 1pm – 3pm</li>
            <li>Thursday: Not Available</li>
            <li>Friday: 9am – 12pm</li>
            <li>Saturday & Sunday: By Request Only</li>
          </ul>
        </div>

        {/* Availability Management */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Update Availability</h2>
          <p className="text-sm text-gray-600 mb-4">
            In the future, you’ll be able to drag-and-drop time slots on a calendar, connect your Google Calendar, or mark specific dates as unavailable.
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            + Add Time Slot
          </button>
        </div>

        {/* Upcoming Bookings Conflicts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Upcoming Sessions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Here's a quick look at your next 3 scheduled sessions:
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>🗓 Aug 3 – 11:00 AM with Alex Johnson</li>
            <li>🗓 Aug 4 – 2:30 PM with Priya N.</li>
            <li>🗓 Aug 6 – 10:00 AM with Samuel R.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
