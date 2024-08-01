import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';
import styles from './SearchResult.module.scss';
import Link from 'next/link';
import { usePage } from '@/hooks/usePage';

export const SearchResult: FC<SearchResultProps> = ({ books }) => {
  const page = usePage();

  return (
    <section className={styles['searchResult']}>
      {books.length > 0 ? (
        books.map((book) => (
          <Link href={`details/${book.uid}?page=${page}`} key={book.uid}>
            <Card key={book.uid} book={book} />
          </Link>
        ))
      ) : (
        <h3>No Books Found</h3>
      )}
    </section>
  );
};
