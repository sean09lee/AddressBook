import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveContact } from '../../../services/ContactService';
import FlatButton from 'material-ui/FlatButton';

class SaveContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: []
		};
		
		this.handleSave = this.handleSave.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({contact: newProps.contact});
	}

	handleSave(){
		var endpoint = 'http://dev.addressbookservice.com/api/contacts/';
		return fetch(endpoint, {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  ContactFirstName: this.state.contact.ContactFirstName,
			  ContactMiddleName: this.state.contact.ContactMiddleName,
			  ContactLastName: this.state.contact.ContactLastName
			}).then(() => {
				this.props.setEditMode(false);
			})
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
        editMode: state.isEditMode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEditMode: (bool) => dispatch(setEditMode(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveContact);