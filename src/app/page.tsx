import { BASE_URL, SEARCH_URL } from '@/services/bookApi/constants';
import { FIRST_PAGE_NUMBER, PAGE_SIZE } from '@/components/Main/constants';
import { Main } from '@/components/Main';
import { setUrl } from '@/services/bookApi/helpers';
import { Metadata } from 'next';
import { BookData, ResourceList } from '@/services/bookApi/types';

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

const MainPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageNumber = parseInt((searchParams.page as string) || `${FIRST_PAGE_NUMBER}`, 10);
  const searchTerm = (searchParams.search as string) || '';
  const bookId = (searchParams.details as string) || '';

  const { books, page } = await getBooksData(pageNumber, searchTerm);

  let bookData = null;
  if (bookId) {
    bookData = await getBookDetails(bookId);
  }
  return <Main books={books} totalElements={page.totalElements} bookDetails={bookData?.book} />;
};

export default MainPage;
