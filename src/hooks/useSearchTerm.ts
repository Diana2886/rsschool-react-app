import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useSearchTerm = (
  key: string,
  initialValue: string = ''
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = localStorage.getItem(key);
    return savedSearchTerm ? savedSearchTerm : initialValue;
  });

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem(key);
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, searchTerm);

    return () => {
      localStorage.setItem(key, searchTerm);
    };
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];
};
