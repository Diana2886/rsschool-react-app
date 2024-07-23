import { Mock } from 'vitest';
import { useGetBookDetailsQuery, useGetBooksQuery } from '../../services/bookApi';
import { books } from './books';
import { book } from './book';

(useGetBooksQuery as Mock).mockReturnValue({
  data: {
    page: {
      totalElements: books.length,
    },
    books,
  },
});

(useGetBookDetailsQuery as Mock).mockReturnValue({
  data: { book },
});

export { useGetBooksQuery, useGetBookDetailsQuery };
