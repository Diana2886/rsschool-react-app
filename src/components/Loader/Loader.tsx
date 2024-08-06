import { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper} data-testid="loader">
      <div className={styles.loader}></div>
    </div>
  );
};
