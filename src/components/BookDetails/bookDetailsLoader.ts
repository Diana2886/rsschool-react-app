import { api } from '../../services/api';
import { BookData } from '../../services/types';
import { CardDetailsLoader } from './types';

export const bookDetailsLoader: CardDetailsLoader = async ({ params }) => {
  const { bookId } = params;

  try {
    const response = await api.fetchBookDetails(bookId!);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data: BookData = await response.json();
    return data.book;
  } catch (error) {
    console.error('An error occurred while fetching book details:', error);
  }
};
