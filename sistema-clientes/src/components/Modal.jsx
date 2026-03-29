import "../styles/modal.moudel.css";

function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h5>{title}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {children}
      </div>
    </div>
  );
}
export default Modal;