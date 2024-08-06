import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardProps } from '../../components/SearchResult/Card/types';
import { Card } from '../../components/SearchResult/Card';
import { book } from '../__ mocks __/book';
import { Provider } from 'react-redux';
import { store } from '../__ mocks __/store';

const renderCard = ({ book }: CardProps) => {
  return render(
    <Provider store={store}>
      <Card book={book} />
    </Provider>
  );
};

describe('Card Component', () => {
  it('renders the relevant card data', () => {
    renderCard({ book: book });

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(`Year of publication: ${book.publishedYear}`)).toBeInTheDocument();
    expect(screen.getByText(`Number of pages: ${book.numberOfPages}`)).toBeInTheDocument();
  });
});
