import { useState, useCallback } from 'react';
import { Book, ResourceList } from '../services/types';
import { api } from '../services/api';
import { PAGE_SIZE } from '../views/MainPage/Main/constants';

export const useBooksData = (searchTerm: string) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const searchStr = searchTerm.trim().toLowerCase();
        const response = !searchStr
          ? await api.fetchBooks(page, PAGE_SIZE)
          : await api.fetchSearchBooks(page, PAGE_SIZE, searchStr);
        if (response.ok) {
          const data: ResourceList = await response.json();
          setFilteredBooks(data.books);
          setTotalElements(data.page.totalElements);
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

  return { filteredBooks, totalElements, isLoading, getData };
};
