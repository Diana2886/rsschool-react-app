import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validationSchema } from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHookFormData } from '../../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { HookFormValues } from '../../store/types';

export function HookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.form.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<HookFormValues> = async (data) => {
    // dispatch(addHookFormData(data));
    // const pictureBase64 = data.picture
    //   ? await new Promise<string>((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => resolve(reader.result as string);
    //       reader.onerror = reject;
    //       reader.readAsDataURL(data.picture[0]);
    //     })
    //   : null;

    // const stateData: StateValues = {
    //   ...data,
    //   picture: pictureBase64,
    // };

    // dispatch(addHookFormData(stateData));
    if (data.picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setPictureBase64(reader.result as string);
        dispatch(addHookFormData({ ...data, picture: reader.result as string }));
      };
      reader.readAsDataURL(data.picture[0]);
    }
    console.log('hook data', data);
    navigate('/');
  };

  return (
    <>
      <h1>Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} />
        <small>{errors.name && <div>{errors.name.message}</div>}</small>

        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        <small>{errors.age && <div>{errors.age.message}</div>}</small>

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        <small>{errors.email && <div>{errors.email.message}</div>}</small>

        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        <small>{errors.password && <div>{errors.password.message}</div>}</small>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} />
        <small>{errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}</small>

        <label>Gender:</label>
        <input type="radio" id="male" value="male" {...register('gender')} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" value="female" {...register('gender')} />
        <label htmlFor="female">Female</label>
        <small>{errors.gender && <div>{errors.gender.message}</div>}</small>

        <label>
          <input type="checkbox" {...register('terms')} />
          Accept Terms and Conditions
        </label>
        <small>{errors.terms && <div>{errors.terms.message}</div>}</small>

        <label htmlFor="picture">Upload Picture:</label>
        <input id="picture" type="file" {...register('picture')} accept="image/png, image/jpeg" />
        <small>{errors.picture && <div>{errors.picture.message}</div>}</small>

        <label htmlFor="country">Country:</label>
        <select id="country" {...register('country')}>
          {countries.map((country: string) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <small>{errors.country && <div>{errors.country.message}</div>}</small>

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </>
  );
}
