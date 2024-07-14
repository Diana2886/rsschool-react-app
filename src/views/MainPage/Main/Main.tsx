import { FC, useEffect, useState } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY } from './constants';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Outlet, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../components/Pagination';
import './Main.css';
import { useBooksData } from '../../../hooks/useBooksData';

export const Main: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(FIRST_PAGE_NUMBER);
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const { filteredBooks, totalPages, isLoading, getData } = useBooksData(searchTerm);

  const { state } = useNavigation();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);
    setPageNumber(page);
    console.log('page', page);
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

  const handleCloseDetails = () => {
    if (bookId) {
      navigate(-1);
    }
  };

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <div className="left-section" onClick={handleCloseDetails}>
            <SearchResult books={filteredBooks} />
            <Pagination
              className="pagination-bar"
              currentPage={pageNumber}
              totalPageCount={totalPages}
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
