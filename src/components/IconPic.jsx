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
      <div className="w-[90%] max-w-7xl">
        <img
          src="/Icon-Pic.png"
          alt="MentorWise Poster"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}