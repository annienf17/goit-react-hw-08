import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
  selectFilteredContacts,
} from "../../features/contacts/contactsSlice";
import Contact from "../Contact/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner
import Modal from "react-modal"; // Import react-modal

Modal.setAppElement("#root"); // Set the app element for accessibility

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && contacts.length === 0) {
      toast.info("No contacts available.");
    }
  }, [loading, contacts]);

  const openModal = (id) => {
    setContactToDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setContactToDelete(null);
  };

  const handleDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete))
        .unwrap()
        .then(() => {
          toast.success("Contact deleted successfully");
          closeModal();
        })
        .catch((err) => toast.error(`Error: ${err.message}`));
    }
  };

  if (loading)
    return <ClipLoader color="#19f50a" loading={loading} size={50} />; // Use the spinner

  return (
    <>
      <ToastContainer />
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact data={contact} onDelete={openModal} />
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this contact?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </>
  );
};

export default ContactList;
