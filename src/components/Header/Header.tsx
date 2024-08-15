import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/">Main</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/hook-form">Hook Form</Link>
      </nav>
    </header>
  );
};
