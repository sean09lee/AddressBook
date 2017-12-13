import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
import DeleteContact from '../../buttons/DeleteContact/DeleteContact.jsx';
import EditContact from '../../buttons/EditContact/EditContact.jsx';
import SaveContact from '../../buttons/SaveContact/SaveContact.jsx';
import './_editContactCard.scss';

class EditContactCard extends Component {
	constructor(props) {
		super(props);
		var defaultContact = {
			ContactFirstName: '',
			ContactMiddleName: '', 
			ContactLastName: '',
			ContactNotes: ''
		};
		if (this.props.contact && this.props.contact != []){
			defaultContact = this.props.contact;
		}

		this.state = {
			contact: defaultContact,
			value: ''
		};

		let jasper = {...this.state.contact};
		this.addNewEmail = this.addNewEmail.bind(this);
		this.addNewAddress = this.addNewAddress.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			contact: nextProps.contact
		});
	}

	addNewEmail(){
		console.log('adding new email...');
	}

	addNewAddress(){
		console.log('adding new address');
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		// update value
		this.state.contact[name] = value;
	}

	render() {
		let DeleteButton = null;
		if (this.state.contact.ContactId){
			DeleteButton =	<DeleteContact contactId={this.state.contact.ContactId}/>;
		}
		return (
		<Card className="editContactCard">
			<CardHeader avatar={DefaultAvatar}>
				<TextField 
					floatingLabelText="First Name" 
					underlineShow={false} 
					ref={(input) => this.input = input}
					name="ContactFirstName" 
					value={this.state.contact.ContactFirstName} 
					onChange={this.handleInputChange}/>
				<TextField floatingLabelText="Middle Name" underlineShow={false}
					name="ContactMiddleName" value={this.state.contact.ContactMiddleName} onChange={this.handleInputChange}/>
				<TextField floatingLabelText="Last Name" underlineShow={false} 
					name="ContactLastName" value={this.state.contact.ContactLastName} onChange={this.handleInputChange}/>
			</CardHeader>
			<Divider />
			<CardTitle>
				<TextField hintText="Company" floatingLabelText="Company" underlineShow={false} />
				<TextField hintText="Title" floatingLabelText="Title" underlineShow={false} />
			</CardTitle>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new phone"/></div>
				<TextField hintText="Phone Number" floatingLabelText="Phone Number" underlineShow={false} />
				<TextField hintText="Phone Type" floatingLabelText="Phone Type" underlineShow={false} />
			</CardText>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new address"/></div>
				<TextField hintText="Address Line" floatingLabelText="Address Line" underlineShow={false} />
				<TextField hintText="City" floatingLabelText="City" underlineShow={false} />
				<TextField hintText="State" floatingLabelText="State" underlineShow={false} />
				<TextField hintText="Country" floatingLabelText="Country" underlineShow={false} />
				<TextField hintText="ZIP Code" floatingLabelText="ZIP Code" underlineShow={false} />
			</CardText>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new email"/></div>
				<TextField hintText="Email" floatingLabelText="Email" underlineShow={false} />
			</CardText>
			<Divider />
			<CardText >
				<TextField hintText="Notes" floatingLabelText="Notes" underlineShow={false} />
			</CardText>
			<CardActions className="flex-container">
				{ DeleteButton }
				<EditContact />
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