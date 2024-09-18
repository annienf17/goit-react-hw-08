import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
