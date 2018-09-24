import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	state = {
		status: this.props.status
	}

	handleStatusChange = (event) => {
		const prevStatus = this.props.status
		const currentStatus = event.target.value
		this.props.onStatusChange({
			prevStatus: prevStatus,
			currentStatus: currentStatus,
			title: this.props.title,
			authors: this.props.author,
			id: this.props.id,
			coverURL: this.props.coverURL
		})
		this.setState({ status: currentStatus })
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
		                <option value="none">None</option>
		              </select>
		            </div>
		          </div>
		          <div className="book-title">{title}</div>
		          <div className="book-authors">{authors}</div>
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