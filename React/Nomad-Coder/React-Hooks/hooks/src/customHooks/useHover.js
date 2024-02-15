import { useRef, useEffect } from "react";

const useHover = (onHover) => {
  const element = useRef();

  useEffect(() => {
    const el = element.current;
    if (el) {
      el.addEventListener("mouseenter", onHover);
    }

    return () => {
      if (el) {
        el.removeEventListener("mouseenter", onHover);
      }
    };
  }, [onHover]);

  if (typeof onHover !== "function") {
    return;
  }
};
export default useHover;
