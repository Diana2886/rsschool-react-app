import { ChangeEvent, FC } from 'react';
import { SearchProps } from './types';
import { useSearchTerm } from '../../hooks/useSearchTerm';
import styles from './Search.module.scss';

export const Search: FC<SearchProps> = ({ onSearchClick }) => {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className={styles['search']}>
      <input
        className="input"
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e)}
      />
      <button className="button" onClick={() => onSearchClick(searchTerm)}>
        Search
      </button>
    </section>
  );
};
