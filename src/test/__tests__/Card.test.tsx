import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { CardProps } from '../../components/SearchResult/Card/types';
import { Card } from '../../components/SearchResult/Card';
import { book } from '../__ mocks __/book';

const renderCard = ({ book }: CardProps) => {
  return render(
    <BrowserRouter>
      <Card book={book} />
    </BrowserRouter>
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
