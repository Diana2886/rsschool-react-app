import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';
import { Link, useSearchParams } from 'react-router-dom';
import { FIRST_PAGE_NUMBER } from '../../views/MainPage/Main/constants';

export const SearchResult: FC<SearchResultProps> = ({ books }) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);
  console.log('searchParams', searchParams.get('page'));

  return (
    <section className="searchResult">
      {books.length > 0 ? (
        books.map((book) => (
          <Link to={`details/${book.uid}?page=${page}`} key={book.uid}>
            <Card key={book.uid} book={book} />
          </Link>
        ))
      ) : (
        <h3>No Books Found</h3>
      )}
    </section>
  );
};
