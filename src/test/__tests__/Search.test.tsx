import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../../components/Search';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../hooks/useSearchTerm', () => ({
  useSearchTerm: (key: string) => {
    const searchTerm = localStorage.getItem(key) || '';
    const setSearchTerm = (value: string) => {
      localStorage.setItem(key, value);
    };
    return [searchTerm, setSearchTerm];
  },
}));

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    const onSearchClick = vi.fn();
    render(<Search onSearchClick={onSearchClick} />);

    const inputElement = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('test query');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'saved query');

    const onSearchClick = vi.fn();
    render(<Search onSearchClick={onSearchClick} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('saved query');
  });
});
