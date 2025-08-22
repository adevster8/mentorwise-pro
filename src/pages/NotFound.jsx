// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-orange-50">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Page not found</h1>
        <p className="text-slate-600 mt-2">Try the homepage or Mentors.</p>
        <a href="/" className="mt-4 inline-block bg-orange-600 text-white px-5 py-2 rounded-xl">Go Home</a>
      </div>
    </div>
  );
}
