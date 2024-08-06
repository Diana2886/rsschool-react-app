import { FC, useRef } from 'react';
import styles from './Search.module.scss';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useRouter } from 'next/router';
import { getUrlPath } from '@/utils/getUrlPath';
import { FIRST_PAGE_NUMBER } from '../Main/constants';

export const Search: FC = () => {
  const router = useRouter();
  const { search, details } = useQueryParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const inputValue = inputRef.current?.value || '';
    router.push(getUrlPath(FIRST_PAGE_NUMBER, inputValue, details));
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
