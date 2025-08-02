export default function Requests() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Session Requests</h1>
      <p className="mb-4">Here you can view and respond to new mentorship requests. Accept, decline, or reschedule as needed.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Review mentee bios and goals before accepting</li>
        <li>Set a custom session time if needed</li>
        <li>Track pending, accepted, and past requests</li>
      </ul>
    </div>
  );
}
