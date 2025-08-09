// src/pages/Terms.jsx
export default function Terms() {
  return (
    <div className="min-h-screen bg-orange-50 p-8 text-gray-800 font-lato">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-8 font-manrope">
          Terms of Service
        </h1>

        <p className="mb-6 text-lg">
          Welcome to MentorWise. These Terms of Service (“Terms”) govern your access to and use of the MentorWise platform, including our website, mobile applications, and related services (collectively, the “Service”). By accessing or using MentorWise, you agree to be bound by these Terms. If you do not agree, you may not access or use our Service.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          1. Eligibility
        </h2>
        <p className="mb-4">
          You must be at least 18 years old or the age of majority in your jurisdiction to use the Service. By registering for an account, you represent and warrant that you meet these requirements and that all information you provide is accurate, complete, and current.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          2. Account Registration and Security
        </h2>
        <p className="mb-4">
          To access certain features of MentorWise, you must create an account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Provide truthful and accurate information during registration.</li>
          <li>Maintain and promptly update your account information.</li>
          <li>Safeguard your password and credentials.</li>
          <li>Accept full responsibility for activities that occur under your account.</li>
        </ul>
        <p className="mb-4">
          MentorWise is not liable for any loss or damage arising from unauthorized use of your account.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          3. Mentor and Mentee Responsibilities
        </h2>
        <p className="mb-4">
          MentorWise connects individuals seeking mentorship (“Mentees”) with individuals offering guidance and expertise (“Mentors”). While we vet mentors to the best of our ability, we do not guarantee outcomes or specific results from mentorship sessions.
        </p>
        <p className="mb-4">
          Mentors are responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Delivering sessions in a professional, respectful manner.</li>
          <li>Accurately representing their skills, qualifications, and experience.</li>
          <li>Complying with all applicable laws, including licensing requirements where applicable.</li>
        </ul>
        <p className="mb-4">
          Mentees are responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Providing accurate information about their goals and needs.</li>
          <li>Respecting the mentor’s time and expertise.</li>
          <li>Not engaging in harassment, discrimination, or any inappropriate conduct.</li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          4. Payments, Fees, and Refunds
        </h2>
        <p className="mb-4">
          Payments are processed securely through our designated payment processor. Mentors set their own rates, and you will see the total cost before booking a session.
        </p>
        <p className="mb-4">
          MentorWise charges a 13% service fee on mentor earnings. All transactions are considered final unless explicitly refunded in accordance with our Refund Policy:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Refunds are granted for canceled sessions if canceled within the allowed time frame.</li>
          <li>No-shows are non-refundable unless due to exceptional circumstances.</li>
          <li>If a mentor cancels, the mentee will receive a refund or option to reschedule.</li>
        </ul>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          5. Prohibited Conduct
        </h2>
        <p className="mb-4">
          You agree not to use the Service for any unlawful or prohibited purpose, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Misrepresenting your identity, skills, or qualifications.</li>
          <li>Harassing, threatening, or discriminating against other users.</li>
          <li>Sharing another user’s personal information without consent.</li>
          <li>Engaging in fraudulent, deceptive, or misleading practices.</li>
        </ul>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          6. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, branding, and features of the MentorWise platform are owned by or licensed to MentorWise and are protected by intellectual property laws. You may not copy, modify, distribute, or use our content without written permission.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          7. Disclaimers and Limitation of Liability
        </h2>
        <p className="mb-4">
          MentorWise provides the Service “as is” without warranties of any kind, either express or implied. We do not guarantee that mentorship will result in specific outcomes, nor are we responsible for the conduct or quality of individual mentors or mentees.
        </p>
        <p className="mb-4">
          To the fullest extent permitted by law, MentorWise is not liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, or data.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          8. Termination
        </h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts at our discretion, including for violations of these Terms or other policies. Upon termination, your right to use the Service will immediately cease.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          9. Changes to the Terms
        </h2>
        <p className="mb-4">
          MentorWise may update these Terms at any time. If we make significant changes, we will notify you through the platform or via email. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          10. Governing Law and Dispute Resolution
        </h2>
        <p className="mb-4">
          These Terms are governed by the laws of the jurisdiction in which MentorWise operates, without regard to its conflict of law principles. Any disputes will be resolved through binding arbitration or in small claims court, unless otherwise required by law.
        </p>

        {/* Section 11 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          11. Contact Us
        </h2>
        <p className="mb-4">
          If you have questions about these Terms or our policies, please contact us at:
        </p>
        <p className="mb-8">
          <strong>Email:</strong> support@mentorwise.com <br />
          <strong>Address:</strong> MentorWise Headquarters, 123 Innovation Drive, Remote City, Global 00000
        </p>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
