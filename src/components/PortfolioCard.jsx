import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// Minimal slide + fade transition — clean and understated instead of a
// literal 3D page flip, which read as distracting rather than premium.
export const ENTER_FROM = { opacity: 0, x: 28, scale: 0.97 };
export const CENTER = { opacity: 1, x: 0, scale: 1 };
export const EXIT_LEFT = { opacity: 0, x: -28, scale: 0.97 };

export const SPRING_SETTLE = { type: "spring", stiffness: 320, damping: 30, mass: 0.8 };
export const SPRING_SNAPBACK = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 };
export const EASE_EXIT = { duration: 0.22, ease: [0.4, 0, 0.2, 1] };

export default function PortfolioCard({ children, eyebrow, title, controls, onDragEnd, canDrag }) {
  const scrollRef = useRef(null);
  const [canScrollMore, setCanScrollMore] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const pointerStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const hasMore = el.scrollHeight - el.scrollTop - el.clientHeight > 12;
      setCanScrollMore(hasMore);
      setIsScrolledDown(el.scrollTop > 12);
    };

    checkOverflow();
    el.addEventListener("scroll", checkOverflow, { passive: true });

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkOverflow);
      observer.disconnect();
    };
  }, [children]);

  const handlePointerDown = (e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    // If the gesture is clearly more vertical than horizontal, let it
    // scroll the content instead of letting the card's drag hijack it.
    if (dy > dx && dy > 6) {
      e.stopPropagation();
    }
  };

  return (
    <motion.div
      drag={canDrag ? "x" : false}
      dragConstraints={{ left: -170, right: 70 }}
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 480, bounceDamping: 34 }}
      onDragEnd={onDragEnd}
      animate={controls}
      initial={ENTER_FROM}
      whileTap={canDrag ? { cursor: "grabbing" } : undefined}
      className="relative flex max-h-[min(82dvh,640px)] min-h-[300px] w-[min(92vw,420px)] flex-col overflow-hidden px-5 py-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] will-change-transform sm:min-h-[380px] sm:px-8 sm:py-9"
      style={{
        background: "var(--card-bg)",
        borderRadius: "28px",
        border: "1px solid var(--card-border)",
        touchAction: "pan-y",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      {eyebrow && (
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-2 font-[var(--font-display)] text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
          {title}
        </h2>
      )}
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="scroll-fade mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-6"
        style={{ WebkitUserSelect: "text", userSelect: "text" }}
      >
        {children}
      </div>

      {(canScrollMore || isScrolledDown) && (
        <div className="pointer-events-none absolute bottom-3 left-0 flex w-full justify-center">
          <button
            type="button"
            onClick={() =>
              scrollRef.current?.scrollBy({
                top: canScrollMore ? 160 : -160,
                behavior: "smooth",
              })
            }
            className="focus-ring pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:text-[var(--accent)]"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            aria-label={canScrollMore ? "Scroll down" : "Scroll up"}
          >
            {canScrollMore ? (
              <ChevronDown size={13} strokeWidth={2} className="animate-bounce text-white/50" />
            ) : (
              <ChevronUp size={13} strokeWidth={2} className="text-white/50" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}