import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { setContacts, setFilteredContacts } from '../../../utilities/Actions';
import { deleteContact } from '../../../services/ContactService';

class EditEmails extends Component {
	constructor(props){
		super(props)

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const field = event.target.name;
		const emails = this.state.emails;
		emails[field] = event.target.value;

		// update value
		this.setState({
			contact
		});
	}

	render() {
		return (
			<div className="emails" key={i}>
				<TextField type="email" hintText="Email" floatingLabelText="Email" 
				name={"EmailAddress"} underlineShow={false} value={emails[i].EmailAddress}
				onChange={this.handleInputChange}/>
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
