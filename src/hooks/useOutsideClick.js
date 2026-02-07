import { useEffect, useRef } from "react";

export function useOutsideClick(handler, capturePhase = false) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, capturePhase);
    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  }, [handler, capturePhase]);

  return ref;
}
