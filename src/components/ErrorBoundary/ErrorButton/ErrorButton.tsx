import { FC, useState } from 'react';

export const ErrorButton: FC = () => {
  const [isError, setIsError] = useState(false);

  if (isError) throw new Error('TEST ERROR!');

  return (
    <button
      className="button button-error"
      onClick={() => {
        setIsError(true);
      }}
    >
      TEST ERROR
    </button>
  );
};
