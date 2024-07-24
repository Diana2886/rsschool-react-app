import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { setupStore } from '../store';
import { server } from './__ mocks __/api/server';
import { bookApi } from '../services/bookApi';

const store = setupStore({});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(bookApi.util.resetApiState());

  cleanup();
});
afterAll(() => server.close());
