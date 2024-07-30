import { useRouter } from 'next/router';

export const useCloseDetails = (pageNumber: number) => {
  const router = useRouter();

  const closeDetails = () => {
    router.push(`/?page=${pageNumber}`);
  };

  return { closeDetails };
};
