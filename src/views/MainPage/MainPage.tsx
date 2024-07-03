import { Component } from 'react';
import { Header } from './Header';
import { Main } from './Main';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
