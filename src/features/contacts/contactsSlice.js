import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const response = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { getState, rejectWithValue }) => {
    const { contacts, auth } = getState();
    let duplicateMessage = null;

    contacts.items.find((item) => {
      if (item.name === contact.name) {
        duplicateMessage = "Contact with the same name already exists.";
        return true;
      }
      if (item.number === contact.number) {
        duplicateMessage = "Contact with the same phone number already exists.";
        return true;
      }
      return false;
    });

    if (duplicateMessage) {
      return rejectWithValue(duplicateMessage);
    }

    try {
      const response = await api.post(
        "/contacts",
        {
          name: contact.name,
          number: contact.number,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Contact added successfully.");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.info("Contact deleted successfully.");
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    if (!filter) return contactsState.items;

    const lowercasedFilter = filter.toLowerCase();
    return contactsState.items.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowercasedFilter) ||
        contact.number.includes(lowercasedFilter) // Dodano filtrowanie po numerze telefonu
    );
  }
);

export default contactsSlice.reducer;
