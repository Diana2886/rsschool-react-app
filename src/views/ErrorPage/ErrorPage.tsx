import { FC } from 'react';
import styles from './ErrorPage.module.scss';
import { ErrorPageProps } from './types';

export const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <div className={styles['error-page']}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error && <p>{error.message}</p>}
    </div>
  );
};
