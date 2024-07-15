export type PaginationProps = {
  className: string;
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number | string) => void;
};
