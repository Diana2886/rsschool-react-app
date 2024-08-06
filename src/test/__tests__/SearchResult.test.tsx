import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchResult } from '../../components/SearchResult';
import { Book } from '../../services/bookApi/types';
import { books } from '../__ mocks __/books';
import { Provider } from 'react-redux';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    query: { page: '1', search: '', details: '1' },
    push: mockPush,
  }),
  usePathname: vi.fn(() => '/'),
  useSearchParams: () => new URLSearchParams('page=1&details=1'),
}));

const renderSearchResult = (books: Book[]) => {
  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <SearchResult books={books} />
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('SearchResult Component', () => {
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
