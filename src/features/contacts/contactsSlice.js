// contactsSlice.js
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../api/api";

// Reusable function to create thunks
const createApiThunk = (type, apiCall) => {
  return createAsyncThunk(
    type,
    async (payload, { getState, rejectWithValue }) => {
      const { auth } = getState();
      try {
        const response = await apiCall(
          payload,
          auth.token,
          getState,
          rejectWithValue
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
  );
};

// Async thunk to fetch contacts
export const fetchContacts = createApiThunk(
  "contacts/fetchContacts",
  (payload, token) =>
    api.get("/contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
);

// Async thunk to add a contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { getState, rejectWithValue }) => {
    const { auth, contacts } = getState();
    let duplicateMessage = null;

    console.log("Checking for duplicates:", contact);

    const isDuplicate = contacts.items.some((item) => {
      if (item.name === contact.name) {
        duplicateMessage = "Contact with the same name already exists.";
        console.log("Duplicate found:", item);
        return true;
      }
      if (item.number === contact.number) {
        duplicateMessage = "Contact with the same phone number already exists.";
        console.log("Duplicate found:", item);
        return true;
      }
      return false;
    });

    if (isDuplicate) {
      console.error(duplicateMessage);
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

      console.log("Contact added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding contact:",
        error.response.data || error.message
      );
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
      return id; // Ensure we return the id of the deleted contact
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to update a contact
export const updateContact = createApiThunk(
  "contacts/updateContact",
  (contact, token) =>
    api.patch(
      `/contacts/${contact.id}`,
      {
        name: contact.name,
        number: contact.number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
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
