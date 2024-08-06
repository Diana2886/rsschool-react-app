import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../../components/ErrorBoundary';

vi.mock('../../views/ErrorPage', () => ({
  ErrorPage: () => <div>Mock ErrorPage</div>,
}));

const renderProblemChild = () => {
  const ProblemChild = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
};

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should render ErrorPage when there is an error', () => {
    renderProblemChild();

    expect(screen.getByText('Mock ErrorPage')).toBeInTheDocument();
  });

  it('should log error to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderProblemChild();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
    consoleSpy.mockRestore();
  });
});
