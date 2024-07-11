import { FC, useCallback, useEffect, useState } from 'react';
import { FIRST_PAGE_NUMBER, LOCAL_STORAGE_KEY, PAGE_SIZE } from './constants';
import { api } from '../../../services/api';
import { Book } from '../../../services/types';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';
import { useSearchTerm } from '../../../hooks/useSearchTerm';

export const Main: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [pageNumber] = useState<number>(FIRST_PAGE_NUMBER);
  const [searchTerm, setSearchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterBooks = useCallback((books: Book[], searchTerm: string) => {
    if (!searchTerm) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, []);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.fetchData(pageNumber, PAGE_SIZE);
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(filterBooks(data.books, searchTerm));
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, searchTerm, filterBooks]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const newFilteredBooks = filterBooks(books, searchTerm);
    setFilteredBooks(newFilteredBooks);
  }, [books, searchTerm, filterBooks]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    getData();
  };

  return (
    <main>
      <Search onSearchClick={handleSearch} />
      {isLoading ? <Loader /> : <SearchResult books={filteredBooks} />}
    </main>
  );
};
