import { ChangeEvent, Component } from 'react';
import { SearchProps } from './types';

export class Search extends Component<SearchProps> {
  state = {
    searchTerm: '',
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = event.target.value;
    this.setState({
      searchTerm: newSearchTerm,
    });
    localStorage.setItem('searchTerm', newSearchTerm);
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({
        searchTerm: savedSearchTerm,
      });
    }
  }

  render() {
    return (
      <section className="search">
        <input
          className="input"
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.handleInputChange(e)}
        />
        <button className="button" onClick={() => this.props.onSearchClick(this.state.searchTerm)}>
          Search
        </button>
      </section>
    );
  }
}
