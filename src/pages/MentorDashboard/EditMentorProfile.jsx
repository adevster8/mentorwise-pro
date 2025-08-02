export default function EditMentorProfile() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Edit Your Mentor Profile</h1>

      <p className="text-gray-700 mb-6">
        Update your bio, experience, areas of expertise, and availability to help mentees understand how you can best support them.
      </p>

      <form className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-2xl">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. Jordan Michaels"
          />
        </div>

        {/* Title / Headline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Headline
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. Product Design Mentor with 10+ Years Experience"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Share your background, areas of expertise, and how you help mentees grow."
          ></textarea>
        </div>

        {/* Areas of Expertise */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Areas of Expertise
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="e.g. UX Design, Interview Coaching, Career Switching"
          />
        </div>

        {/* LinkedIn or Portfolio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            LinkedIn or Portfolio URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="https://linkedin.com/in/yourname or your website"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
