import React from 'react';
import Tile from './Tile';

class Stream extends React.Component {
	render () {
		let suffix;
		if(this.props.searchString){
			suffix = (
				<span id="searchSufix">
					for: {this.props.searchString.split(' ').join(', ')}
				</span>
			);
		}

		let tiles;
		if(this.props.posts && this.props.posts.length){
			tiles = this.props.posts.map((post, index) => <Tile key={post.timestamp} model={post}/>);
		} else if(this.props.searchString){
			tiles = (
				<li className="no-results">
		            Sorry, no results were found :(
		        </li>
			);
		} else {
			tiles = (
		        <li className="feed-item">
		            <div className="feed-item-image loading"></div>
		            Loading ...
		        </li>
			);
		}
		
		return (
			<div>
		        <h1 className="feed-title">
		            Photo Stream {suffix}
		        </h1>
		        
		        <ul id="feedContainer" className="feed-container empty">
		        	{tiles}
		        </ul>
	        </div>
		);
	}
}

export default Stream;