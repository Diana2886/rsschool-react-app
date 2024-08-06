import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../context/ThemeContext';
import '@/styles/globals.scss';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { Loader } from '@/components/Loader';
import { usePageLoading } from '@/hooks/usePageLoading';

type Page<P = object> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const { isLoading } = usePageLoading();

  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider>
            {getLayout(
              <>
                {isLoading && <Loader />}
                <Component {...pageProps} />
              </>
            )}
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </>
  );
};

export default App;
