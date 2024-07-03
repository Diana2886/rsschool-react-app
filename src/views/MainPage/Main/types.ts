import { Book } from '../../../services/types';

export type State = {
  books: Book[];
  filteredBooks: Book[];
  pageNumber: number;
  searchTerm: string;
  isLoading: boolean;
};
