/**

  Author: Erika Miguel
  Date: September 25, 2018

  This file contains the main app for the My Reads book project.

*/

import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import  *  as BooksAPI from './BooksAPI'

/** Module Constants */
const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'

const titles = {
  [CURRENTLY_READING]: 'Currently Reading',
  [WANT_TO_READ]: 'Want to Read',
  [READ]: 'Read'
}

const CONSTANTS = [ CURRENTLY_READING, WANT_TO_READ, READ ]


class BooksApp extends React.Component {

  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    // Get all the books from the API after the component mounts
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }

  handleShelfChange = (book, shelf) => {

    // Update the book's shelf in the API first
    BooksAPI.update(book, shelf).then((data) => {
      // Update the shelf of this book in the state after updating in the API
      let updatedBooksList = []

      // Scenario when the book already exists on the shelf
      if (this.state.books.find(b => b.id === book.id)) {
          updatedBooksList = this.state.books.map(b => {
                return (b.id  === book.id) ? Object.assign({}, b, {shelf: shelf}) : b
            });
            this.setState({ books: updatedBooksList })
      } else {
        // Scenario when the book needs to get added to the shelf
        BooksAPI.get(book.id).then(data => {
            this.setState((currentState) => ({
              books: [...currentState.books, data]
            }))
          })
        }

    })
  }

  handleSearchQuery = (query) => {
    if (query.trim() !== '') {
      BooksAPI.search(query).then((books) => {
      // Loop through the books that are already on shelves. If the book is in the list of books returned from search,
      //  update the book's shelf in the list of searched books
      for (let book of this.state.books) {
        console.log(books)
        if (!books.error && books.find( b => b.id === book.id)) {
            let idx = books.findIndex( b => b.id === book.id)
            books[idx].shelf = book.shelf
        }
      }
      this.setState({searchBooks: books})
      })
    } else {
      this.setState({searchBooks: []}) // Empty the list of searched books if the query is an empty string
    }
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
              <div className="front-page">
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>Erika's Reads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      { CONSTANTS.map((c,index) => ( <Bookshelf key={index} title={titles[c]} books={this.state.books.filter(book => book.shelf === c)} handleShelfChange={this.handleShelfChange}/> )) }
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          <Route path="/search" render={() =>
                                              <Search
                                                books={this.state.searchBooks}
                                                handleSearchQuery={this.handleSearchQuery}
                                                handleShelfChange={this.handleShelfChange}
                                              />}
          />
      </div>
    )
  }
}

export default BooksApp
