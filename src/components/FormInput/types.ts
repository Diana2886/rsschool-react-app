import { UseFormRegister } from 'react-hook-form';
import { ControlledFormValues } from '../../store/types';

export type FormInputProps = {
  id: string;
  type: string;
  label: string;
  name?: string;
  value?: string | number;
  error?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  register?: UseFormRegister<ControlledFormValues>;
  registerKey?: keyof ControlledFormValues;
};
