import { FIRST_PAGE_NUMBER } from '@/components/Main/constants';
import { Main } from '@/components/Main';
import { Metadata } from 'next';
import { Loader } from '@/components/Loader';
import { Suspense } from 'react';
import Await from './await';
import { v4 as uuid } from 'uuid';
import { Search } from '@/components/Search';
import { bookApi } from '@/services/bookApi';

export const metadata: Metadata = {
  title: 'Book catalog',
  description: 'List of books and their descriptions',
};

type SearchParams = {
  page?: string;
  search?: string;
  details?: string;
};

const MainPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const pageNumber = Number(searchParams.page) || FIRST_PAGE_NUMBER;
  const searchTerm = searchParams.search || '';
  const bookId = searchParams.details || '';

  const booksDataPromise = bookApi.fetchBooksData(pageNumber, searchTerm);

  let bookDataPromise = null;
  if (bookId) {
    bookDataPromise = bookApi.fetchBookDetails(bookId);
  }
  return (
    <main>
      <Search />
      <Suspense key={uuid()} fallback={<Loader />}>
        <Await promises={[booksDataPromise, bookDataPromise]}>
          {({ books, page }, book) => (
            <Main books={books} totalElements={page.totalElements} bookDetails={book?.book} />
          )}
        </Await>
      </Suspense>
    </main>
  );
};

export default MainPage;
