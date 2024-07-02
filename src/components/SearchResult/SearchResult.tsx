import { Component } from 'react';
import { SearchResultProps } from './types';
import { Card } from './Card';

export class SearchResult extends Component<SearchResultProps> {
  render() {
    return (
      <section className="searchResult">
        {this.props.books.map((book) => (
          <Card key={book.uid} book={book} />
        ))}
      </section>
    );
  }
}
