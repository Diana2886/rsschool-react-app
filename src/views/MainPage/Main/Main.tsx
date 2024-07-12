import { FC, useCallback, useEffect, useState } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY, PAGE_SIZE } from './constants';
import { api } from '../../../services/api';
import { Book, ResourceList } from '../../../services/types';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../../components/Pagination';
import { BookDetails } from '../../../components/BookDetails';
import './Main.css';

export const Main: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(FIRST_PAGE_NUMBER);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<string>('');

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
          setBooks(data.books);
          setFilteredBooks(filterBooks(data.books, searchTerm));
          setTotalPages(data.page.totalPages);
          setPageNumber(page);
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

  useEffect(() => {
    getData(pageNumber);
  }, [getData, pageNumber]);

  useEffect(() => {
    if (details) {
      navigate(`?page=${pageNumber}&details=${details}`);
    } else {
      navigate(`?page=${pageNumber}`);
    }
  }, [details, navigate, pageNumber]);

  useEffect(() => {
    const newFilteredBooks = filterBooks(books, searchTerm);
    setFilteredBooks(newFilteredBooks);
  }, [books, searchTerm, filterBooks]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    getData(FIRST_PAGE_NUMBER);
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleBookClick = (bookId: string) => {
    console.log('bookId:', bookId);
    setDetails(bookId);
  };

  const handleClose = () => {
    setDetails('');
  };

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <div className="left-section" /* onClick={() => navigate(`?page=${pageNumber}`)} */>
            <SearchResult books={filteredBooks} onBookClick={handleBookClick} />
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          {details && (
            <div className="right-section">
              <BookDetails onClose={handleClose} />
            </div>
          )}
        </div>
      )}
    </main>
  );
};
