import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
  updateContact,
  selectFilteredContacts,
} from "../../features/contacts/contactsSlice";
import Contact from "../Contact/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import EditContactModal from "../EditContactModal/EditContactModal";
import Fuse from "fuse.js";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  const filter = useSelector((state) => state.filters.status);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [initialNotificationShown, setInitialNotificationShown] =
    useState(false);
  const [searchNotificationShown, setSearchNotificationShown] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  // Hook to show notification if no contacts are available after loading
  useEffect(() => {
    if (!loading && contacts.length === 0 && !initialNotificationShown) {
      toast.info("No contacts available.");
      setInitialNotificationShown(true);
    }
  }, [loading, contacts, initialNotificationShown]);

  // Hook to handle search using Fuse.js and show notification if no contacts found
  useEffect(() => {
    const fuse = new Fuse(contacts, {
      keys: ["name", "number"],
      threshold: 0.3,
    });

    const result = filter
      ? fuse.search(filter).map(({ item }) => item)
      : contacts;

    setFilteredContacts(result);

    if (filter && result.length === 0 && !searchNotificationShown) {
      toast.info("No contacts found");
      setSearchNotificationShown(true);
    } else if (result.length > 0) {
      setSearchNotificationShown(false);
    }
  }, [contacts, filter, searchNotificationShown]);

  const openDeleteModal = (id) => {
    setContactToDelete(id);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalIsOpen(false);
    setContactToDelete(null);
  };

  const handleDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete))
        .unwrap()
        .then(() => {
          toast.success("Contact deleted successfully");
          closeDeleteModal();
        })
        .catch((err) => toast.error(`Error: ${err.message}`));
    }
  };

  const openEditModal = (contact) => {
    setContactToEdit(contact);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setContactToEdit(null);
  };

  const handleSave = (updatedContact) => {
    dispatch(updateContact(updatedContact))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully");
        closeEditModal();
      })
      .catch((err) => toast.error(`Error: ${err.message}`));
  };

  if (loading)
    return <ClipLoader color="#19f50a" loading={loading} size={50} />;

  return (
    <>
      <ToastContainer />

      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact
              data={contact}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
            />
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
      {contactToEdit && (
        <EditContactModal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contact={contactToEdit}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ContactList;
