import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Footer({ hasSwipedOnce, isConnectCard, hint }) {
  const showInstruction = !hasSwipedOnce || isConnectCard;
  const instructionText = isConnectCard ? "One more swipe to restart" : hint || "Swipe left to explore";

  return (
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
  );
}