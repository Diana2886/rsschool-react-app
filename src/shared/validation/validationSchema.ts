import * as yup from 'yup';
import { validateFile, validateFileSize, validateFileType } from './helpers';

export const validationSchema = yup.object({
  name: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('Name is required')
    .matches(/^\p{Lu}.*$/u, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('Password is required')
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&]).*$/,
      'Password must contain a number, an uppercase letter, a lowercase letter, and a special character'
    ),
  confirmPassword: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .bool()
    .required('T&C is required')
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .transform((value, originalValue) => {
      return originalValue && originalValue instanceof FileList && !originalValue.length
        ? undefined
        : value;
    })
    .required('Picture is required')
    .test('fileType', 'Unsupported file format', (value: FileList | File | null) =>
      validateFile(value, validateFileType)
    )
    .test('fileSize', 'File size too large', (value: FileList | File | null) =>
      validateFile(value, validateFileSize)
    ),
  country: yup.string().required('Country is required'),
});
