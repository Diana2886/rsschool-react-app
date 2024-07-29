import { bookApi } from '../../services/bookApi';
import { BookData } from '../../services/bookApi/types';
import { store } from '../../store';
import { CardDetailsLoader } from './types';

export const bookDetailsLoader: CardDetailsLoader = async ({ params }) => {
  const { bookId } = params;

  try {
    const result = await store.dispatch(bookApi.endpoints.getBookDetails.initiate(bookId || ''));
    if (result.error) {
      throw new Error(`Error: ${result.error}`);
    }
    const data: BookData = result.data as BookData;
    return data.book;
  } catch (error) {
    console.error('An error occurred while fetching book details:', error);
  }
};
