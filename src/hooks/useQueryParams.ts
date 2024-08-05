import { useSearchParams } from 'next/navigation';
import { FIRST_PAGE_NUMBER } from '../components/Main/constants';

export const useQueryParams = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || `${FIRST_PAGE_NUMBER}`, 10);
  const search = searchParams.get('search') || '';
  const details = searchParams.get('details') || '';

  return {
    page,
    search,
    details,
  };
};
