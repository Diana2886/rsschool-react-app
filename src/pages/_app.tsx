import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../context/ThemeContext';
import '@/styles/globals.scss';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
