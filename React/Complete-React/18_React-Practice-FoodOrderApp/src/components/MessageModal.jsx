import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const MessageModal = forwardRef(function MessageModal({ title, message }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <>
      <dialog ref={dialog} className="modal">
        <h1>{title}</h1>
        <p>{message}</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </>,
    document.getElementById("modal")
  );
});

export default MessageModal;
