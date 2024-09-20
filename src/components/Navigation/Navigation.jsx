import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../features/auth/authSlice";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.navLink}>
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/contacts" className={styles.navLink}>
            Contacts
          </NavLink>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
          <NavLink to="/register" className={styles.navLink}>
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
};
