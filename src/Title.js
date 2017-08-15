import React from 'react';

import PropTypes from 'prop-types';

function Title(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title;