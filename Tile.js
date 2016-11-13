import React from 'react';

class Tile extends React.Component {
	render () {
		var initial = (
            <li class="feed-item">
                <div class="feed-item-image loading"></div>
                Loading ...
            </li>
		);

		var noResultsResult = (
			<li class="no-results">
	            Sorry, no results were found :(
	        </li>
		);

		return (
	        <li class="feed-item">
	            <div class="feed-item-image loading">
	                <img src="" data-src="{{this.props.src}}" alt="{{this.props.title}}"/>
	            </div>
	            <a class="feed-item-title" href="{{this.props.titleLink}}">{{this.props.title}}</a>
	            by
	            <a class="feed-item-user" href="{{this.props.userLink}}">{{user}}</a>
	            <div class="feed-item-tags">{{this.props.tags}}</div>
	        </li>
		);
	}
}

export default Tile;