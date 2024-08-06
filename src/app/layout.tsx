'use client';

import '@/styles/globals.scss';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';
import { Loader } from '@/components/Loader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>
              <ThemeContent>
                <Suspense fallback={<Loader />}>{children}</Suspense>
              </ThemeContent>
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}

function ThemeContent({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`} data-testid="app">
      <Header toggleTheme={toggleTheme} />
      {children}
    </div>
  );
}
