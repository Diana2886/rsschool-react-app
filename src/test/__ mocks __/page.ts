import { Page } from '@/services/bookApi/types';
import { books } from './books';
import { PAGE_SIZE } from '@/components/Main/constants';

export const emptyPage: Page = {
  totalElements: 0,
  pageNumber: 0,
  pageSize: 0,
  numberOfElements: 0,
  totalPages: 0,
  firstPage: false,
  lastPage: false,
};

export const page: Page = {
  totalElements: books.length,
  pageNumber: 0,
  pageSize: PAGE_SIZE,
  numberOfElements: books.length,
  totalPages: 1,
  firstPage: true,
  lastPage: true,
};
