import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">Main</Link>
        <Link to="/controlled-form">Controlled Form</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      </nav>
    </header>
  );
};
