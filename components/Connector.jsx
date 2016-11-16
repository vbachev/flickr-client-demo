import React from 'react';

class Connector extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			appendPosts : false
		};

        // flickr needs a global function to process the results
		window.jsonFlickrFeed = this.handleJsonpResult.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	initJsonpRequest () {
		let container = document.getElementById('connector');
		const script = document.createElement('script');
        script.src = '//api.flickr.com/services/feeds/photos_public.gne?format=json';
		if(this.props.searchString){
			script.src += '&tags=' + this.props.searchString.split(' ').join(',');
		}
        script.async = true;
        container.innerHTML = '';
        container.appendChild(script);
	}

	handleJsonpResult (result) {
		let posts = [];
		if(result && result.items && result.items.length){
			posts = result.items.map(item => ({
                src       : item.media.m,
                title     : item.title.trim() || 'Untitled',
                link 	  : item.link,
                tags      : item.tags,
                timestamp : new Date(item.date_taken).getTime(),
                
                // pick out the user name ("nobody@flickr.com (Hobgoblin737)" -> "Hobgoblin737")
                userName  : item.author.split(' ("')[1].slice(0, -2),

                // construct a valid URL for the user profile page
                userLink  : 'https://www.flickr.com/photos/' + item.author_id
	        }));
		}
		this.props.onLoad(posts, this.state.appendPosts);
		this.setState({
			appendPosts : false
		});
	}

	onClick () {
		this.setState({
			appendPosts : true
		});
		this.initJsonpRequest();
	}

	componentDidMount () {
		this.initJsonpRequest();
	}

	shouldComponentUpdate (newProps) {
		return newProps.searchString !== this.props.searchString;
	}

	componentDidUpdate () {
		this.initJsonpRequest();
	}

	render () {
		return (
			<div className="connector-wrapper">
				<button className="lazy-load-button" onClick={this.onClick}>
					Load more ...
				</button>
				<div id="connector" data-search={this.props.searchString}></div>
			</div>
		);
	}
}

export default Connector;