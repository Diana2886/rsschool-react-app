import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, SEARCH_URL, SEARCH_HEADERS } from './constants';
import { BookData, QueryParams, ResourceList } from './types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<ResourceList, QueryParams>({
      query: ({ pageNumber, pageSize }) => {
        return {
          url: SEARCH_URL,
          params: { pageSize, pageNumber: pageNumber - 1 },
        };
      },
    }),
    getSearchBooks: builder.query<ResourceList, QueryParams>({
      query: ({ pageNumber, pageSize, searchTerm }) => {
        return {
          url: SEARCH_URL,
          method: 'POST',
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber - 1,
          },
          body: `title=${searchTerm}`,
          headers: SEARCH_HEADERS,
        };
      },
    }),
    getBookDetails: builder.query<BookData, string>({
      query: (uid) => `?uid=${uid}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSearchBooksQuery, useGetBookDetailsQuery } = bookApi;
