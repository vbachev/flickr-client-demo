import React from 'react';
import Search from './Search.jsx';
import Stream from './Stream.jsx';
import Connector from './Connector.jsx';

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			posts : [],
			searchString : '',
			timeout : 0
		};

		this.onSearch = this.onSearch.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidMount () {
		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.onScroll);
	}

	// this will use throttling to call the loadVisibleImages function once every 300ms
	onScroll () {
		clearTimeout(this.state.timeout);
		this.setState({
			timeout : setTimeout(this.loadVisibleImages, 300)
		});
	}

	onSearch (searchString) {
		this.setState({ searchString });
	}

	onLoad (posts, append) {
		if(append){
			// append the new posts to the existing ones
			this.setState((prevState) => ({
				posts : [].concat(prevState.posts, posts)
			}));
		} else {
			// set only the new posts
			this.setState({ posts });

			// go back to top
			window.scroll(0, 0);
		}
		
		this.loadVisibleImages();
	}

	loadVisibleImages () {
        document.querySelectorAll('.feed-item-image.loading img')
        	.forEach(function (imageNode) {
	            // check if the image is inside the visible area
	            var dimentions = imageNode.getBoundingClientRect();
	            if(dimentions.bottom < 0 || dimentions.top > window.innerHeight){
	                return;
	            }

	            // load image
	            imageNode.src = imageNode.getAttribute('data-src');
	            imageNode.addEventListener('load', function(){
	                imageNode.parentNode.classList.remove('loading');
	            });
	        });
    }

	render () {
		return (
			<div>
				<header className="header">
			        <div className="wrapper">
			            <h1 className="header-title">My flickr client</h1>

			            <input type="checkbox" id="searchTrigger" name="searchTrigger" className="search-trigger"/>
			            <label htmlFor="searchTrigger" className="search-toggle"></label>

		            	<Search onSearch={this.onSearch}/>
			        </div>
			    </header>

			    <div className="wrapper">
			    	<Stream posts={this.state.posts} searchString={this.state.searchString}/>
			    </div>

			    <Connector searchString={this.state.searchString} onLoad={this.onLoad}/>
		   	</div>
		);
	}
}

export default App;