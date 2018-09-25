import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import  *  as BooksAPI from './BooksAPI'

/** Module Constants */
const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'
const NONE = 'none'

const titles = {
  [CURRENTLY_READING]: 'Currently Reading',
  [WANT_TO_READ]: 'Want to Read',
  [READ]: 'Read'
}

const CONSTANTS = [ CURRENTLY_READING, WANT_TO_READ, READ ]


class BooksApp extends React.Component {

  state = {
    books: []
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  componentDidMount() {
    this.getBooks()
  }

  handleShelfChange = (book, shelf) => {

    // Update the book's shelf in the API first
    BooksAPI.update(book, shelf).then((data) => {
      // Update the shelf of this book in the state after updating in the API
      let updatedBooksList = []
      if (this.state.books.find(b => b.id === book.id)) {
          updatedBooksList = this.state.books.map(b => {
                return (b.id  == book.id) ? Object.assign({}, b, {shelf: shelf}) : b
            });
            this.setState({ books: updatedBooksList })
      } else {
        let newBook = BooksAPI.get(book.id).then(data => {
            this.setState((currentState) => ({
              books: [...currentState.books, data]
            }))
          })
        }

    })
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
              <div className="front-page">
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
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
          <Route path="/search" render={() => <Search
                                                activeBooks={this.state.books}
                                                handleShelfChange={this.handleShelfChange}
                                              />}
          />
      </div>
    )
  }
}

export default BooksApp
export { CURRENTLY_READING, WANT_TO_READ, READ, NONE }
