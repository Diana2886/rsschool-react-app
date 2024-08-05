'use client';

import { FC } from 'react';
import { SearchResult } from '../SearchResult';
import { Pagination } from '../Pagination';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { Flyout } from '../Flyout';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from './Main.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { MainProps } from './types';
import { BookDetails } from '@/components/BookDetails';
import { useSearchParams } from 'next/navigation';

export const Main: FC<MainProps> = ({ books, totalElements, bookDetails }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, details } = useQueryParams();
  const pathname = usePathname();
  const { closeDetails } = useCloseDetails();

  const handlePageChange = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const htmlElement = e.target as HTMLElement;
    if (details && !htmlElement.closest('a') && !htmlElement.closest('li')) {
      closeDetails();
    }
  };

  return (
    <div className={styles['main-content']} data-testid={'main-content'}>
      <div className={styles['left-section']} onClick={(e) => handleCloseDetails(e)}>
        <SearchResult books={books} />
        <Pagination
          className={styles['pagination-bar']}
          currentPage={page}
          totalElements={totalElements}
          onPageChange={handlePageChange}
        />
      </div>
      <Flyout />
      {bookDetails && (
        <div className={styles['right-section']}>{<BookDetails book={bookDetails} />}</div>
      )}
    </div>
  );
};
