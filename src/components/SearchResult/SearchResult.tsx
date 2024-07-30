import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';
import { FIRST_PAGE_NUMBER } from '../../views/MainPage/Main/constants';
import styles from './SearchResult.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const SearchResult: FC<SearchResultProps> = ({ books }) => {
  const router = useRouter();
  const page = parseInt((router.query.page as string) || `${FIRST_PAGE_NUMBER}`, 10);

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
