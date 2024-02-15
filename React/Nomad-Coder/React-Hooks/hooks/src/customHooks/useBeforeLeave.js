import { useEffect, useCallback } from "react";

const useBeforeLeave = (onBefore) => {
  const handle = useCallback(() => {
    onBefore();
  }, [onBefore]);
  useEffect(() => {
    document.addEventListener("mouseleave", handle);

    return () => {
      document.removeEventListener("mouseleave", handle);
    };
  }, [handle]);
};
export default useBeforeLeave;
