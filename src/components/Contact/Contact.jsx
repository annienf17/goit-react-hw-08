/* eslint-disable react/prop-types */
import { HiUser, HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mdi/react";
import { mdiApplicationEdit } from "@mdi/js";

export default function Contact({
  data: { id, name, number },
  onDelete,
  onEdit,
}) {
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

      <Button
        variant="outlined"
        size="large"
        onClick={() => onEdit({ id, name, number })}
      >
        <Icon
          path={mdiApplicationEdit}
          title="User Profile"
          size={0.65}
          horizontal
          vertical
          rotate={180}
          color="#1976d2"
          style={{ marginRight: "12px" }}
        />
        Edit
      </Button>

      <Button
        variant="outlined"
        size="large"
        onClick={() => onDelete(id)}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );
}
