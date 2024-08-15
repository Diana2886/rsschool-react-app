import { FC } from 'react';
import { StateFormDataProps } from './types';
import './StateFormData.css';

export const StateFormData: FC<StateFormDataProps> = ({ data }) => {
  const { name, email, gender, picture, country } = data;

  return (
    <div className="state-data">
      <h3>Form data:</h3>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Gender: {gender}</p>
      <p className="picture">Picture: {picture}</p>
      <p>Country: {country}</p>
    </div>
  );
};
