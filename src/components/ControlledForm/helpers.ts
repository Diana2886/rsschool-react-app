import { UseFormGetValues } from 'react-hook-form';
import { ControlledFormValues } from '../../store/types';

export function areAllFieldsFilledIn(
  fieldNames: (keyof ControlledFormValues)[],
  getValues: UseFormGetValues<ControlledFormValues>
): boolean {
  return fieldNames.every((field) => !isFieldEmpty(field, getValues));
}

function isFieldEmpty(
  field: keyof ControlledFormValues,
  getValues: UseFormGetValues<ControlledFormValues>
): boolean {
  if (field === 'picture') {
    const value = getValues(field);
    const isPictureEmpty = value && value instanceof FileList && !value.length;
    return isPictureEmpty;
  }
  return !getValues(field);
}
