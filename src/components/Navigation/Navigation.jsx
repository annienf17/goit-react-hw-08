import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUserEmail } from "../../redux/auth/selectors";
import { logout } from "../../features/auth/authSlice";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
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
          {email && (
            <span className={styles.welcomeMessage}>Welcome: {email}</span>
          )}
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/register" className={styles.navLink}>
            Register
          </NavLink>
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};
