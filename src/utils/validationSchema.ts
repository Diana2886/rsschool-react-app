import * as yup from 'yup';

const validateFile = (file: File | null | undefined) => {
  if (!file) return false;
  return file.size <= 5 * 1024 * 1024 && ['image/png', 'image/jpeg'].includes(file.type);
};

export const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(/(?=.*[0-9])/, 'Password must contain a number')
    .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    .matches(/(?=.*[@$!%*?&])/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('T&C is required'),
  picture: yup
    .mixed<FileList>()
    // .nullable()
    .required('Picture is required')
    .test(
      'fileTypeAndSize',
      'Unsupported file format or file size too large',
      (value: FileList | File | null) => {
        if (!value) return false;

        if (value instanceof FileList) {
          return validateFile(value[0]);
        }

        if (value instanceof File) {
          return validateFile(value);
        }

        return false;
      }
    ),
  // .test('fileSize', 'File size too large', (value) => {
  //   const file = value[0];
  //   if (file && typeof file === 'object' && 'size' in file && typeof file.size === 'number') {
  //     console.log('size is ok', file.size <= 5 * 1024 * 1024);
  //     return file.size <= 5 * 1024 * 1024;
  //   }
  //   return false;
  // })
  // .test('fileType', 'Unsupported file format', (value) => {
  //   const file = value[0];
  //   console.log('value', value);
  //   console.log('typeof file === "object"', typeof file === 'object');
  //   if (file && typeof file === 'object' && 'type' in file) {
  //     console.log('if true', ['image/png', 'image/jpeg'].includes(file.type as string));
  //     return ['image/png', 'image/jpeg'].includes(file.type as string);
  //   }
  //   return false;
  // }),
  country: yup.string().required('Country is required'),
});
