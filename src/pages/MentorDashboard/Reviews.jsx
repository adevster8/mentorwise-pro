export default function Reviews() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Your Reviews</h1>
      <p className="mb-4">Read what your mentees are saying. Great reviews can boost your visibility and build credibility.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Display of recent testimonials</li>
        <li>Average rating summary</li>
        <li>Encourage mentees to leave feedback</li>
      </ul>
    </div>
  );
}
