import { FC } from 'react';
import { ErrorButton } from '../../../components/ErrorBoundary/ErrorButton';
import { HeaderProps } from './types';
import styles from './Header.module.scss';

export const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header className={styles['header']}>
      <h1 className={styles['header-title']}>Book Catalog</h1>
      <div className={styles['header-buttons']}>
        <button className="button" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <ErrorButton />
      </div>
    </header>
  );
};
