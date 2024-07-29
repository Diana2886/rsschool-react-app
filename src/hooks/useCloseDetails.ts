import { useNavigate } from 'react-router-dom';

export const useCloseDetails = (pageNumber: number) => {
  const navigate = useNavigate();

  const closeDetails = () => {
    navigate(`/?page=${pageNumber}`);
  };

  return { closeDetails };
};
