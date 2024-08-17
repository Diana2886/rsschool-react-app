import { ControlledFormValues } from '../../store/types';

export const CONTROLLED_FORM_FIELDS: (keyof ControlledFormValues)[] = [
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'terms',
  'picture',
  'country',
];
