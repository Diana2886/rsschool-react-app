import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer } from './selectedItemsSlice';
import { bookApi } from '../services/bookApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
