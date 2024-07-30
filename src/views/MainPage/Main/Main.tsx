import { FC } from 'react';
import { LOCAL_STORAGE_KEY, PAGE_SIZE } from './constants';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Pagination } from '../../../components/Pagination';
import { useCloseDetails } from '../../../hooks/useCloseDetails';
import { Flyout } from '../../../components/Flyout';
import { ErrorPage } from '../../ErrorPage';
import { useBooksQuery } from '../../../hooks/useBookQuery';
import { usePage } from '../../../hooks/usePage';
import styles from './Main.module.scss';
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';

// const BookDetailsPage = dynamic(() => import('../../../pages/details/[bookId]'), {
//   loading: () => <Loader />,
// });

export const Main: FC = () => {
  const router = useRouter();
  const pageNumber = usePage();
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);

  const { data, isLoading, isFetching, isError } = useBooksQuery({
    pageSize: PAGE_SIZE,
    pageNumber,
    searchTerm,
  });

  const books = data?.books || [];
  const totalElements = data?.page.totalElements || 0;
  const { bookId } = router.query;

  const { closeDetails } = useCloseDetails(pageNumber);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number | string) => {
    router.push(`?page=${page}`);
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const htmlElement = e.target as HTMLElement;
    if (bookId && !htmlElement.closest('a') && !htmlElement.closest('li')) {
      closeDetails();
    }
  };

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      {isLoading || isFetching ? (
        <Loader />
      ) : (
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
          {bookId && (
            <div className={styles['right-section']}>{/* <BookDetailsPage book={book} /> */}</div>
          )}
        </div>
      )}
    </main>
  );
};
