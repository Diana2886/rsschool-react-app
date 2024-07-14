import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTERS } from '../../routers/constants';
import { BookDetails } from '../../components/BookDetails';
import { bookDetailsLoader } from '../../components/BookDetails/bookDetailsLoader';
import { api } from '../../services/api';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { book } from '../__ mocks __/book';
import { MainPage } from '../../views/MainPage';

vi.mock('../../services/api');

const renderBookDetails = () => {
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

  return render(<RouterProvider router={router} />);
};

describe('BookDetails Component', () => {
  beforeEach(() => {
    vi.mocked(api.fetchBookDetails).mockResolvedValue({
      ok: true,
      json: async () => ({ book: book }),
    } as Response);
  });

  it('should display loading indicator while fetching data', async () => {
    renderBookDetails();

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should correctly display the detailed card data', async () => {
    renderBookDetails();

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Year of publication: 2020')).toBeInTheDocument();
      expect(screen.getByText('Number of pages: 300')).toBeInTheDocument();
      expect(screen.getByText('eBook: available')).toBeInTheDocument();
      expect(screen.getByText('Audiobook: not available')).toBeInTheDocument();
      expect(screen.getByText('Authors: Author 1')).toBeInTheDocument();
      expect(screen.getByText('Artists: Artist 1')).toBeInTheDocument();
      expect(screen.getByText('Editors: Editor 1')).toBeInTheDocument();
      expect(screen.getByText('Publishers: Publisher 1')).toBeInTheDocument();
      expect(screen.getByText('Characters: Character 1')).toBeInTheDocument();
    });
  });

  it('should hide the component on clicking the close button', async () => {
    renderBookDetails();

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /✖/i });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Book 1')).not.toBeInTheDocument();
    });
  });
});
