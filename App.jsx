import React from 'react';
import Search from './Search';
import Stream from './Stream';
import Connector from './Connector';

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			posts : [],
			searchString : ''
		};

		this.onSearch = this.onSearch.bind(this);
		this.onLoad = this.onLoad.bind(this);
	}

	onSearch (searchString) {
		this.setState({ searchString });
	}

	onLoad (posts) {
		this.setState({ posts });
		
		// scroll to top
		window.scroll(0, 0);
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