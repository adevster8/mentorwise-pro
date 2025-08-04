import { motion } from "framer-motion";

export default function IconPic() {
  return (
    <section
      className="w-full py-24 flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('/Background-Pic.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[95%] max-w-6xl mx-auto flex justify-center">
        <motion.img
          src="/Icon-Pic.png"
          alt="MentorWise Poster"
          className="w-full object-contain rounded-3xl shadow-2xl border-4 border-orange-100 bg-white/90 transition"
          style={{
            maxHeight: "550px",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.025,
            boxShadow: "0 0 80px 10px #fdba7499, 0 10px 40px 0 #4f8cff33"
          }}
        />
      </div>
    </section>
  );
}
