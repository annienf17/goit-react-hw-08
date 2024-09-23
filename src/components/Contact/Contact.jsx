/* eslint-disable react/prop-types */
import { HiUser, HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";

export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.contactContainer}>
      <ul className={css.contactList}>
        <li className={css.listItem}>
          <HiUser className={css.icon} size="20" />
          {name}
        </li>
        <li className={css.listItem}>
          <HiPhone className={css.icon} size="20" /> {number}
        </li>
      </ul>

      <button className={css.button} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
