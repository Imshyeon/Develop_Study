import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  // 의존성 배열에 Effect 함수가 필요로 하는 의존성을 추가해야 한다.
  // Modal : open 속성 사용하여 열고 닫고를 정한다.

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? { children } : null}
    </dialog>,
    document.getElementById("modal")
  );
}
