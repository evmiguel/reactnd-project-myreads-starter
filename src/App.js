import React from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

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
    books: {
      [ CURRENTLY_READING ]: [],
      [ WANT_TO_READ ] : [],
      [ READ ] : [],
      [ NONE ] : []
    }
  }

  onStatusChange = (book) => {
    this.setState(currentState => (
      (book.prevStatus !== undefined && currentState.books[book.prevStatus].length > 0) &&
        currentState.books[book.prevStatus]
        .splice(currentState.books[book.prevStatus].findIndex(b => b.id === book.id), 1)
    ))

    this.setState(currentState => (
      currentState.books[book.currentStatus].push(book)
    ))

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
                      {
                        CONSTANTS.map(c => (
                          <Bookshelf title={titles[c]} books={this.state.books[c]} key={c} status={c} onStatusChange={this.onStatusChange}/>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          <Route path="/search" render={() => <Search onStatusChange={this.onStatusChange} />} />
      </div>
    )
  }
}

export default BooksApp
