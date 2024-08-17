import { useRef, useState } from 'react';
import { addUncontrolledSubmission } from '../../store/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../shared/validation/validationSchema';
import { UncontrolledFormValues } from '../../store/types';
import { FormInput } from '../FormInput';

export function UncontrolledForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.form.countries);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      age: formData.get('age') ? Number(formData.get('age')) : undefined,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.has('terms'),
      picture: (formData.get('picture') as File).size
        ? (formData.get('picture') as File)
        : undefined,
      country: formData.get('country') as string,
    };

    validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        handleSubmit(data);
      })
      .catch((err) => {
        console.log('err', err);
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: { path: string; message: string }) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleSubmit = (data: UncontrolledFormValues) => {
    if (data.picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          dispatch(
            addUncontrolledSubmission({ ...data, picture: reader.result as string, id: Date.now() })
          );
          navigate('/');
        }
      };
      reader.readAsDataURL(data.picture);
    }
  };

  return (
    <div className="form-container">
      <h1>Uncontrolled Form</h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          validate();
        }}
      >
        <FormInput id="name" name="name" type="text" label="Name:" error={errors.name} />
        <FormInput id="age" name="age" type="number" label="Age:" error={errors.age} />
        <FormInput id="email" name="email" type="email" label="Email:" error={errors.email} />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password:"
          error={errors.password}
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password:"
          error={errors.confirmPassword}
        />
        <div className="form-field">
          <label>Gender:</label>
          <FormInput
            id="male"
            name="gender"
            type="radio"
            label="Male"
            value="male"
            error={errors.gender}
          />
          <FormInput
            id="female"
            name="gender"
            type="radio"
            label="Female"
            value="female"
            error={errors.gender}
          />
          {errors.gender && <small>{errors.gender}</small>}
        </div>
        <FormInput
          id="terms"
          name="terms"
          type="checkbox"
          label="Accept Terms and Conditions"
          error={errors.terms}
        />
        <FormInput
          id="picture"
          name="picture"
          type="file"
          label="Upload Picture:"
          accept="image/png, image/jpeg"
          error={errors.picture}
        />
        <FormInput
          id="country"
          name="country"
          type="select"
          label="Country:"
          options={countries.map((country) => ({ value: country, label: country }))}
          error={errors.country}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
