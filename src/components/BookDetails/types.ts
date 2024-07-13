import { LoaderFunction } from 'react-router-dom';
import { Artist, Author, Character, Editor, Publisher } from '../../services/types';

interface BookDetailsLoaderParams {
  id: string;
}

export type CardDetailsLoader = LoaderFunction<BookDetailsLoaderParams>;

export type Entries = Author[] | Artist[] | Editor[] | Publisher[] | Character[];
