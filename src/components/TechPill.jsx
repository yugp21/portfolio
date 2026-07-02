export default function TechPill({ children }) {
  return (
    <span
      className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-white/80"
      style={{ borderColor: "var(--card-border)", background: "rgba(255,255,255,0.03)" }}
    >
      {children}
    </span>
  );
}
