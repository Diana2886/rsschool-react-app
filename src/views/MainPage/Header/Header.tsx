import { FC } from 'react';
import { ErrorButton } from '../../../components/ErrorBoundary/ErrorButton';

export const Header: FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Book Catalog</h1>
      <ErrorButton />
    </header>
  );
};
