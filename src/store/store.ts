import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer } from './selectedItemsSlice';
import { bookApi } from '../services/bookApi';

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
  [bookApi.reducerPath]: bookApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
