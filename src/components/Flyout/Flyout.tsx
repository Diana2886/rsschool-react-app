import { useSelector, useDispatch } from 'react-redux';
import { generateCSVBlobUrl, generateSelectedItemsText } from './helpers';
import { RootState } from '../../store';
import { unselectAllItems } from '../../store/selectedItemsSlice';
import { useEffect, useState } from 'react';
import './Flyout.scss';

export const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const textContent = generateSelectedItemsText(selectedItems.length);
  const fileName = `${selectedItems.length}_${selectedItems.length === 1 ? 'item' : 'items'}.csv`;

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
