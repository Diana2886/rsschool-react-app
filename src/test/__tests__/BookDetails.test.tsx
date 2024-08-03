import { render, screen, waitFor, within } from '@testing-library/react';
import { BookDetails } from '../../components/BookDetails';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { book } from '../__ mocks __/book';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1', search: '', details: '1' },
    push: mockPush,
  }),
}));

const renderBookDetails = () => {
  return render(<BookDetails book={book} />);
};

describe('BookDetails Component', () => {
  it('should correctly display the detailed card data', async () => {
    renderBookDetails();

    await waitFor(() => {
      const detailsContainer = screen.getByTestId('details');
      const withinDetails = within(detailsContainer);

      expect(withinDetails.getByText('Test Book 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Year of publication: 2020')).toBeInTheDocument();
      expect(withinDetails.getByText('Number of pages: 300')).toBeInTheDocument();
      expect(withinDetails.getByText('eBook: available')).toBeInTheDocument();
      expect(withinDetails.getByText('Audiobook: not available')).toBeInTheDocument();
      expect(withinDetails.getByText('Authors: Author 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Artists: Artist 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Editors: Editor 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Publishers: Publisher 1')).toBeInTheDocument();
      expect(withinDetails.getByText('Characters: Character 1')).toBeInTheDocument();
    });
  });

  it('should hide the component on clicking the close button', async () => {
    renderBookDetails();

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    });

    const closeButton = await screen.findByTestId('close-button');
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?page=1');
    });
  });
});
