import { FC } from 'react';
import { PaginationProps } from './types';
import { SIBLING_COUNT } from './constants';
import { DOTS, usePagination } from '../../hooks/usePagination';
import classnames from 'classnames';
import './Pagination.scss';

export const Pagination: FC<PaginationProps> = (props) => {
  const { onPageChange, totalElements, currentPage, className } = props;

  const paginationRange = usePagination({
    siblingCount: SIBLING_COUNT,
    currentPage,
    totalCount: totalElements,
  });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage: number | string = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber + index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
