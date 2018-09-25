import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

/** Module Constants */
const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'
const NONE = 'none'

class Bookshelf extends Component {

	onStatusChange = (book) => (
		this.props.onStatusChange(book)
	)

	render() {
		const { title, books } = this.props
		return(
			<div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.map(book => (
                      <Book title={book.title}
                      		authors={book.authors}
                      		id={book.id}
                      		coverURL={book.imageLinks.thumbnail}
                      		key={book.id}
                      		status={book.shelf}
                      		onStatusChange={this.onStatusChange}
                      	/>
                    ))
                  }
                </ol>
              </div>
            </div>
		)
	}
}

Bookshelf.propTypes = {
	title: PropTypes.string.isRequired,
	onStatusChange: PropTypes.func.isRequired
}

export default Bookshelf