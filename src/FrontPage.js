/**

  Author: Erika Miguel
  Date: September 26, 2018

  This file contains the front page component for the Book App.

*/

import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { titles, CONSTANTS } from './Constants'
import { Link } from 'react-router-dom'

const FrontPage = (props) => {
	return (
		<div className="front-page">
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>Erika's Reads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      { CONSTANTS.map((c,index) => ( <Bookshelf key={index} title={titles[c]} books={props.books.filter(book => book.shelf === c)} handleShelfChange={props.handleShelfChange}/> )) }
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
        </div>
	)
}

export default FrontPage

