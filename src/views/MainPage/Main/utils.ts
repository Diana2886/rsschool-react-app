import { Book } from '../../../services/types';

export const getFilteredBooks = (books: Book[], searchTerm: string) => {
  if (!searchTerm) return books;
  return books.filter((book) => book.title.toLowerCase().includes(searchTerm.trim().toLowerCase()));
};
