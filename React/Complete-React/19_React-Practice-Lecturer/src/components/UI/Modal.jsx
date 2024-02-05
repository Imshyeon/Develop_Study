import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current; // 혹시나 다른 dialog를 참조할 수 있으므로 현재 dialog를 별도의 상수에 저장하여 컨트롤
    if (open) {
      modal.showModal();
    }

    // 모달 close에 관한 코드 작성 필요.
    return () => modal.close(); // cleanup은 시점상으로는 effect 함수보다 더 나중에 실행된다.
    // cleanup함수는 open값이 미래에 변하는 때에만 실행되기 때문이다.
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
