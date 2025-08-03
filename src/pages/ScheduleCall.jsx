import React from 'react';

export default function ScheduleCall() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] via-[#fff7ee] to-[#e6eef7] py-0 flex flex-col">
      {/* Header */}
      <div className="text-center py-10 bg-white border-b border-orange-200 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 font-heading">
          Let Us Find Your Coach
        </h1>
        <div className="mx-auto w-20 h-1 rounded bg-orange-400 mt-4 mb-2" />
        <p className="text-lg text-gray-700 mt-2 font-body">
          Tell us a bit about you — we’ll connect you with the perfect mentor.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div
        className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-10 px-2 md:px-6 py-14"
        style={{ alignItems: "stretch", minHeight: 520 }}
      >
        {/* Left Box - Message Form */}
        <div className="bg-[#d9ebfa] rounded-2xl shadow-2xl flex flex-col justify-center px-8 py-10 w-full lg:w-1/3"
          style={{ minHeight: 390, boxShadow: "0 8px 40px 0 rgba(56,120,171,0.09)" }}>
          <h2 className="text-2xl font-bold text-orange-600 mb-7 text-center font-heading">Send Us a Message</h2>
          <form className="space-y-5 text-sm text-gray-800 font-body">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email Address</label>
              <input type="email" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">What are you looking for?</label>
              <textarea rows="5" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="Describe your goals or what kind of coach you're looking for..." />
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-7 rounded-xl shadow font-semibold transition">
              Submit Request
            </button>
          </form>
        </div>

        {/* Center Image - matches box height and flush, rounded, with shadow */}
        <div className="flex items-stretch justify-center w-full lg:w-1/3">
          <img
            src="/laptop-photo.jpg"
            alt="Laptop Video Call"
            className="w-full h-full object-cover rounded-2xl border border-orange-100 shadow-2xl"
            style={{
              minHeight: 390,
              minWidth: 220,
              maxHeight: "100%",
              maxWidth: "100%",
              aspectRatio: "1 / 1",
              boxShadow: "0 8px 40px 0 rgba(51,47,32,0.11)",
            }}
          />
        </div>

        {/* Right Box - Zoom Call Form */}
        <div className="bg-[#fff8ef] rounded-2xl shadow-2xl flex flex-col justify-center px-8 py-10 w-full lg:w-1/3"
          style={{ minHeight: 390, boxShadow: "0 8px 40px 0 rgba(251,171,80,0.10)" }}>
          <h2 className="text-2xl font-bold text-orange-600 mb-7 text-center font-heading">Request a Zoom Call</h2>
          <form className="space-y-5 text-sm text-gray-800 font-body">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="Your name" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email Address</label>
              <input type="email" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Preferred Times</label>
              <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="e.g. Mornings, Weekends, etc." />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Topic or Area of Coaching</label>
              <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 shadow-sm bg-white/95" placeholder="Career, Mindset, Finance..." />
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-7 rounded-xl shadow font-semibold transition">
              Schedule Call
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
