import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { SearchResult } from '../../components/SearchResult';
import { Book } from '../../services/bookApi/types';
import { books } from '../__ mocks __/books';
import { Provider } from 'react-redux';
import { store } from '../../store';

vi.mock('../../services/bookApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/bookApi')>();
  return {
    ...actual,
    useGetBookDetailsQuery: vi.fn(),
  };
});

const renderSearchResult = (books: Book[]) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <SearchResult books={books} />
      </BrowserRouter>
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
