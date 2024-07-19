import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedItemsState } from './types';
import { Book } from '../services/types';

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Book>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter((item) => item.uid !== action.payload);
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } = selectedItemsSlice.actions;

export const selectedItemsReducer = selectedItemsSlice.reducer;
