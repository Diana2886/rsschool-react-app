import { http, HttpResponse } from 'msw';
import { BASE_URL, SEARCH_URL } from '../../../services/bookApi/constants';
import { books } from '../books';
import { book } from '../book';
import { vi } from 'vitest';

export const bookDetailsSpy = vi.fn();

export const getBooksHandler = http.get(`${BASE_URL}${SEARCH_URL}`, () => {
  return HttpResponse.json({
    page: {
      totalElements: books.length,
    },
    books,
  });
});

export const getSearchBooksHandler = http.post(`${BASE_URL}${SEARCH_URL}`, () => {
  return HttpResponse.json({
    page: {
      totalElements: books.length,
    },
    books,
  });
});

export const getBookDetailsHandler = http.get(`${BASE_URL}`, () => {
  bookDetailsSpy();

  return HttpResponse.json({
    book,
  });
});

export const handlers = [getBooksHandler, getSearchBooksHandler, getBookDetailsHandler];
