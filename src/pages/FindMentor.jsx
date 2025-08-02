
// 4. FindMentor.jsx
export default function FindMentor() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 mb-10">Find a Mentor</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="bg-orange-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Mentor {i + 1}</h3>
            <p>Expertise: Life Coaching</p>
            <p>Experience: 10+ years</p>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}