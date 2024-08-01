import { FC, useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEY } from './constants';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Pagination } from '../../../components/Pagination';
import { useCloseDetails } from '../../../hooks/useCloseDetails';
import { Flyout } from '../../../components/Flyout';
import { usePage } from '../../../hooks/usePage';
import styles from './Main.module.scss';
import { useRouter } from 'next/router';
import { MainProps } from './types';

export const Main: FC<MainProps> = ({ books, totalElements }) => {
  const router = useRouter();
  const pageNumber = usePage();

  const [searchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);

  const { bookId } = router.query;

  const { closeDetails } = useCloseDetails(pageNumber);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      const { search } = router.query;
      if (!search && search !== searchTerm) {
        router.push(`?page=${pageNumber}${searchTerm ? `&search=${searchTerm}` : ''}`);
      }
      initialRender.current = false;
    }
  }, [pageNumber, router, searchTerm]);

  const handlePageChange = (page: number | string) => {
    router.push(`?page=${page}${searchTerm ? `&search=${searchTerm}` : ''}`);
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const htmlElement = e.target as HTMLElement;
    if (bookId && !htmlElement.closest('a') && !htmlElement.closest('li')) {
      closeDetails();
    }
  };

  return (
    <>
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
    </>
    // {bookId && (
    //   <div className={styles['right-section']}>{/* <BookDetailsPage book={book} /> */}</div>
    // )}
  );
};
