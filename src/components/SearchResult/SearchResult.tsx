import { FC } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';
import styles from './SearchResult.module.scss';
import Link from 'next/link';
import { usePage } from '@/hooks/usePage';
import { getUrlPath } from '@/utils/getUrlPath';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';

export const SearchResult: FC<SearchResultProps> = ({ books = [] }) => {
  const page = usePage();
  // const router = useRouter();
  // const { search } = router.query;

  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  return (
    <section className={styles['searchResult']}>
      {books.length > 0 ? (
        books.map((book) => (
          <Link href={getUrlPath(page, search as string, book.uid)} key={book.uid}>
            <Card key={book.uid} book={book} />
          </Link>
        ))
      ) : (
        <h3>No Books Found</h3>
      )}
    </section>
  );
};
