import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTERS } from '../../routers/constants';
import { BookDetails, bookDetailsLoader } from '../../components/BookDetails';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MainPage } from '../../views/MainPage';
import { Provider } from 'react-redux';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';

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
    renderBookDetails();

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
