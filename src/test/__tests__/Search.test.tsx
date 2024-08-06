import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../../components/Search';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../hooks/useSearchTerm', () => ({
  useSearchTerm: (key: string) => {
    const searchTerm = localStorage.getItem(key) || '';
    const setSearchTerm = (value: string) => {
      localStorage.setItem(key, value);
    };
    return [searchTerm, setSearchTerm];
  },
}));

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1', search: '' },
    push: mockPush,
  }),
}));

describe('Search Component', () => {
  it('should update URL with search query when search button is clicked', () => {
    render(<Search />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);

    expect(mockPush).toHaveBeenCalledWith('/?page=1&search=test');
  });

  it('should remove search query from URL if input is empty and search button is clicked', () => {
    render(<Search />);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });
});
