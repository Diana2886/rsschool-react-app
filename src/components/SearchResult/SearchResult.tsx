import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';
import styles from './SearchResult.module.scss';
import Link from 'next/link';
import { useQueryParams } from '@/hooks/useQueryParams';
import { getUrlPath } from '@/utils/getUrlPath';

export const SearchResult: FC<SearchResultProps> = ({ books = [] }) => {
  const { search, page } = useQueryParams();

  return (
    <section className={styles['searchResult']}>
      {books.length > 0 ? (
        books.map((book) => (
          <Link href={getUrlPath(page, search, book.uid)} key={book.uid}>
            <Card key={book.uid} book={book} />
          </Link>
        ))
      ) : (
        <h3>No Books Found</h3>
      )}
    </section>
  );
};
