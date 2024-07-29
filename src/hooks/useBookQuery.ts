import { useGetBooksQuery, useGetSearchBooksQuery } from '../services/bookApi';
import { QueryParams } from '../services/bookApi/types';

export const useBooksQuery = ({ pageSize, pageNumber, searchTerm }: QueryParams) => {
  const booksQueryResult = useGetBooksQuery({ pageSize, pageNumber });

  const searchBooksQueryResult = useGetSearchBooksQuery({ pageSize, pageNumber, searchTerm });

  return searchTerm ? searchBooksQueryResult : booksQueryResult;
};
