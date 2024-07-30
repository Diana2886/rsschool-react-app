import { bookApi } from '../../services/bookApi';
import { Book, BookData } from '../../services/bookApi/types';
import { store } from '../../store';

export const bookDetailsLoader = async (bookId: string): Promise<Book> => {
  const result = await store.dispatch(bookApi.endpoints.getBookDetails.initiate(bookId || ''));
  if (result.error) {
    throw new Error(`Error: ${result.error}`);
  }
  const data: BookData = result.data as BookData;
  return data.book;
};
