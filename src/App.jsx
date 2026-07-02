import { useCallback, useEffect, useState } from "react";
import OpeningAnimation from "./components/OpeningAnimation";
import CardStack from "./components/CardStack";
import DepthField from "./components/DepthField";
import useLenis from "./hooks/useLenis";

const OPENING_FAILSAFE_MS = 2400;

export default function App() {
  const [openingDone, setOpeningDone] = useState(false);
  useLenis();

  const handleOpeningComplete = useCallback(() => setOpeningDone(true), []);

  useEffect(() => {
    const failsafe = setTimeout(() => setOpeningDone(true), OPENING_FAILSAFE_MS);
    return () => clearTimeout(failsafe);
  }, []);

  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-[#090909]">
      <DepthField />
      <div className="noise-layer" />

      {!openingDone && <OpeningAnimation onComplete={handleOpeningComplete} />}

      <main
        className="relative z-10 h-full w-full transition-opacity duration-200"
        style={{ opacity: openingDone ? 1 : 0, pointerEvents: openingDone ? "auto" : "none" }}
      >
        <CardStack />
      </main>
    </div>
  );
}