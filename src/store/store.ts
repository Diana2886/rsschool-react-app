import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer } from './selectedItemsSlice';

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
