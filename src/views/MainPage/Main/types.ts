import { Book } from '@/services/bookApi/types';

export type MainProps = {
  books: Book[];
  totalElements: number;
  bookDetails: Book | null;
};
