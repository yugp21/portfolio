import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function Footer({ hasSwipedOnce, isConnectCard, hint, onNext }) {
  const showInstruction = !hasSwipedOnce || isConnectCard;
  const instructionText = isConnectCard ? "One more swipe to restart" : hint || "Swipe left to explore";

  return (
    <>
      {/* Centered hint + copyright, unchanged from before */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1.5 text-center">
        {showInstruction && (
          <motion.div
            key={instructionText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-[12px] tracking-tight text-white/35"
          >
            <ArrowLeft size={12} strokeWidth={2} />
            {instructionText}
          </motion.div>
        )}
        <p className="text-[11px] tracking-tight text-white/20">© Yug Patel 2026</p>
      </div>

      {/* Next-card button lives off to the side, in its own bottom-right
          corner spot, so it never lines up with the card's internal
          "scroll for more" chevron which is centered inside the card. */}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          aria-label={isConnectCard ? "Restart" : "Next card"}
          title={isConnectCard ? "Restart" : "Next card"}
          className="focus-ring pointer-events-auto absolute bottom-8 right-5 flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-colors duration-300 hover:text-[var(--accent)] sm:right-8"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      )}
    </>
  );
}