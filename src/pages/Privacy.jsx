export default function Privacy() {
  return (
    <div className="min-h-screen bg-orange-50 p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy matters to us. MentorWise collects only the data necessary to provide our services:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>We collect your name, email, and session data for bookings.</li>
        <li>We do not sell or share your information with third parties.</li>
        <li>You can request deletion of your data anytime by emailing support@mentorwise.pro.</li>
      </ul>
    </div>
  );
}
