import { createPortal } from "react-dom";
import styles from "../styles/modal.module.css";

function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h5>{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
}
export default Modal;