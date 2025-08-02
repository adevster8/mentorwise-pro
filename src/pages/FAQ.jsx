export default function FAQ() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Frequently Asked Questions</h1>
      <ul className="space-y-6 text-gray-700">
        <li>
          <strong>How does MentorWise work?</strong><br />
          We connect mentees with mentors for one-on-one Zoom sessions based on experience and goals.
        </li>
        <li>
          <strong>What does it cost?</strong><br />
          Pricing is set by each mentor. You’ll see the cost before booking.
        </li>
        <li>
          <strong>How do I become a mentor?</strong><br />
          Visit <a href="/become-a-mentor" className="text-orange-600 underline">Become a Mentor</a> and fill out your profile.
        </li>
        <li>
          <strong>Is there a refund policy?</strong><br />
          We offer refunds for sessions that are missed or improperly conducted. Contact support for help.
        </li>
      </ul>
    </div>
  );
}
