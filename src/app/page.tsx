import { BASE_URL, SEARCH_URL } from '@/services/bookApi/constants';
import { FIRST_PAGE_NUMBER, PAGE_SIZE } from '@/components/Main/constants';
import { Main } from '@/components/Main';
import { setUrl } from '@/services/bookApi/helpers';
import { Metadata } from 'next';
import { BookData, ResourceList } from '@/services/bookApi/types';
import { Loader } from '@/components/Loader';
import { Suspense } from 'react';
import Await from './await';
import { v4 as uuid } from 'uuid';
import { Search } from '@/components/Search';

export const metadata: Metadata = {
  title: 'Book catalog',
  description: 'List of books and their descriptions',
};

type SearchParams = {
  page?: string;
  search?: string;
  details?: string;
};

async function getBooksData(pageNumber: number, searchTerm: string): Promise<ResourceList> {
  const url = setUrl(`${BASE_URL}${SEARCH_URL}`, { pageNumber, pageSize: PAGE_SIZE });
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `title=${searchTerm}`,
    cache: 'no-store' as RequestCache,
  };
  const res = await fetch(url.href, options);
  const data = await res.json();
  return data;
}

async function getBookDetails(bookId: string): Promise<BookData> {
  const url = setUrl(BASE_URL, { bookId });

  const res = await fetch(url.href, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

const MainPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const pageNumber = Number(searchParams.page) || FIRST_PAGE_NUMBER;
  const searchTerm = searchParams.search || '';
  const bookId = searchParams.details || '';

  const booksDataPromise = getBooksData(pageNumber, searchTerm);

  let bookDataPromise = null;
  if (bookId) {
    bookDataPromise = getBookDetails(bookId);
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
