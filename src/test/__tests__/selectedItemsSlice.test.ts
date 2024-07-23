import { describe, expect, it } from 'vitest';
import {
  selectedItemsReducer,
  selectItem,
  unselectAllItems,
  unselectItem,
} from '../../store/selectedItemsSlice';
import { books } from '../__ mocks __/books';

describe('selectedItemsSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = selectedItemsReducer(undefined, { type: '' });

    expect(result).toEqual({ selectedItems: [] });
  });

  it('should select item with "selectItem" action', () => {
    const action = { type: selectItem.type, payload: books[0] };

    const result = selectedItemsReducer({ selectedItems: [] }, action);

    expect(result.selectedItems[0].title).toBe('Book 1');
  });

  it('should unselect item with "unselectItem" action', () => {
    const selectedItems = books;

    const action = { type: unselectItem.type, payload: books[0].uid };

    const result = selectedItemsReducer({ selectedItems }, action);

    expect(result.selectedItems[0].title).toBe('Book 2');
  });

  it('should unselect all items with "unselectAllItems" action', () => {
    const selectedItems = books;

    const action = { type: unselectAllItems.type };

    const result = selectedItemsReducer({ selectedItems }, action);

    expect(result.selectedItems).toEqual([]);
  });
});
