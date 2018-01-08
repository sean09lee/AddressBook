import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveContact } from '../../../services/ContactService';
import { setEditMode, setContacts, setFilteredContacts } from '../../../utilities/Actions';
import FlatButton from 'material-ui/FlatButton';

class SaveContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: this.props.contact
		};
		
		this.handleSave = this.handleSave.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({contact: newProps.contact});
	}

	handleSave(){
		saveContact(this.state.contact).then((contact) =>{
			this.props.setEditMode(false);
			var contacts = this.props.contacts;
			contacts.push(contact);
			this.props.setContacts(contacts);
		});
	}
	
	render() {
		return (
			<div className="saveContact">
				<FlatButton label="Save" onClick={ this.handleSave } />
			</div>
		);
	}
}

SaveContact.propTypes = {
    setEditMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts,
		editMode: state.isEditMode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
		setEditMode: (bool) => dispatch(setEditMode(bool)),
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setFilteredContacts: (contacts) => dispatch(setFilteredContacts(contacts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveContact);