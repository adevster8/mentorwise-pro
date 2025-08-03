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
        <img
          src="/Icon-Pic.png"
          alt="MentorWise Poster"
          className="w-full object-contain rounded-3xl shadow-2xl border-4 border-orange-100 bg-white/90"
          style={{
            maxHeight: "550px", // 20% bigger than before
          }}
        />
      </div>
    </section>
  );
}
