import React from 'react';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit (event) {
		event.preventDefault();
		let searchField = document.getElementById('searchField');
		if(searchField.value){
			this.props.onSearch(searchField.value);
			
			// clear and hide the search form
			searchField.value = '';
        	document.getElementById('searchTrigger').checked = false;
		}
	}

	render () {
		return (
            <form id="searchForm" className="search-form" onSubmit={this.onSubmit}>
                <input type="text" id="searchField" className="search-field" placeholder="Search by tag names"/>
                <button className="search-button" type="submit">Search</button>
            </form>
		);
	}
}

export default Search;