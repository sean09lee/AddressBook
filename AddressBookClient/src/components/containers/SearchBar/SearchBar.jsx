import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';

export default class SearchBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false,
			contacts: [],
			contactDetails: []
		}
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
			/>
		)
	}
}
