import React from 'react';

class App extends React.Component {
	render () {
		return (
			<div>
				<header class="header">
			        <div class="wrapper">
			            <h1 class="header-title">My flickr client</h1>

			            <input type="checkbox" id="searchTrigger" name="searchTrigger" class="search-trigger"/>
			            <label for="searchTrigger" class="search-toggle"></label>

		            	<Search />
			        </div>
			    </header>

			    <div class="wrapper">
			    	<Stream />
			    </div>

			    <script src="js/zepto.min.js"></script>
			    <script src="js/main.js"></script>
		   	</div>
		);
	}
}

export default App;