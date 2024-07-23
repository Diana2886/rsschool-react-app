import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGetBookDetailsQuery } from '../__ mocks __/bookApi';
import { books } from '../__ mocks __/books';
import { ROUTERS } from '../../routers/constants';
import { MainPage } from '../../views/MainPage';
import { BookDetails } from '../../components/BookDetails';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import { bookDetailsLoader } from '../__ mocks __/bookDetailsLoader';

const renderMain = () => {
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
    { initialEntries: [ROUTERS.root] }
  );

  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <RouterProvider router={router} />
      </MockThemeContextProvider>
    </Provider>
  );
};

vi.mock('../../services/bookApi', async () => {
  const originalModule = await vi.importActual('../../services/bookApi');
  return {
    ...originalModule,
    useGetBooksQuery: vi.fn(),
    useGetBookDetailsQuery: vi.fn(),
  };
});

vi.mock('../../components/BookDetails/bookDetailsLoader', () => ({
  bookDetailsLoader: vi.fn(),
}));

const clickedCard = books[0];

const clickCard = async () => {
  renderMain();
  const card = await screen.findByText(clickedCard.title);
  fireEvent.click(await card);
};

describe('BookDetails Component', () => {
  it('should display loading indicator while fetching data', async () => {
    await clickCard();

    await waitFor(() => {
      const mainContent = screen.getByTestId('main-content');
      expect(mainContent).toContain(screen.getByText('Loading...'));
    });
  });
});

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
      expect(useGetBookDetailsQuery).toHaveBeenCalled();
    });
  });
});
