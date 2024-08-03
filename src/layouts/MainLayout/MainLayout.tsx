import { FC } from 'react';
import { MainLayoutProps } from './types';
import { Header } from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className={`app ${theme}`}>
        <Header toggleTheme={toggleTheme} />
        {children}
      </div>
    </>
  );
};
