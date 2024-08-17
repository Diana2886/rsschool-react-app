export type FormState = {
  controlledFormSubmissions: StateValues[];
  uncontrolledFormSubmissions: StateValues[];
  newSubmissionId: number | null;
  countries: string[];
};

export type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
};

export type UncontrolledFormValues = FormValues & {
  picture: File | undefined;
  age: number | undefined;
};

export type ControlledFormValues = FormValues & {
  age: number;
  picture: FileList;
};

export type StateValues = FormValues & {
  id: number;
  age: number | undefined;
  picture: string | null;
};
