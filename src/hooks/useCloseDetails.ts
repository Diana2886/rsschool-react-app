import { useRouter } from 'next/router';
import { useSearchTerm } from './useSearchTerm';
import { LOCAL_STORAGE_KEY } from '@/components/Main/constants';
import { getUrlPath } from '@/utils/getUrlPath';

export const useCloseDetails = (pageNumber: number) => {
  const router = useRouter();
  const [searchTerm] = useSearchTerm(LOCAL_STORAGE_KEY);

  const closeDetails = () => {
    router.push(`${getUrlPath(pageNumber, searchTerm)}`);
  };

  return { closeDetails };
};
