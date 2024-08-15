import { useRef, useState } from 'react';
import { addUncontrolledData } from '../../store/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../../utils/validationSchema';
import { UncontrolledFormValues } from '../../store/types';

export function UncontrolledForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.form.countries);
  //   const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  //   const [pictureBase64, setPictureBase64] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      picture: formData.get('picture') as File,
      country: formData.get('country') as string,
    };

    // if (data.picture instanceof File && data.picture.size === 0) {
    //   data.picture = null;
    // }
    console.log('data', data);

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
        // setPictureBase64(reader.result as string);
        if (reader.result) {
          dispatch(addUncontrolledData({ ...data, picture: reader.result as string }));
          navigate('/');
        }
      };
      reader.readAsDataURL(data.picture);
    }
  };

  //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value, type } = e.target;
  //     const checked = (e.target as HTMLInputElement).checked;
  //     const files = (e.target as HTMLInputElement).files;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: type === 'checkbox' ? checked : type === 'file' ? files : value,
  //     }));
  //   };

  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log('formData', formData);
  //     dispatch(addUncontrolledData(formData));
  //     navigate('/');
  //   };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          validate();
        }}
      >
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" />
        <small>{errors.name && <div>{errors.name}</div>}</small>

        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="number" />
        <small>{errors.age && <div>{errors.age}</div>}</small>

        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
        <small>{errors.email && <div>{errors.email}</div>}</small>

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
        <small>{errors.password && <div>{errors.password}</div>}</small>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
        <small>{errors.confirmPassword && <div>{errors.confirmPassword}</div>}</small>

        <label>Gender:</label>
        <div className="radio">
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>
        </div>
        <div className="radio">
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>
        </div>
        <small>{errors.gender && <div>{errors.gender}</div>}</small>

        <label>
          <input type="checkbox" name="terms" />
          Accept Terms and Conditions
        </label>
        <small>{errors.terms && <div>{errors.terms}</div>}</small>

        <label htmlFor="picture">Upload Picture:</label>
        <input id="picture" name="picture" type="file" accept="image/png, image/jpeg" />
        <small>{errors.picture && <div>{errors.picture}</div>}</small>

        <label htmlFor="country">Country:</label>
        <select id="country" name="country">
          {countries.map((country: string) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <small>{errors.country && <div>{errors.country}</div>}</small>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
