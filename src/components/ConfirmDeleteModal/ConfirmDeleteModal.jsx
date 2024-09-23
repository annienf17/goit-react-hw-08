import Modal from "react-modal";
import css from "./ConfirmDeleteModal.module.css";
import Button from "@mui/material/Button";

Modal.setAppElement("#root");

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this contact?</p>
      <Button variant="outlined" size="large" onClick={onConfirm}>
        Yes
      </Button>
      <Button variant="outlined" size="large" onClick={onRequestClose}>
        No
      </Button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
