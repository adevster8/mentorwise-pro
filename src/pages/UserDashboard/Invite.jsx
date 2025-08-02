// src/pages/UserDashboard/Invite.jsx

export default function Invite() {
  const referralLink = "https://mentorwise.pro/signup?ref=yourcode";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Invite Friends</h1>

      <p className="mb-4 text-gray-700">
        Share MentorWise with your friends and help them find the perfect mentor.
        For every successful referral, you’ll both get a free session!
      </p>

      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <label className="block text-gray-600 font-semibold mb-2">
          Your referral link:
        </label>
        <div className="flex">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 border border-gray-300 rounded-l px-4 py-2"
          />
          <button
            onClick={copyToClipboard}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-orange-500 mb-2">Why refer?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Give your friends a discount on their first mentorship session</li>
          <li>Earn free sessions or rewards for every successful signup</li>
          <li>Grow your network and share value with people you care about</li>
        </ul>
      </div>
    </div>
  );
}
