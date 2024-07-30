import { FC, useEffect, useState } from 'react';
import { CardProps } from './types';
import styles from './Card.module.scss';
import { selectItem, unselectItem } from '../../../store/selectedItemsSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const Card: FC<CardProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const { selectedItems } = useAppSelector((state) => state.selectedItems);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedItems.some((item) => item.uid === book.uid));
  }, [book.uid, selectedItems]);

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
    <div className={styles['card']}>
      <h2 className={styles['card-title']}>{book.title}</h2>
      <div className={styles['card-content']}>
        <div className={styles['card-description']}>
          <p>Year of publication: {publishedYear}</p>
          <p>Number of pages: {numberOfPages}</p>
        </div>
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </div>
    </div>
  );
};
