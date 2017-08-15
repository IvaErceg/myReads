import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js'


function BookShelf(props) {
    const books = props.books;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books ? books.map(book =>
                        <Book key={book.id} book={book} shelf={book.shelf} onUpdate={props.onUpdate} title={book.title} authors={book.authors} img={book.imageLinks.thumbnail} />)
                        : <p>"No books"</p>

                    }

                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}

export default BookShelf;