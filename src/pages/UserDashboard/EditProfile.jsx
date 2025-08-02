// src/pages/UserDashboard/EditProfile.jsx

export default function EditProfile() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Edit Your Profile</h1>

      <form className="bg-white shadow-md rounded-lg p-6 max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Tell mentors more about yourself"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="interests">
            Interests
          </label>
          <input
            type="text"
            id="interests"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g., Web Development, UX Design"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="City, Country"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
