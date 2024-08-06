import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '../../components/Pagination';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Pagination Component', () => {
  it('should update URL query parameter when page changes', () => {
    const router = useRouter();

    render(
      <Pagination
        className="pagination-bar"
        currentPage={1}
        totalElements={75}
        onPageChange={(page) => router.push(`?page=${page}`)}
      />
    );

    fireEvent.click(screen.getByText('2'));

    expect(router.push).toHaveBeenCalledWith('?page=2');
  });
});
