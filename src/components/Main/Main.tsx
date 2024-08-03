'use client';

import { FC, Suspense, useEffect, useRef } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY } from './constants';
import { SearchResult } from '../SearchResult';
import { useSearchTerm } from '../../hooks/useSearchTerm';
import { Pagination } from '../Pagination';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { Flyout } from '../Flyout';
import { usePage } from '../../hooks/usePage';
import styles from './Main.module.scss';
import { useRouter } from 'next/navigation';
import { MainProps } from './types';
import { BookDetails } from '@/components/BookDetails';
import { getUrlPath } from '@/utils/getUrlPath';
import { Search } from '@/components/Search';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';

export const Main: FC<MainProps> = ({ books, totalElements, bookDetails }) => {
  const router = useRouter();
  const pageNumber = usePage();
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const { closeDetails } = useCloseDetails(pageNumber);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      const search = searchParams.get('search');
      if (!search && search !== searchTerm) {
        router.push(getUrlPath(pageNumber, searchTerm, details as string));
      }
      initialRender.current = false;
    }
  }, [details, pageNumber, router, searchTerm, searchParams]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
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
          <Suspense fallback={<Loading />}>
            <SearchResult books={books} />
          </Suspense>
          <Pagination
            className={styles['pagination-bar']}
            currentPage={pageNumber}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </div>
        <Flyout />
        {bookDetails && (
          <div className={styles['right-section']}>
            {
              <Suspense fallback={<Loading />}>
                <BookDetails book={bookDetails} />
              </Suspense>
            }
          </div>
        )}
      </div>
    </main>
  );
};
