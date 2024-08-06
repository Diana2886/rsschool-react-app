import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { afterEach, beforeAll, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { unselectAllItems } from '../../store/selectedItemsSlice';
import { generateCSVBlobUrl, generateSelectedItemsText } from '../../components/Flyout/helpers';
import { books } from '../__ mocks __/books';
import { Flyout } from '../../components/Flyout';

vi.mock('../../store/selectedItemsSlice', () => ({
  unselectAllItems: vi.fn(() => ({ type: 'UNSELECT_ALL_ITEMS' })),
}));

vi.mock('../../components/Flyout/helpers', () => ({
  generateSelectedItemsText: vi.fn(),
  generateCSVBlobUrl: vi.fn(),
}));

const mockStore = configureStore([]);

describe('Flyout', () => {
  let store: ReturnType<typeof mockStore>;

  beforeAll(() => {
    window.URL.revokeObjectURL = vi.fn();
  });

  beforeEach(() => {
    store = mockStore({
      selectedItems: {
        selectedItems: books,
      },
    });

    (generateSelectedItemsText as Mock).mockReturnValue('2 items are selected');
    (generateCSVBlobUrl as Mock).mockReturnValue('blob:http://localhost/blobid');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

  it('should render with selected items', () => {
    renderComponent();

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should dispatch unselectAllItems action on button click', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Unselect all'));

    expect(unselectAllItems).toHaveBeenCalled();
  });

  it('should generate and set blob URL for download', () => {
    renderComponent();

    const downloadLink = screen.getByText('Download').closest('a');
    expect(downloadLink).toHaveAttribute('href', 'blob:http://localhost/blobid');
    expect(downloadLink).toHaveAttribute('download', '2_books.csv');
  });

  it('should not render when there are no selected items', () => {
    store = mockStore({
      selectedItems: {
        selectedItems: [],
      },
    });

    renderComponent();

    expect(screen.queryByText('2 items are selected')).not.toBeInTheDocument();
    expect(screen.queryByText('Unselect all')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });
});
