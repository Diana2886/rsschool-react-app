import { FC } from 'react';
import { StateFormDataProps } from './types';
import './FormsStateData.css';

export const FormsStateData: FC<StateFormDataProps> = ({ data, highlightedId }) => {
  const { id, name, email, gender, picture, country } = data;

  return (
    <div key={id} className={id === highlightedId ? 'state-data active' : 'state-data'}>
      <h3>Submission {id}</h3>
      <div>
        <h3>Form data:</h3>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Gender: {gender}</p>
        <p className="picture">Picture: {picture}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
};
