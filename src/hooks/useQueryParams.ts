import { FIRST_PAGE_NUMBER } from '../components/Main/constants';
import { useRouter } from 'next/router';

export const useQueryParams = () => {
  const router = useRouter();

  const page = parseInt((router.query.page as string) || `${FIRST_PAGE_NUMBER}`, 10);
  const search = (router.query.search as string) || '';
  const details = (router.query.details as string) || '';

  return {
    page,
    search,
    details,
  };
};
