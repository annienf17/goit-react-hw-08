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
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal"; // Import the ConfirmDeleteModal
import Fuse from "fuse.js"; // Import Fuse.js

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const fuse = new Fuse(contacts, {
      keys: ["name", "number"],
      threshold: 0.3,
    });

    const result = searchQuery
      ? fuse.search(searchQuery).map(({ item }) => item)
      : contacts;

    setFilteredContacts(result);
  }, [contacts, searchQuery]);

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
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact data={contact} onDelete={openModal} />
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ContactList;
