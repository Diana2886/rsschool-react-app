import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './components/Main';
import { UncontrolledForm } from './components/UncontrolledForm';
import { HookForm } from './components/HookForm';
import { Header } from './components/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
