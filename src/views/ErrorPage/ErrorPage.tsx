'use client';

import { FC } from 'react';
import styles from './ErrorPage.module.scss';

export const ErrorPage: FC = () => {
  return (
    <div className={styles['error-page']}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* {error && <p>{error.message}</p>} */}
    </div>
  );
};
