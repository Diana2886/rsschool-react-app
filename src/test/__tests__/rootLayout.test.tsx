import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import RootLayout from '@/app/layout';
import { store } from '@/store';

const renderRootLayout = () => {
  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <RootLayout>
          <div>Test Child</div>
        </RootLayout>
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('RootLayout', () => {
  it('should render children correctly', () => {
    renderRootLayout();

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should apply the correct theme class', () => {
    renderRootLayout();

    const appDiv = screen.getByTestId('app');
    expect(appDiv).toHaveClass('light');
  });
});
