export default function Availability() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Your Availability</h1>
      <p className="mb-4">Set your available hours so mentees can book sessions with you. Keeping this up-to-date helps avoid missed appointments.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Specify time blocks for each weekday</li>
        <li>Choose how far in advance someone can book</li>
        <li>Set buffer times between sessions</li>
      </ul>
    </div>
  );
}

