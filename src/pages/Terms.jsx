export default function Terms() {
  return (
    <div className="min-h-screen bg-orange-50 p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Terms of Service</h1>
      <p className="mb-4">By using MentorWise, you agree to the following terms:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You must be 18 or older to use the platform.</li>
        <li>Mentors and mentees are responsible for the content of their sessions.</li>
        <li>All transactions are final unless explicitly refunded by MentorWise.</li>
        <li>We reserve the right to suspend accounts for misuse or abuse of the platform.</li>
      </ul>
    </div>
  );
}
