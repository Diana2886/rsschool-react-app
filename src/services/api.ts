import { URL_BOOK_SEARCH, URL_BOOK_DETAILS } from './constants';
import { setUrl } from './helpers';

export const api = {
  fetchBooks: async (pageNumber: number, pageSize: number) => {
    const url = setUrl(URL_BOOK_SEARCH, { pageNumber, pageSize });
    return await fetch(url);
  },

  fetchSearchBooks: async (pageNumber: number, pageSize: number, searchTerm: string = '') => {
    const url = setUrl(URL_BOOK_SEARCH, { pageNumber, pageSize });
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${encodeURIComponent(searchTerm)}`,
    };
    return await fetch(url, options);
  },

  fetchBookDetails: async (bookId: string) => {
    const url = setUrl(URL_BOOK_DETAILS, { bookId });
    return await fetch(url);
  },
};
