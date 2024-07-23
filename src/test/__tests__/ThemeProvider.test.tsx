import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeContext, ThemeProvider } from '../../context/ThemeContext';
import { ThemeContextType } from '../../context/ThemeContext/types';

const TestComponent = () => {
  const context = useContext(ThemeContext) as ThemeContextType;

  if (!context) {
    return <div>Context is not available</div>;
  }

  return (
    <div>
      <span data-testid="theme">{context.theme}</span>
      <button data-testid="toggle-theme" onClick={context.toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

const renderTestComponent = () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
};

describe('ThemeProvider', () => {
  it('should provide the initial theme', () => {
    renderTestComponent();

    const theme = screen.getByTestId('theme');
    expect(theme).toHaveTextContent('light');
  });

  it('should toggle the theme when toggleTheme is called', () => {
    renderTestComponent();

    const theme = screen.getByTestId('theme');
    const toggleButton = screen.getByTestId('toggle-theme');

    expect(theme).toHaveTextContent('light');

    fireEvent.click(toggleButton);
    expect(theme).toHaveTextContent('dark');

    fireEvent.click(toggleButton);
    expect(theme).toHaveTextContent('light');
  });
});
