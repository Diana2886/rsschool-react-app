import { useRouter } from 'next/router';
import { getUrlPath } from '@/utils/getUrlPath';
import { useQueryParams } from './useQueryParams';

export const useCloseDetails = () => {
  const router = useRouter();
  const { search, page } = useQueryParams();

  const closeDetails = () => {
    router.push(`${getUrlPath(page, search)}`);
  };

  return { closeDetails };
};
