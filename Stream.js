import React from 'react';

class Stream extends React.Component {
	render () {
		return (
			<div>
		        <h1 class="feed-title">
		            Photo Stream
		            <span id="searchSufix"></span>
		        </h1>
		        
		        <ul id="feedContainer" class="feed-container empty">
		        
		        </ul>
	        </div>
		);
	}
}

export default Stream;