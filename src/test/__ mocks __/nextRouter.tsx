import { NextRouter } from 'next/router';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

export const mockRouter: Partial<NextRouter> = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  beforePopState: vi.fn(),
  isFallback: false,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
};

export const renderWithRouter = (ui: React.ReactElement, options = {}) => {
  return render(
    <RouterContext.Provider value={mockRouter as NextRouter}>{ui}</RouterContext.Provider>,
    options
  );
};
