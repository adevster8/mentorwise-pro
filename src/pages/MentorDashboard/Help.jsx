export default function Help() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Mentor Support Center</h1>

      <p className="text-gray-700 mb-6">
        Whether you're having technical issues, need guidance on mentoring best practices, or want to understand payment policies — we’re here to help.
      </p>

      <div className="space-y-6 max-w-3xl">
        {/* Getting Started */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">🚀 Getting Started as a Mentor</h2>
          <p>
            Learn how to complete your profile, set availability, and attract mentees to your sessions.
          </p>
        </div>

        {/* Zoom and Scheduling */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">📅 Zoom & Scheduling Issues</h2>
          <p>
            Having trouble with your Zoom integration or session calendar? Get setup tips and troubleshooting help.
          </p>
        </div>

        {/* Payouts & Earnings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">💰 Payouts & Earnings</h2>
          <p>
            Learn when you get paid, how to track your earnings, and how Stripe processes your mentorship income.
          </p>
        </div>

        {/* Mentoring Effectively */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">🧠 Mentoring Best Practices</h2>
          <p>
            Access resources on how to structure sessions, deliver impact, and support different types of mentees.
          </p>
        </div>

        {/* Contact Support */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">📨 Contact MentorWise Support</h2>
          <p>
            Still need help? Reach out directly at <strong>support@mentorwise.pro</strong> or use the in-app message center to speak with our team.
          </p>
        </div>
      </div>
    </div>
  );
}
