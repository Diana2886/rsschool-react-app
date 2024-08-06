import { PAGE_SIZE } from '@/components/Main/constants';
import { BASE_URL, SEARCH_URL } from './constants';
import { setUrl } from './helpers';
import { BookData, ResourceList } from './types';

export const bookApi = {
  getBooksData: async (pageNumber: number, searchTerm: string): Promise<ResourceList> => {
    const url = setUrl(`${BASE_URL}${SEARCH_URL}`, { pageNumber, pageSize: PAGE_SIZE });
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${searchTerm}`,
      cache: 'no-store' as RequestCache,
    };
    const res = await fetch(url.href, options);
    const data = await res.json();
    return data;
  },
  getBookDetails: async (bookId: string): Promise<BookData> => {
    const url = setUrl(BASE_URL, { bookId });

    const res = await fetch(url.href, { cache: 'no-store' });
    const data = await res.json();
    return data;
  },
};
