import { FC } from 'react';
import { MainLayoutProps } from './types';
import { Header } from '@/views/MainPage/Header';
import { useTheme } from '@/hooks/useTheme';
import { useSearchTerm } from '@/hooks/useSearchTerm';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY } from '@/views/MainPage/Main/constants';
import { useRouter } from 'next/router';
import { Search } from '@/components/Search';
import styles from './MainLayout.module.scss';

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);

  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    router.push(`?page=${FIRST_PAGE_NUMBER}${searchTerm ? `&search=${searchTerm}` : ''}`);
  };

  return (
    <>
      <div className={`app ${theme}`}>
        <Header toggleTheme={toggleTheme} />
        <main>
          <Search onSearchClick={handleSearch} />
          <div className={styles['main-content']} data-testid={'main-content'}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
