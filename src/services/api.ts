import { URL_BOOK_SEARCH, URL_BOOK_DETAILS } from './constants';

export const api = {
  fetchData: async (pageNumber: number, pageSize: number) => {
    const url: URL = new URL(URL_BOOK_SEARCH);
    const params: Record<string, number> = {
      pageNumber: pageNumber - 1,
      pageSize,
    };
    Object.keys(params).forEach((key) => url.searchParams.append(key, `${params[key]}`));
    return await fetch(url);
  },
  fetchBookDetails: async (bookId: string) => {
    const url: URL = new URL(URL_BOOK_DETAILS);
    url.searchParams.append('uid', bookId);
    return await fetch(url);
  },
};
