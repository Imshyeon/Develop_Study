import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimationState = { opacity: 0, y: 30 }; -> 방법 1 : 값을 지정해서 직접 설정하는 방법
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 }, //원하는 키값 설정 가능
          visible: { opacity: 1, y: 0 },
        }} // 애니메이션 상태 재사용에 유용
        initial="hidden" // 해당 요소가 DOM에 추가된 직후 곧바로 재생될 애니메이션의 초기상태를 정의.=> 시작 상태를 지정.
        animate="visible"
        exit="hidden" // 요소가 DOM에서 삭제될 때 적용하고 싶은 애니메이션 상태
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
