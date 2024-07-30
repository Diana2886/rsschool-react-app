import { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return <h2 className={styles['loader']}>Loading...</h2>;
};
