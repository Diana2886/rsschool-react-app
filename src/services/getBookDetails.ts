import { store } from '@/store';
import { Book, BookData } from './bookApi/types';
import { bookApi } from './bookApi';

export const getBookDetails = async (bookId: string): Promise<Book> => {
  const result = await store.dispatch(bookApi.endpoints.getBookDetails.initiate(bookId || ''));
  if (result.error) {
    throw new Error(`Error: ${result.error}`);
  }
  const data: BookData = result.data as BookData;
  return data.book;
};
