import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export { store };
