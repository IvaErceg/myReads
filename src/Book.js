import React from 'react';
import PropTypes from 'prop-types';



function Book(props) {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(props.img)}` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.shelf} onChange={(e) => { props.onUpdate(props.book, e.target.value) }}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title ? (props.title) : (<span>No title</span>)}</div>
            <div className="book-authors">{props.authors ? (props.authors.reduce((prev, curr) => [prev, ', ', curr])) : (<span>Unknown</span>)}</div>
        </div>

    )
}

Book.propTypes = {
    shelf: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array
}

export default Book;



