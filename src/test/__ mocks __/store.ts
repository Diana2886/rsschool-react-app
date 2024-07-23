import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../../services/bookApi';
import { selectedItemsReducer } from '../../store/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});
