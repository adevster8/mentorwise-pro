function MentorCard() {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
      <img
        className="w-full h-48 object-cover rounded-lg mb-4"
        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80"
        alt="Mentor"
      />
      <h2 className="text-xl font-bold mb-2">Mike Martinez</h2>
      <p className="text-gray-700 mb-4">
        Product Designer at Acme Inc. Passionate about mentoring and helping others grow.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Book Session
      </button>
    </div>
  );
}

export default MentorCard;