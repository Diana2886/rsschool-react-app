import { Component } from 'react';
import { CardProps } from './types';
import '../../../App.css';

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.book.title}</h2>
        <p>Published at {this.props.book.publishedYear}</p>
      </div>
    );
  }
}
