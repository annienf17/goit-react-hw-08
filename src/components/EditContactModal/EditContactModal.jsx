import { useState, useEffect } from "react";
import Modal from "react-modal"; // Import Modal from react-modal
import css from "./EditContactModal.module.css";

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
      <button className={css.bttn} onClick={handleSave}>
        Save
      </button>
      <button className={css.bttn} onClick={onRequestClose}>
        Cancel
      </button>
    </Modal>
  );
};

export default EditContactModal;
