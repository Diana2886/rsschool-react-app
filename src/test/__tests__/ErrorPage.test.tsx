import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorPage } from '../../views/ErrorPage';

describe('ErrorPage', () => {
  it('should render the error message', () => {
    const mockError = new Error('Test error message');

    render(<ErrorPage error={mockError} />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
});
