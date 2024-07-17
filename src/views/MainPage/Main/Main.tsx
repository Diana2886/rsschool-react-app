import { FC, useEffect, useState } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY } from './constants';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Outlet, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../components/Pagination';
import './Main.scss';
import { useBooksData } from '../../../hooks/useBooksData';
import { useCloseDetails } from '../../../hooks/useCloseDetails';

export const Main: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(FIRST_PAGE_NUMBER);
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const { filteredBooks, totalElements, isLoading, getData } = useBooksData(searchTerm);

  const { state } = useNavigation();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { closeDetails } = useCloseDetails(pageNumber);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);
    setPageNumber(page);
    getData(page);
  }, [getData, searchParams]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number | string) => {
    if (!bookId) {
      navigate(`?page=${page}`);
    }
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    if (bookId && !(e.target as HTMLElement).closest('a')) {
      closeDetails();
    }
  };

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <div className="left-section" onClick={(e) => handleCloseDetails(e)}>
            <SearchResult books={filteredBooks} />
            <Pagination
              className="pagination-bar"
              currentPage={pageNumber}
              totalElements={totalElements}
              onPageChange={handlePageChange}
            />
          </div>
          {(bookId || state === 'loading') && (
            <div className="right-section">{state === 'loading' ? <Loader /> : <Outlet />}</div>
          )}
        </div>
      )}
    </main>
  );
};
