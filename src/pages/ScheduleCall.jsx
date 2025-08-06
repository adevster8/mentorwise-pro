import React from 'react';

export default function ScheduleCall() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#f8fafc] via-[#fff7ee] to-[#e6eef7] py-0 flex flex-col">
      {/* Header */}
    <div className="text-center py-10 bg-white border-b border-orange-200 shadow-sm">
<h1 className="text-4xl md:text-5xl font-extrabold font-heading text-center flex items-center justify-center text-orange-600 mb-8">
  Let Us Find <span className="relative inline-block mx-2">
    <span className="text-orange-600">Your</span>
    {/* Underline */}
    <span
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        bottom: "-14px",
        width: "70%",
        height: "6px",
        background: "#fd7e14",
        borderRadius: "8px",
        display: "block"
      }}
    />
  </span>
  Coach
</h1>
  <p className="text-lato text-gray-700 mt-2 font-body">
    Tell us a bit about you — we’ll connect you with the perfect mentor.
  </p>
</div>
<div
  className="w-full max-w-[1600px] mx-auto px-4 py-14"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 380px 1fr',
    gap: '2.5rem',
    alignItems: 'stretch',
  }}
>
  {/* Left Form */}
  <div className="bg-[#d9ebfa] border-t-4 border-orange-200 rounded-3xl shadow-2xl flex flex-col justify-center px-12 py-12 min-h-[520px] transition-all"
    style={{ width: '100%', maxWidth: '100%' }}>
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

  {/* Center Image */}
  <div className="flex items-stretch justify-center"
       style={{ marginTop: "24px" }}  // <-- Shift image down
  >
    <img
      src="/laptop-photo.jpg"
      alt="Laptop Video Call"
      className="object-cover rounded-3xl border border-orange-100 shadow-2xl"
      style={{
        width: "380px",
        minWidth: "320px",
        height: "100%",
        maxHeight: "520px",
        aspectRatio: "3/4",
      }}
    />
  </div>

  {/* Right Form */}
  <div className="bg-[#fff8ef] border-t-4 border-blue-200 rounded-3xl shadow-2xl flex flex-col justify-center px-12 py-12 min-h-[520px] transition-all"
    style={{ width: '100%', maxWidth: '100%' }}>
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





      {/* Coaching Section (Parallax) */}
      <section className="relative h-[500px] md:h-[700px] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/Coaching.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-xl font-manrope"
              style={{
                textShadow: "0 2px 24px rgba(32,41,79,0.30), 0 1px 0 rgba(255,255,255,0.20)"
              }}>
            1-on-1 Coaching That Actually Works
          </h2>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl leading-relaxed font-lato tracking-wide"
             style={{
               textShadow: "0 1.5px 10px rgba(80,120,160,0.10), 0 1px 0 rgba(255,255,255,0.12)"
             }}>
            Get matched with coaches who’ve walked the path you’re on. Real conversations, real strategies, and personalized support...without the overpriced fluff.
          </p>
          <button
            onClick={() => window.location.href='/mentors'}
            className="bg-blue-100 hover:bg-blue-200 text-gray-900 px-10 py-4 rounded-xl text-lg font-lato font-bold shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ letterSpacing: ".01em" }}
          >
            Find Your Coach
          </button>
        </div>
      </section>
    </section>
  );
}
