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

export interface Book {
  uid: string;
  title: string;
  publishedYear: number;
  numberOfPages: number;
  ebook: boolean;
  audiobook: boolean;
}
