import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainPage } from './views/MainPage';

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
