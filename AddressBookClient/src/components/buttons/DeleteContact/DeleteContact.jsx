import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { setContacts, setFilteredContacts } from '../../../utilities/Actions';
import { deleteContact } from '../../../services/ContactService';

class DeleteContact extends Component {
	constructor(props){
		super(props)
		this.deleteContact = this.deleteContact.bind(this);
		this.removeFromContacts = this.removeFromContacts.bind(this);
	}

	deleteContact(){
		console.log('Deleting contact id ' + this.props.contactId);
		if (deleteContact(this.props.contactId)){
			// remove from contacts
			var contacts = this.props.contacts;
			this.removeFromContacts(contacts, this.props.contactId);

			// remove from filtered contacts
			var filteredContacts = this.props.filteredContacts;
			this.removeFromContacts(filteredContacts, this.props.contactId);

			// reset the redux props
			this.props.setContacts(contacts);
			this.props.setFilteredContacts(filteredContacts);
		}
		else {
			alert('Oh no! Something went wrong. Please try again.');
		};
	}

	removeFromContacts(contacts, contactId){
		contacts.splice(
			contacts.findIndex(function(obj) {
			return obj.ContactId === contactId;
		}), 1);
	}

	render() {
		return (
			<div className="deleteContact">
				<FlatButton label="Delete" onClick={this.deleteContact}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setFilteredContacts: (contacts) => dispatch(setFilteredContacts(contacts))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteContact);
