/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiUser, HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mdi/react";
import { mdiApplicationEdit } from "@mdi/js";
import { BttnContainer } from "../../commonStyles";

export default function Contact({
  data: { id, name, number },
  onDelete,
  onEdit,
}) {
  const [isHovered, setIsHovered] = useState(false);

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
      <BttnContainer>
        <Button
          variant="outlined"
          size="large"
          onClick={() => onEdit({ id, name, number })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon
            path={mdiApplicationEdit}
            title="User Profile"
            size={0.65}
            horizontal
            vertical
            rotate={180}
            color={isHovered ? "white" : "rgb(25, 118, 210)"}
            style={{
              marginRight: "12px",
              transition: "color 0.3s ease",
            }}
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
      </BttnContainer>
    </div>
  );
}
