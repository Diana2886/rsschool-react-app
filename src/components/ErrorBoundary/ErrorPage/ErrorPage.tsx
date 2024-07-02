import { Component } from 'react';
import '../../../App.css';
import { ErrorPageProps } from './types';

export class ErrorPage extends Component<ErrorPageProps> {
  render() {
    return (
      <div className="error-page">
        <h1>Something went wrong</h1>
        <p>{this.props.error.message}</p>
      </div>
    );
  }
}
