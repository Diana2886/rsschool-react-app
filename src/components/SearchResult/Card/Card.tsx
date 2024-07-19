import { FC } from 'react';
import { CardProps } from './types';
import './Card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectItem, unselectItem } from '../../../store/selectedItemsSlice';

export const Card: FC<CardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const isSelected = selectedItems.some((item) => item.uid === book.uid);

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(unselectItem(book.uid));
    } else {
      dispatch(selectItem(book));
    }
  };

  const publishedYear = book.publishedYear || '';
  const numberOfPages = book.numberOfPages || '';

  return (
    <div className="card">
      <h2 className="card-title">{book.title}</h2>
      <div className="card-content">
        <div className="card-description">
          <p>Year of publication: {publishedYear}</p>
          <p>Number of pages: {numberOfPages}</p>
        </div>
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </div>
    </div>
  );
};
