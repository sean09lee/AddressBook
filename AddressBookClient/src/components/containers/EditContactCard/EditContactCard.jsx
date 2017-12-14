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
			ContactId: null,
			ContactFirstName: '',
			ContactMiddleName: '', 
			ContactLastName: '',
			ContactNickname: '',
			ContactNotes: '',
			ContactCompany: '',
			ContactTitle: '',
			Addresses: [],
			Emails: [],
			UserContacts: []
		};
		if (this.props.contact && this.props.contact != []){
			defaultContact = this.props.contact;
		}

		this.state = {
			contact: defaultContact,
			value: ''
		};

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
		var address = {
			AddressId: null,
			ContactId: this.state.contact.ContactId,
			AddressTypeId: null,
			AddressLine1: '',
			AddressLine2: '',
			AddressCity: '',
			AddressState: '',
			AddressZip: '',
			AddressCountry: ''
		};
		this.setState({

		});
	}

	handleInputChange(event) {
		const field = event.target.name;
		const contact = this.state.contact;
		contact[field] = event.target.value;

		// update value
		this.setState({
			contact
		});
	}

	render() {
		let DeleteButton = null;
		if (this.state.contact.ContactId){
			DeleteButton =	<DeleteContact contactId={this.state.contact.ContactId}/>;
		}
		let Addresses = <div>
			<TextField hintText="Address Line 1" floatingLabelText="Address Line 1" underlineShow={false} />
			<TextField hintText="Address Line 2" floatingLabelText="Address Line 2" underlineShow={false} />
			<TextField hintText="City" floatingLabelText="City" underlineShow={false} />
			<TextField hintText="State" floatingLabelText="State" underlineShow={false} />
			<TextField hintText="Country" floatingLabelText="Country" underlineShow={false} />
			<TextField hintText="ZIP Code" floatingLabelText="ZIP Code" underlineShow={false} />
		</div>;
		if (this.state.contact.Addresses && this.state.contact.Addresses.length > 0){
			for (var i=0; i < this.state.contact.Addresses.length; i++){
				//Addresses.
			}
		}
		return (
		<Card className="editContactCard">
			<CardHeader avatar={DefaultAvatar}>
				<div>
					<TextField 
						floatingLabelText="First Name" underlineShow={false} hintText="First Name"
						name="ContactFirstName" value={this.state.contact.ContactFirstName} 
						onChange={this.handleInputChange}/>
					<TextField floatingLabelText="Middle Name" underlineShow={false} hintText="Middle Name"
						name="ContactMiddleName" value={this.state.contact.ContactMiddleName} 
						onChange={this.handleInputChange}/>
					<TextField floatingLabelText="Last Name" underlineShow={false} hintText="Last Name"
						name="ContactLastName" value={this.state.contact.ContactLastName} 
						onChange={this.handleInputChange}/>
				</div>
				<div>
					<TextField floatingLabelText="Nickname" underlineShow={false} hintText="Nickname"
						name="ContactNickname" value={this.state.contact.ContactNickname} 
						onChange={this.handleInputChange}/>
				</div>
			</CardHeader>
			<Divider />
			<CardTitle>
				<TextField hintText="Company" floatingLabelText="Company" underlineShow={false} 
					name="ContactCompany" value={this.state.contact.ContactCompany}/>
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
				{ Addresses }
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