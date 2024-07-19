import { FC } from 'react';
import { LOCAL_STORAGE_KEY, PAGE_SIZE } from './constants';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Outlet, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { Pagination } from '../../../components/Pagination';
import './Main.scss';
import { useCloseDetails } from '../../../hooks/useCloseDetails';
import { Flyout } from '../../../components/Flyout/Flyout';
import { ErrorPage } from '../../ErrorPage';
import { useBooksQuery } from '../../../hooks/useBookQuery';
import { usePage } from '../../../hooks/usePage';

export const Main: FC = () => {
  const pageNumber = usePage();
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const { data, isLoading, isFetching, isError } = useBooksQuery({
    pageSize: PAGE_SIZE,
    pageNumber,
    searchTerm,
  });
  const books = data?.books || [];
  const totalElements = data?.page.totalElements || 0;

  const { state } = useNavigation();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { closeDetails } = useCloseDetails(pageNumber);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number | string) => {
    if (!bookId) {
      navigate(`?page=${page}`);
    }
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const htmlElement = e.target as HTMLElement;
    if (bookId && !htmlElement.closest('a')) {
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
        <div className="main-content">
          <div className="left-section" onClick={(e) => handleCloseDetails(e)}>
            <SearchResult books={books} />
            <Pagination
              className="pagination-bar"
              currentPage={pageNumber}
              totalElements={totalElements}
              onPageChange={handlePageChange}
            />
          </div>
          <Flyout />
          {(bookId || state === 'loading') && (
            <div className="right-section">{state === 'loading' ? <Loader /> : <Outlet />}</div>
          )}
        </div>
      )}
    </main>
  );
};
