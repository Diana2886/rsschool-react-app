import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

export const useSearchTerm = (
  key: string,
  initialValue: string = ''
): [string, Dispatch<SetStateAction<string>>] => {
  const savedSearchTerm = localStorage.getItem(key);
  const [searchTerm, setSearchTerm] = useState(() => {
    return savedSearchTerm ? savedSearchTerm : initialValue;
  });

  useEffect(() => {
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, [key, savedSearchTerm]);

  useEffect(() => {
    const setLocalStorage = () => {
      localStorage.setItem(key, searchTerm);
    };
    setLocalStorage();

    return () => {
      setLocalStorage();
    };
  }, [key, searchTerm]);

  return useMemo(() => [searchTerm, setSearchTerm], [searchTerm, setSearchTerm]);
};
