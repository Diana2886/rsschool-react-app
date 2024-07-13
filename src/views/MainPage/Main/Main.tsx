import { FC, useCallback, useEffect, useState } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY, PAGE_SIZE } from './constants';
import { api } from '../../../services/api';
import { Book, ResourceList } from '../../../services/types';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { Outlet, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../components/Pagination';
import './Main.css';

export const Main: FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(FIRST_PAGE_NUMBER);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state } = useNavigation();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const filterBooks = useCallback((books: Book[], searchTerm: string) => {
    if (!searchTerm) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, []);

  const getData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await api.fetchData(page, PAGE_SIZE);
        if (response.ok) {
          const data: ResourceList = await response.json();
          setFilteredBooks(filterBooks(data.books, searchTerm));
          setTotalPages(data.page.totalPages);
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [filterBooks, searchTerm]
  );

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

  const handlePageChange = (page: number) => {
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
              currentPage={pageNumber}
              totalPages={totalPages}
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
