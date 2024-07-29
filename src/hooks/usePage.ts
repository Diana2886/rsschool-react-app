import { useSearchParams } from 'react-router-dom';
import { FIRST_PAGE_NUMBER } from '../views/MainPage/Main/constants';
import { useEffect, useState } from 'react';

export const usePage = () => {
  const [pageNumber, setPageNumber] = useState(FIRST_PAGE_NUMBER);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);
    setPageNumber(page);
  }, [searchParams]);

  return pageNumber;
};
