import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import App from '../../pages/_app';
import { AppProps } from 'next/app';
import { vi, describe, it, expect } from 'vitest';
import { mockRouter } from '../__ mocks __/nextRouter';
import { MockThemeContextProvider } from '../__ mocks __/theme';

vi.mock('../../hooks/usePageLoading', () => ({
  usePageLoading: () => ({
    isLoading: true,
  }),
}));

const renderApp = (props: Partial<AppProps>) => {
  const defaultProps: AppProps = {
    Component: props.Component || (() => <div>Test Component</div>),
    pageProps: props.pageProps || {},
    router: mockRouter as AppProps['router'],
  };

  return render(
    <Provider store={store}>
      <MockThemeContextProvider>
        <App {...defaultProps} />
      </MockThemeContextProvider>
    </Provider>
  );
};

describe('App Component', () => {
  it('should display the Loader component while fetching data', async () => {
    renderApp({ Component: () => <div>Test Component</div> });

    await act(async () => {
      mockRouter.events?.on;
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
