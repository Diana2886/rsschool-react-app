import { useSearchParams } from 'next/navigation';
import { FIRST_PAGE_NUMBER } from '../components/Main/constants';
// import { useRouter } from 'next/router';

export const usePage = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const pageNumber = parseInt(page || `${FIRST_PAGE_NUMBER}`, 10);

  return pageNumber;
};
