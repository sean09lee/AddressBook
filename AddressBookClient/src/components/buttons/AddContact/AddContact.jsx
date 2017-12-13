import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { setContact, setEditMode } from '../../../utilities/Actions';

class AddContact extends Component {
	constructor(props){
		super(props)
		this.addContact = this.addContact.bind(this);
	}

	addContact(){
		var newContact = {
			ContactFirstName: '',
			ContactMiddleName: '',
			ContactLastName: '',
		};
		this.props.setContact(newContact);
		this.props.setEditMode(true);
	}

	render() {
		return (
			<div className="addContact">
				<RaisedButton label="Add Contact" primary={true} className="flex-item" onClick={this.addContact}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contact: state.selectedContact
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContact: (contacts) => dispatch(setContact(contacts)),
		setEditMode: (bool) => dispatch(setEditMode(bool))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
