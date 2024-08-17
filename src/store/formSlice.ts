import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, StateValues } from './types';
import { COUNTRIES } from './constants';

export const initialFormData: StateValues = {
  id: Date.now(),
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
  picture: null,
  country: '',
};

const initialState: FormState = {
  controlledFormSubmissions: [],
  uncontrolledFormSubmissions: [],
  newSubmissionId: null,
  countries: COUNTRIES,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addControlledSubmission(state, action: PayloadAction<StateValues>) {
      state.controlledFormSubmissions.push(action.payload);
      state.newSubmissionId = action.payload.id;
    },
    addUncontrolledSubmission: (state, action: PayloadAction<StateValues>) => {
      state.uncontrolledFormSubmissions.push(action.payload);
      state.newSubmissionId = action.payload.id;
    },
    clearNewSubmissionId: (state) => {
      state.newSubmissionId = null;
    },
  },
});

export const { addControlledSubmission, addUncontrolledSubmission, clearNewSubmissionId } =
  formSlice.actions;
export const formReducer = formSlice.reducer;
