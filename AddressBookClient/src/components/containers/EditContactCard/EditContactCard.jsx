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
import DropDown from '../../buttons/Dropdown/Dropdown.jsx';
import './_editContactCard.scss';

class EditContactCard extends Component {
	constructor(props) {
		super(props);
		var address = {
			AddressId: null,
			ContactId: null,
			AddressTypeId: null,
			AddressLine1: '',
			AddressLine2: '',
			AddressCity: '',
			AddressState: '',
			AddressZip: '',
			AddressCountry: ''
		};
		var defaultContact = {
			ContactId: null,
			ContactFirstName: '',
			ContactMiddleName: '', 
			ContactLastName: '',
			ContactNickname: '',
			ContactNotes: '',
			ContactCompany: '',
			ContactTitle: '',
			Addresses: [address],
			Emails: [],
			UserContacts: [],
			Phones: []
		};
		if (this.props.contact && this.props.contact != []){
			defaultContact = this.props.contact;
		}

		this.state = {
			contact: defaultContact,
			value: ''
		};

		this.handleNewPhone = this.handleNewPhone.bind(this);
		this.handleNewEmail = this.handleNewEmail.bind(this);
		this.handleNewAddress = this.handleNewAddress.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleDeleteAddress = this.handleDeleteAddress.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			contact: nextProps.contact
		});
	}

	handleNewPhone(){
		console.log('adding new phone...');
		var phone = {
			PhoneNumber: null,
			PhoneType: null
		};
		var contactCopy = this.state.contact;
		if(!contactCopy.Phones){
			contactCopy.Phones = []
		}
		contactCopy.Phones.push(email);
		this.setState({
			contact : contactCopy
		});
	}

	handleNewEmail(){
		console.log('adding new email...');
		var email = {
			EmailId: null,
			EmailTypeId: null,
			EmailAddress: '',
		};
		var contactCopy = this.state.contact;
		if (!contactCopy.Emails){
			contactCopy.Emails = [];
		}
		contactCopy.Emails.push(email);
		this.setState({
			contact : contactCopy
		});
	}

	handleNewAddress(){
		console.log('adding new address');
		var address = {
			AddressId: 0,
			ContactId: this.state.contact.ContactId,
			AddressTypeId: 1,
			AddressLine1: '',
			AddressLine2: '',
			AddressCity: '',
			AddressState: '',
			AddressZip: '',
			AddressCountry: ''
		};
		var contactCopy = this.state.contact;
		if (!contactCopy.Addresses){
			contactCopy.Addresses = [];
		}
		contactCopy.Addresses.push(address);

		this.setState({
			contact : contactCopy
		});
	}

	handleDeleteAddress(event){
		var index = event.target.name;
		var contactCopy = this.state.contact;
		if (!contactCopy.Addresses){
			contactCopy.Addresses = [];
		}
		contactCopy.Addresses.splice(index, 1);

		this.setState({
			contact : contactCopy
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

	handleAddressChange(event){
		var contact = this.state.contact;
		const field	= event.target.name;
		const index = event.target.title;
		contact.Addresses[index][field] = event.target.value;

		this.setState({
			contact
		})
	}

	render() {
		let DeleteButton = null;
		if (this.state.contact.ContactId){
			DeleteButton =	<DeleteContact contactId={this.state.contact.ContactId}/>;
		}

		// Define addresses
		const Addresses = [];
		var addresses = this.state.contact.Addresses;
		if (addresses && addresses.length > 0){
			for (var i = 0; i < addresses.length; i++) {
				Addresses.push(
					<div className="addresses" key={i}>
						<div className="flex-container">
						<TextField hintText="Address Line 1" floatingLabelText="Address Line 1" 
						underlineShow={false} value={addresses[i].AddressLine1}
						name={"AddressLine1"} onChange={this.handleAddressChange}
						title={i} fullWidth={true}/>
						</div>
						<div className="flex-container">
						<TextField hintText="Address Line 2" floatingLabelText="Address Line 2" 
						underlineShow={false} value={addresses[i].AddressLine2} fullWidth={true}
						name={"AddressLine2"} onChange={this.handleAddressChange} title={i}/>
						</div>
						<div className="flex-container">
						<TextField hintText="City" floatingLabelText="City" underlineShow={false} 
						name={"AddressCity"} title={i}
						value={addresses[i].AddressCity} onChange={this.handleAddressChange}/>
						<TextField hintText="ZIP Code" floatingLabelText="ZIP Code" underlineShow={false} 
						name={"AddressZip"} title={i}
						value={addresses[i].AddressZip} onChange={this.handleAddressChange}/>
						<TextField hintText="State" floatingLabelText="State" underlineShow={false} 
						name={"AddressState"} title={i}
						value={addresses[i].AddressState} onChange={this.handleAddressChange}/>
						<TextField hintText="Country" floatingLabelText="Country" underlineShow={false} 
						name={"AddressCountry"} title={i}
						value={addresses[i].AddressCountry} onChange={this.handleAddressChange}/>
						</div>
						<div className="flex-container">
						<DropDown />
						<FlatButton onClick={this.handleDeleteAddress} name={i} label="Delete Address"/>
						</div>
					</div>
				)
			};
		}

		const Emails = [];
		var emails = this.state.contact.Emails;
		if (emails && emails.length > 0){
			for (var i = 0; i < emails.length; i++) {
				Emails.push(
					<div className="emails" key={i}>
						<TextField type="email" hintText="Email" floatingLabelText="Email" 
						name={"EmailAddress" + i} underlineShow={false} value={emails[i].EmailAddress}
						onChange={this.handleInputChange}/>
					</div>
				)
			}
		}

		let Phones = null;
		if (this.state.contact.Phones && this.state.contact.Phones.length > 0){
			Phones = this.state.contact.Phones.map(input => 
				<div className="phones">
					<TextField hintText="Phone Number" floatingLabelText="Phone Number" 
					underlineShow={false} value={input.PhoneNumber} onChange={this.handleInputChange}/>
					<TextField hintText="Phone Type" floatingLabelText="Phone Type" 
					underlineShow={false} value={input.PhoneType} onChange={this.handleInputChange}/>
				</div>
			)
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
					name="ContactCompany" value={this.state.contact.ContactCompany}
					onChange={this.handleInputChange}/>
				<TextField hintText="Title" floatingLabelText="Title" underlineShow={false} 
					name="ContactTitle" value={this.state.contact.ContactTitle} 
					onChange={this.handleInputChange}/>
			</CardTitle>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new phone" onClick={this.handleNewPhone}/></div>
				{ Phones }
			</CardText>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new address" onClick={this.handleNewAddress}/></div>
				{ Addresses }
			</CardText>
			<Divider />
			<CardText >
				<div><FlatButton label="Add new email" onClick={this.handleNewEmail}/></div>
				{ Emails }
			</CardText>
			<Divider />
			<CardText >
				<TextField hintText="Notes" floatingLabelText="Notes" underlineShow={false} 
					name="ContactNotes" value={this.state.contact.ContactNotes} 
					onChange={this.handleInputChange}/>
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