// src/pages/Privacy.jsx
export default function Privacy() {
  return (
    <div className="min-h-screen bg-orange-50 p-8 text-gray-800 font-lato">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-8 font-manrope">
          Privacy Policy
        </h1>

        <p className="mb-6 text-lg">
          MentorWise (“we,” “our,” “us”) is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, mobile applications, and related services (collectively, the “Service”). 
          By using MentorWise, you consent to the practices described in this policy.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information you provide directly, as well as information collected automatically when you interact with the Service.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Account Information:</strong> Name, email address, password, profile details, payment information, and preferences.
          </li>
          <li>
            <strong>Session Data:</strong> Booking details, messages exchanged with mentors or mentees, and session notes.
          </li>
          <li>
            <strong>Payment Data:</strong> Transaction history, payment method, and billing address (processed securely through our payment processor).
          </li>
          <li>
            <strong>Usage Data:</strong> IP address, browser type, device information, operating system, and activity on the platform.
          </li>
          <li>
            <strong>Cookies and Tracking:</strong> Data collected through cookies, pixels, and similar tracking technologies to improve user experience.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Provide and operate the MentorWise Service.</li>
          <li>Facilitate bookings, payments, and communications between users.</li>
          <li>Improve, personalize, and expand our platform.</li>
          <li>Send updates, promotional messages, and relevant content (with opt-out options).</li>
          <li>Detect, prevent, and address technical issues and fraudulent activities.</li>
          <li>Comply with legal obligations and enforce our Terms of Service.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          3. How We Share Your Information
        </h2>
        <p className="mb-4">
          We do not sell your personal information. We may share your information in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>With Other Users:</strong> Certain profile information is visible to other users to facilitate mentorship connections.
          </li>
          <li>
            <strong>With Service Providers:</strong> We engage trusted third-party vendors for payment processing, hosting, analytics, and customer support.
          </li>
          <li>
            <strong>For Legal Compliance:</strong> When required by law, regulation, or legal process, or to protect rights, property, or safety.
          </li>
          <li>
            <strong>In Business Transfers:</strong> In connection with a merger, sale of company assets, or acquisition.
          </li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          4. Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          MentorWise uses cookies and similar technologies to improve the functionality of our platform, remember your preferences, and analyze usage patterns. 
          You can manage cookie settings in your browser, but disabling cookies may affect your experience.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          5. Data Security
        </h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, alteration, or destruction. 
          However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          6. Your Rights
        </h2>
        <p className="mb-4">
          Depending on your location, you may have certain privacy rights under applicable laws:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections to inaccurate or incomplete data.</li>
          <li>Request deletion of your personal data.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request a copy of your data in a portable format.</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, contact us at{" "}
          <span className="font-semibold">privacy@mentorwise.com</span>.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          7. Third-Party Links and Services
        </h2>
        <p className="mb-4">
          Our Service may contain links to third-party websites or services. 
          We are not responsible for the privacy practices of these third parties. 
          We encourage you to review their policies before providing personal information.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          8. Children’s Privacy
        </h2>
        <p className="mb-4">
          MentorWise is not intended for individuals under the age of 18. 
          We do not knowingly collect personal information from children. 
          If we learn that we have collected data from a minor, we will delete it promptly.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          9. International Users
        </h2>
        <p className="mb-4">
          If you access MentorWise from outside our primary operating country, 
          your data may be transferred to and processed in countries with different data protection laws than your own.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          10. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. 
          If we make significant changes, we will notify you by posting a notice on the platform or sending an email. 
          Continued use of the Service after changes are posted constitutes acceptance of the updated policy.
        </p>

        {/* Section 11 */}
        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">
          11. Contact Us
        </h2>
        <p className="mb-8">
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
          <br />
          <strong>Email:</strong> privacy@mentorwise.com
          <br />
          <strong>Address:</strong> MentorWise Headquarters, 123 Innovation Drive, Remote City, Global 00000
        </p>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
