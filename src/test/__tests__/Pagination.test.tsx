import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '../../components/Pagination';

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...mod,
    useNavigate: () => vi.fn(),
  };
});

describe('Pagination Component', () => {
  it('should update URL query parameter when page changes', () => {
    const navigate = useNavigate();

    render(
      <BrowserRouter>
        <Pagination
          className="pagination-bar"
          currentPage={1}
          totalElements={75}
          onPageChange={(page) => navigate(`?page=${page}`)}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('2'));

    expect(navigate).toHaveBeenCalledWith('?page=2');
  });
});
