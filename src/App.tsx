import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routers/router';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
