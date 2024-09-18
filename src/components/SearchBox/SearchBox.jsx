import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../features/filters/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.status);

  const handleSearch = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div className={css.searchBox}>
      <label className={css.label}>
        Find contacts by name
        <input
          type="text"
          value={filter === "all" ? "" : filter}
          onChange={(e) => handleSearch(e.target.value)}
          className={css.input}
        />
      </label>
    </div>
  );
}
