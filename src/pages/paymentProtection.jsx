// src/pages/paymentProtection.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

// --- Helper Icons (You can place these in a separate file if you prefer) ---

const CheckCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WarningIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

// --- Main Component ---

export default function PaymentProtection() {
  return (
    <>
      <Helmet>
        <title>Trust & Safety - MentorWise</title>
        <meta name="description" content="Understand the MentorWise Resolution Center, payment protection policies, and dispute resolution process." />
      </Helmet>

      <div className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
              Trust & Safety Center
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Our commitment to a fair, secure, and trustworthy platform for everyone.
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 space-y-12">
            
            {/* Introduction Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Our Commitment to a Fair Platform</h2>
              <div className="mt-4 text-slate-600 space-y-4">
                <p>Welcome to the MentorWise Resolution Center. Our mission is to foster a secure, transparent, and productive environment where knowledge can be shared with confidence. We understand that on rare occasions, a session or interaction may not go as planned. This policy is designed to provide a clear, structured, and fair process for resolving disputes between mentees and mentors.</p>
                <p>By using the MentorWise platform, you agree to abide by this process for all disputes and refunds. Our goal is to protect both parties: ensuring mentees receive the services they pay for and mentors are compensated fairly for their time and expertise.</p>
              </div>
            </section>

            {/* Three-Step Process Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">The Three-Step Resolution Process</h2>
              <p className="mt-2 text-slate-600">To ensure fairness and efficiency, all disputes must follow this mandatory three-step process.</p>
              <div className="mt-8 grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">1</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-800">Direct Communication</h3>
                  <p className="mt-1 text-sm text-slate-500">Contact the other party within 48 hours to resolve the issue directly.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">2</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-800">Formal Dispute</h3>
                  <p className="mt-1 text-sm text-slate-500">If unresolved, open a case in our Resolution Center within 72 hours.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">3</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-800">MentorWise Mediation</h3>
                  <p className="mt-1 text-sm text-slate-500">Our team will step in to review the case and make a final decision.</p>
                </div>
              </div>
            </section>

            {/* Refund Policy Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Refund Policy Specifics</h2>
              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-800">Full & Partial Refunds May Be Issued For:</h3>
                  <ul className="mt-4 space-y-3 text-slate-600">
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span>Mentor no-shows or services fundamentally not as described.</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span>Unprofessional conduct that violates our Community Guidelines.</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" /><span>Major technical issues on the mentor's end or sessions being substantially shorter than paid for.</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Refunds Will Not Be Issued For:</h3>
                   <ul className="mt-4 space-y-3 text-slate-600">
                    <li className="flex items-start"><XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" /><span>Subjective dissatisfaction with advice after a session was fully completed.</span></li>
                    <li className="flex items-start"><XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" /><span>Failure to follow the three-step resolution process in the required timeframe.</span></li>
                    <li className="flex items-start"><XCircleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" /><span>Requests made after the 72-hour dispute window has closed.</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Chargeback Policy Section */}
            <section>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <WarningIcon className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-bold text-slate-900">Strict Policy on Chargebacks</h3>
                            <div className="mt-3 text-slate-700 space-y-4">
                                <p>Initiating a chargeback with your bank without first completing the MentorWise Resolution Process is a <strong className="font-bold">serious violation of our Terms of Service.</strong></p>
                                <p>This action will result in immediate and permanent account suspension, forfeiture of any remaining funds, and liability for all dispute fees charged to us by the payment processor.</p>
                                <p>Our internal process is the sole and exclusive method for resolving payment disputes. We have implemented this policy to protect the integrity of our platform for all users.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}