import { FC } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { useTheme } from '../../hooks/useTheme';

export const MainPage: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <Main />
    </div>
  );
};
