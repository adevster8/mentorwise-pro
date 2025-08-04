import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section className="w-full bg-[#fff7ee] py-12">
      <motion.div
        className="w-full max-w-6xl mx-auto mb-2"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 font-manrope mb-6 tracking-tight">
          Contact Us
        </h2>
      </motion.div>
      <motion.form
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-end"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true }}
        onSubmit={e => {
          e.preventDefault();
          // Submit logic here!
        }}
      >
        <div className="flex-1 flex flex-col">
          <label className="mb-1 text-xs font-bold tracking-wider text-gray-700 font-lato">NAME</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full p-3 border border-orange-200 focus:border-orange-400 rounded-md font-lato bg-white transition text-base"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="mb-1 text-xs font-bold tracking-wider text-gray-700 font-lato">EMAIL</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full p-3 border border-orange-200 focus:border-orange-400 rounded-md font-lato bg-white transition text-base"
          />
        </div>
        <div className="flex-[2] flex flex-col">
          <label className="mb-1 text-xs font-bold tracking-wider text-gray-700 font-lato">MESSAGE</label>
          <textarea
            required
            rows={2}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className="w-full p-3 border border-orange-200 focus:border-orange-400 rounded-md font-lato bg-white transition text-base resize-none"
            style={{ minHeight: 44, maxHeight: 54 }}
          />
        </div>
        <motion.button
          type="submit"
          className="ml-2 px-8 py-3 bg-blue-100 hover:bg-blue-200 text-gray-900 font-bold rounded-md shadow transition font-lato tracking-wide"
          whileHover={{ scale: 1.06, y: -2, boxShadow: "0 4px 20px 0 #fdba7433" }}
          whileTap={{ scale: 0.98 }}
        >
          SEND
        </motion.button>
      </motion.form>
      <div className="text-center text-xs mt-4 text-gray-400 font-manrope font-semibold">
        This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
      </div>
    </section>
  );
}