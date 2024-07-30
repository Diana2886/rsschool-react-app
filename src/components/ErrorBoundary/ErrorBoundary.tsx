import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { ErrorPage } from '../../views/ErrorPage';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: null };
  }

  // state = {
  //   error: null,
  // };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
