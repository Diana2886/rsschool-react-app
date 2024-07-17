import { useSearchParams } from 'react-router-dom';
import { FIRST_PAGE_NUMBER } from '../views/MainPage/Main/constants';

export const usePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);

  return page;
};
