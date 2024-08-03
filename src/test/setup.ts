import { /*  afterAll, afterEach, beforeAll, */ vi } from 'vitest';
// import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
// import { setupStore } from '../store';
// // import { server } from './__ mocks __/api/server';
// import { bookApi } from '../services/bookApi';
import { book } from './__ mocks __/book';

vi.mock('@/services/getBooksData', () => ({
  getBooksData: vi.fn(),
}));

vi.mock('@/services/getBookDetails', () => ({
  getBookDetails: vi.fn().mockResolvedValue(book),
}));

// const store = setupStore({});

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
//   store.dispatch(bookApi.util.resetApiState());

//   cleanup();
// });
// afterAll(() => server.close());
