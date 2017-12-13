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
			ContactFirstName: '',
			ContactMiddleName: '', 
			ContactLastName: '',
			ContactNotes: ''
		};
		if (this.props.contact && this.props.contact.length > 0){
			defaultContact = this.props.contact;
		}
		this.state = {
			contact: defaultContact,
			editMode: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			contact: nextProps.contact,
			editMode: nextProps.editMode
		});
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

		//else
		return (
			<Card>
				<CardHeader
					title={this.state.contact.ContactFirstName + this.state.contact.ContactLastName}
					subtitle="Subtitle"
					avatar={DefaultAvatar}
					actAsExpander={false}
					showExpandableButton={false}
				/>
				<CardTitle title="Title" subtitle="Card subtitle" />
				<CardText >
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
					Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
					Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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