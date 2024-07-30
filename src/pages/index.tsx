import { FC } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Header } from '../views/MainPage/Header';
import { Main } from '../views/MainPage/Main';

const MainPage: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <Main />
    </div>
  );
};

export default MainPage;
