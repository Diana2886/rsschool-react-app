import { Component } from 'react';
import { FIRST_PAGE_NUMBER, PAGE_SIZE } from './constants';
import { State } from './types';
import { api } from '../../../services/api';
import { Book } from '../../../services/types';
import { Search } from '../../../components/Search';
import { Loader } from '../../../components/Loader';
import { SearchResult } from '../../../components/SearchResult';

export class Main extends Component {
  state: State = {
    books: [],
    filteredBooks: [],
    pageNumber: FIRST_PAGE_NUMBER,
    searchTerm: '',
    isLoading: false,
  };

  async getData() {
    this.setState({ isLoading: true });
    try {
      const response = await api.fetchData(this.state.pageNumber, PAGE_SIZE);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          books: data.books,
          filteredBooks: this.filterBooks(data.books, this.state.searchTerm),
        });
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({
        searchTerm: savedSearchTerm,
      });
    }
    this.getData();
  }

  componentDidUpdate(_prevProps: Readonly<unknown>, prevState: Readonly<State>): void {
    if (prevState.books !== this.state.books || prevState.searchTerm !== this.state.searchTerm) {
      const filteredBooks = this.filterBooks(this.state.books, this.state.searchTerm);
      if (filteredBooks !== this.state.filteredBooks) {
        this.setState({
          filteredBooks,
        });
      }
    }
  }

  filterBooks(books: Book[], searchTerm: string) {
    if (!searchTerm) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    this.getData();
  };

  render() {
    return (
      <main>
        <Search onSearchClick={this.handleSearch} />
        {this.state.isLoading ? <Loader /> : <SearchResult books={this.state.filteredBooks} />}
      </main>
    );
  }
}
