import { FC } from 'react';
import { ErrorButton } from '../../../components/ErrorBoundary/ErrorButton';
import './Header.scss';
import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header className="header">
      <h1 className="header-title">Book Catalog</h1>
      <div className="header-buttons">
        <button className="button" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <ErrorButton />
      </div>
    </header>
  );
};
