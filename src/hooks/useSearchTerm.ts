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
