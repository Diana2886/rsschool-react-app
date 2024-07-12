import { FC } from 'react';
import { PaginationProps } from './types';
import './Pagination.css';

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          className="button pagination-button"
          key={page - 1}
          onClick={() => onPageChange(page - 1)}
          disabled={page === currentPage + 1}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
