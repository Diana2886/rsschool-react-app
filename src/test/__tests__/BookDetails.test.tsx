import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTERS } from '../../routers/constants';
import { BookDetails, bookDetailsLoader } from '../../components/BookDetails';
import { useGetBookDetailsQuery, useGetBooksQuery } from '../../services/bookApi';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, Mock, vi } from 'vitest';
import { book } from '../__ mocks __/book';
import { MainPage } from '../../views/MainPage';
import { Provider } from 'react-redux';
import { store } from '../__ mocks __/store';
import { books } from '../__ mocks __/books';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import { Loader } from '../../components/Loader';

vi.mock('../../components/BookDetails/bookDetailsLoader', () => ({
  bookDetailsLoader: vi.fn(),
}));

vi.mock('../../services/bookApi', async () => {
  const originalModule = await vi.importActual('../../services/bookApi');
  return {
    ...originalModule,
    useGetBooksQuery: vi.fn(),
    useGetBookDetailsQuery: vi.fn(),
  };
});

(useGetBooksQuery as Mock).mockReturnValue({
  data: {
    page: {
      totalElements: books.length,
    },
    books,
  },
});

const renderBookDetails = (isLoading = false) => {
  (bookDetailsLoader as Mock).mockImplementation(() => {
    const { data, isLoading, isFetching } = useGetBookDetailsQuery(books[0].uid);
    if (isLoading || isFetching) {
      return <Loader />;
    }
    return data?.book;
  });

  (useGetBookDetailsQuery as Mock).mockReturnValue({
    data: isLoading ? undefined : { book },
    isLoading,
    isFetching: isLoading,
  });

  const router = createMemoryRouter(
    [
      {
        path: ROUTERS.root,
        element: <MainPage />,
        children: [
          {
            path: ROUTERS.main.details,
            element: <BookDetails />,
            loader: bookDetailsLoader,
          },
        ],
      },
    ],
    { initialEntries: [`/details/1`] }
  );

  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <RouterProvider router={router} />
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('BookDetails Component', () => {
  it('should correctly display the detailed card data', async () => {
    renderBookDetails(false);

    await waitFor(() => {
      const detailsContainer = screen.getByTestId('details');
      const withinDetails = within(detailsContainer);

      expect(withinDetails.getByText('Test Book 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Year of publication: 2020')).toBeInTheDocument();
      expect(withinDetails.getByText('Number of pages: 300')).toBeInTheDocument();
      expect(withinDetails.getByText('eBook: available')).toBeInTheDocument();
      expect(withinDetails.getByText('Audiobook: not available')).toBeInTheDocument();
      expect(withinDetails.getByText('Authors: Author 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Artists: Artist 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Editors: Editor 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Publishers: Publisher 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Characters: Character 1')).toBeInTheDocument();
    });
  });

  it('should hide the component on clicking the close button', async () => {
    renderBookDetails();

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    const closeButton = await screen.findByTestId('close-button');
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Book 1')).not.toBeInTheDocument();
    });
  });
});
