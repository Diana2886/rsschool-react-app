import { Component } from 'react';
import { CardProps } from './types';
import '../../../App.css';

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2 className="card-title">{this.props.book.title}</h2>
        <p>Year of publication: {this.props.book.publishedYear}</p>
        <p>Pages number: {this.props.book.numberOfPages}</p>
      </div>
    );
  }
}
