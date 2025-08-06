import React from "react";

export default function BecomeMentor() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Become a Mentor</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Share your expertise and make a meaningful impact in someone's journey. As a mentor on MentorWise,
          you'll have the opportunity to connect with mentees seeking real guidance, professional insights,
          and personal support in areas where you truly shine.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">Why Mentor with Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Set your own rates and availability</li>
            <li>Help others avoid costly mistakes and wasted time</li>
            <li>Build your personal brand and grow your influence</li>
            <li>Make a difference in someone’s life — while getting paid</li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">How to Get Started</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Fill out your mentor profile with details about your expertise</li>
            <li>Set your hourly rate and available hours</li>
            <li>Submit your profile for review</li>
            <li>Once approved, mentees can book sessions with you directly</li>
          </ol>

          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            Apply to Become a Mentor
          </button>
        </div>
      </div>

      {/* Visual CTA Section - Find Clients */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <img
          src="/find-clients.png"
          alt="Find Clients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Centered Text Box */}
        <div className="relative z-10 h-full flex items-end justify-center px-6 pb-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 mb-3 font-heading">
              Attract Clients, Structure Long-Term Growth
            </h2>
            <p className="text-gray-800 text-base md:text-lg font-body">
              Learn how to design flexible coaching offers — from one-off strategy calls to structured 12-week transformations. Our platform helps you match with clients seeking everything from quick clarity to deep change.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
