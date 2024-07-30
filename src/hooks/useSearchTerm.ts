import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useSearchTerm = (
  key: string,
  initialValue: string = ''
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedSearchTerm = localStorage.getItem(key);
      return savedSearchTerm ? savedSearchTerm : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, searchTerm);
    }
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];
};
