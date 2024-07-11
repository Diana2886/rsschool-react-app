import { FC } from 'react';
import { CardProps } from './types';
import '../../../App.css';

export const Card: FC<CardProps> = ({ book }) => {
  const publishedYear = book.publishedYear || '';
  const numberOfPages = book.numberOfPages || '';

  return (
    <div className="card">
      <h2 className="card-title">{book.title}</h2>
      <p>Year of publication: {publishedYear}</p>
      <p>Pages number: {numberOfPages}</p>
    </div>
  );
};
