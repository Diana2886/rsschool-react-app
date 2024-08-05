'use client';

import { FC, useRef } from 'react';
import styles from './Search.module.scss';
import { FIRST_PAGE_NUMBER } from '../Main/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryParams } from '@/hooks/useQueryParams';

export const Search: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { search } = useQueryParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const inputValue = inputRef.current?.value || '';
    const params = new URLSearchParams(searchParams);
    params.set('page', `${FIRST_PAGE_NUMBER}`);
    if (inputValue) {
      params.set('search', inputValue);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className={styles['search']}>
      <input ref={inputRef} className="input" type="text" defaultValue={search} />
      <button className="button" onClick={handleSearchClick}>
        Search
      </button>
    </section>
  );
};
