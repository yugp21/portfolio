import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The portfolio itself has no page scroll - navigation is swipe-only.
 * Lenis is kept for smoothing any scrollable overflow inside a single
 * card (e.g. a long tech-stack list on a short viewport) so that even
 * that micro-interaction stays consistent with the rest of the motion
 * language, rather than falling back to native jumpy scroll.
 */
export default function useLenis() {
  useEffect(() => {
    // Coarse pointer = touch device. Lenis only smooths mouse-wheel here
    // (syncTouch is off), but it still attaches non-passive touch
    // listeners at the window level, which fights with Framer Motion's
    // own touch listener that drives the card's swipe-to-advance drag.
    // Skipping it entirely on touch devices removes that conflict and
    // fixes swipe-left not registering on phones.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
