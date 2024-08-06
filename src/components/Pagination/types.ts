export type PaginationProps = {
  className: string;
  currentPage: number;
  totalElements: number;
  onPageChange: (page: number | string) => void;
};
