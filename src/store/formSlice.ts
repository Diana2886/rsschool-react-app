import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, StateValues } from './types';

export const initialFormData: StateValues = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  terms: false,
  picture: null,
  //   picture: new DataTransfer().files[0],
  country: '',
  //   picture: new FileList(),
};

const initialState: FormState = {
  uncontrolledFormData: initialFormData,
  hookFormData: initialFormData,
  countries: ['USA', 'Canada', 'UK', 'Australia'],
  recentlyEnteredData: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData(state, action: PayloadAction<StateValues>) {
      state.uncontrolledFormData = action.payload;
      state.recentlyEnteredData = { ...action.payload, formType: 'uncontrolled' };
    },
    addHookFormData(state, action: PayloadAction<StateValues>) {
      state.hookFormData = action.payload;
      state.recentlyEnteredData = { ...action.payload, formType: 'hook' };
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { addUncontrolledData, addHookFormData, setCountries } = formSlice.actions;
export const formReducer = formSlice.reducer;
