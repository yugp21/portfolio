import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function OpeningAnimation({ onComplete }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => onComplete?.(),
      });

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" })
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 16, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
          "-=0.15"
        )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.15"
        )
        .to({}, { duration: 0.4 }) // hold, long enough to actually read it
        .to([lineRef.current, nameRef.current, roleRef.current, taglineRef.current], {
          opacity: 0,
          y: -6,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(rootRef.current, { autoAlpha: 0, duration: 0.3 }, "-=0.05");
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#090909] px-6 text-center sm:gap-5"
      aria-hidden="true"
    >
      <div ref={lineRef} className="h-px w-16 origin-center bg-white/70" style={{ transform: "scaleX(0)" }} />
      <h1
        ref={nameRef}
        className="font-[var(--font-display)] text-[24px] font-semibold tracking-tight text-white sm:text-[28px]"
        style={{ opacity: 0 }}
      >
        Yug Patel
      </h1>
      <p ref={roleRef} className="text-[12px] tracking-wide text-white/45 sm:text-[13px]" style={{ opacity: 0 }}>
        Full-Stack Engineer • Constant Learner
      </p>
      <p
        ref={taglineRef}
        className="text-[13px] tracking-wide text-white/60 sm:text-[14px]"
        style={{ opacity: 0 }}
      >
        Build what matters.
      </p>
    </div>
  );
}