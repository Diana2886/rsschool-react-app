import { Component } from 'react';
import { ErrorBoundaryProps } from './types';
import { ErrorPage } from '../../views/ErrorPage';

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
