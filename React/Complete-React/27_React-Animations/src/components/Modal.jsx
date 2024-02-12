import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        initial={{ opacity: 0, y: 30 }} // 해당 요소가 DOM에 추가된 직후 곧바로 재생될 애니메이션의 초기상태를 정의.=> 시작 상태를 지정.
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }} // 요소가 DOM에서 삭제될 때 적용하고 싶은 애니메이션 상태
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
