/**

  Author: Erika Miguel
  Date: September 25, 2018

  This file describes the Book component for the My Reads project,
  utilized by the Bookshelf and Search components.

*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	state = {
		shelf: this.props.shelf !== undefined ? this.props.shelf : 'none'
	}

	handleShelfChange = (event) => {
		const shelf = event.target.value
		this.props.handleShelfChange({ id: this.props.id}, shelf)
		this.setState({ shelf: shelf })
	}

	render() {
		const { title, authors, id, coverURL } = this.props
		return(
			<li key={id}>
				<div className="book">
		          <div className="book-top">
		            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${(coverURL)}")` }}></div>
		            <div className="book-shelf-changer">
		              <select value={this.state.shelf} onChange={this.handleShelfChange}>
		                <option value="move" disabled>Move to...</option>
		                <option value="currentlyReading">Currently Reading</option>
		                <option value="wantToRead">Want to Read</option>
		                <option value="read">Read</option>
		            	{ /**  Naively set default value to "None" for any books that were retrieved */}
		                <option value="none">None</option>
		              </select>
		            </div>
		          </div>
		          <div className="book-title">{title}</div>
		          {
		          	(authors !== undefined) ? authors.map(author => (<div className="book-authors" key={author}>{author}</div>)) : <div className="book-authors">{authors}</div>
		          }
		        </div>
		    </li>
		)
	}
}

Book.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	authors: PropTypes.array,
	handleShelfChange: PropTypes.func.isRequired
}

export default Book