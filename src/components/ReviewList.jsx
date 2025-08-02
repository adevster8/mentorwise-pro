// src/components/ReviewList.jsx
export default function ReviewList({ reviews }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3 text-gray-800">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
            <p className="text-gray-800 italic">“{review.comment}”</p>
            <p className="text-sm text-gray-600 mt-2">
              — {review.name}, {review.age}, {review.location}
            </p>
            <p className="text-yellow-500 text-sm">★★★★★</p>
          </div>
        ))}
      </div>
    </div>
  );
}
