import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('contacts/fetchAll/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('contacts/fetchAll/fulfilled', (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase('contacts/fetchAll/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('contacts/addContact/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('contacts/addContact/fulfilled', (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase('contacts/addContact/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('contacts/deleteContact/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('contacts/deleteContact/fulfilled', (state, action) => {
        state.loading = false;
        state.items = state.items.filter(contact => contact.id !== action.payload);
      })
      .addCase('contacts/deleteContact/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Memoized selector for filtered contacts
export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
