import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validationSchema } from '../../shared/validation/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { addControlledSubmission } from '../../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { ControlledFormValues } from '../../store/types';
import { FormInput } from '../FormInput';
import { useEffect, useState } from 'react';
import { areAllFieldsFilledIn } from './helpers';
import { CONTROLLED_FORM_FIELDS } from './constants';

export function ControlledForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.form.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<ControlledFormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const watchedFields = watch(CONTROLLED_FORM_FIELDS);

  useEffect(() => {
    const allFieldsTouchedAndDirty = areAllFieldsFilledIn(CONTROLLED_FORM_FIELDS, getValues);
    setIsButtonDisabled(!allFieldsTouchedAndDirty || Object.keys(errors).length > 0);
  }, [errors, getValues, watchedFields]);

  const onSubmit: SubmitHandler<ControlledFormValues> = async (data) => {
    if (data.picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          addControlledSubmission({ ...data, picture: reader.result as string, id: Date.now() })
        );
      };
      reader.readAsDataURL(data.picture[0]);
    }
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          type="text"
          label="Name:"
          error={errors.name?.message}
          registerKey="name"
          register={register}
        />
        <FormInput
          id="age"
          type="number"
          label="Age:"
          error={errors.age?.message}
          registerKey="age"
          register={register}
        />
        <FormInput
          id="email"
          type="email"
          label="Email:"
          error={errors.email?.message}
          registerKey="email"
          register={register}
        />
        <FormInput
          id="password"
          type="password"
          label="Password:"
          error={errors.password?.message}
          registerKey="password"
          register={register}
        />
        <FormInput
          id="confirmPassword"
          type="password"
          label="Confirm Password:"
          error={errors.confirmPassword?.message}
          registerKey="confirmPassword"
          register={register}
        />
        <div className="form-field">
          <label>Gender:</label>
          <FormInput
            id="male"
            type="radio"
            label="Male"
            value="male"
            error={errors.gender?.message}
            registerKey="gender"
            register={register}
          />
          <FormInput
            id="female"
            type="radio"
            label="Female"
            value="female"
            error={errors.gender?.message}
            registerKey="gender"
            register={register}
          />
          {errors.gender && <small>{errors.gender?.message}</small>}
        </div>
        <FormInput
          id="terms"
          type="checkbox"
          label="Accept Terms and Conditions"
          error={errors.terms?.message}
          registerKey="terms"
          register={register}
        />
        <FormInput
          id="picture"
          type="file"
          label="Upload Picture:"
          accept="image/png, image/jpeg"
          error={errors.picture?.message}
          registerKey="picture"
          register={register}
        />
        <FormInput
          id="country"
          type="select"
          label="Country:"
          options={countries.map((country) => ({ value: country, label: country }))}
          error={errors.country?.message}
          registerKey="country"
          register={register}
        />
        <button type="submit" disabled={isButtonDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}
