/**

  Author: Erika Miguel
  Date: September 25, 2018

  This file describes the Bookshelf component for the My Reads project.

*/

import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

	handleShelfChange = (book, shelf) => {
		this.props.handleShelfChange(book, shelf)
	}

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
                      		shelf={book.shelf}
                      		handleShelfChange={this.handleShelfChange}
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
	handleShelfChange: PropTypes.func.isRequired
}

export default Bookshelf