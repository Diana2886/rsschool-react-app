import { FC } from 'react';
import { BookDetailsLayoutProps } from './types';
import styles from './BookDetailsLayout.module.scss';

export const BookDetailsLayout: FC<BookDetailsLayoutProps> = ({ children }) => {
  return <div className={styles['right-section']}>{children}</div>;
};
