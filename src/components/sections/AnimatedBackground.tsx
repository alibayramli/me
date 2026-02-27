const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 h-[460px] w-[460px] rounded-full bg-sky-400/10 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-300/10 blur-[110px] animate-pulse-glow"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[150px]"
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
