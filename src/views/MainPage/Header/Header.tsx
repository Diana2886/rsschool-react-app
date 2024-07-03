import { Component } from 'react';
import { ErrorButton } from '../../../components/ErrorBoundary/ErrorButton';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">Book Catalog</h1>
        <ErrorButton />
      </header>
    );
  }
}
