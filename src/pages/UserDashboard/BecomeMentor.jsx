// src/pages/UserDashboard/BecomeMentor.jsx

export default function BecomeMentor() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Become a Mentor</h1>
      <p className="text-gray-700 mb-6 max-w-2xl">
        Share your expertise and make a meaningful impact in someone's journey. As a mentor on MentorWise,
        you'll have the opportunity to connect with mentees seeking real guidance, professional insights,
        and personal support in areas where you truly shine.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-orange-700 mb-4">Why Mentor with Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Set your own rates and availability</li>
          <li>Help others avoid costly mistakes and wasted time</li>
          <li>Build your personal brand and grow your influence</li>
          <li>Make a difference in someone’s life — while getting paid</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-orange-700 mb-4">How to Get Started</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Fill out your mentor profile with details about your expertise</li>
          <li>Set your hourly rate and available hours</li>
          <li>Submit your profile for review</li>
          <li>Once approved, mentees can book sessions with you directly</li>
        </ol>

        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
          Apply to Become a Mentor
        </button>
      </div>
    </div>
  );
}

