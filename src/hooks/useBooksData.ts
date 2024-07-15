import { useState, useCallback } from 'react';
import { Book, ResourceList } from '../services/types';
import { api } from '../services/api';
import { PAGE_SIZE } from '../views/MainPage/Main/constants';
import { getFilteredBooks } from '../views/MainPage/Main/utils';

export const useBooksData = (searchTerm: string) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await api.fetchData(page, PAGE_SIZE);
        if (response.ok) {
          const data: ResourceList = await response.json();
          setFilteredBooks(getFilteredBooks(data.books, searchTerm));
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
    [searchTerm]
  );

  return { filteredBooks, totalPages, isLoading, getData };
};
