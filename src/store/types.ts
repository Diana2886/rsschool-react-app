export type FormState = {
  uncontrolledFormData: StateValues;
  hookFormData: StateValues;
  countries: string[];
  recentlyEnteredData: RecentlyEnteredData | null;
};

export type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  // gender: 'male' | 'female';
  gender: string;
  terms: boolean;
  // picture: FileList;
  // picture: string;
  country: string;
};

export type UncontrolledFormValues = FormValues & {
  picture: File;
};

export type HookFormValues = FormValues & {
  picture: FileList;
};

export type StateValues = /* Omit<FormValues, 'picture'> & */ FormValues & {
  picture: string | null;
};

type RecentlyEnteredData = StateValues & {
  formType: 'uncontrolled' | 'hook';
};
