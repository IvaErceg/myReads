import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf.js';
import Title from './Title'
import Search from './Search.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  updateBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          //remove book if already on the shelf and add it on the new shelf
          books: this.state.books.filter(b => b.id !== book.id).concat([book])
        }));
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <Title title="MyReads" />
            <div className="list-books-content">
              <div>
                <BookShelf onUpdate={this.updateBook} books={this.state.books.filter(book => book.shelf === "currentlyReading")} title={"Currently reading"} />
                <BookShelf onUpdate={this.updateBook} books={this.state.books.filter(book => book.shelf === "wantToRead")} title={"Want to read"} />
                <BookShelf onUpdate={this.updateBook} books={this.state.books.filter(book => book.shelf === "read")} title={"Read"} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <Search allBooks={this.state.books} onUpdate={(book, shelf) => { this.updateBook(book, shelf); history.push("/") }} />
        )} />
      </div>
    )
  }
}
export default BooksApp;