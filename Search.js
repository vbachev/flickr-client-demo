import React from 'react';

class Search extends React.Component {
	render () {
		return (
            <form id="searchForm" class="search-form">
                <input type="text" id="searchField" class="search-field" placeholder="Search by tag names"/>
                <button class="search-button" type="submit">Search</button>
            </form>
		);
	}
}

export default Search;