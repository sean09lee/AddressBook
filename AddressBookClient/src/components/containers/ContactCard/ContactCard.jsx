import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
import EditContactCard from '../../containers/EditContactCard/EditContactCard.jsx';
import DeleteContact from '../../buttons/DeleteContact/DeleteContact.jsx';
import EditContact from '../../buttons/EditContact/EditContact.jsx';
import SaveContact from '../../buttons/SaveContact/SaveContact.jsx';
import './_contactCard.scss';

class ContactCard extends Component {
	constructor(props) {
		super(props);
		var defaultContact = {
			ContactId: 0,
			ContactFirstName: 'First Name',
			ContactMiddleName: '', 
			ContactLastName: '',
			ContactNotes: '',
			ContactNickName: '',
			ContactCompany: '',
			ContactTitle: '',
			Addresses: [],
			Emails: [],
			UserContacts: []
		};
		if (this.props.contact && this.props.contact.length > 0){
			defaultContact = this.props.contact;
		}
		this.state = {
			contact: defaultContact,
			editMode: true
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			contact: nextProps.contact,
			editMode: nextProps.editMode
		});
		this.forceUpdate();
	}

	render() {
		if (this.state.editMode){
			return (
				<EditContactCard />
			)
		}

		let DeleteButton = null;
		if (this.state.contact.ContactId){
			DeleteButton =	<DeleteContact contactId={this.state.contact.ContactId}/>;
		}

		var firstName = "";
		if (this.state.contact.ContactFirstName){
			firstName = this.state.contact.ContactFirstName;
		}
		var middleName = "";
		if (this.state.contact.ContactMiddleName){
			middleName = this.state.contact.ContactMiddleName;
		} 
		var lastName = "";
		if (this.state.contact.ContactLastName){
			lastName = this.state.contact.ContactLastName;
		}
		var fullName = firstName + " " + middleName + " " + lastName;

		let Phones = null;
		if (this.state.contact.Phones && this.state.contact.Phones > 0){

		}

		let Emails = null;
		if (this.state.contact.Emails && this.state.contact.Emails > 0){

		}

		let Addresses = [];
		var addresses = this.state.contact.Addresses;
		if (addresses && addresses.length > 0){
			for (var i=0; i < addresses.length; i++){
				Addresses.push(
				<div className="addresses">
					{addresses[i].AddressLine1}{addresses[i].AddressLine2}, 
					{addresses[i].AddressCity}, {addresses[i].AddressZip}, 
					{addresses[i].AddressState}, {addresses[i].Country}
				</div>
				);
			}
		}

		// set defaults
		if (!this.state.contact.ContactId){
			fullName = "Full Name";
		}

		return (
			<Card className="contactCard">
				<CardHeader
					title={fullName}
					subtitle={this.state.contact.ContactNickname}
					avatar={DefaultAvatar}
				/>
				<CardTitle title={this.state.contact.ContactCompany} 
					subtitle={this.state.contact.ContactTitle} />
				<CardText>
					<p>Phone Numbers</p>
					{Phones}
				</CardText>
				<CardText >
					<p>Emails</p>
					{Emails}
				</CardText>
				<CardText >
					<p>Addresses</p>
					{Addresses}
				</CardText>
				<CardText>
					<p>Notes</p>
					{this.state.contact.ContactNotes}
				</CardText>
				<CardActions className="flex-container">
					{DeleteButton}
					<EditContact contact={this.state.contact} />
				</CardActions>
			</Card>
		);
	}
}

const mapStateToProps = (state) => { 
	return {
		contact: state.selectedContact,
		editMode: state.isEditMode
	};
}

export default connect(mapStateToProps)(ContactCard);