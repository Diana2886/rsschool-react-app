import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';
import { MainLayout } from '@/layouts/MainLayout';

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

const renderMainLayout = () => {
  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <MainLayout>
          <div data-testid="child">Child Content</div>
        </MainLayout>
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('MainLayout', () => {
  it('renders the Header and children ', () => {
    renderMainLayout();

    expect(screen.getByText('Book Catalog')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
