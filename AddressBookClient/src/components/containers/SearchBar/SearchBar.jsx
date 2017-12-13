import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';

class SearchBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false,
			contacts: [],
			contactDetails: [],
			searchTerm
		}
	}

	handleChange(){
		console.log(this.state.searchTerm);
	}

	render(){
		return (
			<SearchBar
				onChange={() => console.log('onChange')}
				onRequestSearch={() => console.log('onRequestSearch')}
				style={{
					margin: '0 auto',
					maxWidth: 800
				}}
				value={this.state.searchTerm}
			/>
		)
	}
}

export default SearchBar;
//export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);