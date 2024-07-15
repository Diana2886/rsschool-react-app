import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.scss';

export const ErrorPage: FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.message}</p>
    </div>
  );
};
