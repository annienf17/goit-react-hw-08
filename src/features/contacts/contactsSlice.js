// contactsSlice.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../api";

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await api.get("/");
    return response.data;
  }
);

// Async thunk to add a contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { getState, rejectWithValue }) => {
    const { contacts } = getState();
    let duplicateMessage = null;

    contacts.items.find((item) => {
      if (item.name === contact.name) {
        duplicateMessage = "Contact with the same name already exists.";
        return true;
      }
      if (item.phone === contact.phone) {
        duplicateMessage = "Contact with the same phone number already exists.";
        return true;
      }
      return false;
    });

    if (duplicateMessage) {
      return rejectWithValue(duplicateMessage);
    }

    const response = await api.post("/", contact);
    toast.info("Contact added successfully.");
    return response.data;
  }
);

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id) => {
    await api.delete(`/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

// Selector to get the contacts state
const selectContactsState = (state) => state.contacts;
const selectFilterState = (state) => state.filters.status;

// Memoized selector to filter contacts
export const selectFilteredContacts = createSelector(
  [selectContactsState, selectFilterState],
  (contactsState, filter) => {
    return filter
      ? contactsState.items.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contactsState.items;
  }
);

export default contactsSlice.reducer;
