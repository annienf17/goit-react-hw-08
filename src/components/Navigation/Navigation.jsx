import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUserEmail } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import styles from "./Navigation.module.css";

import Button from "@mui/material/Button";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeNavLink : styles.navLink
        }
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            Contacts
          </NavLink>
          {email && (
            <span className={styles.welcomeMessage}>
              <span className={styles.welcomeText}>Welcome</span>:{" "}
              <span className={styles.emailText}>{email}</span>
            </span>
          )}
          <Button onClick={handleLogout} variant="outlined" size="large">
            Logout
          </Button>
        </>
      ) : (
        <>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};
