import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { books } from '../__ mocks __/books';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import { book } from '../__ mocks __/book';
import { bookApi } from '@/services/bookApi';
import { BookData, ResourceList } from '@/services/bookApi/types';
import { Search } from '@/components/Search';
import { Suspense } from 'react';
import { Loader } from '@/components/Loader';
import { v4 as uuid } from 'uuid';
import Await from '@/app/await';
import { Main } from '@/components/Main';
import { page } from '../__ mocks __/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: vi.fn(),
  useSearchParams: () => new URLSearchParams('page=1&details=1'),
}));

// vi.mock('@/services/bookApi', () => ({
//   bookApi: {
//     getBooksData: vi.fn(),
//     getBookDetails: vi.fn(),
//   },
// }));
// vi.mock('@/services/bookApi', async (importOriginal) => {
//   const actual = await importOriginal<typeof import('@/services/bookApi')>();
//   return {
//     ...actual,
//     bookApi: vi.fn(),
//     // getBooksData: vi.fn(),
//     // getBookDetails: vi.fn(),
//   };
// });

vi.mock('@/services/bookApi', () => ({
  bookApi: {
    getBooksData: vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          // setTimeout(
          //   () =>
          resolve({
            books,
            page,
          });
          //   300
          // );
        })
    ),
    getBookDetails: vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          /* setTimeout(() =>  */ resolve({ book }) /* , 300) */;
        })
    ),
  },
}));

const renderMainPage = async () => {
  //   const booksDataPromise: Promise<ResourceList> = new Promise((resolve) => {
  //     resolve({
  //       books,
  //       page,
  //     });
  //   });

  //   const bookDetailsPromise: Promise<BookData> = new Promise((resolve) => {
  //     resolve({ book });
  //   });

  // const { getBooksData, getBookDetails } = bookApi;

  // (getBooksData as Mock).mockReturnValue(booksDataPromise);
  // (getBookDetails as Mock).mockReturnValue(bookDetailsPromise);

  // vi.mocked(bookApi.getBooksData).mockReturnValue(booksDataPromise);
  // vi.mocked(bookApi.getBookDetails).mockReturnValue(bookDetailsPromise);
  const awaitComponent = await Await({
    promises: [bookApi.getBooksData(1, ''), bookApi.getBookDetails('1')],
    children: (booksData: ResourceList, bookDetails: BookData | null) => (
      <Main
        books={booksData.books}
        totalElements={booksData.page.totalElements}
        bookDetails={bookDetails?.book}
      />
    ),
  });

  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        {/* <MainPage searchParams={{}} /> */}
        <main>
          <Search />
          <Suspense key={uuid()} fallback={<Loader />}>
            {awaitComponent}
            {/* <Await promises={[booksDataPromise, bookDetailsPromise]}>
              {({ books, page }, book) => (
                <Main books={books} totalElements={page.totalElements} bookDetails={book?.book} />
              )}
            </Await> */}
          </Suspense>
        </main>
      </MockThemeContextProvider>
    </Provider>
  );
};

const clickedCard = books[0];

const clickCard = async () => {
  renderMainPage();
  const card = await screen.findByText(clickedCard.title);
  fireEvent.click(await card);
};

describe('Card', () => {
  beforeEach(async () => {
    await clickCard();
  });

  it('validates that clicking on a card opens a detailed card component', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
      expect(screen.getByText('Authors: Author 1')).toBeInTheDocument();
    });
  });

  it('checks that clicking triggers an additional API call to fetch detailed information', async () => {
    await waitFor(() => {
      expect(bookApi.getBookDetails).toHaveBeenCalled();
    });
  });
});
