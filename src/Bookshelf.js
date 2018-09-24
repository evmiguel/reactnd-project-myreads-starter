import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

	onStatusChange = (book) => (
		this.props.onStatusChange(book)
	)

	render() {
		return(
			<div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.props.books.map(book => (
                      <Book title={book.title}
                      		author={book.author}
                      		id={book.id}
                      		coverURL={book.coverURL}
                      		key={book.id}
                      		status={this.props.status}
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