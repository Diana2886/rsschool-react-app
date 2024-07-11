import { FC } from 'react';
import '../../../App.css';
import { ErrorPageProps } from './types';

export const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};
