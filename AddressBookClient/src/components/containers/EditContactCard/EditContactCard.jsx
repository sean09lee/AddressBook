import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
import DeleteContact from '../../buttons/DeleteContact/DeleteContact.jsx';
import EditContact from '../../buttons/EditContact/EditContact.jsx';
import SaveContact from '../../buttons/SaveContact/SaveContact.jsx';
import './_editContactCard.scss';

class EditContactCard extends Component {
  constructor(props) {
    super(props);
    var newContact = {
      ContactFirstName: '',
	  ContactMiddleName: '', 
	  ContactLastName: '',
      ContactNotes: ''
    };
    this.state = {
      contact: newContact
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contact: nextProps.contact
    });
  }

  render() {
	return (
	<Card className="editContactCard">
		<CardHeader avatar={DefaultAvatar}>
			<TextField hintText="First Name" floatingLabelText="First Name" underlineShow={false} value={this.state.contact.ContactFirstName} />
			<TextField hintText="Middle Name" floatingLabelText="Middle Name" underlineShow={false} value={this.state.contact.ContactMiddleName}/>
			<TextField hintText="Last Name" floatingLabelText="Last Name" underlineShow={false} value={this.state.contact.ContactLastName} />
		</CardHeader>
		<CardTitle>
			<TextField hintText="Company" floatingLabelText="Company" underlineShow={false} />
			<TextField hintText="Title" floatingLabelText="Title" underlineShow={false} />
			<TextField hintText="Phone" floatingLabelText="Phone" underlineShow={false} />
			<TextField hintText="Email" floatingLabelText="Email" underlineShow={false} />
		</CardTitle>
		<CardText >
			<TextField hintText="Notes" floatingLabelText="Notes" underlineShow={false} />
		</CardText>
		<CardActions className="flex-container">
			<DeleteContact contact={this.state.contact} />
			<EditContact contact={this.state.contact} />
			<SaveContact contact={this.state.contact} />
		</CardActions>
	</Card>
	)
}
}

const mapStateToProps = (state) => { 
  return {
    contact: state.selectedContact,
  };
}

export default connect(mapStateToProps)(EditContactCard);