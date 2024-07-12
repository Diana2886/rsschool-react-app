import { Book } from '../../services/types';

export interface SearchResultProps {
  books: Book[];
  onBookClick: (bookId: string) => void;
}
