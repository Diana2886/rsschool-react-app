import { LOCAL_STORAGE_KEY } from '@/components/Main/constants';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useSearchTerm = (): [string, Dispatch<SetStateAction<string>>] => {
  const key = LOCAL_STORAGE_KEY;

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedSearchTerm = localStorage.getItem(key);
      return savedSearchTerm ? savedSearchTerm : '';
    }
    return '';
  });

  useEffect(() => {
    const setLocalStorage = () => {
      localStorage.setItem(key, searchTerm);
    };
    setLocalStorage();

    return () => {
      setLocalStorage();
    };
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];
};
