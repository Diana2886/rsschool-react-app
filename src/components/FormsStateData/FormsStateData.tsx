import { FC } from 'react';
import { StateFormDataProps } from './types';
import './FormsStateData.css';

export const FormsStateData: FC<StateFormDataProps> = ({ data, highlightedId }) => {
  const { id, name, age, email, password, confirmPassword, gender, terms, picture, country } = data;

  return (
    <div key={id} className={id === highlightedId ? 'state-data active' : 'state-data'}>
      <h3>Submission {id}</h3>
      <div>
        <h3>Form data:</h3>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>ConfirmPassword: {confirmPassword}</p>
        <p>Gender: {gender}</p>
        <p>Accept Terms and Conditions: {String(terms)}</p>
        <p className="picture">Picture: {picture}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
};
