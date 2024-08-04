import { Book /* , BookData, ResourceList */ } from '@/services/bookApi/types';

export type MainProps = {
  books: Book[];
  totalElements: number;
  bookDetails: Book | undefined;
  // booksDataPromise: ResourceList;
  // bookDetailsPromise: BookData | null;
};
