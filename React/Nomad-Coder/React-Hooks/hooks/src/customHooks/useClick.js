import { useEffect, useRef } from "react";

const useClick = (onClick) => {
  const element = useRef();

  useEffect(() => {
    const el = element.current;
    if (el) {
      el.addEventListener("click", onClick);
    }

    return () => {
      if (el) {
        el.removeEventListener("click", onClick);
      }
    };
  }, [onClick]);

  return element;
};

export default useClick;
