import { Navigation } from "../Navigation/Navigation";
// import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
