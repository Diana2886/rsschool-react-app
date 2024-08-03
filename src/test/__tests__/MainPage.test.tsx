import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { books } from '../__ mocks __/books';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import MainPage, { getServerSideProps } from '@/pages';
import { Book } from '@/services/bookApi/types';
import { GetServerSidePropsContext } from 'next';
import { renderWithRouter } from '../__ mocks __/nextRouter';
import { bookDetailsSpy } from '../__ mocks __/api/handlers';

type MainPageProps = {
  props: {
    books: Book[];
    totalElements: number;
    bookDetails: Book | null;
  };
};

const mockPush = vi.fn();

const mockRouter = {
  query: { page: '1', search: '', details: '1' },
  push: mockPush,
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const renderMainPage = async () => {
  const context = {
    query: { page: '1', search: '', details: '1' },
  } as unknown as GetServerSidePropsContext;

  const response = await getServerSideProps(context);
  const { props } = response as unknown as MainPageProps;

  return renderWithRouter(
    <Provider store={store}>
      <MockThemeContextProvider>
        <MainPage {...props} />
      </MockThemeContextProvider>
    </Provider>
  );
};

const clickedCard = books[0];

const clickCard = async () => {
  await renderMainPage();
  const card = await screen.findByText(clickedCard.title);
  fireEvent.click(await card);
};

describe('Card Component', () => {
  it('validates that clicking on a card opens a detailed card component', async () => {
    await clickCard();

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
      expect(screen.getByText('Authors: Author 1')).toBeInTheDocument();
    });
  });

  it('checks that clicking triggers an additional API call to fetch detailed information', async () => {
    await clickCard();

    await waitFor(() => {
      expect(bookDetailsSpy).toHaveBeenCalled();
    });
  });
});
