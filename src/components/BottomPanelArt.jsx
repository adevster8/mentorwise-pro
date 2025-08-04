export default function BottomPanelArt() {
  return (
    <section
      className="w-full overflow-hidden z-30"
      style={{ background: "#fff7ee" }}
    >
      <img
        src="/bottom-panel.png"
        alt="Decorative panel"
        className="w-full h-[64px] md:h-[74px] object-cover"
        style={{
          display: "block",
          margin: 0,
          padding: 0,
          userSelect: "none",
          pointerEvents: "none",
          imageRendering: "crisp-edges"
        }}
        loading="lazy"
        draggable="false"
      />
    </section>
  );
}
