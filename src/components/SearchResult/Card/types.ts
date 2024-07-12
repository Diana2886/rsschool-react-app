import { MouseEventHandler } from 'react';
import { Book } from '../../../services/types';

export interface CardProps {
  book: Book;
  onClick: MouseEventHandler<HTMLDivElement>;
}
