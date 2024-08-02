import { FIRST_PAGE_NUMBER } from '../components/Main/constants';
import { useRouter } from 'next/router';

export const usePage = () => {
  const router = useRouter();
  const pageNumber = parseInt((router.query.page as string) || `${FIRST_PAGE_NUMBER}`, 10);

  return pageNumber;
};
