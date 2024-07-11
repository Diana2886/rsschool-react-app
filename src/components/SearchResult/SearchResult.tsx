import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';

export const SearchResult: FC<SearchResultProps> = ({ books }) => {
  return (
    <section className="searchResult">
      {books.length > 0 ? (
        books.map((book) => <Card key={book.uid} book={book} />)
      ) : (
        <h3>No Books Found</h3>
      )}
    </section>
  );
};
