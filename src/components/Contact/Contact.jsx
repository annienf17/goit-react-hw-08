/* eslint-disable react/prop-types */
import { HiUser, HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../features/contacts/contactsSlice";

export default function Contact({ data: { id, name, phone } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contactContainer}>
      <ul className={css.contactList}>
        <li className={css.listItem}>
          <HiUser className={css.icon} size="20" />
          {name}
        </li>
        <li className={css.listItem}>
          <HiPhone className={css.icon} size="20" /> {phone}
        </li>
      </ul>

      <button className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
