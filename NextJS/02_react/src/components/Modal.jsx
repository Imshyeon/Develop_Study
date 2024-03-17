import styles from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </>
  );
}
