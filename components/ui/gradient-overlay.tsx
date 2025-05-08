export function GradientOverlay() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(30, 64, 175, 0.15) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(30, 64, 175, 0.15) 100%)",
          mixBlendMode: "normal",
        }}
      />
    </div>
  )
}
