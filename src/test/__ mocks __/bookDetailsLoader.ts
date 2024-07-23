import { Mock } from 'vitest';
import { bookDetailsLoader } from '../../components/BookDetails';
import { useGetBookDetailsQuery } from '../../services/bookApi';
import { books } from './books';

const clickedCard = books[0];

(bookDetailsLoader as Mock).mockImplementation(() => {
  const { data } = useGetBookDetailsQuery(clickedCard.uid);
  return data?.book;
});

export { bookDetailsLoader };
