import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCloseDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const closeDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    router.push(`${pathname}?${params.toString()}`);
  };

  return { closeDetails };
};
