import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	state = {
		status: this.props.status !== undefined ? this.props.status : 'none'
	}

	handleStatusChange = (event) => {
		const prevStatus = this.props.status
		const shelf = event.target.value
		this.props.onStatusChange({
			shelf: shelf,
			title: this.props.title,
			authors: this.props.authors,
			id: this.props.id,
			coverURL: this.props.coverURL
		})
		this.setState({ status: shelf })
	}

	render() {
		const { title, authors, id, coverURL } = this.props
		return(
			<li key={id}>
				<div className="book">
		          <div className="book-top">
		            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${(coverURL)}")` }}></div>
		            <div className="book-shelf-changer">
		              <select value={this.state.status} onChange={this.handleStatusChange}>
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
	onStatusChange: PropTypes.func.isRequired
}

export default Book