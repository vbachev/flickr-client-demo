import React from 'react';

/*
	props.model
		src
		title
		link
		tags
		userName
		userLink
		timestamp
*/

class Tile extends React.Component {
	constructor (props) {
		super(props);
		this.onLoad = this.onLoad.bind(this);
	}

	onLoad (event) {
		event.target.parentElement.classList.remove('loading');
	}

	render () {
		return (
	        <li className="feed-item">
	            <div className="feed-item-image loading">
	                <img src={this.props.model.src}
	                	onLoad={this.onLoad} 
	                	data-src={this.props.model.src} 
	                	alt={this.props.model.title}/>
	            </div>
	            <a className="feed-item-title" href={this.props.model.link}>
	            	{this.props.model.title}
            	</a> by <a className="feed-item-user" href={this.props.model.userLink}>
	            	{this.props.model.userName}
	            </a>
	            <div className="feed-item-tags">
	            	{this.props.model.tags}
	            </div>
	        </li>
		);
	}
}

export default Tile;