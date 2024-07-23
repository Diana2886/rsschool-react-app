import { render, screen } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';
import { ErrorPage } from '../../views/ErrorPage';

vi.mock('react-router-dom', () => ({
  useRouteError: vi.fn(),
}));

describe('ErrorPage', () => {
  it('should render the error message', () => {
    const mockError = new Error('Test error message');
    (useRouteError as Mock).mockReturnValue(mockError);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render without error message if error is not provided', () => {
    (useRouteError as Mock).mockReturnValue(null);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });
});
