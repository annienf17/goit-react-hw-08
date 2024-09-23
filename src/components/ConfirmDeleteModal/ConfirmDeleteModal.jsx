import Modal from "react-modal"; // Import react-modal
import css from "./ConfirmDeleteModal.module.css"; // Import CSS module

Modal.setAppElement("#root"); // Set the app element for accessibility

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className={css.modal} // Apply CSS module class for modal content
      overlayClassName={css.overlay} // Apply CSS module class for overlay
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this contact?</p>
      <button className={css.bttn} onClick={onConfirm}>
        Yes
      </button>
      <button className={css.bttn} onClick={onRequestClose}>
        No
      </button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
