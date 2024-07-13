export interface ResourceList {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  books: Book[];
}

export interface BookData {
  book: Book;
}

export interface Book {
  uid: string;
  title: string;
  publishedYear: number;
  numberOfPages: number;
  ebook: boolean;
  audiobook: boolean;
  authors: Author[];
  artists: Artist[];
  editors: Editor[];
  publishers: Publisher[];
  characters: Character[];
}

export interface Author {
  name: string;
}

export interface Artist {
  name: string;
}

export interface Editor {
  name: string;
}

export interface Publisher {
  name: string;
}

export interface Character {
  name: string;
}
