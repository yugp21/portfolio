import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code2, Puzzle, Hammer, Trophy, Sparkles, Heart, Check } from "lucide-react";

const BEATS = [
  { icon: Code2, kicker: "Namaste 🙏", text: "I'm Yug Patel." },
  { icon: Puzzle, kicker: "Who I Am", text: "A Full-Stack Engineer." },
  { icon: Hammer, kicker: "Why I Code", text: "Building what matters." },
  { icon: Trophy, kicker: "LeetCode", count: 250, suffix: "+", label: "Problems Solved" },
  { icon: Sparkles, kicker: "Selected Work", count: 3, label: "Featured Projects" },
  { icon: Heart, kicker: "Vision", text: "Building software for villages and local communities." },
  { icon: Check, kicker: "Until Next Time", text: "Thanks for checking out my portfolio." },
];

export default function SummaryAnimation({ onComplete }) {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const beatRefs = useRef([]);
  const iconWrapRefs = useRef([]);
  const kickerRefs = useRef([]);
  const numberRefs = useRef([]);

  useEffect(() => {
    // Total runtime is budgeted to land close to ~2.2s — enough time to
    // actually read each beat, without dragging on.
    const ctx = gsap.context(() => {
      // Independent tween — runs in parallel and must NOT be part of the
      // sequential timeline below, otherwise its long duration pushes the
      // timeline's position cursor forward and delays every beat.
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.to(glowRef.current, {
        rotate: 20,
        duration: BEATS.length * 0.28 + 0.3,
        ease: "none",
      });

      const tl = gsap.timeline({ onComplete: () => onComplete?.() });

      BEATS.forEach((beat, i) => {
        const beatEl = beatRefs.current[i];
        const iconEl = iconWrapRefs.current[i];
        const kickerEl = kickerRefs.current[i];
        const numberEl = numberRefs.current[i];
        const isLast = i === BEATS.length - 1;
        const hold = isLast ? 0.22 : 0.1;

        tl.set(beatEl, { display: "flex" })
          .fromTo(
            iconEl,
            { opacity: 0, scale: 0.5, rotate: -12 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.18, ease: "back.out(2.2)" }
          )
          .fromTo(
            kickerEl,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
            "-=0.08"
          );

        if (beat.count != null && numberEl) {
          const counter = { val: 0 };
          tl.fromTo(
            numberEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
            "-=0.06"
          ).to(
            counter,
            {
              val: beat.count,
              duration: 0.24,
              ease: "power2.out",
              snap: { val: 1 },
              onUpdate: () => {
                if (numberEl) numberEl.textContent = `${counter.val}${beat.suffix ?? ""}`;
              },
            },
            "<"
          );
        } else {
          tl.fromTo(
            numberEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
            "-=0.06"
          );
        }

        tl.to({}, { duration: hold })
          .to(beatEl, { opacity: 0, y: -12, duration: 0.16, ease: "power2.in" })
          .set(beatEl, { display: "none" });
      });

      tl.to(glowRef.current, { opacity: 0, duration: 0.2 }, "-=0.1").to(
        rootRef.current,
        { autoAlpha: 0, duration: 0.18 },
        "-=0.08"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#090909] px-8"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, rgba(232,163,85,0.06) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative flex h-16 w-full max-w-sm items-center justify-center">
        {BEATS.map((beat, i) => {
          const Icon = beat.icon;
          return (
            <div
              key={beat.kicker + i}
              ref={(el) => (beatRefs.current[i] = el)}
              className="absolute inset-0 flex-col items-center justify-center gap-3 text-center"
              style={{ display: "none" }}
            >
              <span
                ref={(el) => (iconWrapRefs.current[i] = el)}
                className="flex h-11 w-11 items-center justify-center rounded-full opacity-0"
                style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-glow)" }}
              >
                <Icon size={18} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
              </span>

              {beat.kicker && (
                <span
                  ref={(el) => (kickerRefs.current[i] = el)}
                  className="text-[11px] font-medium uppercase tracking-[0.14em] opacity-0"
                  style={{ color: "var(--accent)" }}
                >
                  {beat.kicker}
                </span>
              )}

              <span
                ref={(el) => (numberRefs.current[i] = el)}
                className="max-w-xs font-[var(--font-display)] text-[24px] font-semibold leading-tight tracking-tight text-white opacity-0"
              >
                {beat.count != null ? `0${beat.suffix ?? ""}` : beat.text}
              </span>

              {beat.label && (
                <span className="text-[13px] font-medium text-white/45">{beat.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}