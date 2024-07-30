import { FIRST_PAGE_NUMBER } from '../views/MainPage/Main/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const usePage = () => {
  const [pageNumber, setPageNumber] = useState(FIRST_PAGE_NUMBER);
  const router = useRouter();

  useEffect(() => {
    const page = parseInt((router.query.page as string) || `${FIRST_PAGE_NUMBER}`, 10);
    setPageNumber(page);
  }, [router]);

  return pageNumber;
};
