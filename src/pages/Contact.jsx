// 2. Contact.jsx
export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Contact Us</h1>
      <form className="space-y-6">
        <input className="w-full p-3 border rounded" type="text" placeholder="Your Name" required />
        <input className="w-full p-3 border rounded" type="email" placeholder="Your Email" required />
        <textarea className="w-full p-3 border rounded" rows="5" placeholder="Your Message" required></textarea>
        <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600" type="submit">Send Message</button>
      </form>
    </div>
  );
}