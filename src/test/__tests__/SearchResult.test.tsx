import { render, screen, waitFor } from '@testing-library/react';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { SearchResult } from '../../components/SearchResult';
import { FIRST_PAGE_NUMBER } from '../../views/MainPage/Main/constants';
import { Book } from '../../services/types';
import userEvent from '@testing-library/user-event';
import { api } from '../../services/api';
import { ROUTERS } from '../../routers/constants';
import { BookDetails } from '../../components/BookDetails';
import { bookDetailsLoader } from '../../components/BookDetails/bookDetailsLoader';
import { books } from '../__ mocks __/books';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const renderSearchResult = (books: Book[]) => {
  return render(
    <BrowserRouter>
      <SearchResult books={books} />
    </BrowserRouter>
  );
};

describe('SearchResult Component', () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(`page=${FIRST_PAGE_NUMBER}`)]);
  });

  it('renders the specified number of cards', () => {
    renderSearchResult(books);

    const cardElements = screen.getAllByRole('link');
    expect(cardElements).toHaveLength(books.length);
  });

  it('displays a message when no cards are present', () => {
    renderSearchResult([]);

    const messageElement = screen.getByText(/no books found/i);
    expect(messageElement).toBeInTheDocument();
  });
});

describe('Card Component', () => {
  const renderSearchResults = () => {
    const router = createMemoryRouter(
      [
        {
          path: ROUTERS.root,
          element: <SearchResult books={books} />,
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

    render(<RouterProvider router={router} />);
  };

  it('validates that clicking on a card opens a detailed card component', async () => {
    renderSearchResult(books);

    const cardElement = screen.getByText(books[0].title);
    expect(cardElement).toBeInTheDocument();

    await userEvent.click(cardElement);
    expect(window.location.pathname).toContain('/details/1');
  });

  it('checks that clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchBookDetailsSpy = vi.spyOn(api, 'fetchBookDetails').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ book: books[0] }),
    } as Response);

    renderSearchResults();

    const cardElements = await screen.findAllByRole('link', { name: /Book \d/ });

    await userEvent.click(cardElements[0]);

    await waitFor(() => {
      expect(fetchBookDetailsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
