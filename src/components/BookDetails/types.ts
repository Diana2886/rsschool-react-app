import { Artist, Author, Book, Character, Editor, Publisher } from '../../services/bookApi/types';

export type Entries = Author[] | Artist[] | Editor[] | Publisher[] | Character[];

export type BookDetailsProps = {
  book: Book;
};
