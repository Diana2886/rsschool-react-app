import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routers/router';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
