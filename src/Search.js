import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
import sortBy from 'sort-by'


class Search extends React.Component {
    state = {
        query: '',
        searchedBooks: []
    }


    updateQuery = (e) => {
        const query = e.target.value;
        this.setState({ query: query });
        this.searchForBooks(query);
    }

    searchForBooks = (query) => {
        if (query) {
            BooksAPI.search(query, 20).then(books => {
                console.log(books);
                if (typeof books === 'undefined' || books.length < 1 || books.error) {
                    this.setState({ searchedBooks: [] })
                    return;
                }
                //show only books with images
                books = books.filter((book) => book.imageLinks);
                const shelved = this.checkIfSame(this.props.allBooks, books);
                shelved.sort(sortBy('title'));
                this.setState({ searchedBooks: shelved })
            })
        }

    }

    checkIfSame(shelf, search) {
        return search.map(book => {
            for (let b of shelf) {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                    break;
                } else {
                    book.shelf = "none"
                }
            }
            return book;
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.updateQuery} value={this.state.query} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.length > 0 ? (this.state.searchedBooks.map(book =>
                            <li key={book.id}><Book book={book} shelf={book.shelf} onUpdate={this.props.onUpdate} title={book.title} authors={book.authors}
                                img={book.imageLinks.thumbnail} /></li>
                        )) : (<p>No books</p>)
                        }

                    </ol>
                </div>
            </div>
        )
    }
}

Search.PropTypes = {
    onUpdate: PropTypes.func.isRequired
}

export default Search;