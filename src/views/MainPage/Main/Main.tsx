import { FC, useEffect, useRef } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY } from './constants';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Pagination } from '../../../components/Pagination';
import { useCloseDetails } from '../../../hooks/useCloseDetails';
import { Flyout } from '../../../components/Flyout';
import { usePage } from '../../../hooks/usePage';
import styles from './Main.module.scss';
import { useRouter } from 'next/router';
import { MainProps } from './types';
import { BookDetails } from '@/components/BookDetails';
import { getUrlPath } from '@/utils/getUrlPath';
import { Search } from '@/components/Search';

export const Main: FC<MainProps> = ({ books, totalElements, bookDetails }) => {
  const router = useRouter();
  const pageNumber = usePage();

  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);

  const { details } = router.query;

  const { closeDetails } = useCloseDetails(pageNumber);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      const { search } = router.query;
      if (!search && search !== searchTerm) {
        router.push(getUrlPath(pageNumber, searchTerm, details as string));
      }
      initialRender.current = false;
    }
  }, [details, pageNumber, router, searchTerm]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    console.log('searchTerm', searchTerm);
    router.push(getUrlPath(FIRST_PAGE_NUMBER, searchTerm, details as string));
  };

  const handlePageChange = (page: number | string) => {
    router.push(getUrlPath(page, searchTerm, details as string));
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const htmlElement = e.target as HTMLElement;
    if (details && !htmlElement.closest('a') && !htmlElement.closest('li')) {
      closeDetails();
    }
  };

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      <div className={styles['main-content']} data-testid={'main-content'}>
        <div className={styles['left-section']} onClick={(e) => handleCloseDetails(e)}>
          <SearchResult books={books} />
          <Pagination
            className={styles['pagination-bar']}
            currentPage={pageNumber}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </div>
        <Flyout />
        {bookDetails && (
          <div className={styles['right-section']}>{<BookDetails book={bookDetails} />}</div>
        )}
      </div>
    </main>
  );
};
