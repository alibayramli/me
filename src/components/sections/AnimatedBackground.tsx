const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-6%] left-[8%] h-[360px] w-[360px] rounded-full bg-primary/8 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-[-8%] right-[10%] h-[320px] w-[320px] rounded-full bg-slate-400/8 blur-[120px] animate-pulse-glow dark:bg-slate-200/[0.04]"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-white/40 to-transparent dark:from-white/[0.02]"
      />
      <div
        className="absolute inset-0 opacity-[0.025] dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        className="absolute inset-0 hidden opacity-[0.04] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
