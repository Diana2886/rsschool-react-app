import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../../components/Search';
import { describe, expect, it, vi } from 'vitest';

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    query: { page: '1', search: '' },
    replace: mockReplace,
  }),
  usePathname: vi.fn(() => '/'),
  useSearchParams: () => new URLSearchParams('page=1'),
}));

describe('Search Component', () => {
  it('should update URL with search query when search button is clicked', () => {
    render(<Search />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);

    expect(mockReplace).toHaveBeenCalledWith('/?page=1&search=test');
  });

  it('should remove search query from URL if input is empty and search button is clicked', () => {
    render(<Search />);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);

    expect(mockReplace).toHaveBeenCalledWith('/?page=1');
  });
});
