import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import { setContacts, setFilteredContacts, setSearchTerm } from '../../../utilities/Actions';
import MaterialSearchBar from 'material-ui-search-bar';

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			requestFailed: false,
			contacts: [],
			filteredContacts: [],
			searchTerm: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSearchRequest = this.handleSearchRequest.bind(this);
	}

	handleChange(newValue){
		this.setState({ searchTerm: newValue });
		var caseInsensitiveSearchTerm = newValue.toLowerCase();
		var contactList = this.props.contacts;
		var filteredList = contactList.filter(contact => (
			contact.ContactFirstName.trim().toLowerCase() 
			+ " " + contact.ContactLastName.trim().toLowerCase())
			.includes(caseInsensitiveSearchTerm)
		);
		this.props.fetchFilteredData(filteredList);
		this.props.setSearchTerm(newValue);
	}

	handleSearchRequest(){
		console.log('search requested');
		// get all contacts unfiltered
		this.props.fetchFilteredData(this.props.contacts);
	}

	render(){
		return (
			<MaterialSearchBar
				onChange={(newValue) => this.handleChange(newValue)}
				onRequestSearch={() => this.handleSearchRequest}
				style={{
					margin: '0 auto',
					maxWidth: 800
				}}
				value={this.state.searchTerm}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts,
		searchTerm: state.searchTerm
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (contact) => dispatch(setContacts(contact)),
		fetchFilteredData: (contacts) => dispatch(setFilteredContacts(contacts)),
		setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);