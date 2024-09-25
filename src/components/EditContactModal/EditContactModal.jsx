import { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import css from "./EditContactModal.module.css";
import { BttnContainer } from "../../commonStyles";

const StyledTextField = styled(TextField)({
  marginBottom: "26px",
  marginTop: "5px",
});

const EditContactModal = ({ isOpen, onRequestClose, contact, onSave }) => {
  Modal.setAppElement("#root");

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");

  useEffect(() => {
    setName(contact.name);
    setNumber(contact.number);
  }, [contact]);

  const handleSave = () => {
    let valid = true;

    // Validate name (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError("Name can only contain letters and spaces.");
      valid = false;
    } else {
      setNameError("");
    }

    // Validate number (only digits and hyphens)
    if (!/^[\d-]+$/.test(number)) {
      setNumberError("Number can only contain digits and hyphens.");
      valid = false;
    } else {
      setNumberError("");
    }

    if (valid) {
      onSave({ ...contact, name, number });
    }
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
      <h2 className={css.h2}>Edit Contact</h2>
      <label>
        Name:
        <StyledTextField
          variant="outlined"
          size="large"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!nameError}
          helperText={nameError}
        />
      </label>
      <label>
        Number:
        <StyledTextField
          variant="outlined"
          size="large"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
          error={!!numberError}
          helperText={numberError}
        />
      </label>
      <BttnContainer>
        <Button variant="outlined" size="large" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" size="large" onClick={onRequestClose}>
          Cancel
        </Button>
      </BttnContainer>
    </Modal>
  );
};

export default EditContactModal;
