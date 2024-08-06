import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './__ mocks __/api/server';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();

  cleanup();
});
afterAll(() => server.close());
