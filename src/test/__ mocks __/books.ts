import { Book } from '../../services/bookApi/types';

export const books: Book[] = [
  {
    uid: '1',
    title: 'Book 1',
    publishedYear: 2020,
    numberOfPages: 300,
    ebook: true,
    audiobook: false,
    authors: [],
    artists: [],
    editors: [],
    publishers: [],
    characters: [],
  },
  {
    uid: '2',
    title: 'Book 2',
    publishedYear: 2021,
    numberOfPages: 250,
    ebook: false,
    audiobook: true,
    authors: [],
    artists: [],
    editors: [],
    publishers: [],
    characters: [],
  },
];
