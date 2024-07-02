import { Component } from 'react';
import { State } from './types';

export class ErrorButton extends Component {
  state: State = {
    isError: false,
  };

  render() {
    if (this.state.isError) throw new Error('TEST ERROR!');

    return (
      <button
        className="button button-error"
        onClick={() => {
          this.setState({ isError: true });
        }}
      >
        TEST ERROR
      </button>
    );
  }
}
