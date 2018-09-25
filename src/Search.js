import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { CURRENTLY_READING, WANT_TO_READ, READ, NONE } from './App'

class Search extends Component {
	state = {
		query: '',
		books: [],
		activeBooks: this.props.activeBooks
	}

	handleQuery = event => {
		const query = event.target.value

		this.setState({ query: query })

		BooksAPI.search(query)
			.then(books => {
				this.setState({
					books: books
				})
			})
	}

	handleShelfChange = (book, shelf) => {
		this.props.handleShelfChange(book, shelf)
	}


	render() {
		return(
			<div className="search-books">
			    <div className="search-books-bar">
			      <Link className="close-search" to="/">Close</Link>
			      <div className="search-books-input-wrapper">
			        {/*
			          NOTES: The search from BooksAPI is limited to a particular set of search terms.
			          You can find these search terms here:
			          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			          you don't find a specific author or title. Every search is limited by search terms.
			        */}
			        <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.handleQuery}/>
			      </div>
			    </div>
			    <div className="search-books-results">
			      <ol className="books-grid">{
			      	(this.state.books !== undefined && this.state.books.length > 0) ? this.state.books.map(book => (<Book
			      							key={book.id}
			      							id={book.id}
			      							title={book.title}
			      							shelf={book.shelf}
			      							authors={(book.authors !== undefined && book.authors.length > 0) ? book.authors : [] }
			      							coverURL={(book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined) ? book.imageLinks.thumbnail : ""}
			      							handleShelfChange={this.handleShelfChange}
			      						/>)

			      			)
			      : ' '}</ol>
			    </div>
		  </div>
		)

	}
}

export default Search