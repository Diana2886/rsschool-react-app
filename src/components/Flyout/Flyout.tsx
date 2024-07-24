import { generateCSVBlobUrl, generateSelectedItemsText } from './helpers';
import { unselectAllItems } from '../../store/selectedItemsSlice';
import { useEffect, useState } from 'react';
import './Flyout.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FILE_NAME } from './constants';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.selectedItems);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const textContent = generateSelectedItemsText(selectedItems.length);
  const fileName = `${selectedItems.length}_${selectedItems.length === 1 ? FILE_NAME : `${FILE_NAME}s`}.csv`;

  useEffect(() => {
    if (selectedItems.length > 0) {
      const url = generateCSVBlobUrl(selectedItems);
      setBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [selectedItems]);

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{textContent}</p>
      <div className="flyout-buttons">
        <button onClick={handleUnselectAll}>Unselect all</button>
        {blobUrl && (
          <a href={blobUrl} download={fileName}>
            <button>Download</button>
          </a>
        )}
      </div>
    </div>
  );
};
