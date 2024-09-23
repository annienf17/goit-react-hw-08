import { useState, useEffect } from "react";
import Modal from "react-modal";
import css from "./EditContactModal.module.css";

import Button from "@mui/material/Button";

Modal.setAppElement("#root");

const EditContactModal = ({ isOpen, onRequestClose, contact, onSave }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  useEffect(() => {
    setName(contact.name);
    setNumber(contact.number);
  }, [contact]);

  const handleSave = () => {
    onSave({ ...contact, name, number });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Contact"
      className={css.modal}
      overlayClassName={css.overlay}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <h2>Edit Contact</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Number:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <Button variant="outlined" size="large" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" size="large" onClick={onRequestClose}>
        Cancel
      </Button>
    </Modal>
  );
};

export default EditContactModal;
