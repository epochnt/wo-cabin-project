import { useEffect } from "react";

export function useCloseOnScroll(isOpen, handler, capturePhase = false) {
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", handler, capturePhase); // capture phase
    return () => window.removeEventListener("scroll", handler, capturePhase);
  }, [isOpen, handler, capturePhase]);
}
