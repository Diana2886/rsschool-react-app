import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { router } from '../../routers/router';
import { store } from '../__ mocks __/store';
import { MockThemeContextProvider } from '../__ mocks __/theme';

const renderApp = () => {
  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <RouterProvider router={router} />
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('App component', () => {
  it('renders the relevant card data', () => {
    renderApp();

    expect(screen.getByText('Book Catalog')).toBeInTheDocument();
  });
});
