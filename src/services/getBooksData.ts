import { store } from '@/store';
import { ResourceList } from './bookApi/types';
import { bookApi } from './bookApi';
import { PAGE_SIZE } from '@/views/MainPage/Main/constants';

export const getBooksData = async (
  pageNumber: number,
  searchTerm = ''
): Promise<ResourceList | undefined> => {
  const result = !searchTerm
    ? await store.dispatch(bookApi.endpoints.getBooks.initiate({ pageNumber, pageSize: PAGE_SIZE }))
    : await store.dispatch(
        bookApi.endpoints.getSearchBooks.initiate({ pageNumber, pageSize: PAGE_SIZE, searchTerm })
      );
  if (result.error) {
    throw new Error(`Error: ${result.error}`);
  }
  return result.data;
};
