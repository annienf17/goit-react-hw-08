import { useEffect } from "react";
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

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

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

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success("Contact deleted successfully"))
      .catch((err) => toast.error(`Error: ${err.message}`));
  };

  if (loading)
    return <ClipLoader color="#19f50a" loading={loading} size={50} />; // Use the spinner

  return (
    <>
      <ToastContainer />
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact data={contact} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
